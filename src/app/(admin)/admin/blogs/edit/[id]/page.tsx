// app/admin/blogs/create/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { ArrowLeft, Save } from 'lucide-react'
import Link from 'next/link'
import { withAuth } from '@/app/components/admin/hoc/with-auth'
import { getBlogPostById, updateBlogPost } from '@/lib/blog-data'
import { useSession } from 'next-auth/react'

import { blogFormSchema } from '@/lib/validation/blog-validation'
import { ZodError } from 'zod'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { RichTextEditor } from '@/components/rich-text-editor'

const EditBlogPage = () => {
  const params = useParams()
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    summary: '',
    content: '',
    published: false,
    thumbnail: '',
    tags: [] as string[],
  })
  const [currentTag, setCurrentTag] = useState('')
  const { data: session } = useSession()
  const blogId = params.id as string

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof typeof formData, string>>
  >({})

  useEffect(() => {
    const getBlog = async () => {
      try {
        setLoading(true)
        setError(null)
        const { data: blog } = await getBlogPostById(blogId)
        if (blog) {
          setFormData(blog)
        } else {
          setError('Blog post not found')
        }
      } catch (err) {
        console.error('Failed to fetch blog:', err)
        setError('Failed to load blog post')
      } finally {
        setLoading(false)
      }
    }

    getBlog()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const validateField = (
    field: keyof typeof formData,
    value: string | boolean | string[]
  ) => {
    try {
      const tempData = { ...formData, [field]: value }
      const result = blogFormSchema.safeParse(tempData)

      if (result.success) {
        setFieldErrors((prev) => {
          const newErrors = { ...prev }
          delete newErrors[field]
          return newErrors
        })
      } else {
        const fieldError = result.error.issues.find(
          (issue) => issue.path[0] === field
        )

        if (fieldError) {
          setFieldErrors((prev) => ({
            ...prev,
            [field]: fieldError.message,
          }))
        } else {
          setFieldErrors((prev) => {
            const newErrors = { ...prev }
            delete newErrors[field]
            return newErrors
          })
        }
      }
    } catch (err) {
      console.error('Validation error:', err)
    }
  }

  const handleInputChange = (
    field: keyof typeof formData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    validateField(field, value)
  }

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      const updatedTags = [...formData.tags, currentTag.trim()]
      setFormData((prev) => ({
        ...prev,
        tags: updatedTags,
      }))
      validateField('tags', updatedTags)
      setCurrentTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    const updatedTags = formData.tags.filter((tag) => tag !== tagToRemove)
    setFormData((prev) => ({
      ...prev,
      tags: updatedTags,
    }))
    validateField('tags', updatedTags)
  }

  const isFormValid = () => {
    try {
      blogFormSchema.parse(formData)
      return true
    } catch {
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!session?.accessToken) {
      toast.error('Authentication required')
      setError('Authentication required')
      return
    }

    try {
      setSaving(true)
      setError(null)
      setFieldErrors({})

      const validatedData = blogFormSchema.parse(formData)

      const result = await updateBlogPost(
        blogId,
        validatedData,
        session.accessToken
      )

      if (result.success) {
        toast.success('Blog post updated successfully!')
        router.replace('/admin/blogs')
      } else {
        throw new Error(result.error || 'Failed to update blog post')
      }
    } catch (err) {
      if (err instanceof ZodError) {
        const errors: Record<string, string> = {}
        err.issues.forEach((issue) => {
          const field = issue.path[0] as string
          errors[field] = issue.message
        })
        setFieldErrors(errors)

        const firstError = err.issues[0]?.message || 'Invalid input'
        toast.error(firstError)
        setError('Please fix the validation errors below')
      } else {
        console.error('Failed to update blog post:', err)
        toast.error('Failed to update blog post')
        setError('Failed to update blog post')
      }
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/admin/blogs">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div className="h-8 bg-slate-300 dark:bg-slate-700 rounded w-48 animate-pulse"></div>
        </div>
        <div className="text-center py-12">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p>Loading blog post...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin">
            <Button
              variant="ghost"
              size="icon"
              className="text-slate-600 dark:text-slate-400"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              Edit Blog Post
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Write and update a blog post
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={handleSubmit}
            className="bg-purple-600 hover:bg-purple-700"
            disabled={saving || !isFormValid()}
          >
            {saving ? (
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

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-red-700 dark:text-red-400">{error}</p>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-slate-200 dark:border-slate-700">
            <CardContent className="p-6 space-y-4">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                >
                  Title *
                </label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Enter blog post title"
                  className={`bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 ${
                    fieldErrors.title
                      ? 'border-red-500 dark:border-red-500'
                      : ''
                  }`}
                  required
                />
                {fieldErrors.title && (
                  <p className="text-red-500 text-sm mt-1">
                    {fieldErrors.title}
                  </p>
                )}
                <p className="text-sm text-slate-500 mt-1">
                  {formData.title.length}/100 characters
                  {formData.title.length < 5 && ` (minimum 5 required)`}
                </p>
              </div>

              <div>
                <label
                  htmlFor="slug"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                >
                  Slug *
                </label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => handleInputChange('slug', e.target.value)}
                  placeholder="blog-post-slug"
                  className={`bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 ${
                    fieldErrors.slug ? 'border-red-500 dark:border-red-500' : ''
                  }`}
                  required
                />
                {fieldErrors.slug && (
                  <p className="text-red-500 text-sm mt-1">
                    {fieldErrors.slug}
                  </p>
                )}
                <p className="text-sm text-slate-500 mt-1">
                  {formData.slug.length}/100 characters
                  {formData.slug.length < 3 && ` (minimum 3 required)`}
                </p>
              </div>

              <div>
                <label
                  htmlFor="summary"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                >
                  Summary *
                </label>
                <Textarea
                  id="summary"
                  value={formData.summary}
                  onChange={(e) => handleInputChange('summary', e.target.value)}
                  placeholder="Brief description of the blog post"
                  rows={3}
                  className={`bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 resize-none ${
                    fieldErrors.summary
                      ? 'border-red-500 dark:border-red-500'
                      : ''
                  }`}
                  required
                />
                {fieldErrors.summary && (
                  <p className="text-red-500 text-sm mt-1">
                    {fieldErrors.summary}
                  </p>
                )}
                <p className="text-sm text-slate-500 mt-1">
                  {formData.summary.length}/200 characters
                  {formData.summary.length < 50 && ` (minimum 50 required)`}
                </p>
              </div>

              <div>
                <label
                  htmlFor="content"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                >
                  Content *
                </label>
                {/* <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => handleInputChange('content', e.target.value)}
                  placeholder="Write your blog post content here..."
                  rows={15}
                  className={`bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 resize-none font-mono ${
                    fieldErrors.content
                      ? 'border-red-500 dark:border-red-500'
                      : ''
                  }`}
                  required
                /> */}

                <RichTextEditor
                  content={formData.content}
                  onChange={(value) => handleInputChange('content', value)}
                />

                {fieldErrors.content && (
                  <p className="text-red-500 text-sm mt-1">
                    {fieldErrors.content}
                  </p>
                )}
                <p className="text-sm text-slate-500 mt-1">
                  {formData.content.length} characters
                  {formData.content.length < 100 && ` (minimum 100 required)`}
                </p>

                <div className="mt-8 p-4 border rounded-lg bg-slate-50 dark:bg-slate-800">
                  <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-100 mb-2">
                    ✨ Live Preview
                  </h3>

                  {formData.content ? (
                    <div
                      className="prose dark:prose-invert max-w-none"
                      dangerouslySetInnerHTML={{ __html: formData.content }}
                    />
                  ) : (
                    <p className="text-slate-400">
                      Start typing to see a live preview...
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Publish Settings */}
          <Card className="border-slate-200 dark:border-slate-700">
            <CardHeader>
              <CardTitle>Publish Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="published"
                  className="text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Publish
                </label>
                <Switch
                  id="published"
                  checked={formData.published}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({ ...prev, published: checked }))
                  }
                />
              </div>
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
                  placeholder="Add tag"
                  className="flex-1 bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600"
                  onKeyPress={(e) =>
                    e.key === 'Enter' && (e.preventDefault(), addTag())
                  }
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
              {fieldErrors.tags && (
                <p className="text-red-500 text-sm">{fieldErrors.tags}</p>
              )}
              <p className="text-sm text-slate-500">
                {formData.tags.length}/10 tags
              </p>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 px-2 py-1 rounded text-sm flex items-center gap-1"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="hover:text-purple-600"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Thumbnail */}
          <Card className="border-slate-200 dark:border-slate-700">
            <CardHeader>
              <CardTitle>Featured Image</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                value={formData.thumbnail}
                onChange={(e) => handleInputChange('thumbnail', e.target.value)}
                placeholder="Image URL"
                className={`bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 ${
                  fieldErrors.thumbnail
                    ? 'border-red-500 dark:border-red-500'
                    : ''
                }`}
              />
              {fieldErrors.thumbnail && (
                <p className="text-red-500 text-sm mt-1">
                  {fieldErrors.thumbnail}
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  )
}

export default withAuth(EditBlogPage, { requiredRole: 'ADMIN' })
