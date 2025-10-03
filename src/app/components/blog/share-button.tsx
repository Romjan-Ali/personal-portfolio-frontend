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
      className="border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:border-purple-300 dark:hover:border-purple-600 hover:text-purple-700 dark:hover:text-purple-300 hover:bg-purple-50/50 dark:hover:bg-purple-900/20 transition-all duration-300 backdrop-blur-sm"
      onClick={handleShare}
    >
      <Share2 className="w-4 h-4 mr-2" />
      Share
    </Button>
  )
}
