// components/admin-blog-list.tsx
'use client'

import { useState } from 'react'
import { useBlogs } from '@/hooks/use-blogs'
import { useBlogManagement } from '@/hooks/use-blog-management'
import { Button } from '@/components/ui/button'
import { Edit, Trash2, Eye, EyeOff, Loader2 } from 'lucide-react'
import Link from 'next/link'

export function AdminBlogList() {
  const { blogs, loading, error, refetch } = useBlogs({ limit: 50 })
  const {
    publishBlog,
    unpublishBlog,
    deleteBlog,
    loading: actionLoading,
  } = useBlogManagement()

  const [actionId, setActionId] = useState<string | null>(null)

  const handlePublish = async (id: string, published: boolean) => {
    setActionId(id)
    try {
      if (published) {
        await unpublishBlog(id)
      } else {
        await publishBlog(id)
      }
      refetch()
    } catch (err) {
      // Error handled by hook
    } finally {
      setActionId(null)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) {
      return
    }

    setActionId(id)
    try {
      await deleteBlog(id)
      refetch()
    } catch (err) {
      // Error handled by hook
    } finally {
      setActionId(null)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    )
  }

  if (error) {
    return <div className="text-red-600 text-center py-8">Error: {error}</div>
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Blog Posts</h2>
        <Link href="/admin/blog/create">
          <Button>Create New Post</Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Views
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {blogs.map((blog) => (
              <tr key={blog.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {blog.title}
                    </div>
                    <div className="text-sm text-gray-500">{blog.slug}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      blog.published
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {blog.published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {blog.views}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <Link href={`/admin/blog/edit/${blog.id}`}>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePublish(blog.id, blog.published)}
                    disabled={actionLoading && actionId === blog.id}
                  >
                    {blog.published ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(blog.id)}
                    disabled={actionLoading && actionId === blog.id}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
