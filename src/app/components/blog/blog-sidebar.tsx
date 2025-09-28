// app/components/blog/blog-sidebar.tsx
import Link from 'next/link'
import { getBlogPosts } from '@/lib/blog-data'
import { Button } from '@/components/ui/button'
import { Calendar, ArrowRight } from 'lucide-react'

interface BlogSidebarProps {
  currentPost?: {
    id: string
    slug: string
  }
}

export function BlogSidebar({ currentPost }: BlogSidebarProps) {
  const recentPosts = getBlogPosts({ limit: 5 })

  return (
    <div className="space-y-8">
      {/* About Author */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">About the Author</h3>
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">JD</span>
          </div>
          <div>
            <div className="font-semibold text-slate-900">John Doe</div>
            <div className="text-sm text-slate-600">Full Stack Developer</div>
          </div>
        </div>
        <p className="text-slate-600 text-sm leading-relaxed mb-4">
          Passionate about creating exceptional digital experiences with modern technologies. 
          I write about web development, programming, and technology trends.
        </p>
        <Link href="/#about">
          <Button variant="outline" size="sm" className="w-full border-slate-300 text-slate-700">
            Learn More
          </Button>
        </Link>
      </div>

      {/* Recent Posts */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-purple-600" />
          Recent Posts
        </h3>
        <div className="space-y-3">
          {recentPosts
            .filter(post => !currentPost || post.id !== currentPost.id)
            .slice(0, 4)
            .map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="block group"
              >
                <div className="flex items-start space-x-3 p-2 rounded-lg hover:bg-slate-50 transition-colors duration-200">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-slate-900 group-hover:text-purple-600 transition-colors line-clamp-2 leading-snug">
                      {post.title}
                    </h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-slate-500">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
        <Link href="/blog">
          <Button variant="ghost" size="sm" className="w-full mt-3 text-slate-600 hover:text-slate-900">
            View All Posts
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-6 text-white">
        <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
        <p className="text-purple-100 text-sm mb-4 leading-relaxed">
          Get the latest articles and news delivered to your inbox.
        </p>
        <form className="space-y-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-white/50"
          />
          <Button 
            type="submit"
            className="w-full bg-white text-purple-600 hover:bg-slate-100 font-semibold rounded-lg"
          >
            Subscribe
          </Button>
        </form>
        <p className="text-xs text-purple-200 mt-3 text-center">
          No spam. Unsubscribe at any time.
        </p>
      </div>
    </div>
  )
}