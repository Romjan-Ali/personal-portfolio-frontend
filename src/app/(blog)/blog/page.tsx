// app/blog/page.tsx
import { Metadata } from 'next'
import Link from 'next/link'
import {
  getBlogPosts,
  getAllTags,
  calculateReadTime,
  extractTags,
  BlogPost,
  getTotalViews,
} from '@/lib/blog-data'
import { BlogCard } from '@/app/components/blog/blog-card'
import { BlogSearch } from '@/app/components/blog/blog-search'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, ArrowRight, Search, Plus } from 'lucide-react'
import Pagination from '../../components/blog/pagination'

export const metadata: Metadata = {
  title: 'Blog - John Doe',
  description:
    'Read my latest articles on web development, programming, and technology trends.',
}

interface BlogPageProps {
  searchParams: {
    tag?: string
    search?: string
    page?: string
  }
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { tag, search, page } = await searchParams

  const { data: posts, pagination } = await getBlogPosts({
    limit: 12,
    page: page ? parseInt(page) : 1,
  })

  const { data: totalViews } = await getTotalViews()

  const { data: tags } = await getAllTags()

  console.log({ searchParams: await searchParams })

  // Filter posts based on search params using the utility functions
  let filteredPosts = posts
  let filteredPagination = pagination

  if (tag) {
    const { data: posts, pagination } = await getBlogPosts({
      tag,
      page: page ? parseInt(page) : 1,
    })
    filteredPosts = posts
    filteredPagination = pagination
  } else if (search) {
    const { data: posts, pagination } = await getBlogPosts({
      search,
      page: page ? parseInt(page) : 1,
    })
    filteredPosts = posts
    filteredPagination = pagination
  }

  // Use the first post as featured when no filters are applied
  const featuredPost = !tag && !search ? posts[0] : null

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-800 transition-colors duration-300">
      {/* Header */}
      <section
        className="relative pt-30 py-20 text-slate-900 dark:text-slate-100
             bg-gradient-to-r from-purple-50 via-slate-50 to-pink-50
             dark:from-slate-950 dark:via-slate-900 dark:to-purple-950
             transition-colors duration-500"
      >
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_left,rgba(168,85,247,0.2),transparent_70%)] dark:bg-[radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.15),transparent_70%)]"></div>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-slate-600 dark:text-slate-300">
              Blog & Articles
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
              Insights, tutorials, and thoughts on web development, programming,
              and the latest technology trends from my journey as a developer.
            </p>
            <div className="w-24 h-1 bg-purple-500 mx-auto mb-8"></div>

            {/* Stats */}
            <div className="flex justify-center space-x-8 text-slate-600 dark:text-slate-300">
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-900 dark:text-white">
                  {pagination.total}
                </div>
                <div className="text-sm">Articles</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-900 dark:text-white">
                  {totalViews || 0}
                </div>
                <div className="text-sm">Total Views</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-900 dark:text-white">
                  {tags.length}
                </div>
                <div className="text-sm">Topics</div>
              </div>
            </div>

            {/* Add Create Button for Admin */}
            <div className="mt-8">
              <Link href="/blog/create">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full transition-colors duration-300">
                  <Plus className="w-5 h-5 mr-2" />
                  Write New Post
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section
          className="py-12 border-b border-slate-200 dark:border-slate-700 transition-colors duration-300
    bg-gradient-to-r from-white to-purple-50 dark:from-slate-900 dark:to-slate-800"
        >
          {/* Changed background to gradient for both light and dark mode */}
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white transition-colors duration-300">
                  Featured Article
                </h2>
                <span className="bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100 px-3 py-1 rounded-full text-sm font-medium transition-colors duration-300">
                  Featured
                </span>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-8 border border-purple-100 dark:border-slate-700 transition-colors duration-300">
                {/* Applied dark mode gradient and transition */}
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="flex items-center space-x-4 text-slate-600 dark:text-slate-300 mb-4 transition-colors duration-300">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(featuredPost.createdAt).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        {calculateReadTime(featuredPost.content)} min read
                      </div>
                    </div>

                    <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 transition-colors duration-300">
                      {featuredPost.title}
                    </h3>

                    <p className="text-slate-600 dark:text-slate-300 mb-6 text-lg leading-relaxed transition-colors duration-300">
                      {featuredPost.summary}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {extractTags(featuredPost.content).map((tag, index) => (
                        <span
                          key={index}
                          className="bg-white text-slate-700 dark:bg-slate-700 dark:text-slate-100 px-3 py-1 rounded-full text-sm border border-slate-300 dark:border-slate-600 transition-colors duration-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Link href={`/blog/${featuredPost.slug}`}>
                      <Button className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white px-6 py-3 rounded-full transition-colors duration-300">
                        Read Full Article
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>

                  <div className="relative">
                    <div className="bg-gradient-to-br from-purple-400 to-pink-400 dark:from-purple-700 dark:to-purple-900 rounded-xl p-1 transition-colors duration-300">
                      {featuredPost.thumbnail ? (
                        <div
                          className="bg-slate-800 dark:bg-slate-900 rounded-xl h-64 bg-cover bg-center transition-colors duration-300"
                          style={{
                            backgroundImage: `url(${featuredPost.thumbnail})`,
                          }}
                        />
                      ) : (
                        <div className="bg-slate-800 dark:bg-slate-900 rounded-xl h-64 flex items-center justify-center transition-colors duration-300">
                          <span className="text-white font-semibold">
                            Featured Image
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Search and Filters */}
            <div className="mb-8">
              <BlogSearch tags={tags} initialSearch={search} initialTag={tag} />
            </div>

            {/* Results Info */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  {tag
                    ? `Tag: "${tag}"`
                    : search
                    ? `Search: "${search}"`
                    : 'All Articles'}
                </h2>
                <p className="text-slate-600 mt-1">
                  {filteredPagination.total} article
                  {filteredPagination.total !== 1 ? 's' : ''} found
                </p>
              </div>

              {(tag || search) && (
                <Link href="/blog">
                  <Button variant="outline" className="border-slate-300">
                    Clear Filters
                  </Button>
                </Link>
              )}
            </div>

            {/* Blog Grid */}
            {filteredPosts.length > 0 ? (
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredPosts.map((post: BlogPost) => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>
                <Pagination pagination={filteredPagination} />
              </>
            ) : (
              <div className="text-center py-12">
                <Search className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  No articles found
                </h3>
                <p className="text-slate-600 mb-6">
                  Try adjusting your search or filter to find what you&apos;re
                  looking for.
                </p>
                <Link href="/blog">
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    View All Articles
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
