// app/components/blog/ShareButton.tsx
'use client'

import { Button } from '@/components/ui/button'
import { BlogPost } from '@/lib/blog-data'
import { Share2 } from 'lucide-react'

export function ShareButton({ post }: { post: BlogPost }) {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.summary,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  return (
    <Button
      variant="outline"
      className="border-slate-600 text-slate-300 hover:bg-slate-800"
      onClick={handleShare}
    >
      <Share2 className="w-4 h-4 mr-2" />
      Share
    </Button>
  )
}
