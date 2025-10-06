import { z } from 'zod'

export const blogFormSchema = z.object({
  title: z.string()
    .min(5, 'Title must be at least 5 characters')
    .max(100, 'Title cannot exceed 100 characters'),
  slug: z.string()
    .min(3, 'Slug must be at least 3 characters')
    .max(100, 'Slug cannot exceed 100 characters')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
  summary: z.string()
    .min(50, 'Summary must be at least 50 characters')
    .max(200, 'Summary cannot exceed 200 characters'),
  content: z.string()
    .min(100, 'Content must be at least 100 characters'),
  published: z.boolean().default(false),
  thumbnail: z.string()
    .url('Must be a valid URL')
    .or(z.literal(''))
    .optional(),
  tags: z.array(z.string().min(1, 'Tag cannot be empty').max(20))
    .max(10, 'You can add up to 10 tags')
    .default([]),
})

export type BlogFormData = z.infer<typeof blogFormSchema>