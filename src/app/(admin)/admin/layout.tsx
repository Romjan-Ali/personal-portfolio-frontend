'use client'
import { AdminSidebar } from '@/app/components/admin/admin-sidebar'
import { AdminHeader } from '@/app/components/admin/admin-header'
import SessionProvider from '@/app/providers/session-provider'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SessionProvider>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
        <div className="flex">
          <AdminSidebar />
          <div className="flex-1 ml-64">
            <AdminHeader />
            <main className="p-6">{children}</main>
          </div>
        </div>
      </div>
    </SessionProvider>
  )
}
