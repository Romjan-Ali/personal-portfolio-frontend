// app/admin/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  FileText,
  Briefcase,
  Code,
  Eye,
  TrendingUp,
  Users,
} from 'lucide-react'
import Link from 'next/link'

// Mock data - replace with actual API calls
const stats = [
  {
    label: 'Total Blog Posts',
    value: '24',
    icon: FileText,
    change: '+12%',
    href: '/admin/blogs',
  },
  {
    label: 'Projects',
    value: '15',
    icon: Briefcase,
    change: '+5%',
    href: '/admin/projects',
  },
  {
    label: 'Skills',
    value: '20',
    icon: Code,
    change: '+3%',
    href: '/admin/skills',
  },
  {
    label: 'Monthly Views',
    value: '2.4K',
    icon: Eye,
    change: '+18%',
    href: '/admin/analytics',
  },
]

const recentActivities = [
  {
    action: 'Published new blog post',
    title: 'React Best Practices 2024',
    time: '2 hours ago',
  },
  {
    action: 'Updated project',
    title: 'Job Portal Platform',
    time: '1 day ago',
  },
  { action: 'Added new skill', title: 'Next.js 14', time: '2 days ago' },
  {
    action: 'Updated profile',
    title: 'Personal information',
    time: '3 days ago',
  },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Welcome back, Romjan! Here&apos;s what&apos;s happening with your portfolio.
          </p>
        </div>
        <Link href="/">
          <Button
            variant="outline"
            className="border-slate-300 dark:border-slate-600"
          >
            <Eye className="w-4 h-4 mr-2" />
            View Site
          </Button>
        </Link>
      </div>

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
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                      {stat.change} from last month
                    </p>
                  </div>
                  <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                    <stat.icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
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
              <TrendingUp className="w-5 h-5 mr-2" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
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
                  <FileText className="w-6 h-6 mb-2" />
                  New Blog Post
                </Button>
              </Link>
              <Link href="/admin/projects/create">
                <Button
                  variant="outline"
                  className="w-full h-20 flex-col border-slate-300 dark:border-slate-600"
                >
                  <Briefcase className="w-6 h-6 mb-2" />
                  Add Project
                </Button>
              </Link>
              <Link href="/admin/skills/create">
                <Button
                  variant="outline"
                  className="w-full h-20 flex-col border-slate-300 dark:border-slate-600"
                >
                  <Code className="w-6 h-6 mb-2" />
                  Manage Skills
                </Button>
              </Link>
              <Link href="/admin/profile">
                <Button
                  variant="outline"
                  className="w-full h-20 flex-col border-slate-300 dark:border-slate-600"
                >
                  <Users className="w-6 h-6 mb-2" />
                  Edit Profile
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
