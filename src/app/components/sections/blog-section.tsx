// components/sections/blog-section.tsx
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'

const sampleBlogs = [
  {
    id: 'b1',
    title: 'Using Prisma with Next',
    slug: 'prisma-next',
    excerpt: 'Quick start with Prisma.',
  },
  {
    id: 'b2',
    title: 'React Native Tips',
    slug: 'rn-tips',
    excerpt: 'Expo + performance.',
  },
]

export function BlogSection() {
  return (
    <section id="blogs" className="py-16 px-6">
      <h2 className="text-3xl font-bold mb-6">Blog</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {sampleBlogs.map((b) => (
          <Card key={b.id}>
            <CardContent>
              <h3 className="text-lg font-semibold">
                <Link href={`/blog/${b.slug}`}>{b.title}</Link>
              </h3>
              <p className="mt-2">{b.excerpt}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
