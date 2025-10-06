// app/admin/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  FileText,
  Briefcase,
  Code,
  Eye,
  TrendingUp,
  Users,
  Loader2,
} from 'lucide-react'
import Link from 'next/link'
import Head from 'next/head'
import { withAuth } from '@/app/components/admin/hoc/with-auth'
import { getBlogPosts } from '@/lib/blog-data'
import { getAllProjects } from '@/lib/project-data'
import { getAllSkills } from '@/lib/skill-data'

// Define proper interfaces
interface DashboardStats {
  label: string
  value: string | number
  icon: React.ComponentType<{ className?: string }>
  change?: string
  href: string
}

interface RecentActivity {
  action: string
  title: string
  time: string
  type: 'blog' | 'project' | 'skill' | 'profile'
}

interface PaginationMeta {
  page: number
  limit: number
  total: number
  pages: number
}
interface BlogPost {
  id: string
  title: string
  published: boolean
  createdAt: string
  updatedAt: string
  pagination: PaginationMeta
}

interface Project {
  id: string
  title: string
  createdAt: string
  updatedAt: string
}

interface Skill {
  id: string
  name: string
  createdAt: string
  updatedAt: string
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats[]>([])
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchDashboardData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Fetch data from all APIs in parallel
      const [blogsData, projectsData, skillsData] = await Promise.all([
        getBlogPosts({ limit: 1000 }),
        getAllProjects(),
        getAllSkills(),
      ])

      // Calculate counts with proper type checking
      const totalBlogs = Array.isArray(blogsData)
        ? blogsData.length
        : (blogsData as BlogPost)?.pagination?.total || 0
      const totalProjects = Array.isArray(projectsData)
        ? projectsData.length
        : (projectsData as BlogPost)?.pagination?.total || 0
      const totalSkills = Array.isArray(skillsData) ? skillsData.length : 0

      console.log('blogs data', blogsData.data)

      const publishedBlogs = Array.isArray(blogsData.data)
        ? (blogsData.data as BlogPost[]).filter((blog) => blog.published).length
        : 0

      // Update stats
      setStats([
        {
          label: 'Total Blog Posts',
          value: totalBlogs,
          icon: FileText,
          change: '+12%',
          href: '/admin/blogs',
        },
        {
          label: 'Projects',
          value: totalProjects,
          icon: Briefcase,
          change: '+5%',
          href: '/admin/projects',
        },
        {
          label: 'Skills',
          value: totalSkills,
          icon: Code,
          change: '+3%',
          href: '/admin/skills',
        },
        {
          label: 'Published Posts',
          value: publishedBlogs,
          icon: Eye,
          change: '+18%',
          href: '/admin/blogs',
        },
      ])

      // Generate recent activities from the data
      const activities: RecentActivity[] = []

      // Add recent blog activities
      if (Array.isArray(blogsData)) {
        const recentBlogs = (blogsData as BlogPost[])
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .slice(0, 2)

        recentBlogs.forEach((blog) => {
          activities.push({
            action: blog.published
              ? 'Published new blog post'
              : 'Created draft blog post',
            title: blog.title,
            time: formatTimeAgo(blog.createdAt),
            type: 'blog',
          })
        })
      }

      // Add recent project activities
      if (Array.isArray(projectsData)) {
        const recentProjects = (projectsData as Project[])
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .slice(0, 1)

        recentProjects.forEach((project) => {
          activities.push({
            action: 'Updated project',
            title: project.title,
            time: formatTimeAgo(project.updatedAt),
            type: 'project',
          })
        })
      }

      // Add recent skill activities
      if (Array.isArray(skillsData)) {
        const recentSkills = (skillsData as Skill[])
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .slice(0, 1)

        recentSkills.forEach((skill) => {
          activities.push({
            action: 'Added new skill',
            title: skill.name,
            time: formatTimeAgo(skill.createdAt),
            type: 'skill',
          })
        })
      }

