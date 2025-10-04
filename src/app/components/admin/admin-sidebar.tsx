// app/components/admin/admin-sidebar.tsx
'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Code,
  Settings,
  LogOut,
  User,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { signOut } from 'next-auth/react'

const menuItems = [
  { href: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/admin/blogs', icon: FileText, label: 'Blog Posts' },
  { href: '/admin/projects', icon: Briefcase, label: 'Projects' },
  { href: '/admin/skills', icon: Code, label: 'Skills' },
  { href: '/admin/profile', icon: User, label: 'Profile' },
  { href: '/admin/settings', icon: Settings, label: 'Settings' },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogOut = async () => {
    await signOut({
      redirect: false,
      callbackUrl: '/admin/login',
    })
    // Redirect after sign out
    router.push('/admin/login')
    router.refresh() // Refresh the router to update the session state
  }

  return (
    <div className="w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 h-screen fixed left-0 top-0 transition-colors duration-300">
      {/* Logo */}
      <div className="p-6 border-b border-slate-200 dark:border-slate-700">
        <Link href="/admin" className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">RA</span>
          </div>
          <div>
            <h1 className="font-bold text-slate-900 dark:text-white">Admin</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Romjan Ali
            </p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive ? 'secondary' : 'ghost'}
                className={`w-full justify-start ${
                  isActive
                    ? 'bg-purple-100 dark:bg-purple-900 text-purple-900 dark:text-purple-100'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <item.icon className="w-4 h-4 mr-3" />
                {item.label}
              </Button>
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200 dark:border-slate-700">
        <Button
          variant="ghost"
          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
          onClick={handleLogOut}
        >
          <LogOut className="w-4 h-4 mr-3" />
          Logout
        </Button>
      </div>
    </div>
  )
}
