'use client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  options: { requiredRole?: string; redirectTo?: string } = {}
) {
  return function AuthenticatedComponent(props: P) {
    const { data: session, status } = useSession()
    const router = useRouter()

    useEffect(() => {
      if (status === 'loading') return

      if (!session) {
        router.push(options.redirectTo || '/admin/login')
        return
      }

      if (options.requiredRole && session.user.role !== options.requiredRole) {
        router.push('/unauthorized')
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session, status, router, options.requiredRole, options.redirectTo])

    if (status === 'loading') {
      return <div>Loading...</div>
    }

    if (!session || (options.requiredRole && session.user.role !== options.requiredRole)) {
      return null
    }

    return <Component {...props} />
  }
}