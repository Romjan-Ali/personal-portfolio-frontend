/* eslint-disable @typescript-eslint/no-explicit-any */
// app/admin/test-revalidate/page.tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { revalidateBlogPosts, revalidateBlogPost } from '@/lib/blog-data'
import { revalidateProjects, revalidateProject } from '@/lib/project-data'

export default function TestRevalidatePage() {
  const [loading, setLoading] = useState<string>('')
  const [result, setResult] = useState<any>(null)

  const testRevalidate = async (action: string, fn: () => Promise<any>) => {
    setLoading(action)
    setResult(null)
    
    try {
      const startTime = Date.now()
      const result = await fn()
      const endTime = Date.now()
      
      setResult({
        action,
        success: true,
        duration: `${endTime - startTime}ms`,
        timestamp: new Date().toISOString(),
        data: result
      })
    } catch (error) {
      setResult({
        action,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      })
      console.error(`❌ ${action} failed:`, error)
    } finally {
      setLoading('')
    }
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Test Revalidation</h1>
      
      <div className="grid grid-cols-2 gap-4">
        {/* Blog Revalidation Tests */}
        <div className="space-y-4 p-4 border rounded-lg">
          <h2 className="text-lg font-semibold">Blog Revalidation</h2>
          
          <Button
            onClick={() => testRevalidate('Revalidate All Blogs', revalidateBlogPosts)}
            disabled={!!loading}
            variant="outline"
          >
            {loading === 'Revalidate All Blogs' ? 'Revalidating...' : 'Revalidate All Blogs'}
          </Button>
          
          <Button
            onClick={() => testRevalidate('Revalidate Blog Post', () => revalidateBlogPost('test-slug'))}
            disabled={!!loading}
            variant="outline"
          >
            {loading === 'Revalidate Blog Post' ? 'Revalidating...' : 'Revalidate Single Blog'}
          </Button>
        </div>

        {/* Project Revalidation Tests */}
        <div className="space-y-4 p-4 border rounded-lg">
          <h2 className="text-lg font-semibold">Project Revalidation</h2>
          
          <Button
            onClick={() => testRevalidate('Revalidate All Projects', revalidateProjects)}
            disabled={!!loading}
            variant="outline"
          >
            {loading === 'Revalidate All Projects' ? 'Revalidating...' : 'Revalidate All Projects'}
          </Button>
          
          <Button
            onClick={() => testRevalidate('Revalidate Project', () => revalidateProject('test-id'))}
            disabled={!!loading}
            variant="outline"
          >
            {loading === 'Revalidate Project' ? 'Revalidating...' : 'Revalidate Single Project'}
          </Button>
        </div>
      </div>

      {/* Results */}
      {result && (
        <div className={`p-4 rounded-lg ${
          result.success ? 'bg-green-100 border border-green-400' : 'bg-red-100 border border-red-400'
        }`}>
          <h3 className="font-semibold">
            {result.success ? '✅ Success' : '❌ Failed'} - {result.action}
          </h3>
          <pre className="text-sm mt-2">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}

      {/* Manual API Test */}
      <div className="p-4 border rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Manual API Test</h2>
        <div className="flex gap-2">
          <Button
            onClick={() => window.open('/api/revalidate?tag=blogs', '_blank')}
            variant="outline"
          >
            Test Blogs Revalidate
          </Button>
          <Button
            onClick={() => window.open('/api/revalidate?tag=projects', '_blank')}
            variant="outline"
          >
            Test Projects Revalidate
          </Button>
        </div>
      </div>
    </div>
  )
}