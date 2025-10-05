/* eslint-disable @typescript-eslint/no-unused-vars */
// lib/blog-data.ts
import {
  calculateReadTime,
  extractTags,
  generateSlug,
  formatBlogDate,
  getBlogPostBySlug as getBlogPostBySlugUtil,
  getRelatedPosts as getRelatedPostsUtil,
  getPostsByTag as getPostsByTagUtil,
  searchPosts as searchPostsUtil,
  getPopularPosts as getPopularPostsUtil,
  getAllTags as getAllTagsUtil,
} from './blog-utils'

import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
export interface BlogPost {
  id: string
  title: string
  slug: string
  summary: string
  content: string
  published: boolean
  views: number
  thumbnail?: string
  images: string[]
  author?: {
    id: string
    name: string
    email: string
    profileImage?: string
  }
  authorId?: string
  createdAt: string
  updatedAt: string
  tags: string[]
}

export interface User {
  id: string
  email: string
  name?: string
  profileImage?: string
  role: 'USER' | 'ADMIN'
}

// API base URL - adjust based on your environment
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api'

// API service functions
async function fetchFromAPI(endpoint: string, options?: RequestInit) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Failed to fetch from ${endpoint}:`, error)
    throw error
  }
}

// Main data functions
export async function getBlogPosts(options?: {
  featured?: boolean
  limit?: number
  search?: string
  tag?: string
  published?: boolean
  page?: number
}) {
  try {
    // Build query parameters
    const params = new URLSearchParams()

    if (options?.featured) params.append('featured', 'true')
    if (options?.limit) params.append('limit', options.limit.toString())
    if (options?.tag) params.append('tag', options.tag)
    if (options?.search) params.append('search', options.search)
    if (options?.published !== false) params.append('published', 'true')
    if (options?.page) params.append('page', options.page.toString())

    const endpoint = `/blogs${params.toString() ? `?${params.toString()}` : ''}`
    console.log({ endpoint })
    const data = await fetchFromAPI(endpoint)
    console.log({ data })

    return data.blogs || data || []
  } catch (error) {
    console.error('Failed to fetch blog posts:', error)
    // Return empty array as fallback
    return []
  }
}

export async function getBlogPostBySlug(slug: string) {
  try {
    const data = await fetchFromAPI(`/blogs/${slug}`)
    console.log({ data })
    return data.blog || data || null
  } catch (error) {
    console.error(`Failed to fetch blog post with slug ${slug}:`, error)
    return null
  }
}

export async function getBlogPostById(id: string) {
  try {
    const data = await fetchFromAPI(`/blogs/id/${id}`)
    console.log({ data })
    return data.blog || data || null
  } catch (error) {
    console.error(`Failed to fetch blog post with id ${id}:`, error)
    return null
  }
}


export async function getRelatedPosts(
  currentPostId: string,
  limit: number = 3
) {
  try {
    const data = await fetchFromAPI(
      `/blogs/${currentPostId}/related?limit=${limit}`
    )
    return data.relatedPosts || data || []
  } catch (error) {
    console.error(`Failed to fetch related posts for ${currentPostId}:`, error)
    return []
  }
}

export async function getPopularPosts(limit: number = 5) {
  try {
    const data = await fetchFromAPI(`/blogs/popular?limit=${limit}`)
    return data.blogs || data || []
  } catch (error) {
    console.error('Failed to fetch popular posts:', error)
    return []
  }
}

export async function getAllTags() {
  try {
    const data = await fetchFromAPI('/blogs/tags')
    return data.tags || data || []
  } catch (error) {
    console.error('Failed to fetch all tags:', error)
    return []
  }
}

export async function getTotalViews() {
  try {
    const data = await fetchFromAPI('/blogs/total-views')
    return data.totalViews || data || 0
  } catch (error) {
    console.error('Failed to get total views', error)
    return { data: 0 }
  }
}

export async function incrementBlogViews(slug: string) {
  try {
    await fetchFromAPI(`/blogs/${slug}/views`, {
      method: 'POST',
    })
  } catch (error) {
    console.error(`Failed to increment views for ${slug}:`, error)
  }
}

export async function createBlogPost(
  blogData: Partial<BlogPost>,
  token?: string
) {
  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    }

    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    const data = await fetchFromAPI('/blogs', {
      method: 'POST',
      headers,
      body: JSON.stringify(blogData),
    })

    console.log({ data })
    return data.blog || data
  } catch (error) {
    console.error('Failed to create blog post:', error)
    throw error
  }
}

export async function updateBlogPost(
  id: string,
  blogData: Partial<BlogPost>,
  token?: string
) {
  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    }

    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    const data = await fetch(`${API_BASE_URL}/blogs/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(blogData),
    })

    if (!data.ok) {
      throw new Error(`API error: ${data.status} ${data.statusText}`)
    }

    const result = await data.json()
    return result.blog || result
  } catch (error) {
    console.error(`Failed to update blog post ${id}:`, error)
    throw error
  }
}

export async function deleteBlogPost(id: string, token?: string) {
  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    }

    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    const response = await fetch(`${API_BASE_URL}/blogs/${id}`, {
      method: 'DELETE',
      headers,
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Failed to delete blog post ${id}:`, error)
    throw error
  }
}

// Local utility functions that don't need API calls
export function calculateReadTimeLocal(content: string): number {
  return calculateReadTime(content)
}

export function extractTagsLocal(content: string): string[] {
  return extractTags(content)
}

export function formatBlogDateLocal(date: string): string {
  return formatBlogDate(date)
}

// Re-export utilities
export { calculateReadTime, extractTags, generateSlug, formatBlogDate }
