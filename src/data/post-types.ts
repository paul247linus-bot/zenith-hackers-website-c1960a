export const POST_CATEGORIES = [
  'Cyber Intelligence',
  'Crypto Investigations',
  'Asset Tracing',
  'Offshore Legal',
  'Fraud Prevention',
  'Industry News',
] as const

export type PostCategory = (typeof POST_CATEGORIES)[number]

export interface Post {
  slug: string
  title: string
  excerpt: string
  category: PostCategory
  author: string
  /** ISO date, e.g. 2025-03-14 */
  date: string
  readMinutes: number
  /** Paragraphs. A paragraph starting with "## " renders as a subheading. */
  body: string[]
  /** True for articles submitted by visitors (stored in the database). */
  community?: boolean
}
