// app/admin/skills/page.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Search, Edit, Trash2, Code, Loader2 } from 'lucide-react'
import { withAuth } from '@/app/components/admin/hoc/with-auth'
import { 
  getAllSkills, 
  deleteSkill, 
  type Skill 
} from '@/lib/skill-data'
import { useSession } from 'next-auth/react'

const SkillsPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { data: session } = useSession()

  useEffect(() => {
    fetchSkills()
  }, [])

  const fetchSkills = async () => {
    try {
      setLoading(true)
      setError(null)
      const skillsData = await getAllSkills()
      setSkills(skillsData || [])
    } catch (err) {
      console.error('Failed to fetch skills:', err)
      setError('Failed to load skills')
    } finally {
      setLoading(false)
    }
  }

  const filteredSkills = skills.filter(
    (skill) =>
      skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      skill.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const categories = [...new Set(skills.map((skill) => skill.category))]

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this skill?')) {
      try {
        if (!session?.accessToken) {
          throw new Error('No authentication token found')
        }
        
        await deleteSkill(id, session.accessToken)
        setSkills(skills.filter((skill) => skill.id !== id))
      } catch (err) {
        console.error('Failed to delete skill:', err)
        setError('Failed to delete skill')
      }
    }
  }

  const getSkillColor = (skill: Skill): string => {
    return skill.color || getDefaultColor(skill.level)
  }

  const getDefaultColor = (level: number): string => {
    if (level >= 90) return 'bg-green-500'
    if (level >= 80) return 'bg-blue-500'
    if (level >= 70) return 'bg-purple-500'
    if (level >= 60) return 'bg-yellow-500'
    return 'bg-gray-500'
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <div className="h-8 bg-slate-300 dark:bg-slate-700 rounded w-32 animate-pulse"></div>
            <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-64 mt-2 animate-pulse"></div>
          </div>
          <div className="h-10 bg-slate-300 dark:bg-slate-700 rounded w-32 animate-pulse"></div>
        </div>

        {/* Search and Filters Loading */}
        <Card className="border-slate-200 dark:border-slate-700">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="h-10 bg-slate-300 dark:bg-slate-700 rounded animate-pulse"></div>
              </div>
              <div className="flex gap-2">
                <div className="h-10 bg-slate-300 dark:bg-slate-700 rounded w-24 animate-pulse"></div>
                <div className="h-10 bg-slate-300 dark:bg-slate-700 rounded w-24 animate-pulse"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Skills Loading */}
        {[1, 2].map((categoryIndex) => (
          <Card key={categoryIndex} className="border-slate-200 dark:border-slate-700">
            <CardHeader>
              <div className="h-6 bg-slate-300 dark:bg-slate-700 rounded w-32 animate-pulse"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((skillIndex) => (
                  <div
                    key={skillIndex}
                    className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg animate-pulse"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-4 h-4 bg-slate-300 dark:bg-slate-700 rounded"></div>
                        <div className="h-5 bg-slate-300 dark:bg-slate-700 rounded w-24"></div>
                        <div className="h-6 bg-slate-300 dark:bg-slate-700 rounded w-16"></div>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                        <div className="h-2 bg-slate-300 dark:bg-slate-600 rounded-full w-3/4"></div>
                      </div>
                      <div className="flex justify-between text-xs mt-1">
                        <div className="h-3 bg-slate-300 dark:bg-slate-700 rounded w-16"></div>
                        <div className="h-3 bg-slate-300 dark:bg-slate-700 rounded w-8"></div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <div className="h-8 w-8 bg-slate-300 dark:bg-slate-700 rounded"></div>
                      <div className="h-8 w-8 bg-slate-300 dark:bg-slate-700 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-red-700 dark:text-red-400">{error}</p>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={fetchSkills}
            className="mt-2"
          >
            <Loader2 className="w-4 h-4 mr-2" />
            Retry
          </Button>
        </div>
      )}

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Skills
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Manage your technical skills and expertise
          </p>
        </div>
        <Link href="/admin/skills/create">
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Skill
          </Button>
        </Link>
      </div>

      {/* Search and Filters */}
      <Card className="border-slate-200 dark:border-slate-700">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Search skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="border-slate-300 dark:border-slate-600"
              >
                All Skills
              </Button>
              <Button
                variant="outline"
                className="border-slate-300 dark:border-slate-600"
              >
                Featured
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Skills by Category */}
      {categories.map((category) => {
        const categorySkills = filteredSkills.filter(
          (skill) => skill.category === category
        )
        if (categorySkills.length === 0) return null

        return (
          <Card
            key={category}
            className="border-slate-200 dark:border-slate-700"
          >
            <CardHeader>
              <CardTitle className="text-slate-900 dark:text-white">{category}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categorySkills.map((skill) => (
                  <div
                    key={skill.id}
                    className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-750 transition-colors duration-200"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Code className="w-4 h-4 text-purple-600" />
                        <span className="font-medium text-slate-900 dark:text-white">
                          {skill.name}
                        </span>
                        {/* Removed featured badge since it's not in the schema */}
                      </div>

                      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${getSkillColor(skill)} transition-all duration-1000`}
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
                        <span>Proficiency</span>
                        <span>{skill.level}%</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      <Link href={`/admin/skills/edit/${skill.id}`}>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                        onClick={() => handleDelete(skill.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )
      })}

      {filteredSkills.length === 0 && (
        <Card className="border-slate-200 dark:border-slate-700">
          <CardContent className="p-12 text-center">
            <Code className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              {skills.length === 0 ? 'No skills yet' : 'No skills found'}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              {searchTerm
                ? 'Try adjusting your search terms'
                : 'Get started by adding your first skill'}
            </p>
            <Link href="/admin/skills/create">
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Skill
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default withAuth(SkillsPage, { requiredRole: 'ADMIN' })