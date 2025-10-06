// app/admin/projects/page.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog'
import {
  Plus,
  Search,
  Edit,
  Trash2,
  ExternalLink,
  Github,
  Star,
  Briefcase,
} from 'lucide-react'
import { withAuth } from '@/app/components/admin/hoc/with-auth'
import {
  getAllProjects,
  deleteProject,
  updateProject,
  type Project,
} from '@/lib/project-data'
import { useSession } from 'next-auth/react'

const ProjectsPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { data: session } = useSession()

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      setLoading(true)
      setError(null)
      const projectsData = await getAllProjects()
      setProjects(projectsData || [])
    } catch (err) {
      console.error('Failed to fetch projects:', err)
      setError('Failed to load projects')
    } finally {
      setLoading(false)
    }
  }

  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDelete = async (id: string) => {
    try {
      if (!session?.accessToken) {
        throw new Error('No authentication token found')
      }

      await deleteProject(id, session.accessToken)
      setProjects(projects.filter((project) => project.id !== id))
    } catch (err) {
      console.error('Failed to delete project:', err)
      setError('Failed to delete project')
    }
  }

  const toggleFeatured = async (id: string) => {
    try {
      if (!session?.accessToken) {
        throw new Error('No authentication token found')
      }

      const project = projects.find((p) => p.id === id)
      if (!project) return

      const updatedProject = await updateProject(
        id,
        { featured: !project.featured },
        session.accessToken
      )

      setProjects(
        projects.map((project) =>
          project.id === id ? updatedProject : project
        )
      )
    } catch (err) {
      console.error('Failed to update project:', err)
      setError('Failed to update project')
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <div className="h-8 bg-slate-300 dark:bg-slate-700 rounded w-48 animate-pulse"></div>
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

        {/* Projects Grid Loading */}
        <div className="grid gap-6">
          {[1, 2].map((index) => (
            <Card
              key={index}
              className="border-slate-200 dark:border-slate-700"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-6 bg-slate-300 dark:bg-slate-700 rounded w-48 animate-pulse"></div>
                      <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-4 animate-pulse"></div>
                      <div className="h-6 bg-slate-300 dark:bg-slate-700 rounded w-20 animate-pulse"></div>
                    </div>
                    <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-full mb-4 animate-pulse"></div>
                    <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-3/4 mb-4 animate-pulse"></div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {[1, 2, 3, 4].map((techIndex) => (
                        <div
                          key={techIndex}
                          className="h-6 bg-slate-300 dark:bg-slate-700 rounded w-16 animate-pulse"
                        ></div>
                      ))}
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-20 animate-pulse"></div>
                      <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-24 animate-pulse"></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    {[1, 2, 3].map((btnIndex) => (
                      <div
                        key={btnIndex}
                        className="h-8 w-8 bg-slate-300 dark:bg-slate-700 rounded animate-pulse"
                      ></div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-red-700 dark:text-red-400">{error}</p>
        </div>
      )}

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Projects
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Manage your portfolio projects
          </p>
        </div>
        <Link href="/admin/projects/create">
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Project
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
                placeholder="Search projects..."
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
                All Projects
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

      {/* Projects Grid */}
      <div className="grid gap-6">
        {filteredProjects.map((project) => (
          <Card
            key={project.id}
            className="border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow duration-300"
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                      {project.title}
                    </h3>
                    {project.featured && (
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    )}
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        project.liveUrl
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      }`}
                    >
                      {project.liveUrl ? 'LIVE' : 'IN PROGRESS'}
                    </span>
                  </div>

                  <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 4).map((tech, index) => (
                      <span
                        key={index}
                        className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-2 py-1 rounded text-xs border border-slate-200 dark:border-slate-600"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className="bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 px-2 py-1 rounded text-xs border border-slate-200 dark:border-slate-600">
                        +{project.tags.length - 4}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 hover:text-purple-600 dark:hover:text-purple-400"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
                      </a>
                    )}
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 hover:text-purple-600 dark:hover:text-purple-400"
                      >
                        <Github className="w-4 h-4" />
                        Source Code
                      </a>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`${
                      project.featured
                        ? 'text-yellow-500'
                        : 'text-slate-600 dark:text-slate-400'
                    }`}
                    onClick={() => toggleFeatured(project.id)}
                  >
                    <Star
                      className={`w-4 h-4 ${
                        project.featured ? 'fill-current' : ''
                      }`}
                    />
                  </Button>
                  <Link href={`/admin/projects/edit/${project.id}`}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-slate-600 dark:text-slate-400"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  </Link>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="max-w-sm">
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Delete this project?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          remove the project
                          <span className="font-semibold text-slate-800 dark:text-slate-200">
                            {' '}
                            “{project.title}”{' '}
                          </span>
                          from your portfolio.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(project.id)}
                          className="bg-red-600 hover:bg-red-700 text-white"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <Card className="border-slate-200 dark:border-slate-700">
          <CardContent className="p-12 text-center">
            <Briefcase className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              No projects found
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              {searchTerm
                ? 'Try adjusting your search terms'
                : 'Get started by adding your first project'}
            </p>
            <Link href="/admin/projects/create">
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Project
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default withAuth(ProjectsPage, { requiredRole: 'ADMIN' })
