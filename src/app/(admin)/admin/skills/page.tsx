// app/admin/skills/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Search, Edit, Trash2, Code } from 'lucide-react'
import { withAuth } from '@/app/components/admin/hoc/with-auth'

// Mock data - replace with actual API calls
const mockSkills = [
  {
    id: '1',
    name: 'React',
    category: 'Frontend',
    level: 90,
    color: 'bg-blue-500',
    featured: true,
  },
  {
    id: '2',
    name: 'TypeScript',
    category: 'Frontend',
    level: 80,
    color: 'bg-blue-600',
    featured: true,
  },
  {
    id: '3',
    name: 'Node.js',
    category: 'Backend',
    level: 88,
    color: 'bg-green-500',
    featured: true,
  },
  {
    id: '4',
    name: 'MongoDB',
    category: 'Backend',
    level: 82,
    color: 'bg-emerald-600',
    featured: false,
  },
]

const SkillsPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [skills, setSkills] = useState(mockSkills)

  const filteredSkills = skills.filter(
    (skill) =>
      skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      skill.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const categories = [...new Set(skills.map((skill) => skill.category))]

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this skill?')) {
      setSkills(skills.filter((skill) => skill.id !== id))
      // Add API call here
    }
  }

  return (
    <div className="space-y-6">
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
              <CardTitle>{category}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categorySkills.map((skill) => (
                  <div
                    key={skill.id}
                    className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Code className="w-4 h-4 text-purple-600" />
                        <span className="font-medium text-slate-900 dark:text-white">
                          {skill.name}
                        </span>
                        {skill.featured && (
                          <span className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 px-2 py-1 rounded-full text-xs">
                            Featured
                          </span>
                        )}
                      </div>

                      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${skill.color} transition-all duration-1000`}
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
                          className="text-slate-600 dark:text-slate-400"
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
              No skills found
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