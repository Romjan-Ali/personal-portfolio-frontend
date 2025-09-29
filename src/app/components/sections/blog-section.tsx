// app/components/sections/blog-section.tsx
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, ArrowRight, Eye } from 'lucide-react'
import { getBlogPosts, calculateReadTime, extractTags } from '@/lib/blog-data'

export function BlogSection() {
  const blogs = getBlogPosts({ limit: 3 })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <section id="blog" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Latest Articles
          </h2>
          <div className="w-24 h-1 bg-purple-600 mx-auto mb-6"></div>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Insights, tutorials, and thoughts on web development, programming,
            and technology trends
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {blogs.map((blog) => {
            const readTime = calculateReadTime(blog.content)
            const tags = extractTags(blog.content)
            
            return (
              <article
                key={blog.id}
                className="group bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 hover:border-purple-300 transition-all duration-500 hover:shadow-xl"
              >
                {/* Blog Image */}
                <Link href={`/blog/${blog.slug}`}>
                  <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600 overflow-hidden">
                    {blog.thumbnail ? (
                      <div 
                        className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                        style={{ backgroundImage: `url(${blog.thumbnail})` }}
                      />
                    ) : (
                      <div className="absolute inset-0 bg-slate-900/30 flex items-center justify-center group-hover:bg-slate-900/10 transition-colors duration-300">
                        <span className="text-white font-semibold">Blog Image</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                    
                    {/* Tag */}
                    {tags.length > 0 && (
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/90 backdrop-blur-sm text-slate-900 px-3 py-1 rounded-full text-sm font-medium">
                          {tags[0]}
                        </span>
                      </div>
                    )}
                    
                    {/* Views */}
                    <div className="absolute top-4 right-4 flex items-center text-white/90 text-sm bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full">
                      <Eye className="w-4 h-4 mr-1" />
                      {blog.views.toLocaleString()}
                    </div>
                  </div>
                </Link>

                {/* Blog Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-4 text-sm text-slate-500">
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
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-purple-600 transition-colors duration-300 line-clamp-2 leading-tight">
                      {blog.title}
                    </h3>
                  </Link>

                  <p className="text-slate-600 mb-4 leading-relaxed line-clamp-3">
                    {blog.summary}
                  </p>

                  {/* Tags */}
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="bg-white text-slate-700 px-2 py-1 rounded-md text-xs border border-slate-300"
                        >
                          {tag}
                        </span>
                      ))}
                      {tags.length > 3 && (
                        <span className="bg-white text-slate-500 px-2 py-1 rounded-md text-xs border border-slate-300">
                          +{tags.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Author and Read More */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-slate-300 rounded-full flex items-center justify-center mr-3">
                        {blog.author?.profileImage ? (
                          <img 
                            src={blog.author.profileImage} 
                            alt={blog.author.name}
                            className="w-8 h-8 rounded-full"
                          />
                        ) : (
                          <span className="text-xs font-bold text-slate-600">
                            {blog.author?.name?.charAt(0) || 'J'}
                          </span>
                        )}
                      </div>
                      <span className="text-sm text-slate-700 font-medium">
                        {blog.author?.name || 'John Doe'}
                      </span>
                    </div>

                    <Link href={`/blog/${blog.slug}`}>
                      <Button
                        variant="ghost"
                        className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 p-0 group/btn"
                      >
                        Read More
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
              className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-8 py-3 rounded-full"
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