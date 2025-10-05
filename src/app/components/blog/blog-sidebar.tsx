// app/components/blog/blog-sidebar.tsx
import Link from 'next/link'
import { BlogPost, getBlogPosts, getPopularPosts } from '@/lib/blog-data'
import { Button } from '@/components/ui/button'
import { Calendar, ArrowRight, TrendingUp } from 'lucide-react'

interface BlogSidebarProps {
  currentPost?: {
    id: string
    slug: string
  }
}

export async function BlogSidebar({ currentPost }: BlogSidebarProps) {
  const [recentPosts, popularPosts] = await Promise.all([
    getBlogPosts({ limit: 5 }),
    getPopularPosts(4)
  ])

  return (
    <div className="space-y-8">   
      {/* Popular Posts */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 transition-colors duration-300">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-purple-600" />
          Popular Posts
        </h3>
        <div className="space-y-3">
          {popularPosts.slice(0, 4).map((post: BlogPost) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="block group"
            >
              <div className="flex items-start space-x-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors duration-200">
                <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h4>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {post.views} views
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Posts */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 transition-colors duration-300">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-purple-600" />
          Recent Posts
        </h3>
        <div className="space-y-3">
          {recentPosts.data
            .filter((post: BlogPost) => !currentPost || post.id !== currentPost.id)
            .slice(0, 4)
            .map((post: BlogPost) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="block group"
              >
                <div className="flex items-start space-x-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors duration-200">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2 leading-snug">
                      {post.title}
                    </h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
        <Link href="/blog">
          <Button
            variant="ghost"
            size="sm"
            className="w-full mt-3 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          >
            View All Posts
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>      

      {/* Newsletter Signup */}
      {/* <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 transition-colors duration-300">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Join the Newsletter</h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 leading-relaxed">
          Get occasional updates about new articles, projects, and interesting finds.
        </p>
        <form className="space-y-3">
          <input
            type="email"
            placeholder="your.email@example.com"
            className="w-full px-4 py-2 rounded-lg bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors duration-200"
          />
          <Button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors duration-200"
          >
            Subscribe
          </Button>
        </form>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 text-center">
          No spam, just thoughtful content.
        </p>
      </div> */}
    </div>
  )
}