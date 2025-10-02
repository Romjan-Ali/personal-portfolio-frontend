// app/components/blog/blog-search.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, X, Tag } from 'lucide-react'

interface BlogSearchProps {
  tags: string[]
  initialSearch?: string
  initialTag?: string
}

export function BlogSearch({
  tags,
  initialSearch = '',
  initialTag = '',
}: BlogSearchProps) {
  const router = useRouter()
  const [search, setSearch] = useState(initialSearch)
  const [selectedTag, setSelectedTag] = useState(initialTag)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (search) params.set('search', search)
    if (selectedTag) params.set('tag', selectedTag)
      console.log({params})
    router.push(`/blog?${params.toString()}`)
  }

  const clearFilters = () => {
    setSearch('')
    setSelectedTag('')
    router.push('/blog')
  }

  const popularTags = tags.slice(0, 8)

  return (
    <div className="space-y-6">
      {/* Search Form */}
      <form onSubmit={handleSearch} className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-3 rounded-full border-slate-300 focus:border-purple-500"
          />
        </div>
        <Button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 rounded-full"
        >
          Search
        </Button>
        {(search || selectedTag) && (
          <Button
            type="button"
            variant="outline"
            onClick={clearFilters}
            className="border-slate-300 text-slate-700 rounded-full"
          >
            <X className="w-4 h-4 mr-2" />
            Clear
          </Button>
        )}
      </form>

      {/* Popular Tags */}
      <div>
        <h3 className="text-sm font-semibold text-slate-900 mb-3 flex items-center">
          <Tag className="w-4 h-4 mr-2" />
          Popular Topics
        </h3>
        <div className="flex flex-wrap gap-2">
          {popularTags.map((tag) => (
            <button
              key={tag}
              onClick={() => {
                setSelectedTag(tag)
                const params = new URLSearchParams()
                params.set('tag', tag)
                if (search) params.set('search', search)
                router.push(`/blog?${params.toString()}`)
              }}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedTag === tag
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
              }`}
            >
              {tag}
            </button>
          ))}
          {tags.length > 8 && (
            <button
              onClick={() => router.push('/blog')}
              className="px-3 py-1 rounded-full text-sm font-medium bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
            >
              View All
            </button>
          )}
        </div>
      </div>

      {/* Active Filters */}
      {(search || selectedTag) && (
        <div className="flex items-center space-x-2 text-sm">
          <span className="text-slate-600">Active filters:</span>
          {search && (
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full flex items-center">
              Search: {search}
              <button
                onClick={() => {
                  setSearch('')
                  const params = new URLSearchParams()
                  if (selectedTag) params.set('tag', selectedTag)
                  router.push(`/blog?${params.toString()}`)
                }}
                className="ml-2 hover:text-blue-600"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {selectedTag && (
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full flex items-center">
              Tag: {selectedTag}
              <button
                onClick={() => {
                  setSelectedTag('')
                  const params = new URLSearchParams()
                  if (search) params.set('search', search)
                  router.push(`/blog?${params.toString()}`)
                }}
                className="ml-2 hover:text-green-600"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  )
}
