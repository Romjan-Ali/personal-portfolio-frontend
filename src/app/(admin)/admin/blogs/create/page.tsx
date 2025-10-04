// app/admin/blogs/create/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { ArrowLeft, Save, Eye } from 'lucide-react'
import Link from 'next/link'

export default function CreateBlogPage() {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Add API call here
    console.log('Creating blog post:', formData)
    router.push('/admin')
  }

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()],
      }))
      setCurrentTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
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
              Create Blog Post
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Write and publish a new blog post
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="border-slate-300 dark:border-slate-600"
          >
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-purple-600 hover:bg-purple-700"
          >
            <Save className="w-4 h-4 mr-2" />
            Publish Post
          </Button>
        </div>
      </div>

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
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  placeholder="Enter blog post title"
                  className="bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600"
                  required
                />
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
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, slug: e.target.value }))
                  }
                  placeholder="blog-post-slug"
                  className="bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600"
                  required
                />
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
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      summary: e.target.value,
                    }))
                  }
                  placeholder="Brief description of the blog post"
                  rows={3}
                  className="bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 resize-none"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="content"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                >
                  Content *
                </label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      content: e.target.value,
                    }))
                  }
                  placeholder="Write your blog post content here..."
                  rows={15}
                  className="bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 resize-none font-mono"
                  required
                />
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
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    thumbnail: e.target.value,
                  }))
                }
                placeholder="Image URL"
                className="bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600"
              />
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  )
}
