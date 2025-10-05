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
  FileText,
  LoaderCircleIcon,
} from 'lucide-react'
import {
  getBlogPosts,
  deleteBlogPost,
  BlogPost,
  getTotalViews,
  calculateReadTime,
} from '@/lib/blog-data'
import SmartPagination from '@/components/smart-pagination'
import { PageInfo } from '@/lib/blog-types'
import { Skeleton } from '@/components/ui/skeleton'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { withAuth } from '@/app/components/admin/hoc/with-auth'

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSearchLoading, setIsSearchLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const paginationInfo = useRef<PageInfo>({
    limit: 0,
    page: 0,
    pages: 0,
    total: 0,
  })
  const totalPublished = useRef<number>(0)
  const [error, setError] = useState('')
  const router = useRouter()
  const { data: session } = useSession()

  useEffect(() => {
    loadBlogs()
  }, [currentPage])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm) {
        searchBlogs()
      } else {
        loadBlogs()
      }
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [searchTerm])

  const loadBlogs = async () => {
    try {
      setIsLoading(true)
      setError('')
      const { data: posts, pagination } = await getBlogPosts({
        limit: 10,
        page: currentPage,
      })
      setBlogs(posts)
      paginationInfo.current = pagination
    } catch (error: any) {
      setError(error.message)
      if (error.message === 'Unauthorized') {
        await handleLogout()
      }
    } finally {
      setIsLoading(false)
    }
  }

  const searchBlogs = async () => {
    try {
      setIsSearchLoading(true)
      setError('')
      const { data: posts, pagination } = await getBlogPosts({
        limit: 10,
        search: searchTerm,
        page: 1,
      })
      setBlogs(posts)
      paginationInfo.current = pagination
    } catch (error: any) {
      setError(error.message)
      if (error.message === 'Unauthorized') {
        await handleLogout()
      }
    } finally {
      setIsSearchLoading(false)
    }
  }

  const handleLogout = async () => {
    await signOut({
      redirect: false,
      callbackUrl: '/admin/login',
    })
    router.push('/admin/login')
    router.refresh()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return

    try {
      setError('')
      // Pass the token from session to deleteBlogPost
      await deleteBlogPost(id, session?.accessToken)
      setBlogs(blogs.filter((blog) => blog.id !== id))
      // Reload to update pagination info
      await loadBlogs()
    } catch (error: any) {
      setError(error.message)
      if (error.message === 'Unauthorized') {
        await handleLogout()
      }
    }
  }

  // Calculate total published blogs
  useEffect(() => {
    totalPublished.current = blogs.filter(blog => blog.published).length
  }, [blogs])

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
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setError('')}
            className="mt-2"
          >
            Dismiss
          </Button>
        </div>
      )}

      {/* Search and Filters */}
      <Card className="border-slate-200 dark:border-slate-700">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              {isSearchLoading ? (
                <LoaderCircleIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 animate-spin" />
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
                onClick={() => {
                  setSearchTerm('')
                  setCurrentPage(1)
                }}
              >
                All Posts ({paginationInfo.current.total})
              </Button>
              <Button
                variant="outline"
                className="border-slate-300 dark:border-slate-600"
              >
                Published ({totalPublished.current})
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
            <Skeleton className="w-full h-32" />
            <Skeleton className="w-full h-32" />
            <Skeleton className="w-full h-32" />
          </>
        )}

        {!isLoading && blogs.map((blog) => (
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

                  <div className="flex items-center gap-6 text-sm text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {calculateReadTime(blog.content)} min read
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {blog.views} views
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-4">
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
                    onClick={() => handleDelete(blog.id)}
                    disabled={!session?.accessToken}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {!isLoading && blogs.length === 0 && (
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

      {!isLoading && blogs.length > 0 && (
        <SmartPagination
          currentPage={currentPage}
          totalPages={paginationInfo.current.pages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  )
}

export default withAuth(BlogPage, { requiredRole: 'ADMIN' })