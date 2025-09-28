// lib/zod-schemas.ts
import * as z from 'zod'

export const blogCreateSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3),
  summary: z.string().min(10),
  content: z.string().min(1),
  published: z.boolean().optional().default(false),
})

export const projectCreateSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(10),
  liveUrl: z.string().url().optional(),
  repoUrl: z.string().url().optional(),
  tags: z.array(z.string()).optional(),
})

export const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
})
