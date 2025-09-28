// app/components/sections/blog-section.tsx
import { Button } from '@/components/ui/button'
import { Calendar, Clock, ArrowRight, Eye } from 'lucide-react'

export function BlogSection() {
  const blogs = [
    {
      id: '1',
      title: 'React Best Practices for 2024',
      excerpt: 'Essential patterns and practices for building maintainable React applications in 2024. Learn about hooks optimization, component composition, and performance tips.',
      image: '/blog/react-best-practices.jpg',
      publishedAt: '2024-01-15T10:00:00Z',
      readTime: 8,
      author: {
        name: 'John Doe',
        avatar: '/authors/john-doe.jpg'
      },
      tags: ['React', 'JavaScript', 'Best Practices'],
      views: 1247
    },
    {
      id: '2',
      title: 'Node.js Performance Optimization',
      excerpt: 'Comprehensive guide to optimizing Node.js applications for better performance. Covers clustering, caching strategies, and memory management techniques.',
      image: '/blog/nodejs-performance.jpg',
      publishedAt: '2024-01-10T14:30:00Z',
      readTime: 12,
      author: {
        name: 'John Doe',
        avatar: '/authors/john-doe.jpg'
      },
      tags: ['Node.js', 'Performance', 'Backend'],
      views: 892
    },
    {
      id: '3',
      title: 'Advanced TypeScript Patterns',
      excerpt: 'Dive deep into advanced TypeScript features and patterns for robust applications. Explore conditional types, template literals, and advanced generics.',
      image: '/blog/typescript-advanced.jpg',
      publishedAt: '2024-01-05T09:15:00Z',
      readTime: 15,
      author: {
        name: 'John Doe',
        avatar: '/authors/john-doe.jpg'
      },
      tags: ['TypeScript', 'Advanced', 'Patterns'],
      views: 1563
    }
  ]

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
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
            Insights, tutorials, and thoughts on web development, programming, and technology trends
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {blogs.map((blog) => (
            <article 
              key={blog.id}
              className="group bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 hover:border-purple-300 transition-all duration-500 hover:shadow-xl"
            >
              {/* Blog Image */}
              <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600 overflow-hidden">
                <div className="absolute inset-0 bg-slate-900/30 flex items-center justify-center">
                  <span className="text-white font-semibold">Blog Image</span>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm text-slate-900 px-3 py-1 rounded-full text-sm font-medium">
                    {blog.tags[0]}
                  </span>
                </div>
              </div>

              {/* Blog Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-4 text-sm text-slate-500">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(blog.publishedAt)}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {blog.readTime} min read
                    </div>
                  </div>
                  <div className="flex items-center text-slate-500 text-sm">
                    <Eye className="w-4 h-4 mr-1" />
                    {blog.views}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-purple-600 transition-colors duration-300 line-clamp-2">
                  {blog.title}
                </h3>

                <p className="text-slate-600 mb-4 leading-relaxed line-clamp-3">
                  {blog.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {blog.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="bg-white text-slate-700 px-2 py-1 rounded-md text-xs border border-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Author and Read More */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-slate-300 rounded-full flex items-center justify-center mr-3">
                      <span className="text-xs font-bold">JD</span>
                    </div>
                    <span className="text-sm text-slate-700 font-medium">{blog.author.name}</span>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 p-0 group/btn"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            size="lg" 
            variant="outline"
            className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-8 py-3 rounded-full"
          >
            View All Articles
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  )
}