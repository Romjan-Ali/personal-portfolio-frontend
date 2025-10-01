// components/blog-list.tsx
'use client'

import { useState } from 'react'
import { useBlogs } from '@/hooks/use-blogs'
import { BlogCard } from './blog-card'
import { Button } from '@/components/ui/button' 
import { Input } from '@/components/ui/input' 
import { Search, Loader2 } from 'lucide-react'

export function BlogList() {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const { blogs, loading, error, pagination } = useBlogs({
    page: currentPage,
    limit: 9,
    search: searchTerm || undefined,
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentPage(1) // Reset to first page on new search
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">Error: {error}</p>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex gap-4 max-w-md">
        <Input
          type="text"
          placeholder="Search blogs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" disabled={loading}>
          <Search className="w-4 h-4 mr-2" />
          Search
        </Button>
      </form>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
        </div>
      )}

      {/* Blog Grid */}
      {!loading && blogs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No blogs found.</p>
          {searchTerm && (
            <Button
              variant="outline"
              onClick={() => setSearchTerm('')}
              className="mt-4"
            >
              Clear Search
            </Button>
          )}
        </div>
      )}

      {!loading && blogs.length > 0 && (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>

          {/* Pagination */}
          {pagination && pagination.pages > 1 && (
            <div className="flex justify-center items-center space-x-4 pt-8">
              <Button
                variant="outline"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Previous
              </Button>

              <span className="text-sm text-gray-600">
                Page {currentPage} of {pagination.pages}
              </span>

              <Button
                variant="outline"
                disabled={currentPage === pagination.pages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
