import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, Clock, PenLine, User } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Comments, type CommentItem } from '@/components/comments'
import { CtaBand, formatDate, PostCard } from '@/components/page-parts'
import { categoryImage, editorialPosts } from '@/data/posts'
import { getPost, listComments } from '@/lib/blog.functions'
import { img, site } from '@/lib/site'

export const Route = createFileRoute('/news/$slug')({
  loader: async ({ params }) => {
    const post = await getPost({ data: { slug: params.slug } })
    let comments: CommentItem[] = []
    let commentsUnavailable = false
    try {
      comments = await listComments({ data: { slug: params.slug } })
    } catch {
      commentsUnavailable = true
    }
    return { post, comments, commentsUnavailable }
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.post.title} | ${site.name}` },
          { name: 'description', content: loaderData.post.excerpt },
          { property: 'og:title', content: loaderData.post.title },
          { property: 'og:description', content: loaderData.post.excerpt },
          { property: 'og:type', content: 'article' },
        ]
      : [],
  }),
  component: Article,
})

function Article() {
  const { post, comments, commentsUnavailable } = Route.useLoaderData()
  const related = editorialPosts.filter((p) => p.category === post.category && p.slug !== post.slug).slice(0, 3)

  return (
    <main>
      <article>
        <header className="relative isolate overflow-hidden border-b border-border">
          <img
            src={img(categoryImage[post.category], 1600)}
            alt=""
            width={1600}
            height={900}
            className="absolute inset-0 -z-20 size-full object-cover opacity-30"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-background via-background/80 to-background/40" aria-hidden />
          <div className="mx-auto max-w-reading px-4 py-16 sm:px-6 md:py-24">
            <Link to="/news" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
              <ArrowLeft className="size-4" aria-hidden /> All news
            </Link>
            <div className="mt-6 flex flex-wrap gap-2">
              <Badge>{post.category}</Badge>
              {post.community && <Badge className="bg-accent text-accent-foreground">Community article</Badge>}
            </div>
            <h1 className="mt-4 text-5xl font-bold uppercase leading-[0.95] md:text-6xl">{post.title}</h1>
            <p className="mt-5 text-lg text-muted-foreground">{post.excerpt}</p>
            <p className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><User className="size-3.5 text-primary" aria-hidden /> {post.author}</span>
              <span>{formatDate(post.date)}</span>
              <span className="flex items-center gap-1.5"><Clock className="size-3.5 text-primary" aria-hidden /> {post.readMinutes} min read</span>
            </p>
          </div>
        </header>
        <div className="mx-auto max-w-reading px-4 pt-12 sm:px-6">
          <div className="prose-article text-[17px]">
            {post.body.map((para, i) =>
              para.startsWith('## ') ? <h2 key={i}>{para.slice(3)}</h2> : <p key={i}>{para}</p>,
            )}
          </div>
          {post.community && (
            <p className="mt-8 rounded-md border border-border bg-card/60 p-4 text-xs text-muted-foreground">
              This article was contributed by a member of our community. Views expressed are the author's own and do not
              constitute advice from {site.name}.
            </p>
          )}
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-border bg-card p-5">
            <p className="text-sm text-muted-foreground">Have your own experience or insight to share?</p>
            <Button asChild variant="outline">
              <Link to="/news/new"><PenLine /> Write an article</Link>
            </Button>
          </div>
          <Comments key={post.slug} postSlug={post.slug} initial={comments} unavailable={commentsUnavailable} />
        </div>
      </article>
      {related.length > 0 && (
        <section className="mx-auto max-w-content px-4 pt-20 sm:px-6">
          <h2 className="text-4xl font-bold uppercase">More on {post.category}</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {related.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      )}
      <CtaBand />
    </main>
  )
}
