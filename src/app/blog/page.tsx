// app/blog/page.tsx
import { Metadata } from 'next'
import Link from 'next/link'
import { getBlogPosts, getAllTags } from '@/lib/blog-data'
import { BlogCard } from '@/app/components/blog/blog-card'
import { BlogSearch } from '@/app/components/blog/blog-search'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, ArrowRight, Search, Plus } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blog - John Doe',
  description:
    'Read my latest articles on web development, programming, and technology trends.',
}

interface BlogPageProps {
  searchParams: {
    tag?: string
    search?: string
  }
}

export default function BlogPage({ searchParams }: BlogPageProps) {
  const posts = getBlogPosts()
  const tags = getAllTags()
  const filteredPosts = posts.filter((post) => {
    if (searchParams.tag) {
      return post.tags.some((tag) =>
        tag.toLowerCase().includes(searchParams.tag!.toLowerCase())
      )
    }
    if (searchParams.search) {
      const searchTerm = searchParams.search.toLowerCase()
      return (
        post.title.toLowerCase().includes(searchTerm) ||
        post.excerpt.toLowerCase().includes(searchTerm) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
      )
    }
    return true
  })

  const featuredPost = posts.find((post) => post.featured)

  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      {/* Header */}
      <section className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Blog & Articles
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Insights, tutorials, and thoughts on web development, programming,
              and the latest technology trends from my journey as a developer.
            </p>
            <div className="w-24 h-1 bg-purple-400 mx-auto mb-8"></div>

            {/* Stats */}
            <div className="flex justify-center space-x-8 text-slate-300">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">
                  {posts.length}
                </div>
                <div className="text-sm">Articles</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">
                  {posts
                    .reduce((total, post) => total + post.views, 0)
                    .toLocaleString()}
                </div>
                <div className="text-sm">Total Views</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">
                  {tags.length}
                </div>
                <div className="text-sm">Topics</div>
              </div>
            </div>

            {/* Add Create Button for Admin */}
      <div className="mt-8">
        <Link href="/blog/create">
          <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full">
            <Plus className="w-5 h-5 mr-2" />
            Write New Post
          </Button>
        </Link>
      </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && !searchParams.tag && !searchParams.search && (
        <section className="py-12 bg-white border-b border-slate-200">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900">
                  Featured Article
                </h2>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                  Featured
                </span>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-100">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="flex items-center space-x-4 text-slate-600 mb-4">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(
                          featuredPost.publishedAt
                        ).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        {featuredPost.readTime} min read
                      </div>
                    </div>

                    <h3 className="text-3xl font-bold text-slate-900 mb-4">
                      {featuredPost.title}
                    </h3>

                    <p className="text-slate-600 mb-6 text-lg leading-relaxed">
                      {featuredPost.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {featuredPost.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-white text-slate-700 px-3 py-1 rounded-full text-sm border border-slate-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Link href={`/blog/${featuredPost.slug}`}>
                      <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full">
                        Read Full Article
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>

                  <div className="relative">
                    <div className="bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl p-1">
                      <div className="bg-slate-800 rounded-xl h-64 flex items-center justify-center">
                        <span className="text-white font-semibold">
                          Featured Image
                        </span>
                      </div>
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
              <BlogSearch
                tags={tags}
                initialSearch={searchParams.search}
                initialTag={searchParams.tag}
              />
            </div>

            {/* Results Info */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  {searchParams.tag
                    ? `Tag: "${searchParams.tag}"`
                    : searchParams.search
                    ? `Search: "${searchParams.search}"`
                    : 'All Articles'}
                </h2>
                <p className="text-slate-600 mt-1">
                  {filteredPosts.length} article
                  {filteredPosts.length !== 1 ? 's' : ''} found
                </p>
              </div>

              {filteredPosts.length === 0 && (
                <Link href="/blog">
                  <Button variant="outline" className="border-slate-300">
                    Clear Filters
                  </Button>
                </Link>
              )}
            </div>

            {/* Blog Grid */}
            {filteredPosts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Search className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  No articles found
                </h3>
                <p className="text-slate-600 mb-6">
                  Try adjusting your search or filter to find what you're
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
