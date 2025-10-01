// app/components/blog/create-post-form.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { demoUser, getBlogPosts } from '@/lib/blog-data'
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

// Validation schema (moved here since blog-types doesn't exist)
const blogPostValidation = {
  title: {
    required: 'Title is required',
    minLength: 5,
    maxLength: 100
  },
  slug: {
    required: 'Slug is required',
    pattern: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    message: 'Slug must be lowercase with hyphens (e.g., my-awesome-post)'
  },
  summary: {
    required: 'Summary is required',
    minLength: 50,
    maxLength: 200
  },
  content: {
    required: 'Content is required',
    minLength: 100
  }
}

export async function CreatePostForm({ onCancel, onSuccess }: CreatePostFormProps) {
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

  const blogPosts = await getBlogPosts()

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
      // Create new post with all required fields
      const newPost = {
        id: `blog-${Date.now()}`,
        ...formData,
        views: 0, // Initialize views to 0
        authorId: demoUser.id,
        author: demoUser,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // In a real app, this would be an API call to save to database
      // For demo purposes, we'll add it to our local array and log it
      console.log('Creating post:', newPost)
      
      // Add to our blogPosts array (in a real app, this would be a database operation)
      blogPosts.unshift(newPost)

      // Show success message
      alert(`Blog post ${formData.published ? 'published' : 'saved as draft'} successfully!`)

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

  // Check if slug is unique
  const isSlugUnique = (slug: string) => {
    return !blogPosts.some(post => post.slug === slug)
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
                onClick={onCancel || (() => router.push('/blog'))}
                className="border-slate-300"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
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
                disabled={isLoading}
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
                {isLoading ? 'Saving...' : formData.published ? 'Publish Post' : 'Save as Draft'}
              </Button>
            </div>
          </div>

          {/* Preview Mode */}
          {isPreview ? (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  formData.published 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {formData.published ? 'Published' : 'Draft'}
                </span>
                <span className="text-slate-500 text-sm">
                  Slug: {formData.slug || 'not-set'}
                </span>
              </div>

              <h1 className="text-4xl font-bold text-slate-900 mb-4">
                {formData.title || 'Untitled Post'}
              </h1>

              {formData.thumbnail && (
                <div className="mb-6">
                  <div className="bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl p-1">
                    <div 
                      className="bg-slate-800 rounded-xl h-64 bg-cover bg-center"
                      style={{ backgroundImage: `url(${formData.thumbnail})` }}
                    />
                  </div>
                  <p className="text-slate-500 text-sm mt-2 text-center">
                    Thumbnail Preview
                  </p>
                </div>
              )}

              <p className="text-xl text-slate-600 mb-6 leading-relaxed">
                {formData.summary || 'No summary provided'}
              </p>

              <div className="prose prose-slate max-w-none">
                {formData.content ? (
                  <div className="border-t border-slate-200 pt-6">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: formData.content
                          .replace(/\n/g, '<br/>')
                          .replace(/^# (.*$)/gim, '<h1>$1</h1>')
                          .replace(/^## (.*$)/gim, '<h2>$1</h2>')
                          .replace(/^### (.*$)/gim, '<h3>$1</h3>')
                          .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
                          .replace(/\*(.*)\*/gim, '<em>$1</em>')
                      }}
                    />
                  </div>
                ) : (
                  <p className="text-slate-500 italic border-t border-slate-200 pt-6">
                    No content yet...
                  </p>
                )}
              </div>

              {/* Additional Images Preview */}
              {formData.images.length > 0 && (
                <div className="mt-8 border-t border-slate-200 pt-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">
                    Additional Images ({formData.images.length})
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {formData.images.map((image, index) => (
                      <div key={index} className="bg-slate-100 rounded-lg p-3">
                        <div 
                          className="bg-slate-300 h-32 rounded flex items-center justify-center bg-cover bg-center"
                          style={{ backgroundImage: `url(${image})` }}
                        >
                          {!image && (
                            <span className="text-slate-600 text-sm">Image {index + 1}</span>
                          )}
                        </div>
                        <p className="text-slate-500 text-xs mt-2 truncate">
                          {image || 'No URL provided'}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
                      disabled={isLoading}
                    />
                    {errors.title && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.title}
                      </p>
                    )}
                    <p className="text-slate-500 text-sm mt-1">
                      {formData.title.length}/100 characters
                    </p>
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
                      disabled={isLoading}
                    />
                    {errors.slug && (
                      <p className="text-red-500 text-sm mt-1">{errors.slug}</p>
                    )}
                    {formData.slug && !errors.slug && !isSlugUnique(formData.slug) && (
                      <p className="text-orange-500 text-sm mt-1">
                        Warning: This slug already exists and may cause conflicts
                      </p>
                    )}
                    <p className="text-slate-500 text-sm mt-1">
                      This will be used in the URL. Use lowercase letters, numbers, and hyphens.
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
                      placeholder="Brief summary of your blog post that will appear in listings and search results..."
                      rows={3}
                      className={errors.summary ? 'border-red-500' : ''}
                      disabled={isLoading}
                    />
                    {errors.summary && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.summary}
                      </p>
                    )}
                    <p className="text-slate-500 text-sm mt-1">
                      {formData.summary.length}/200 characters • {200 - formData.summary.length} remaining
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
                    placeholder="Write your blog post content here... You can use basic markdown like # for headings, **bold**, and *italic* text."
                    rows={12}
                    className={errors.content ? 'border-red-500' : ''}
                    disabled={isLoading}
                  />
                  {errors.content && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.content}
                    </p>
                  )}
                  <div className="flex justify-between text-slate-500 text-sm mt-1">
                    <span>{formData.content.length} characters</span>
                    <span>{Math.ceil(formData.content.split(/\s+/).length / 200)} min read</span>
                  </div>
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
                      disabled={isLoading}
                    />
                    <p className="text-slate-500 text-sm mt-1">
                      Main image that will represent your blog post in listings
                    </p>
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
                        disabled={isLoading}
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
                            disabled={isLoading}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeImage(index)}
                            className="border-red-300 text-red-600 hover:bg-red-50"
                            disabled={isLoading}
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
                    disabled={isLoading}
                  />
                  <label
                    htmlFor="published"
                    className="text-sm font-medium text-slate-700"
                  >
                    Publish immediately
                  </label>
                </div>
                <p className="text-slate-500 text-sm mt-1">
                  {formData.published 
                    ? 'This post will be visible to everyone immediately.' 
                    : 'This post will be saved as a draft and not visible to the public.'
                  }
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onCancel || (() => router.push('/blog'))}
                  className="border-slate-300"
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isLoading 
                    ? 'Saving...' 
                    : formData.published 
                      ? 'Publish Post' 
                      : 'Save as Draft'
                  }
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}