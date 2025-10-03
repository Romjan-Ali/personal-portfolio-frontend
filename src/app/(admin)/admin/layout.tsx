// app/admin/layout.tsx
import { Metadata } from 'next'
import { AuthProvider } from '@/app/components/auth/auth-provider'
import { ProtectedRoute } from '@/app/components/auth/protected-route'
import { AdminSidebar } from '@/app/components/admin/admin-sidebar'
import { AdminHeader } from '@/app/components/admin/admin-header'

export const metadata: Metadata = {
  title: 'Admin Dashboard - Romjan Ali',
  description: 'Manage your portfolio content',
}

console.log('admin layout')

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      {/* <ProtectedRoute> */}
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
          <div className="flex">
            <AdminSidebar />
            <div className="flex-1 ml-64">
              {/* <AdminHeader /> */}
              <main className="p-6">
                {children}
              </main>
            </div>
          </div>
        </div>
      {/* </ProtectedRoute> */}
    </AuthProvider>
  )
}