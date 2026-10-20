import { pgTable, serial, text, timestamp, integer, index } from 'drizzle-orm/pg-core'

/** Articles submitted by visitors. The 50 editorial articles live in src/data. */
export const communityPosts = pgTable('community_posts', {
  id: serial().primaryKey(),
  slug: text().notNull().unique(),
  title: text().notNull(),
  excerpt: text().notNull(),
  category: text().notNull(),
  authorName: text('author_name').notNull(),
  body: text().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

/** Comments on any article, editorial or community, keyed by slug. */
export const comments = pgTable(
  'comments',
  {
    id: serial().primaryKey(),
    postSlug: text('post_slug').notNull(),
    authorName: text('author_name').notNull(),
    body: text().notNull(),
    parentId: integer('parent_id'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (t) => [index('comments_post_slug_idx').on(t.postSlug)],
)
