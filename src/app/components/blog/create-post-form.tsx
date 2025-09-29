// app/components/blog/create-post-form.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { blogPostValidation } from '@/lib/blog-types'
import { demoUser } from '@/lib/blog-data'
import { ArrowLeft, Save, Eye, EyeOff, Upload, X } from 'lucide-react'

interface CreatePostFormProps {
  onCancel?: () => void
  onSuccess?: () => void
}

interface FormErrors {
  title?: string
  slug?: string
  summary?: string
  content?: string
}

export function CreatePostForm({ onCancel, onSuccess }: CreatePostFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isPreview, setIsPreview] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    summary: '',
    content: '',
    published: false,
    thumbnail: '',
    images: [] as string[],
  })

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
    validateField('title', title)
  }

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const slug = e.target.value
    setFormData((prev) => ({ ...prev, slug }))
    validateField('slug', slug)
  }

  const validateField = (
    field: keyof typeof blogPostValidation,
    value: string
  ) => {
    const rules = blogPostValidation[field]
    let error = ''

    if (!value.trim()) {
      error = rules.required
    } else if ('minLength' in rules && value.length < rules.minLength) {
      error = `${field} must be at least ${rules.minLength} characters`
    } else if ('maxLength' in rules && value.length > rules.maxLength) {
      error = `${field} must be less than ${rules.maxLength} characters`
    } else if ('pattern' in rules && !rules.pattern.test(value)) {
      error = rules.message
    }

    setErrors((prev) => ({ ...prev, [field]: error }))
    return !error
  }

  const validateForm = () => {
    const fields = ['title', 'slug', 'summary', 'content'] as const
    let isValid = true

    fields.forEach((field) => {
      if (!validateField(field, formData[field])) {
        isValid = false
      }
    })

    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      // In a real app, this would be an API call
      const newPost = {
        id: `blog-${Date.now()}`,
        ...formData,
        authorId: demoUser.id,
        author: demoUser,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // In a real app, you would save to the database here
      console.log('Creating post:', newPost)

      // Show success message
      alert('Blog post created successfully!')

      if (onSuccess) {
        onSuccess()
      } else {
        router.push('/blog')
        router.refresh()
      }
    } catch (error) {
      console.error('Error creating post:', error)
      alert('Error creating post. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const addImage = () => {
    const imageUrl = prompt('Enter image URL:')
    if (imageUrl) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, imageUrl],
      }))
    }
  }

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={onCancel}
                className="border-slate-300"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <h1 className="text-3xl font-bold text-slate-900">
                Create New Post
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => setIsPreview(!isPreview)}
                className="border-slate-300"
              >
                {isPreview ? (
                  <>
                    <EyeOff className="w-4 h-4 mr-2" />
                    Edit
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </>
                )}
              </Button>

              <Button
                onClick={handleSubmit}
                disabled={isLoading}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                <Save className="w-4 h-4 mr-2" />
                {isLoading ? 'Publishing...' : 'Publish Post'}
              </Button>
            </div>
          </div>

          {/* Preview Mode */}
          {isPreview ? (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
              <h1 className="text-4xl font-bold text-slate-900 mb-4">
                {formData.title || 'Untitled'}
              </h1>

              {formData.thumbnail && (
                <div className="mb-6">
                  <div className="bg-slate-200 h-64 rounded-lg flex items-center justify-center">
                    <span className="text-slate-600">
                      Thumbnail: {formData.thumbnail}
                    </span>
                  </div>
                </div>
              )}

              <p className="text-xl text-slate-600 mb-6">
                {formData.summary || 'No summary provided'}
              </p>

              <div className="prose prose-slate max-w-none">
                {formData.content ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: formData.content.replace(/\n/g, '<br/>'),
                    }}
                  />
                ) : (
                  <p className="text-slate-500 italic">No content yet...</p>
                )}
              </div>
            </div>
          ) : (
            /* Edit Mode */
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h2 className="text-xl font-semibold text-slate-900 mb-4">
                  Basic Information
                </h2>

                <div className="grid gap-6">
                  {/* Title */}
                  <div>
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Title *
                    </label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={handleTitleChange}
                      placeholder="Enter blog post title"
                      className={errors.title ? 'border-red-500' : ''}
                    />
                    {errors.title && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.title}
                      </p>
                    )}
                  </div>

                  {/* Slug */}
                  <div>
                    <label
                      htmlFor="slug"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Slug *
                    </label>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={handleSlugChange}
                      placeholder="my-awesome-post"
                      className={errors.slug ? 'border-red-500' : ''}
                    />
                    {errors.slug && (
                      <p className="text-red-500 text-sm mt-1">{errors.slug}</p>
                    )}
                    <p className="text-slate-500 text-sm mt-1">
                      This will be used in the URL. Use lowercase letters,
                      numbers, and hyphens.
                    </p>
                  </div>

                  {/* Summary */}
                  <div>
                    <label
                      htmlFor="summary"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Summary *
                    </label>
                    <Textarea
                      id="summary"
                      value={formData.summary}
                      onChange={(e) => {
                        setFormData((prev) => ({
                          ...prev,
                          summary: e.target.value,
                        }))
                        validateField('summary', e.target.value)
                      }}
                      placeholder="Brief summary of your blog post"
                      rows={3}
                      className={errors.summary ? 'border-red-500' : ''}
                    />
                    {errors.summary && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.summary}
                      </p>
                    )}
                    <p className="text-slate-500 text-sm mt-1">
                      {formData.summary.length}/200 characters
                    </p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h2 className="text-xl font-semibold text-slate-900 mb-4">
                  Content
                </h2>

                <div>
                  <label
                    htmlFor="content"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Content *
                  </label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        content: e.target.value,
                      }))
                      validateField('content', e.target.value)
                    }}
                    placeholder="Write your blog post content here..."
                    rows={12}
                    className={errors.content ? 'border-red-500' : ''}
                  />
                  {errors.content && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.content}
                    </p>
                  )}
                  <p className="text-slate-500 text-sm mt-1">
                    {formData.content.length} characters
                  </p>
                </div>
              </div>

              {/* Media */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h2 className="text-xl font-semibold text-slate-900 mb-4">
                  Media
                </h2>

                <div className="grid gap-6">
                  {/* Thumbnail */}
                  <div>
                    <label
                      htmlFor="thumbnail"
                      className="block text-sm font-medium text-slate-700 mb-2"
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

                  {/* Additional Images */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-slate-700">
                        Additional Images
                      </label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addImage}
                        className="border-slate-300"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Add Image
                      </Button>
                    </div>

                    <div className="space-y-2">
                      {formData.images.map((image, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <Input
                            value={image}
                            onChange={(e) => {
                              const newImages = [...formData.images]
                              newImages[index] = e.target.value
                              setFormData((prev) => ({
                                ...prev,
                                images: newImages,
                              }))
                            }}
                            placeholder="https://example.com/image.jpg"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeImage(index)}
                            className="border-red-300 text-red-600 hover:bg-red-50"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}

                      {formData.images.length === 0 && (
                        <p className="text-slate-500 text-sm italic">
                          No additional images added
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Settings */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h2 className="text-xl font-semibold text-slate-900 mb-4">
                  Settings
                </h2>

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
                    className="rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                  />
                  <label
                    htmlFor="published"
                    className="text-sm font-medium text-slate-700"
                  >
                    Publish immediately
                  </label>
                </div>
                <p className="text-slate-500 text-sm mt-1">
                  If unchecked, the post will be saved as a draft.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onCancel}
                  className="border-slate-300"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isLoading ? 'Publishing...' : 'Publish Post'}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
