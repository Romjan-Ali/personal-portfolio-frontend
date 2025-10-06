// app/admin/projects/edit/[id]/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { projectFormSchema } from '@/lib/validation/project-validation'
import { ZodError } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {
  ArrowLeft,
  Save,
  ExternalLink,
  Github,
  Plus,
  X,
  Loader2,
} from 'lucide-react'
import { withAuth } from '@/app/components/admin/hoc/with-auth'
import { getProjectById, updateProject, type Project } from '@/lib/project-data'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'

const EditProjectPage = () => {
  const params = useParams()
  const router = useRouter()
  const { data: session } = useSession()
  const projectId = params.id as string

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof typeof formData, string>>>({})
  const [project, setProject] = useState<Project | null>(null)

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    liveUrl: '',
    repoUrl: '',
    tags: [] as string[],
    featured: false,
  })
  const [newTag, setNewTag] = useState('')

  useEffect(() => {
    if (projectId) {
      fetchProject()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId])

  const fetchProject = async () => {
    try {
      setLoading(true)
      setError(null)
      const projectData = await getProjectById(projectId)

      if (projectData) {
        setProject(projectData)
        setFormData({
          title: projectData.title,
          description: projectData.description,
          image: projectData.image || '',
          liveUrl: projectData.liveUrl || '',
          repoUrl: projectData.repoUrl || '',
          tags: projectData.tags || [],
          featured: projectData.featured || false,
        })
      } else {
        setError('Project not found')
      }
    } catch (err) {
      console.error('Failed to fetch project:', err)
      setError('Failed to load project')
    } finally {
      setLoading(false)
    }
  }
  const validateField = (
    field: keyof typeof formData,
    value: string | boolean | string[]
  ) => {
    try {
      const tempData = { ...formData, [field]: value }

      projectFormSchema.parse(tempData)

      setFieldErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    } catch (err) {
      if (err instanceof ZodError) {
        const fieldError = err.issues.find((issue) =>
          issue.path.includes(field)
        )
        if (fieldError) {
          setFieldErrors((prev) => ({
            ...prev,
            [field]: fieldError.message,
          }))
        }
      }
    }
  }

  const handleInputChange = (
    field: keyof typeof formData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    validateField(field, value)
  }

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      const updatedTags = [...formData.tags, newTag.trim()]
      setFormData((prev) => ({
        ...prev,
        tags: updatedTags,
      }))
      validateField('tags', updatedTags)
      setNewTag('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    const updatedTags = formData.tags.filter((tag) => tag !== tagToRemove)
    setFormData((prev) => ({
      ...prev,
      tags: updatedTags,
    }))
    validateField('tags', updatedTags)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddTag()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!session?.accessToken) {
      setError('Authentication required')
      return
    }

    try {
      setSaving(true)
      setError(null)
      setFieldErrors({})

      // Validate form data using your shared schema
      const validatedData = projectFormSchema.parse(formData)

      await updateProject(projectId, validatedData, session.accessToken)

      toast.success('Project updated successfully!')
      router.push('/admin/projects')
    } catch (err) {
      if (err instanceof ZodError) {
        // Convert Zod errors to field-specific errors
        const errors: Record<string, string> = {}
        err.issues.forEach((issue) => {
          const field = issue.path[0] as string
          errors[field] = issue.message
        })
        setFieldErrors(errors)

        // Show first error in toast
        const firstError = err.issues[0]?.message || 'Invalid input'
        toast.error(firstError)
        setError('Please fix the validation errors below')
      } else {
        console.error('Failed to update project:', err)
        toast.error('Failed to update project')
        setError('Failed to update project')
      }
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/admin/projects">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div className="h-8 bg-slate-300 dark:bg-slate-700 rounded w-64 animate-pulse"></div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-slate-200 dark:border-slate-700">
              <CardHeader>
                <div className="h-6 bg-slate-300 dark:bg-slate-700 rounded w-32 animate-pulse"></div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-16 animate-pulse"></div>
                  <div className="h-10 bg-slate-300 dark:bg-slate-700 rounded animate-pulse"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-24 animate-pulse"></div>
                  <div className="h-32 bg-slate-300 dark:bg-slate-700 rounded animate-pulse"></div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 dark:border-slate-700">
              <CardHeader>
                <div className="h-6 bg-slate-300 dark:bg-slate-700 rounded w-24 animate-pulse"></div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-20 animate-pulse"></div>
                  <div className="h-10 bg-slate-300 dark:bg-slate-700 rounded animate-pulse"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-16 animate-pulse"></div>
                  <div className="h-10 bg-slate-300 dark:bg-slate-700 rounded animate-pulse"></div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-slate-200 dark:border-slate-700">
              <CardHeader>
                <div className="h-6 bg-slate-300 dark:bg-slate-700 rounded w-20 animate-pulse"></div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-24 animate-pulse"></div>
                  <div className="h-6 bg-slate-300 dark:bg-slate-700 rounded w-12 animate-pulse"></div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 dark:border-slate-700">
              <CardHeader>
                <div className="h-6 bg-slate-300 dark:bg-slate-700 rounded w-16 animate-pulse"></div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="h-10 bg-slate-300 dark:bg-slate-700 rounded animate-pulse"></div>
                  <div className="h-8 bg-slate-300 dark:bg-slate-700 rounded w-20 animate-pulse"></div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3, 4].map((index) => (
                    <div
                      key={index}
                      className="h-6 bg-slate-300 dark:bg-slate-700 rounded w-16 animate-pulse"
                    ></div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  if (error && !project) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/admin/projects">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Edit Project
          </h1>
        </div>

        <Card className="border-slate-200 dark:border-slate-700">
          <CardContent className="p-12 text-center">
            <div className="text-red-500 dark:text-red-400 text-lg mb-4">
              {error}
            </div>
            <Button onClick={fetchProject}>Retry</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/projects">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Edit Project
        </h1>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-red-700 dark:text-red-400">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card className="border-slate-200 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="text-slate-900 dark:text-white">
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="title"
                    className="text-slate-700 dark:text-slate-300"
                  >
                    Project Title *
                  </Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Enter project title"
                    className={`bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 ${
                      fieldErrors.title
                        ? 'border-red-500 dark:border-red-500'
                        : ''
                    }`}
                    required
                  />
                  {fieldErrors.title && (
                    <p className="text-red-500 text-sm">{fieldErrors.title}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="description"
                    className="text-slate-700 dark:text-slate-300"
                  >
                    Description *
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      handleInputChange('description', e.target.value)
                    }
                    placeholder="Describe your project in detail..."
                    rows={6}
                    className={`bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 resize-none ${
                      fieldErrors.description
                        ? 'border-red-500 dark:border-red-500'
                        : ''
                    }`}
                    required
                  />
                  {fieldErrors.description && (
                    <p className="text-red-500 text-sm">
                      {fieldErrors.description}
                    </p>
                  )}
                  <p className="text-sm text-slate-500">
                    {formData.description.length}/1000 characters
                    {formData.description.length < 50 &&
                      ` (minimum 50 required)`}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="image"
                    className="text-slate-700 dark:text-slate-300"
                  >
                    Image URL
                  </Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => handleInputChange('image', e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className={`bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 ${
                      fieldErrors.image
                        ? 'border-red-500 dark:border-red-500'
                        : ''
                    }`}
                  />
                  {fieldErrors.image && (
                    <p className="text-red-500 text-sm">{fieldErrors.image}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Links */}
            <Card className="border-slate-200 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="text-slate-900 dark:text-white">
                  Project Links
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="liveUrl"
                    className="text-slate-700 dark:text-slate-300"
                  >
                    <ExternalLink className="w-4 h-4 inline mr-2" />
                    Live Demo URL
                  </Label>
                  <Input
                    id="liveUrl"
                    type="url"
                    value={formData.liveUrl}
                    onChange={(e) =>
                      handleInputChange('liveUrl', e.target.value)
                    }
                    placeholder="https://your-project.vercel.app"
                    className="bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="repoUrl"
                    className="text-slate-700 dark:text-slate-300"
                  >
                    <Github className="w-4 h-4 inline mr-2" />
                    Repository URL
                  </Label>
                  <Input
                    id="repoUrl"
                    type="url"
                    value={formData.repoUrl}
                    onChange={(e) =>
                      handleInputChange('repoUrl', e.target.value)
                    }
                    placeholder="https://github.com/username/project"
                    className="bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Settings */}
            <Card className="border-slate-200 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="text-slate-900 dark:text-white">
                  Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="featured"
                    className="text-slate-700 dark:text-slate-300"
                  >
                    Featured Project
                  </Label>
                  <Switch
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) =>
                      handleInputChange('featured', checked)
                    }
                  />
                </div>
              </CardContent>
            </Card>

            {/* Technologies */}
            <Card className="border-slate-200 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="text-slate-900 dark:text-white">
                  Technologies
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="newTag"
                    className="text-slate-700 dark:text-slate-300"
                  >
                    Add Technology
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="newTag"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="React, Node.js, etc."
                      className="bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={handleAddTag}
                      className="border-slate-300 dark:border-slate-600"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  {fieldErrors.tags && (
                    <p className="text-red-500 text-sm">{fieldErrors.tags}</p>
                  )}
                  <p className="text-sm text-slate-500">
                    {formData.tags.length}/10 tags
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <div
                      key={index}
                      className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-full text-sm border border-slate-200 dark:border-slate-600 flex items-center gap-1"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card className="border-slate-200 dark:border-slate-700">
              <CardContent className="p-6">
                <div className="flex gap-3">
                  <Link href="/admin/projects" className="flex-1">
                    <Button
                      variant="outline"
                      className="w-full border-slate-300 dark:border-slate-600"
                    >
                      Cancel
                    </Button>
                  </Link>
                  <Button
                    type="submit"
                    className="flex-1 bg-purple-600 hover:bg-purple-700"
                    disabled={saving}
                  >
                    {saving ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}

export default withAuth(EditProjectPage, { requiredRole: 'ADMIN' })
