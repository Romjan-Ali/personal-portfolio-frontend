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

// Revalidation tags
export const BLOG_TAGS = {
  ALL: 'blogs',
  LIST: 'blogs-list',
  FEATURED: 'blogs-featured',
  POPULAR: 'blogs-popular',
  BY_TAG: (tag: string) => `blogs-tag-${tag}`,
  BY_SEARCH: (query: string) => `blogs-search-${query}`,
  SINGLE: (slugOrId: string) => `blog-${slugOrId}`,
} as const

// API service functions with revalidation support for GET requests
async function fetchFromAPI(endpoint: string, options?: RequestInit & { next?: { tags?: string[]; revalidate?: number } }) {
  try {
    const { next, ...fetchOptions } = options || {}
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...fetchOptions?.headers,
      },
      ...fetchOptions,
      next: next ? { tags: next.tags, revalidate: next.revalidate } : undefined,
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

// Revalidation utility functions
async function revalidateTag(tag: string) {
  try {
    const response = await fetch('/api/revalidate?tag=' + encodeURIComponent(tag), {
      method: 'POST',
    })
    
    if (!response.ok) {
      throw new Error(`Revalidation failed for tag: ${tag}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error(`Failed to revalidate tag ${tag}:`, error)
  }
}

export async function revalidateBlogPosts() {
  await revalidateTag(BLOG_TAGS.ALL)
  await revalidateTag(BLOG_TAGS.LIST)
}

export async function revalidateBlogPost(slugOrId: string) {
  await revalidateTag(BLOG_TAGS.SINGLE(slugOrId))
}

export async function revalidateBlogTag(tag: string) {
  await revalidateTag(BLOG_TAGS.BY_TAG(tag))
}

export async function revalidateBlogSearch(query: string) {
  await revalidateTag(BLOG_TAGS.BY_SEARCH(query))
}

// Main data functions with revalidation for GET requests
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
    if (options?.published !== undefined) params.append('published', options.published.toString())
    if (options?.page) params.append('page', options.page.toString())

    const endpoint = `/blogs${params.toString() ? `?${params.toString()}` : ''}`
    
    // Determine revalidation tags
    const defaultTags: string[] = [BLOG_TAGS.ALL, BLOG_TAGS.LIST]
    
    if (options?.tag) {
      defaultTags.push(BLOG_TAGS.BY_TAG(options.tag))
    }
    
    if (options?.search) {
      defaultTags.push(BLOG_TAGS.BY_SEARCH(options.search))
    }
    
    if (options?.featured) {
      defaultTags.push(BLOG_TAGS.FEATURED)
    }

    const data = await fetchFromAPI(endpoint, {
      next: {
        tags: defaultTags,
        revalidate: 60, // Revalidate every 60 seconds
      }
    })

    return data.blogs || data || []
  } catch (error) {
    console.error('Failed to fetch blog posts:', error)
    return []
  }
}

export async function getBlogPostBySlug(slug: string) {
  try {
    const data = await fetchFromAPI(`/blogs/${slug}`, {
      next: {
        tags: [BLOG_TAGS.ALL, BLOG_TAGS.SINGLE(slug)],
        revalidate: 60,
      }
    })
    return data.blog || data || null
  } catch (error) {
    console.error(`Failed to fetch blog post with slug ${slug}:`, error)
    return null
  }
}

export async function getBlogPostById(id: string) {
  try {
    const data = await fetchFromAPI(`/blogs/id/${id}`, {
      next: {
        tags: [BLOG_TAGS.ALL, BLOG_TAGS.SINGLE(id)],
        revalidate: 60,
      }
    })
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
      `/blogs/${currentPostId}/related?limit=${limit}`,
      {
        next: {
          tags: [BLOG_TAGS.ALL, BLOG_TAGS.SINGLE(currentPostId)],
          revalidate: 60,
        }
      }
    )
    return data.relatedPosts || data || []
  } catch (error) {
    console.error(`Failed to fetch related posts for ${currentPostId}:`, error)
    return []
  }
}

export async function getPopularPosts(limit: number = 5) {
  try {
    const data = await fetchFromAPI(`/blogs/popular?limit=${limit}`, {
      next: {
        tags: [BLOG_TAGS.ALL, BLOG_TAGS.POPULAR],
        revalidate: 60,
      }
    })
    return data.blogs || data || []
  } catch (error) {
    console.error('Failed to fetch popular posts:', error)
    return []
  }
}

export async function getAllTags() {
  try {
    const data = await fetchFromAPI('/blogs/tags', {
      next: {
        tags: [BLOG_TAGS.ALL, 'blog-tags'],
        revalidate: 3600, // Cache tags longer (1 hour)
      }
    })
    return data.tags || data || []
  } catch (error) {
    console.error('Failed to fetch all tags:', error)
    return []
  }
}

export async function getTotalViews() {
  try {
    const data = await fetchFromAPI('/blogs/total-views', {
      next: {
        tags: [BLOG_TAGS.ALL, 'blog-views'],
        revalidate: 300, // 5 minutes for views
      }
    })
    return data.totalViews || data || 0
  } catch (error) {
    console.error('Failed to get total views', error)
    return 0
  }
}

export async function incrementBlogViews(slug: string) {
  try {
    await fetchFromAPI(`/blogs/${slug}/views`, {
      method: 'POST',
    })
    // Revalidate the individual post after view increment
    await revalidateBlogPost(slug)
  } catch (error) {
    console.error(`Failed to increment views for ${slug}:`, error)
  }
}

// Mutation functions with manual revalidation
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
    
    // Revalidate after successful creation
    if (data.blog || data) {
      await revalidateBlogPosts()
      if (data.blog?.slug) {
        await revalidateBlogPost(data.blog.slug)
      }
      // Revalidate tag pages if the post has tags
      if (data.blog?.tags && Array.isArray(data.blog.tags)) {
        for (const tag of data.blog.tags) {
          await revalidateBlogTag(tag)
        }
      }
    }
    
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
    const updatedPost = result.blog || result
    
    // Revalidate after successful update
    if (updatedPost) {
      await revalidateBlogPosts()
      if (updatedPost.slug) {
        await revalidateBlogPost(updatedPost.slug)
      }
      // Revalidate tag pages
      if (updatedPost.tags && Array.isArray(updatedPost.tags)) {
        for (const tag of updatedPost.tags) {
          await revalidateBlogTag(tag)
        }
      }
    }
    
    return updatedPost
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

    const result = await response.json()
    
    // Revalidate after successful deletion
    await revalidateBlogPosts()
    if (result.blog?.slug) {
      await revalidateBlogPost(result.blog.slug)
    }
    // Revalidate tag pages if the deleted post had tags
    if (result.blog?.tags && Array.isArray(result.blog.tags)) {
      for (const tag of result.blog.tags) {
        await revalidateBlogTag(tag)
      }
    }
    
    return result
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