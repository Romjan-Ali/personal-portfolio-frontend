'use client'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const BASE_API = process.env.NEXT_PUBLIC_API_URL

export function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  options: { requiredRole?: string; redirectTo?: string } = {}
) {
  return function AuthenticatedComponent(props: P) {
    const { data: session, status } = useSession()
    const router = useRouter()
    const [isVerifying, setIsVerifying] = useState(true)

    useEffect(() => {
      if (status === 'loading') return

      if (!session) {
        router.push(options.redirectTo || '/admin/login')
        return
      }

      if (options.requiredRole && session.user.role !== options.requiredRole) {
        router.push('/unauthorized')
        return
      }

      const accessToken = session.accessToken
      if (!accessToken) {
        signOut({ redirect: false })
        router.push(options.redirectTo || '/admin/login')
        return
      }

      const controller = new AbortController()
      ;(async () => {
        try {
          const res = await fetch(`${BASE_API}/auth/me`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
            signal: controller.signal,
          })

          if (!res.ok) {
            throw new Error('Session invalid')
          }
        } catch (error) {
          if (error instanceof DOMException && error.name === 'AbortError') {
            return
          }
          await signOut({ redirect: false })
          router.push(options.redirectTo || '/admin/login')
          return
        } finally {
          setIsVerifying(false)
        }
      })()

      return () => controller.abort()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session, status, router, options.requiredRole, options.redirectTo])

    if (status === 'loading' || isVerifying) {
      return <div>Loading...</div>
    }

    if (!session || (options.requiredRole && session.user.role !== options.requiredRole)) {
      return null
    }

    return <Component {...props} />
  }
}
