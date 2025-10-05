// app/components/blog/blog-card.tsx
import Link from 'next/link'
import { Calendar, Clock } from 'lucide-react'
import { calculateReadTime, extractTags } from '@/lib/blog-data'

interface BlogCardProps {
  post: {
    id: string
    title: string
    slug: string
    summary: string
    thumbnail?: string
    content: string
    createdAt: string
    author?: {
      name?: string
      profileImage?: string
    }
  }
}

export function BlogCard({ post }: BlogCardProps) {
  const readTime = calculateReadTime(post.content)
  const tags = extractTags(post.content)

  return (
    <article className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-500 transition-all duration-500 hover:shadow-xl dark:hover:shadow-slate-900/50">
      {/* Thumbnail */}
      <Link href={`/blog/${post.slug}`}>
        <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600 overflow-hidden">
          {post.thumbnail ? (
            <div 
              className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
              style={{ backgroundImage: `url(${post.thumbnail})` }}
            />
          ) : (
            <div className="absolute inset-0 bg-slate-900/30 dark:bg-slate-900/50 flex items-center justify-center group-hover:bg-slate-900/10 dark:group-hover:bg-slate-900/30 transition-colors duration-300">
              <span className="text-white font-semibold">Blog Image</span>
            </div>
          )}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
        </div>
      </Link>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4 text-sm text-slate-500 dark:text-slate-400">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {new Date(post.createdAt).toLocaleDateString()}
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {readTime} min
            </div>
          </div>
        </div>

        <Link href={`/blog/${post.slug}`}>
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300 line-clamp-2 leading-tight">
            {post.title}
          </h3>
        </Link>

        <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed line-clamp-3">
          {post.summary}
        </p>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span 
                key={index}
                className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-2 py-1 rounded-md text-xs border border-slate-300 dark:border-slate-600"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}