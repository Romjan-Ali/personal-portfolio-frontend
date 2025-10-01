// hooks/use-blog-management.ts
import { useState } from 'react'
import { blogService, CreateBlogData, UpdateBlogData } from '@/services/blog-service'
import { authService } from '@/services/auth-service'

export const useBlogManagement = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createBlog = async (blogData: CreateBlogData) => {
    if (!authService.isAuthenticated()) {
      throw new Error('You must be logged in to create a blog post')
    }

    setLoading(true)
    setError(null)

    try {
      const response = await blogService.createBlog(blogData)
      return response
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create blog post'
      setError(message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const updateBlog = async (id: string, blogData: UpdateBlogData) => {
    if (!authService.isAuthenticated()) {
      throw new Error('You must be logged in to update a blog post')
    }

    setLoading(true)
    setError(null)

    try {
      const response = await blogService.updateBlog(id, blogData)
      return response
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update blog post'
      setError(message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const deleteBlog = async (id: string) => {
    if (!authService.isAuthenticated()) {
      throw new Error('You must be logged in to delete a blog post')
    }

    setLoading(true)
    setError(null)

    try {
      const response = await blogService.deleteBlog(id)
      return response
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete blog post'
      setError(message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const publishBlog = async (id: string) => {
    return updateBlog(id, { published: true })
  }

  const unpublishBlog = async (id: string) => {
    return updateBlog(id, { published: false })
  }

  return {
    createBlog,
    updateBlog,
    deleteBlog,
    publishBlog,
    unpublishBlog,
    loading,
    error,
    clearError: () => setError(null),
  }
}