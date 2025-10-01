// app/blog/[slug]/page.tsx

import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  getBlogPostBySlug,
  getRelatedPosts,
  calculateReadTime,
} from '@/lib/blog-data'
import { BlogContent } from '@/app/components/blog/blog-content'
import { BlogSidebar } from '@/app/components/blog/blog-sidebar'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, ArrowLeft, Eye } from 'lucide-react'
import { ShareButton } from '@/app/components/blog/share-button'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const {slug} = await params
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

  return posts.data.map((post) => ({
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
    <div className="min-h-screen bg-slate-50 pt-20">
      {/* Header */}
      <section className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link href="/blog">
              <Button
                variant="ghost"
                className="text-slate-300 hover:text-white mb-6 pl-0"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </Link>

            <div className="flex items-center space-x-6 text-slate-300 mb-4">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                {new Date(post.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                {readTime} min read
              </div>
              <div className="flex items-center">
                <Eye className="w-4 h-4 mr-2" />
                {post.views || 0} views
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>

            <p className="text-xl text-slate-300 mb-6 leading-relaxed">
              {post.summary}
            </p>

            {/* Author Info */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-700">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center mr-4">
                  {post.author?.profileImage ? (
                    <img
                      src={post.author.profileImage}
                      alt={post.author.name}
                      className="w-12 h-12 rounded-full"
                    />
                  ) : (
                    <span className="text-white font-bold text-lg">
                      {post.author?.name?.charAt(0) || 'J'}
                    </span>
                  )}
                </div>
                <div>
                  <div className="font-semibold text-white">
                    {post.author?.name || 'John Doe'}
                  </div>
                  <div className="text-slate-400 text-sm">
                    {post.author?.email || 'Full Stack Developer'}
                  </div>
                </div>
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
            <div className="grid lg:grid-cols-4 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                  {/* Thumbnail */}
                  {post.thumbnail ? (
                    <div className="bg-gradient-to-br from-purple-400 to-pink-400 p-1">
                      <div
                        className="bg-cover bg-center h-64"
                        style={{ backgroundImage: `url(${post.thumbnail})` }}
                      />
                    </div>
                  ) : (
                    <div className="bg-gradient-to-br from-purple-400 to-pink-400 p-1">
                      <div className="bg-slate-800 h-64 flex items-center justify-center">
                        <span className="text-white font-semibold">
                          Blog Post Image
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Article Content */}
                  <div className="p-8">
                    <BlogContent content={post.content} />

                    {/* Additional Images */}
                    {post.images && post.images.length > 0 && (
                      <div className="mt-8">
                        <h4 className="text-lg font-semibold text-slate-900 mb-4">
                          Additional Images
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {post.images.map((image, index) => (
                            <div
                              key={index}
                              className="bg-slate-100 rounded-lg p-4"
                            >
                              <div
                                className="bg-slate-300 h-48 rounded flex items-center justify-center bg-cover bg-center"
                                style={{ backgroundImage: `url(${image})` }}
                              >
                                {!image && (
                                  <span className="text-slate-600 text-sm">
                                    Image {index + 1}
                                  </span>
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

async function RelatedPostsSection({ currentPostId }: { currentPostId: string }) {
  const relatedPosts = await getRelatedPosts(currentPostId, 3)

  if (relatedPosts.length === 0) return null

  return (
    <section className="mt-12">
      <h3 className="text-2xl font-bold text-slate-900 mb-6">
        Related Articles
      </h3>
      <div className="grid md:grid-cols-3 gap-6">
        {relatedPosts.data.map((post) => (
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
