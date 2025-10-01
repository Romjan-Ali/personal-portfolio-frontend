// app/admin/blog/edit/[id]/page.tsx
import { notFound } from 'next/navigation'
import { blogService } from '@/services/blog-service'
import { BlogEditor } from '@/components/blog-editor'

interface EditBlogPageProps {
  params: {
    id: string
  }
}

export default async function EditBlogPage({ params }: EditBlogPageProps) {
  try {
    const response = await blogService.getBlogById(params.id)
    return <BlogEditor blog={response.data} mode="edit" />
  } catch (error) {
    notFound()
  }
}