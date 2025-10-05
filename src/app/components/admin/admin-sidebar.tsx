// app/components/admin/admin-sidebar.tsx
'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Code,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { signOut } from 'next-auth/react'
import { cn } from '@/lib/utils'

const menuItems = [
  { href: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/admin/blogs', icon: FileText, label: 'Blog Posts' },
  { href: '/admin/projects', icon: Briefcase, label: 'Projects' },
  { href: '/admin/skills', icon: Code, label: 'Skills' },
  // { href: '/admin/profile', icon: User, label: 'Profile' },
  // { href: '/admin/settings', icon: Settings, label: 'Settings' },
]

interface AdminSidebarProps {
  collapsed: boolean
  onToggle: () => void
}

export function AdminSidebar({ collapsed, onToggle }: AdminSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogOut = async () => {
    await signOut({
      redirect: false,
      callbackUrl: '/admin/login',
    })
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <div className={cn(
      "bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 h-screen fixed left-0 top-0 transition-all duration-300 z-40",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Logo and Toggle */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
        <div className={cn(
          "flex items-center transition-all duration-300",
          collapsed ? "justify-center w-full" : "space-x-3"
        )}>
          <Link 
            href="/admin" 
            className="flex items-center min-w-0"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm">RA</span>
            </div>
            {!collapsed && (
              <div className="ml-3 min-w-0">
                <h1 className="font-bold text-slate-900 dark:text-white truncate">
                  Admin
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  Romjan Ali
                </p>
              </div>
            )}
          </Link>
        </div>
        
        {!collapsed && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="h-8 w-8 flex-shrink-0 ml-2"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Navigation */}
      <nav className="p-2 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || 
            (item.href !== '/admin' && pathname.startsWith(item.href))
          
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className="block"
            >
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start transition-all duration-200 group relative",
                  isActive
                    ? "bg-purple-100 dark:bg-purple-900 text-purple-900 dark:text-purple-100 border-purple-200 dark:border-purple-800"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700",
                  collapsed ? "px-2" : "px-3"
                )}
                title={collapsed ? item.label : ""}
              >
                <Icon className={cn(
                  "flex-shrink-0 transition-all duration-200",
                  collapsed ? "w-5 h-5" : "w-4 h-4 mr-3"
                )} />
                
                {!collapsed && (
                  <span className="truncate">{item.label}</span>
                )}

                {/* Tooltip for collapsed state */}
                {collapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 pointer-events-none">
                    {item.label}
                  </div>
                )}
              </Button>
            </Link>
          )
        })}
      </nav>

      {/* Mobile Toggle Button for collapsed state */}
      {collapsed && (
        <div className="absolute top-4 right-0 transform translate-x-1/2">
          <Button
            variant="secondary"
            size="icon"
            onClick={onToggle}
            className="h-8 w-8 rounded-full shadow-md border border-slate-200 dark:border-slate-600"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-2 border-t border-slate-200 dark:border-slate-700">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 group relative",
            collapsed ? "px-2" : "px-3"
          )}
          onClick={handleLogOut}
          title={collapsed ? "Logout" : ""}
        >
          <LogOut className={cn(
            "flex-shrink-0",
            collapsed ? "w-5 h-5" : "w-4 h-4 mr-3"
          )} />
          
          {!collapsed && "Logout"}

          {/* Tooltip for collapsed state */}
          {collapsed && (
            <div className="absolute left-full ml-2 px-2 py-1 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 pointer-events-none">
              Logout
            </div>
          )}
        </Button>
      </div>
    </div>
  )
}