      // Sort all activities by time
      setRecentActivities(
        activities
          .sort(
            (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
          )
          .slice(0, 4)
      )
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err)
      setError('Failed to load dashboard data')
      // Set fallback data
      setStats(getFallbackStats())
      setRecentActivities(getFallbackActivities())
    } finally {
      setLoading(false)
    }
  }

  const formatTimeAgo = (dateString: string): string => {
    try {
      const date = new Date(dateString)
      const now = new Date()
      const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

      if (diffInSeconds < 60) return 'Just now'
      if (diffInSeconds < 3600)
        return `${Math.floor(diffInSeconds / 60)} minutes ago`
      if (diffInSeconds < 86400)
        return `${Math.floor(diffInSeconds / 3600)} hours ago`
      if (diffInSeconds < 604800)
        return `${Math.floor(diffInSeconds / 86400)} days ago`
      return date.toLocaleDateString()
    } catch {
      return 'Recently'
    }
  }

  const getFallbackStats = (): DashboardStats[] => [
    {
      label: 'Total Blog Posts',
      value: '0',
      icon: FileText,
      change: '+0%',
      href: '/admin/blogs',
    },
    {
      label: 'Projects',
      value: '0',
      icon: Briefcase,
      change: '+0%',
      href: '/admin/projects',
    },
    {
      label: 'Skills',
      value: '0',
      icon: Code,
      change: '+0%',
      href: '/admin/skills',
    },
    {
      label: 'Published Posts',
      value: '0',
      icon: Eye,
      change: '+0%',
      href: '/admin/blogs',
    },
  ]

  const getFallbackActivities = (): RecentActivity[] => [
    {
      action: 'Welcome to your dashboard',
      title: 'Start by creating your first blog post',
      time: 'Just now',
      type: 'blog',
    },
  ]

  // Render icon component properly
  const renderIcon = (
    IconComponent: React.ComponentType<{ className?: string }>,
    className: string = ''
  ) => {
    return <IconComponent className={className} />
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              Dashboard
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Loading your portfolio data...
            </p>
          </div>
          <Button
            variant="outline"
            className="border-slate-300 dark:border-slate-600"
            disabled
          >
            {renderIcon(Eye, 'w-4 h-4 mr-2')}
            View Site
          </Button>
        </div>

        {/* Loading Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((index) => (
            <Card
              key={index}
              className="border-slate-200 dark:border-slate-700"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-24 mb-2 animate-pulse"></div>
                    <div className="h-8 bg-slate-300 dark:bg-slate-700 rounded w-16 mb-1 animate-pulse"></div>
                    <div className="h-3 bg-slate-300 dark:bg-slate-700 rounded w-20 animate-pulse"></div>
                  </div>
                  <div className="p-3 bg-slate-300 dark:bg-slate-700 rounded-lg animate-pulse">
                    <div className="w-6 h-6"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Loading Recent Activity */}
          <Card className="border-slate-200 dark:border-slate-700">
            <CardHeader>
              <CardTitle className="flex items-center">
                {renderIcon(TrendingUp, 'w-5 h-5 mr-2')}
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 animate-pulse"
                  >
                    <div className="w-2 h-2 bg-slate-300 dark:bg-slate-700 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-32 mb-1"></div>
                      <div className="h-3 bg-slate-300 dark:bg-slate-700 rounded w-24 mb-1"></div>
                      <div className="h-2 bg-slate-300 dark:bg-slate-700 rounded w-16"></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Loading Quick Actions */}
          <Card className="border-slate-200 dark:border-slate-700">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((index) => (
                  <div
                    key={index}
                    className="h-20 bg-slate-300 dark:bg-slate-700 rounded animate-pulse"
                  ></div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Admin Dashboard | Romjan Ali</title>
        <meta
          name="description"
          content="Manage your site content, blogs, and projects from the admin dashboard."
        />        
      </Head>

      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              Dashboard
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Welcome back! Here&apos;s what&apos;s happening with your
              portfolio.
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={fetchDashboardData}
              className="border-slate-300 dark:border-slate-600"
              disabled={loading}
            >
              {renderIcon(
                Loader2,
                `w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`
              )}
              Refresh
            </Button>
            <Link href="/">
              <Button
                variant="outline"
                className="border-slate-300 dark:border-slate-600"
              >
                {renderIcon(Eye, 'w-4 h-4 mr-2')}
                View Site
              </Button>
            </Link>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <p className="text-red-700 dark:text-red-400">{error}</p>
            <Button
              variant="outline"
              size="sm"
              onClick={fetchDashboardData}
              className="mt-2"
            >
              {renderIcon(Loader2, 'w-4 h-4 mr-2')}
              Retry
            </Button>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Link key={index} href={stat.href}>
              <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer border-slate-200 dark:border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                        {stat.label}
                      </p>
                      <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                        {stat.value}
                      </p>
                      {stat.change && (
                        <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                          {stat.change} from last month
                        </p>
                      )}
                    </div>
                    <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                      {renderIcon(
                        stat.icon,
                        'w-6 h-6 text-purple-600 dark:text-purple-400'
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <Card className="border-slate-200 dark:border-slate-700">
            <CardHeader>
              <CardTitle className="flex items-center">
                {renderIcon(TrendingUp, 'w-5 h-5 mr-2')}
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div
                      className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                        activity.type === 'blog'
                          ? 'bg-blue-500'
                          : activity.type === 'project'
                          ? 'bg-green-500'
                          : activity.type === 'skill'
                          ? 'bg-purple-500'
                          : 'bg-gray-500'
                      }`}
                    ></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900 dark:text-white">
                        {activity.action}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {activity.title}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
                {recentActivities.length === 0 && (
                  <p className="text-sm text-slate-500 dark:text-slate-400 text-center py-4">
                    No recent activity
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-slate-200 dark:border-slate-700">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Link href="/admin/blogs/create">
                  <Button className="w-full h-20 flex-col bg-purple-600 hover:bg-purple-700 text-white">
                    {renderIcon(FileText, 'w-6 h-6 mb-2')}
                    New Blog Post
                  </Button>
                </Link>
                <Link href="/admin/projects/create">
                  <Button
                    variant="outline"
                    className="w-full h-20 flex-col border-slate-300 dark:border-slate-600"
                  >
                    {renderIcon(Briefcase, 'w-6 h-6 mb-2')}
                    Add Project
                  </Button>
                </Link>
                <Link href="/admin/skills/create">
                  <Button
                    variant="outline"
                    className="w-full h-20 flex-col border-slate-300 dark:border-slate-600"
                  >
                    {renderIcon(Code, 'w-6 h-6 mb-2')}
                    Manage Skills
                  </Button>
                </Link>
                <Link href="/admin/profile">
                  <Button
                    variant="outline"
                    className="w-full h-20 flex-col border-slate-300 dark:border-slate-600"
                  >
                    {renderIcon(Users, 'w-6 h-6 mb-2')}
                    Edit Profile
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

export default withAuth(AdminDashboard, { requiredRole: 'ADMIN' })
