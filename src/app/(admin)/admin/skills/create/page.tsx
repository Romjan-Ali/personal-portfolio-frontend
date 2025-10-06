// app/admin/skills/create/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ArrowLeft, Save, Loader2 } from 'lucide-react'
import { withAuth } from '@/app/components/admin/hoc/with-auth'
import { createSkill } from '@/lib/skill-data'
import { useSession } from 'next-auth/react'
import { skillFormSchema } from '@/lib/validation/skill-validation'
import { ZodError } from 'zod'
import { toast } from 'sonner'

const AddSkillPage = () => {
  const router = useRouter()
  const { data: session } = useSession()

  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof typeof formData, string>>
  >({})

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    level: 50,
    color: '',
    order: 0,
  })

  const categories = [
    'Frontend',
    'Backend',
    'State & Utilities',
    'Tools & Others',
    'Mobile',
    'Database',
    'DevOps',
    'Design',
  ]

  const colorOptions = [
    { value: 'bg-blue-500', label: 'Blue' },
    { value: 'bg-green-500', label: 'Green' },
    { value: 'bg-purple-500', label: 'Purple' },
    { value: 'bg-red-500', label: 'Red' },
    { value: 'bg-yellow-500', label: 'Yellow' },
    { value: 'bg-indigo-500', label: 'Indigo' },
    { value: 'bg-pink-500', label: 'Pink' },
    { value: 'bg-teal-500', label: 'Teal' },
    { value: 'bg-orange-500', label: 'Orange' },
    { value: 'bg-cyan-500', label: 'Cyan' },
    { value: 'bg-emerald-500', label: 'Emerald' },
    { value: 'bg-slate-500', label: 'Slate' },
  ]

  const validateField = (
    field: keyof typeof formData,
    value: string | number
  ) => {
    try {
      const tempData = { ...formData, [field]: value }
      const result = skillFormSchema.safeParse(tempData)

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
    value: string | number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
    validateField(field, value)
  }

  const handleLevelChange = (value: number[]) => {
    const newLevel = value[0]
    setFormData((prev) => ({
      ...prev,
      level: newLevel,
    }))
    validateField('level', newLevel)
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

      const validatedData = skillFormSchema.parse(formData)

      await createSkill(validatedData, session.accessToken)

      toast.success('Skill created successfully!')
      router.push('/admin/skills')
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
        console.error('Failed to create skill:', err)
        toast.error('Failed to create skill')
        setError('Failed to create skill')
      }
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/skills">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Add New Skill
        </h1>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-red-700 dark:text-red-400">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Basic Information */}
          <div className="space-y-6">
            <Card className="border-slate-200 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="text-slate-900 dark:text-white">
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="name"
                    className="text-slate-700 dark:text-slate-300"
                  >
                    Skill Name *
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="e.g., React, Node.js, TypeScript"
                    className={`bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 ${
                      fieldErrors.name
                        ? 'border-red-500 dark:border-red-500'
                        : ''
                    }`}
                    required
                  />
                  {fieldErrors.name && (
                    <p className="text-red-500 text-sm">{fieldErrors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="category"
                    className="text-slate-700 dark:text-slate-300"
                  >
                    Category *
                  </Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      handleInputChange('category', value)
                    }
                  >
                    <SelectTrigger
                      className={`bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 ${
                        fieldErrors.category
                          ? 'border-red-500 dark:border-red-500'
                          : ''
                      }`}
                    >
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldErrors.category && (
                    <p className="text-red-500 text-sm">
                      {fieldErrors.category}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="order"
                    className="text-slate-700 dark:text-slate-300"
                  >
                    Display Order
                  </Label>
                  <Input
                    id="order"
                    type="number"
                    value={formData.order}
                    onChange={(e) =>
                      handleInputChange('order', parseInt(e.target.value) || 0)
                    }
                    placeholder="0"
                    min="0"
                    className={`bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600 ${
                      fieldErrors.order
                        ? 'border-red-500 dark:border-red-500'
                        : ''
                    }`}
                  />
                  {fieldErrors.order && (
                    <p className="text-red-500 text-sm">{fieldErrors.order}</p>
                  )}
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Lower numbers appear first within the category
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Skill Details */}
          <div className="space-y-6">
            <Card className="border-slate-200 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="text-slate-900 dark:text-white">
                  Skill Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label
                      htmlFor="level"
                      className="text-slate-700 dark:text-slate-300"
                    >
                      Proficiency Level
                    </Label>
                    <span className="text-lg font-semibold text-purple-600">
                      {formData.level}%
                    </span>
                  </div>
                  <Slider
                    value={[formData.level]}
                    onValueChange={handleLevelChange}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                  {fieldErrors.level && (
                    <p className="text-red-500 text-sm">{fieldErrors.level}</p>
                  )}
                  <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400">
                    <span>Beginner</span>
                    <span>Expert</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="color"
                    className="text-slate-700 dark:text-slate-300"
                  >
                    Progress Bar Color
                  </Label>
                  <Select
                    value={formData.color}
                    onValueChange={(value) => handleInputChange('color', value)}
                  >
                    <SelectTrigger className="bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600">
                      <SelectValue placeholder="Select a color" />
                    </SelectTrigger>
                    <SelectContent>
                      {colorOptions.map((color) => (
                        <SelectItem key={color.value} value={color.value}>
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-4 h-4 rounded ${color.value}`}
                            ></div>
                            {color.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Preview */}
            <Card className="border-slate-200 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="text-slate-900 dark:text-white">
                  Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-slate-700 dark:text-slate-200">
                      {formData.name || 'Skill Name'}
                    </span>
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      {formData.level}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        formData.color || 'bg-purple-500'
                      }`}
                      style={{ width: `${formData.level}%` }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card className="border-slate-200 dark:border-slate-700">
              <CardContent className="p-6">
                <div className="flex gap-3">
                  <Link href="/admin/skills" className="flex-1">
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
                    disabled={
                      saving ||
                      Object.keys(fieldErrors).length > 0 ||
                      !formData.name ||
                      !formData.category
                    }
                  >
                    {saving ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Create Skill
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

export default withAuth(AddSkillPage, { requiredRole: 'ADMIN' })
