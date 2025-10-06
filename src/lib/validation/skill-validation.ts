import { z } from 'zod'

export const skillFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(50, 'Name cannot exceed 50 characters'),
  level: z.number().min(0, 'Level must be at least 0').max(100, 'Level cannot exceed 100'),
  category: z.string().min(1, 'Category is required').max(50, 'Category cannot exceed 50 characters'),
  color: z.string().optional().nullable().default(null),
  order: z.number().int().min(0, 'Order must be a positive number').default(0),
})

export type SkillFormData = z.infer<typeof skillFormSchema>