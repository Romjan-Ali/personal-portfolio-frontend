// app/blog/create/page.tsx
import { Metadata } from 'next'
import { CreatePostForm } from '@/app/components/blog/create-post-form'

export const metadata: Metadata = {
  title: 'Create New Post - John Doe',
  description: 'Create a new blog post',
}

export default function CreatePostPage() {
  return <CreatePostForm />
}
