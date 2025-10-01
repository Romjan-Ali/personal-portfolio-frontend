// components/blog-editor.tsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useBlogManagement } from '@/hooks/use-blog-management'
import { Blog } from '@/services/blog-service'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Save, Eye, Trash2, ArrowLeft, Loader2 } from 'lucide-react'
import Link from 'next/link'

interface BlogEditorProps {
  blog?: Blog // For edit mode
  mode: 'create' | 'edit'
}

export function BlogEditor({ blog, mode }: BlogEditorProps) {
  const router = useRouter()
  const { createBlog, updateBlog, deleteBlog, loading, error } =
    useBlogManagement()

  const [formData, setFormData] = useState({
    title: blog?.title || '',
    slug: blog?.slug || '',
    summary: blog?.summary || '',
    content: blog?.content || '',
    published: blog?.published || false,
    thumbnail: blog?.thumbnail || '',
    images: blog?.images || [],
  })

  const [isPreview, setIsPreview] = useState(false)

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value
    setFormData((prev) => ({
      ...prev,
      title,
      slug: prev.slug || generateSlug(title),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (mode === 'create') {
        const response = await createBlog(formData)
        router.push(`/blog/${response.data.slug}`)
      } else if (blog) {
        const response = await updateBlog(blog.id, formData)
        router.push(`/blog/${response.data.slug}`)
      }
    } catch (err) {
      // Error is handled by the hook
    }
  }

  const handleDelete = async () => {
    if (!blog || !confirm('Are you sure you want to delete this blog post?')) {
      return
    }

    try {
      await deleteBlog(blog.id)
      router.push('/blog')
    } catch (err) {
      // Error is handled by the hook
    }
  }

  if (isPreview) {
    return (
      <div className="min-h-screen bg-white p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <Button variant="outline" onClick={() => setIsPreview(false)}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Edit
            </Button>
            <div className="flex space-x-4">
              <Button onClick={handleSubmit} disabled={loading}>
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                {mode === 'create' ? 'Publish' : 'Update'}
              </Button>
            </div>
          </div>

          {/* Preview Content */}
          <article className="prose prose-lg max-w-none">
            <h1>{formData.title || 'Untitled'}</h1>
            {formData.thumbnail && (
              <img
                src={formData.thumbnail}
                alt="Thumbnail"
                className="rounded-lg"
              />
            )}
            <p className="text-xl text-gray-600">{formData.summary}</p>
            <div
              dangerouslySetInnerHTML={{
                __html: formData.content.replace(/\n/g, '<br/>'),
              }}
            />
          </article>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/blog">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">
              {mode === 'create' ? 'Create New Post' : 'Edit Post'}
            </h1>
          </div>

          <div className="flex space-x-4">
            <Button variant="outline" onClick={() => setIsPreview(true)}>
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              {mode === 'create' ? 'Publish' : 'Update'}
            </Button>
            {mode === 'edit' && (
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={loading}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            )}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Title *
              </label>
              <Input
                id="title"
                value={formData.title}
                onChange={handleTitleChange}
                placeholder="Enter blog post title"
                required
              />
            </div>

            <div>
              <label
                htmlFor="slug"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Slug *
              </label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, slug: e.target.value }))
                }
                placeholder="my-awesome-post"
                required
              />
            </div>

            <div>
              <label
                htmlFor="summary"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Summary *
              </label>
              <Textarea
                id="summary"
                value={formData.summary}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, summary: e.target.value }))
                }
                placeholder="Brief summary of your blog post"
                rows={3}
                required
              />
            </div>

            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Content *
              </label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, content: e.target.value }))
                }
                placeholder="Write your blog post content here..."
                rows={15}
                required
              />
            </div>

            <div>
              <label
                htmlFor="thumbnail"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Thumbnail URL
              </label>
              <Input
                id="thumbnail"
                value={formData.thumbnail}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    thumbnail: e.target.value,
                  }))
                }
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="published"
                checked={formData.published}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    published: e.target.checked,
                  }))
                }
                className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <label
                htmlFor="published"
                className="text-sm font-medium text-gray-700"
              >
                Publish immediately
              </label>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
