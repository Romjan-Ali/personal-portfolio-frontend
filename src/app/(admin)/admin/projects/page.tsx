// app/admin/projects/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
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

// Mock data - replace with actual API calls
const mockProjects = [
  {
    id: '1',
    title: 'Job Portal Platform',
    description:
      'A full-stack job portal where users can post jobs, apply, and manage applications.',
    technologies: [
      'Next.js',
      'TypeScript',
      'PostgreSQL',
      'Prisma',
      'TailwindCSS',
    ],
    liveUrl: 'https://jobportal-demo.vercel.app',
    githubUrl: 'https://github.com/romjan-ali/jobportal',
    featured: true,
    status: 'COMPLETED' as const,
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    title: 'Chat Application',
    description:
      'A real-time chat app with private and group messaging, typing indicators, and file sharing.',
    technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Zustand'],
    liveUrl: 'https://chatapp-demo.vercel.app',
    githubUrl: 'https://github.com/romjan-ali/chatapp',
    featured: true,
    status: 'COMPLETED' as const,
    createdAt: '2024-01-10T14:30:00Z',
  },
]

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [projects, setProjects] = useState(mockProjects)

  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter((project) => project.id !== id))
      // Add API call here
    }
  }

  const toggleFeatured = (id: string) => {
    setProjects(
      projects.map((project) =>
        project.id === id
          ? { ...project, featured: !project.featured }
          : project
      )
    )
    // Add API call here
  }

  return (
    <div className="space-y-6">
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
                        project.status === 'COMPLETED'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>

                  <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 4).map((tech, index) => (
                      <span
                        key={index}
                        className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-2 py-1 rounded text-xs border border-slate-200 dark:border-slate-600"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 px-2 py-1 rounded text-xs border border-slate-200 dark:border-slate-600">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 hover:text-purple-600 dark:hover:text-purple-400"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 hover:text-purple-600 dark:hover:text-purple-400"
                    >
                      <Github className="w-4 h-4" />
                      Source Code
                    </a>
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
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                    onClick={() => handleDelete(project.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
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
