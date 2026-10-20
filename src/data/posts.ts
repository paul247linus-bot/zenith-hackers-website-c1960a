import type { Post, PostCategory } from './post-types'
import { postsA } from './posts-a'
import { postsB } from './posts-b'

export * from './post-types'

/** The 50 editorial articles, newest first. */
export const editorialPosts: Post[] = [...postsA, ...postsB].sort((a, b) => b.date.localeCompare(a.date))

export const categoryImage: Record<PostCategory, string> = {
  'Cyber Intelligence': 'cyber.png',
  'Crypto Investigations': 'crypto.png',
  'Asset Tracing': 'asset.png',
  'Offshore Legal': 'legal.png',
  'Fraud Prevention': 'support.png',
  'Industry News': 'news.png',
}
