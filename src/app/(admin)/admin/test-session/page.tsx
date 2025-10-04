// app/admin/test-session/page.tsx
'use client'

import { useSession } from 'next-auth/react'

export default function TestSession() {
  const { data: session, status } = useSession()

  if (status === 'loading') return <div>Loading...</div>

  return (
    <div className="p-8">
      <h1>Session Test</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <div className="mt-4">
        <h2>Cookie Check:</h2>
        <p>Has session: {session ? 'Yes' : 'No'}</p>
        <p>Has accessToken: {session?.accessToken ? 'Yes' : 'No'}</p>
        <p>User role: {session?.user?.role}</p>
      </div>
    </div>
  )
}