// app/admin/blogs/page.tsx
'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Calendar,
  Clock,
  Loader2,
  FileText,
  LoaderCircleIcon,
} from 'lucide-react'
import {
  getBlogPosts,
  getAllTags,
  calculateReadTime,
  extractTags,
  BlogPost,
  getTotalViews,
} from '@/lib/blog-data'
import { useAuth } from '@/app/components/auth/auth-provider'
import SmartPagination from '@/components/smart-pagination'
import { PageInfo } from '@/lib/blog-types'
import { Skeleton } from '@/components/ui/skeleton'

interface Blog {
  id: string
  title: string
  slug: string
  summary: string
  content: string
  published: boolean
  views: number
  readTime: number
  createdAt: string
  updatedAt: string
  thumbnail?: string
  tags: string[]
}

export default function BlogsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSerchLoading, setIsSearchLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const paginationInfo = useRef<PageInfo>({
    limit: 0,
    page: 0,
    pages: 0,
    total: 0,
  })
  const totalPublished = useRef<number>(0)
  const [error, setError] = useState('')
  const { logout } = useAuth()

  useEffect(() => {
    loadBlogs()
    console.log({ paginationInfo })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage])

  useEffect(() => {
    searchBlogs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm])

  useEffect(() => {
    getTotalPulished()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadBlogs = async () => {
    try {
      setIsLoading(true)
      const { data: posts, pagination } = await getBlogPosts({
        limit: 10,
        page: currentPage,
      })
      setBlogs(posts)
      console.log({ pagination })
      paginationInfo.current = pagination
    } catch (error) {
      if (typeof error === 'object' && error !== null && 'message' in error) {
        setError((error as { message: string }).message)
        if ((error as { message: string }).message === 'Unauthorized') {
          logout()
        }
      } else {
        setError('An unknown error occurred')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const searchBlogs = async () => {
    try {
      setIsSearchLoading(true)
      const { data: posts, pagination } = await getBlogPosts({
        limit: 10,
        search: searchTerm,
        page: currentPage,
      })
      setBlogs(posts)
      console.log({ pagination })
      paginationInfo.current = pagination
    } catch (error) {
      if (typeof error === 'object' && error !== null && 'message' in error) {
        setError((error as { message: string }).message)
        if ((error as { message: string }).message === 'Unauthorized') {
          logout()
        }
      } else {
        setError('An unknown error occurred')
      }
    } finally {
      setIsSearchLoading(false)
    }
  }

  const getTotalPulished = async () => {
    try {
      const { pagination } = await getBlogPosts({
        published: true,
      })
      totalPublished.current = pagination.total
    } catch (error) {
      if (typeof error === 'object' && error !== null && 'message' in error) {
        setError((error as { message: string }).message)
        if ((error as { message: string }).message === 'Unauthorized') {
          logout()
        }
      } else {
        setError('An unknown error occurred')
      }
    }
  }

  /* const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return

    try {
      await blogAPI.deleteBlog(id)
      setBlogs(blogs.filter((blog) => blog.id !== id))
    } catch (error: any) {
      setError(error.message)
    }
  } */

  /* const togglePublish = async (id: string, currentStatus: boolean) => {
    try {
      await blogAPI.togglePublish(id, !currentStatus)
      setBlogs(
        blogs.map((blog) =>
          blog.id === id ? { ...blog, published: !currentStatus } : blog
        )
      )
    } catch (error: any) {
      setError(error.message)
    }
  } */

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      )
  )

 /*  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    )
  } */

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Blog Posts
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Manage your blog posts and articles ({paginationInfo.current.total}{' '}
            total)
          </p>
        </div>
        <Link href="/admin/blogs/create">
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Plus className="w-4 h-4 mr-2" />
            New Blog Post
          </Button>
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-red-800 dark:text-red-200">{error}</p>
        </div>
      )}

      {/* Search and Filters */}
      <Card className="border-slate-200 dark:border-slate-700">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              {isSerchLoading ? (
                <LoaderCircleIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 -ms-1 animate-spin" />
              ) : (
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              )}
              <Input
                placeholder="Search blog posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="border-slate-300 dark:border-slate-600"
              >
                All Posts ({paginationInfo.current.total})
              </Button>
              <Button
                variant="outline"
                className="border-slate-300 dark:border-slate-600"
              >
                Published {totalPublished.current}
              </Button>
              <Button
                variant="outline"
                className="border-slate-300 dark:border-slate-600"
              >
                Drafts ({paginationInfo.current.total - totalPublished.current})
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Blog Posts Grid */}
      <div className="grid gap-6">        
        {isLoading && (
          <>
            <Skeleton className="w-full h-52" />
            <Skeleton className="w-full h-52" />
            <Skeleton className="w-full h-52" />
          </>
        )}

        {filteredBlogs.map((blog) => (
          <Card
            key={blog.id}
            className="border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow duration-300"
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                      {blog.title}
                    </h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        blog.published
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      }`}
                    >
                      {blog.published ? 'Published' : 'Draft'}
                    </span>
                  </div>

                  <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
                    {blog.summary}
                  </p>

                  {/* Tags */}
                  {blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {blog.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-2 py-1 rounded text-xs border border-slate-200 dark:border-slate-600"
                        >
                          {tag}
                        </span>
                      ))}
                      {blog.tags.length > 3 && (
                        <span className="bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 px-2 py-1 rounded text-xs border border-slate-200 dark:border-slate-600">
                          +{blog.tags.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="flex items-center gap-6 text-sm text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {blog.readTime} min read
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {blog.views} views
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    // onClick={() => togglePublish(blog.id, blog.published)}
                    className={
                      blog.published ? 'text-green-600' : 'text-yellow-600'
                    }
                  >
                    {blog.published ? 'Unpublish' : 'Publish'}
                  </Button>
                  <Link href={`/blog/${blog.slug}`} target="_blank">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-slate-600 dark:text-slate-400"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Link href={`/admin/blogs/edit/${blog.id}`}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-slate-600 dark:text-slate-400"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                    // onClick={() => handleDelete(blog.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredBlogs.length === 0 && (
        <Card className="border-slate-200 dark:border-slate-700">
          <CardContent className="p-12 text-center">
            <FileText className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              {searchTerm
                ? 'No matching blog posts found'
                : 'No blog posts yet'}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              {searchTerm
                ? 'Try adjusting your search terms'
                : 'Get started by creating your first blog post'}
            </p>
            <Link href="/admin/blogs/create">
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Plus className="w-4 h-4 mr-2" />
                Create Blog Post
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
      <SmartPagination
        currentPage={currentPage}
        totalPages={paginationInfo.current.pages}
        onPageChange={setCurrentPage}
      />
    </div>
  )
}
