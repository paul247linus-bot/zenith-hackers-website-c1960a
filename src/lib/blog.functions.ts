import { createServerFn } from '@tanstack/react-start'
import { notFound } from '@tanstack/react-router'
import { and, asc, desc, eq, gt, sql } from 'drizzle-orm'
import { z } from 'zod'
import { db } from '../../db/index'
import { comments, communityPosts } from '../../db/schema'
import { editorialPosts, POST_CATEGORIES, type Post, type PostCategory } from '@/data/posts'
import { commentInput, postInput } from './blog.schemas'

type CommunityRow = typeof communityPosts.$inferSelect

function toPost(row: CommunityRow): Post {
  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    category: (POST_CATEGORIES as readonly string[]).includes(row.category)
      ? (row.category as PostCategory)
      : 'Industry News',
    author: row.authorName,
    date: row.createdAt.toISOString().slice(0, 10),
    readMinutes: Math.max(1, Math.round(row.body.split(/\s+/).length / 200)),
    body: row.body.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean),
    community: true,
  }
}

async function commentCounts() {
  const rows = await db
    .select({ slug: comments.postSlug, count: sql<number>`count(*)::int` })
    .from(comments)
    .groupBy(comments.postSlug)
  return Object.fromEntries(rows.map((r) => [r.slug, r.count])) as Record<string, number>
}

export const listPosts = createServerFn({ method: 'GET' }).handler(async () => {
  let community: Post[] = []
  let counts: Record<string, number> = {}
  try {
    const rows = await db.select().from(communityPosts).orderBy(desc(communityPosts.createdAt)).limit(200)
    community = rows.map(toPost)
    counts = await commentCounts()
  } catch (error) {
    // Keep the editorial archive available even if the database is unreachable.
    console.error('Could not load community posts', error)
  }
  const posts = [...community, ...editorialPosts].sort((a, b) => b.date.localeCompare(a.date))
  return posts.map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    category: p.category,
    author: p.author,
    date: p.date,
    readMinutes: p.readMinutes,
    community: p.community ?? false,
    comments: counts[p.slug] ?? 0,
  }))
})

const slugInput = z.object({ slug: z.string().trim().min(1).max(200) })

export const getPost = createServerFn({ method: 'GET' })
  .validator(slugInput)
  .handler(async ({ data }) => {
    const editorial = editorialPosts.find((p) => p.slug === data.slug)
    if (editorial) return editorial
    const [row] = await db.select().from(communityPosts).where(eq(communityPosts.slug, data.slug)).limit(1)
    if (!row) throw notFound()
    return toPost(row)
  })

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 70)
}

export const createPost = createServerFn({ method: 'POST' })
  .validator(postInput)
  .handler(async ({ data }) => {
    const slug = `${slugify(data.title) || 'post'}-${Math.random().toString(36).slice(2, 7)}`
    const firstPara = data.body.split(/\n\s*\n/)[0].replace(/\s+/g, ' ')
    const excerpt = firstPara.length > 180 ? `${firstPara.slice(0, 177).trimEnd()}…` : firstPara
    const [row] = await db
      .insert(communityPosts)
      .values({ slug, title: data.title, excerpt, category: data.category, authorName: data.authorName, body: data.body })
      .returning({ slug: communityPosts.slug })
    return row
  })

export const listComments = createServerFn({ method: 'GET' })
  .validator(slugInput)
  .handler(async ({ data }) => {
    const rows = await db
      .select()
      .from(comments)
      .where(eq(comments.postSlug, data.slug))
      .orderBy(asc(comments.createdAt))
      .limit(500)
    return rows.map((r) => ({ ...r, createdAt: r.createdAt.toISOString() }))
  })

export const addComment = createServerFn({ method: 'POST' })
  .validator(commentInput)
  .handler(async ({ data }) => {
    const exists =
      editorialPosts.some((p) => p.slug === data.postSlug) ||
      (await db.select({ id: communityPosts.id }).from(communityPosts).where(eq(communityPosts.slug, data.postSlug)).limit(1)).length > 0
    if (!exists) throw new Error('Article not found')

    // Basic flood protection: reject an identical comment posted in the last minute.
    const recent = await db
      .select({ id: comments.id })
      .from(comments)
      .where(
        and(
          eq(comments.postSlug, data.postSlug),
          eq(comments.body, data.body),
          gt(comments.createdAt, new Date(Date.now() - 60_000)),
        ),
      )
      .limit(1)
    if (recent.length) throw new Error('This comment was already posted')

    const [row] = await db
      .insert(comments)
      .values({ postSlug: data.postSlug, authorName: data.authorName, body: data.body, parentId: data.parentId ?? null })
      .returning()
    return { ...row, createdAt: row.createdAt.toISOString() }
  })
