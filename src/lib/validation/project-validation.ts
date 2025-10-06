import { z } from 'zod'

// Reuse logic similar to backend but lighter (no .default(), no .nullable() unless needed)
export const projectFormSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title cannot exceed 100 characters'),
  description: z
    .string()
    .min(50, 'Description must be at least 50 characters')
    .max(1000, 'Description cannot exceed 1000 characters'),
  image: z
    .string()
    .url('Must be a valid URL')
    .or(z.literal(''))
    .optional(),
  liveUrl: z
    .string()
    .url('Must be a valid URL')
    .or(z.literal(''))
    .optional(),
  repoUrl: z
    .string()
    .url('Must be a valid URL')
    .or(z.literal(''))
    .optional(),
  tags: z
    .array(z.string().min(1, 'Tag cannot be empty').max(20))
    .max(10, 'You can add up to 10 tags')
    .optional(),
  featured: z.boolean().optional(),
})

export type ProjectFormData = z.infer<typeof projectFormSchema>
