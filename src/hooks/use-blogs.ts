// hooks/use-blogs.ts
import { useState, useEffect } from 'react'
import { blogService, Blog, BlogQuery } from '@/services/blog-service'

export const useBlogs = (query: BlogQuery = {}) => {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pagination, setPagination] = useState<any>(null)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await blogService.getBlogs(query)
        setBlogs(response.data)
        setPagination(response.pagination || null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch blogs')
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [JSON.stringify(query)]) // Stringify to avoid infinite loops

  return { blogs, loading, error, pagination }
}

export const useBlogBySlug = (slug: string) => {
  const [blog, setBlog] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBlog = async () => {
      if (!slug) return

      try {
        setLoading(true)
        setError(null)
        const response = await blogService.getBlogBySlug(slug)
        setBlog(response.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch blog')
      } finally {
        setLoading(false)
      }
    }

    fetchBlog()
  }, [slug])

  return { blog, loading, error }
}