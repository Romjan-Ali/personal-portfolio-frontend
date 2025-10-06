// lib/blog-types.ts

export interface CreateBlogPost {
  title: string
  slug: string
  summary: string
  content: string
  published: boolean
  thumbnail?: string
  images: string[]
  authorId: string
}

export interface BlogPost extends CreateBlogPost {
  id: string
  createdAt: string
  updatedAt: string
  author?: {
    id: string
    name: string
    email: string
    profileImage?: string
  }
}

export interface PageInfo {
  limit: number
  page: number
  pages: number
  total: number
}

export interface BlogQueryParams {
  featured?: boolean
  limit?: number
  search?: string
  tag?: string
  published?: boolean
  page?: number
}

// Validation schema
export const blogPostValidation = {
  title: {
    required: 'Title is required',
    minLength: 5,
    maxLength: 100,
  },
  slug: {
    required: 'Slug is required',
    pattern: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    message: 'Slug must be lowercase with hyphens (e.g., my-awesome-post)',
  },
  summary: {
    required: 'Summary is required',
    minLength: 50,
    maxLength: 200,
  },
  content: {
    required: 'Content is required',
    minLength: 100,
  },
}
