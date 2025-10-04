import { getServerSession } from 'next-auth'
import { authOptions } from './auth'
import { redirect } from 'next/navigation'
import { User } from './blog-data'

// Define UserRole type based on User['role']
export type UserRole = User['role'];

export async function getCurrentSession() {
  return await getServerSession(authOptions)
}

export async function requireAuth(redirectTo: string = '/login') {
  const session = await getCurrentSession()
  
  if (!session) {
    redirect(redirectTo)
  }
  
  return session
}

export async function requireRole(role: UserRole, redirectTo: string = '/unauthorized') {
  const session = await requireAuth('/admin/login')
  
  if (session.user.role !== role) {
    redirect(redirectTo)
  }
  
  return session
}

export async function requireAdmin(redirectTo: string = '/unauthorized') {
  return await requireRole('ADMIN', redirectTo)
}
