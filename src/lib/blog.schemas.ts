import { z } from 'zod'
import { POST_CATEGORIES } from '@/data/post-types'

const name = z.string().trim().min(2, 'Please enter your name').max(60)

export const postInput = z.object({
  title: z.string().trim().min(8, 'Title must be at least 8 characters').max(140),
  category: z.enum(POST_CATEGORIES),
  authorName: name,
  body: z.string().trim().min(200, 'Articles need at least 200 characters').max(20000),
  website: z.string().max(0).optional(), // honeypot
})

export const commentInput = z.object({
  postSlug: z.string().trim().min(1).max(200),
  authorName: name,
  body: z.string().trim().min(2, 'Please write a comment').max(3000),
  parentId: z.number().int().positive().nullable().optional(),
  website: z.string().max(0).optional(), // honeypot
})
