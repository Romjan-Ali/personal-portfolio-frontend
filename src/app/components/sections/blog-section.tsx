// app/components/sections/blog-section.tsx
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, ArrowRight, Eye, FileText } from 'lucide-react'
import {
  getBlogPosts,
  calculateReadTime,
  extractTags,
  BlogPost,
} from '@/lib/blog-data'

export async function BlogSection() {
  const {data: blogs} = await getBlogPosts({ limit: 3, published: true })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <section id="blog" className="py-20 bg-slate-200 dark:bg-slate-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Latest Articles
          </h2>
          <div className="w-24 h-1 bg-purple-600 mx-auto mb-6"></div>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Insights, tutorials, and thoughts on web development, programming,
            and technology trends
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {blogs?.map((blog: BlogPost) => {
            const readTime = calculateReadTime(blog.content)
            const tags = extractTags(blog.content)

            return (
              <article
                key={blog.id}
                className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden 
                border border-slate-200 dark:border-slate-700 
                hover:border-purple-300 dark:hover:border-purple-500 
                transition-all duration-500 hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-slate-900/50"
              >
                {/* Blog Image */}
                <Link href={`/blog/${blog.slug}`}>
                  <div className="relative h-48 bg-gradient-to-br from-purple-500 to-blue-600 overflow-hidden">
                    {blog.thumbnail ? (
                      <div
                        className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                        style={{ backgroundImage: `url(${blog.thumbnail})` }}
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
                        <div className="text-white text-center">
                          <FileText className="w-8 h-8 mx-auto mb-2 opacity-80" />
                          <span className="font-semibold text-sm">{blog.title.split(' ').slice(0, 2).join(' ')}</span>
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />

                    {/* Tag */}
                    {tags.length > 0 && (
                      <div className="absolute top-4 left-4">
                        <span
                          className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm 
                          text-slate-900 dark:text-slate-100 
                          px-3 py-1 rounded-full text-sm font-medium border border-white/20"
                        >
                          {tags[0]}
                        </span>
                      </div>
                    )}

                    {/* Views */}
                    <div className="absolute top-4 right-4 flex items-center text-white/90 text-sm bg-black/40 backdrop-blur-sm px-2 py-1 rounded-full border border-white/20">
                      <Eye className="w-4 h-4 mr-1" />
                      {blog.views.toLocaleString()}
                    </div>
                  </div>
                </Link>

                {/* Blog Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-4 text-sm text-slate-500 dark:text-slate-400">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDate(blog.createdAt)}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {readTime} min read
                      </div>
                    </div>
                  </div>

                  <Link href={`/blog/${blog.slug}`}>
                    <h3
                      className="text-xl font-bold text-slate-900 dark:text-white mb-3 
                    group-hover:text-purple-600 dark:group-hover:text-purple-400 
                    transition-colors duration-300 line-clamp-2 leading-tight"
                    >
                      {blog.title}
                    </h3>
                  </Link>

                  <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed line-clamp-3">
                    {blog.summary}
                  </p>

                  {/* Tags */}
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="bg-slate-100 dark:bg-slate-700/80 text-slate-700 dark:text-slate-200 
                          px-3 py-1 rounded-full text-xs font-medium border border-slate-200 dark:border-slate-600
                          hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors duration-200"
                        >
                          {tag}
                        </span>
                      ))}
                      {tags.length > 3 && (
                        <span
                          className="bg-slate-100 dark:bg-slate-700/80 text-slate-500 dark:text-slate-400 
                          px-3 py-1 rounded-full text-xs font-medium border border-slate-200 dark:border-slate-600"
                        >
                          +{tags.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Read More Button - Centered */}
                  <div className="flex justify-center pt-4 border-t border-slate-200 dark:border-slate-700">
                    <Link href={`/blog/${blog.slug}`} className="w-full">
                      <Button
                        variant="ghost"
                        className="w-full text-purple-600 dark:text-purple-400 
                        hover:text-purple-700 dark:hover:text-purple-300 
                        hover:bg-purple-50 dark:hover:bg-purple-900/20 
                        p-2 group/btn justify-center"
                      >
                        Read Full Article
                        <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <Link href="/blog">
            <Button
              size="lg"
              variant="outline"
              className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white 
              dark:border-purple-400 dark:text-purple-400 
              dark:hover:bg-purple-500 dark:hover:text-white 
              px-8 py-3 rounded-full transition-all duration-300 hover:scale-105"
            >
              View All Articles
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
