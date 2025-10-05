'use client'
import { AdminSidebar } from '@/app/components/admin/admin-sidebar'
import { AdminHeader } from '@/app/components/admin/admin-header'
import SessionProvider from '@/app/providers/session-provider'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const pathname = usePathname()
  const isLoginPage = pathname === '/admin/login'

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  return (
    <SessionProvider>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
        {!isLoginPage ? (
          <div className="flex">
            <AdminSidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
            <div
              className={`flex-1 transition-all duration-300 ${
                sidebarCollapsed ? 'ml-20' : 'ml-64'
              }`}
            >
              <AdminHeader />
              <main className="p-6">{children}</main>
            </div>
          </div>
        ) : (
          // Login page layout - no sidebar or header
          <div>
            <main>{children}</main>
          </div>
        )}
      </div>
    </SessionProvider>
  )
}