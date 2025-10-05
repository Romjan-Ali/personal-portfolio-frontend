// app/admin/blogs/edit/[id]/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { ArrowLeft, Save, Eye, Loader2 } from 'lucide-react'
import { getBlogPostBySlug, updateBlogPost, BlogPost, getBlogPostById } from '@/lib/blog-data'
import { RichTextEditor } from '@/components/rich-text-editor'
import { FileUpload } from '@/components/file-upload'

export default function EditBlogPage() {
  const params = useParams()
  const router = useRouter()
  const { data: session } = useSession()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [formData, setFormData] = useState<Partial<BlogPost>>({
    title: '',
    slug: '',
    summary: '',
    content: '',
    published: false,
    thumbnail: '',
    tags: [],
  })
  const [currentTag, setCurrentTag] = useState('')

  const blogId = params.id as string

  useEffect(() => {
    loadBlogPost()
  }, [blogId])

  const loadBlogPost = async () => {
    try {
      setIsLoading(true)
      const blog = await getBlogPostById(blogId)

      console.log({blog})
      
      if (!blog) {
        setError('Blog post not found')
        return
      }

      setFormData({
        title: blog.title,
        slug: blog.slug,
        summary: blog.summary,
        content: blog.content,
        published: blog.published,
        thumbnail: blog.thumbnail,
        tags: blog.tags || [],
      })
    } catch (error: any) {
      setError(error.message || 'Failed to load blog post')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setError('')
    setSuccess('')

    try {
      const result = await updateBlogPost(blogId, formData, session?.accessToken)
      setSuccess('Blog post updated successfully!')

      console.log({result})
      
      // Redirect to blogs list after a short delay
      setTimeout(() => {
        router.push('/admin/blogs')
      }, 1500)
    } catch (error: any) {
      setError(error.message || 'Failed to update blog post')
    } finally {
      setIsSaving(false)
    }
  }

  const addTag = () => {
    if (currentTag.trim() && !formData.tags?.includes(currentTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...(prev.tags || []), currentTag.trim()]
      }))
      setCurrentTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags?.filter(tag => tag !== tagToRemove) || []
    }))
  }

  const handleTagKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addTag()
    }
  }

  const generateSlug = () => {
    if (formData.title) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '')
      setFormData(prev => ({ ...prev, slug }))
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/blogs">
            <Button variant="ghost" size="icon" className="text-slate-600 dark:text-slate-400">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Edit Blog Post</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Update your blog post content and settings
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href={`/blog/${formData.slug}`} target="_blank">
            <Button variant="outline" className="border-slate-300 dark:border-slate-600">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
          </Link>
          <Button 
            onClick={handleSubmit} 
            disabled={isSaving}
            className="bg-purple-600 hover:bg-purple-700"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Updating...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Update Post
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Alerts */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-red-800 dark:text-red-200">{error}</p>
        </div>
      )}

      {success && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <p className="text-green-800 dark:text-green-200">{success}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card className="border-slate-200 dark:border-slate-700">
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Title *
                </label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter blog post title"
                  className="bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600"
                  required
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="slug" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Slug *
                  </label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={generateSlug}
                    className="text-xs border-slate-300 dark:border-slate-600"
                  >
                    Generate from Title
                  </Button>
                </div>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                  placeholder="blog-post-slug"
                  className="bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600"
                  required
                />
              </div>

              <div>
                <label htmlFor="summary" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Summary *
                </label>
                <Textarea
                  id="summary"
                  value={formData.summary}
                  onChange={(e) => setFormData(prev => ({ ...prev, summary: e.target.value }))}
                  placeholder="Brief description of the blog post"
                  rows={3}
                  className="bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 resize-none"
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Content */}
          <Card className="border-slate-200 dark:border-slate-700">
            <CardHeader>
              <CardTitle>Content</CardTitle>
            </CardHeader>
            <CardContent>
              <label htmlFor="content" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Content *
              </label>
              {<RichTextEditor
                content={formData.content || ''}
                onChange={(content) => setFormData(prev => ({ ...prev, content }))}
                placeholder="Write your blog post content here..."
              />}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Publish Settings */}
          <Card className="border-slate-200 dark:border-slate-700">
            <CardHeader>
              <CardTitle>Publish Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <label htmlFor="published" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Publish
                </label>
                <Switch
                  id="published"
                  checked={formData.published}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, published: checked }))}
                />
              </div>
              {formData.published && (
                <p className="text-sm text-green-600 dark:text-green-400">
                  This post will be visible to the public
                </p>
              )}
            </CardContent>
          </Card>

          {/* Featured Image */}
          <Card className="border-slate-200 dark:border-slate-700">
            <CardHeader>
              <CardTitle>Featured Image</CardTitle>
            </CardHeader>
            <CardContent>
              <FileUpload
                onFileUpload={(url) => setFormData(prev => ({ ...prev, thumbnail: url }))}
                currentImage={formData.thumbnail}
              />
            </CardContent>
          </Card>

          {/* Tags */}
          <Card className="border-slate-200 dark:border-slate-700">
            <CardHeader>
              <CardTitle>Tags</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyPress={handleTagKeyPress}
                  placeholder="Add tag"
                  className="flex-1 bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600"
                />
                <Button 
                  type="button" 
                  onClick={addTag} 
                  variant="outline" 
                  className="border-slate-300 dark:border-slate-600"
                >
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 px-2 py-1 rounded text-sm flex items-center gap-1"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="hover:text-purple-600 text-xs"
                    >
                      ×
                    </button>
                  </span>
                ))}
                {(!formData.tags || formData.tags.length === 0) && (
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    No tags added yet
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Post Information */}
          <Card className="border-slate-200 dark:border-slate-700">
            <CardHeader>
              <CardTitle>Post Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Status:</span>
                <span className={formData.published ? 'text-green-600' : 'text-yellow-600'}>
                  {formData.published ? 'Published' : 'Draft'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">URL:</span>
                <span className="text-slate-900 dark:text-slate-100">
                  /blog/{formData.slug}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Tags:</span>
                <span className="text-slate-900 dark:text-slate-100">
                  {formData.tags?.length || 0}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  )
}