// app/blog/[slug]/page.tsx

import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  getBlogPostBySlug,
  getRelatedPosts,
  calculateReadTime,
  BlogPost,
} from '@/lib/blog-data'
import { BlogContent } from '@/app/components/blog/blog-content'
import { BlogSidebar } from '@/app/components/blog/blog-sidebar'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, ArrowLeft, Eye, FileText } from 'lucide-react'
import { ShareButton } from '@/app/components/blog/share-button'
import { ImgProps } from 'next/dist/shared/lib/get-img-props'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: `${post.title} - John Doe`,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: 'article',
      publishedTime: post.createdAt,
      authors: [post.author?.name || 'John Doe'],
    },
  }
}

export async function generateStaticParams() {
  const { getBlogPosts } = await import('@/lib/blog-data')
  const posts = await getBlogPosts()

  return posts.data.map((post: BlogPost) => ({
    slug: post.slug,
  }))
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = (await getBlogPostBySlug(slug)).data

  if (!post) {
    notFound()
  }

  const readTime = calculateReadTime(post.content)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-purple-900/20 pt-20">
      {/* Header */}
      <section className="bg-gradient-to-br from-slate-50 via-white to-purple-50/50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-800 text-slate-900 dark:text-white py-16 relative overflow-hidden transition-colors duration-300">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-purple-500/20 dark:bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-blue-500/20 dark:bg-blue-500/10 rounded-full blur-3xl"></div>
          {/* Subtle pattern for light mode */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-purple-100/20 dark:to-purple-900/10"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <Link href="/blog">
              <Button
                variant="ghost"
                className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white mb-8 pl-0 hover:bg-slate-200/50 dark:hover:bg-white/10 rounded-full px-4 py-2 transition-all duration-300 border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-sm"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </Link>

            <div className="flex flex-wrap gap-4 text-slate-600 dark:text-slate-300 mb-6">
              <div className="flex items-center bg-white/80 dark:bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-slate-200/50 dark:border-white/20 transition-colors duration-300">
                <Calendar className="w-4 h-4 mr-2" />
                {new Date(post.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
              <div className="flex items-center bg-white/80 dark:bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-slate-200/50 dark:border-white/20 transition-colors duration-300">
                <Clock className="w-4 h-4 mr-2" />
                {readTime} min read
              </div>
              <div className="flex items-center bg-white/80 dark:bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-slate-200/50 dark:border-white/20 transition-colors duration-300">
                <Eye className="w-4 h-4 mr-2" />
                {post.views || 0} views
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-slate-900 via-purple-900 to-slate-700 dark:from-white dark:via-slate-200 dark:to-slate-300 bg-clip-text text-transparent transition-all duration-300">
              {post.title}
            </h1>

            <p className="text-xl text-slate-700 dark:text-slate-300 mb-8 leading-relaxed max-w-3xl font-light transition-colors duration-300">
              {post.summary}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-8 border-t border-slate-300/50 dark:border-slate-700/50 gap-4 transition-colors duration-300">
              <div className="flex items-center space-x-4">
                <span className="text-slate-600 dark:text-slate-400 text-sm font-medium transition-colors duration-300">
                  Last updated: {new Date(post.updatedAt).toLocaleDateString()}
                </span>
              </div>
              <ShareButton post={post} />
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-4 gap-8 lg:gap-12">
              {/* Main Content */}
              <div className="lg:col-span-3">
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200/60 dark:border-slate-700/60 overflow-hidden transition-all duration-300 hover:shadow-xl">
                  {/* Thumbnail */}
                  {post.thumbnail ? (
                    <div className="bg-gradient-to-br from-purple-500 to-blue-600 dark:from-purple-600 dark:to-blue-700 p-1">
                      <div
                        className="bg-cover bg-center h-80 rounded-t-2xl transition-transform duration-700 hover:scale-105"
                        style={{ backgroundImage: `url(${post.thumbnail})` }}
                      />
                    </div>
                  ) : (
                    <div className="bg-gradient-to-br from-purple-500 to-blue-600 dark:from-purple-600 dark:to-blue-700 p-1">
                      <div className="bg-slate-100 dark:bg-slate-900 h-80 rounded-t-2xl flex items-center justify-center transition-colors duration-300">
                        <div className="text-center text-white">
                          <FileText className="w-16 h-16 mx-auto mb-4 opacity-80" />
                          <span className="font-semibold text-lg">
                            Blog Post
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Article Content */}
                  <div className="p-6 md:p-8">
                    <BlogContent content={post.content} />

                    {/* Tags Section */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
                        <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                          Tags
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {post.tags.map((tag: string, index: number) => (
                            <span
                              key={index}
                              className="px-3 py-1.5 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full text-sm font-medium border border-slate-200 dark:border-slate-600 transition-colors duration-300"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Additional Images */}
                    {post.images && post.images.length > 0 && (
                      <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
                        <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                          Gallery
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {post.images.map((image: string, index: number) => (
                            <div
                              key={index}
                              className="group relative bg-slate-50 dark:bg-slate-700/30 rounded-xl overflow-hidden border border-slate-200/50 dark:border-slate-600/50 transition-all duration-300 hover:shadow-lg"
                            >
                              <div
                                className="bg-slate-200 dark:bg-slate-600 h-64 rounded-lg bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                                style={{ backgroundImage: `url(${image})` }}
                              >
                                {!image && (
                                  <div className="w-full h-full flex items-center justify-center">
                                    <span className="text-slate-500 dark:text-slate-400 text-sm bg-white/90 dark:bg-slate-800/90 px-3 py-1 rounded-full backdrop-blur-sm">
                                      Image {index + 1}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Related Posts */}
                <RelatedPostsSection currentPostId={post.id} />
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <BlogSidebar currentPost={post} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

async function RelatedPostsSection({
  currentPostId,
}: {
  currentPostId: string
}) {
  const relatedPosts = await getRelatedPosts(currentPostId, 3)

  if (relatedPosts.length === 0) return null

  return (
    <section className="mt-12">
      <h3 className="text-2xl font-bold text-slate-900 mb-6">
        Related Articles
      </h3>
      <div className="grid md:grid-cols-3 gap-6">
        {relatedPosts.data.map((post: BlogPost) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="block group"
          >
            <div className="bg-white rounded-lg border border-slate-200 p-4 hover:border-purple-300 transition-colors duration-300 h-full">
              {post.thumbnail && (
                <div
                  className="w-full h-32 bg-cover bg-center rounded-lg mb-3"
                  style={{ backgroundImage: `url(${post.thumbnail})` }}
                />
              )}
              <h4 className="font-semibold text-slate-900 group-hover:text-purple-600 transition-colors line-clamp-2 mb-2">
                {post.title}
              </h4>
              <p className="text-slate-600 text-sm line-clamp-2 mb-3">
                {post.summary}
              </p>
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                <span>{calculateReadTime(post.content)} min read</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
