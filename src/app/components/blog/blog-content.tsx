// app/components/blog/blog-content.tsx
'use client'

import { useEffect } from 'react'

interface BlogContentProps {
  content: string
}

export function BlogContent({ content }: BlogContentProps) {
  useEffect(() => {
    // Add smooth scrolling for anchor links
    const handleAnchorClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement
      if (target.hash && target.pathname === window.location.pathname) {
        e.preventDefault()
        const element = document.querySelector(target.hash)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }
    }

    const handleCodeCopy = (e: Event) => {
      const button = e.target as HTMLButtonElement
      const codeBlock = button.previousElementSibling as HTMLElement
      if (codeBlock && codeBlock.textContent) {
        navigator.clipboard.writeText(codeBlock.textContent)
        button.textContent = 'Copied!'
        setTimeout(() => {
          button.textContent = 'Copy'
        }, 2000)
      }
    }

    // Get all anchor links and copy buttons
    const anchorLinks = document.querySelectorAll('a[href^="#"]')
    const copyButtons = document.querySelectorAll('.copy-btn')

    // Add event listeners
    anchorLinks.forEach(anchor => {
      anchor.addEventListener('click', handleAnchorClick)
    })

    copyButtons.forEach(btn => {
      btn.addEventListener('click', handleCodeCopy)
    })

    // Cleanup function
    return () => {
      anchorLinks.forEach(anchor => {
        anchor.removeEventListener('click', handleAnchorClick)
      })
      copyButtons.forEach(btn => {
        btn.removeEventListener('click', handleCodeCopy)
      })
    }
  }, [])

  const processContent = (content: string) => {
    // Split content by code blocks
    const parts = content.split(/(```[\s\S]*?```)/g)
    
    return parts.map((part, index) => {
      if (part.startsWith('```')) {
        // Extract language and code
        const match = part.match(/```(\w+)?\n([\s\S]*?)```/)
        if (match) {
          const [, language = 'text', code] = match
          return (
            <div key={index} className="my-6 rounded-lg overflow-hidden border border-slate-200">
              <div className="flex items-center justify-between bg-slate-800 px-4 py-2">
                <span className="text-slate-300 text-sm font-mono">
                  {language}
                </span>
                <button 
                  className="copy-btn text-slate-300 hover:text-white text-sm font-mono px-3 py-1 rounded border border-slate-600 hover:border-slate-400 transition-colors"
                  type="button"
                >
                  Copy
                </button>
              </div>
              <pre className="bg-slate-900 p-4 overflow-x-auto">
                <code className="text-slate-100 text-sm font-mono block whitespace-pre">
                  {code.trim()}
                </code>
              </pre>
            </div>
          )
        }
      }
      
      // Process regular markdown-like content
      return (
        <div
          key={index}
          className="blog-text-content"
          dangerouslySetInnerHTML={{ __html: formatText(part) }}
        />
      )
    })
  }

  const formatText = (text: string) => {
    return text
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>')
      .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*)\*/gim, '<em>$1</em>')
      .replace(/!\[(.*?)\]\((.*?)\)/gim, '<img alt="$1" src="$2" class="rounded-lg shadow-md max-w-full" />')
      .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" class="text-purple-600 hover:text-purple-700 hover:underline">$1</a>')
      .replace(/\n$/gim, '<br />')
  }

  return (
    <div className="blog-content">
      {processContent(content)}
      
      <style jsx global>{`
        .blog-content h1 {
          font-size: 2.5rem;
          font-weight: 700;
          color: #1e293b;
          margin: 2rem 0 1rem 0;
          line-height: 1.2;
        }
        
        .blog-content h2 {
          font-size: 2rem;
          font-weight: 600;
          color: #1e293b;
          margin: 2rem 0 1rem 0;
          line-height: 1.3;
        }
        
        .blog-content h3 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #1e293b;
          margin: 1.5rem 0 1rem 0;
          line-height: 1.4;
        }
        
        .blog-content p {
          font-size: 1.125rem;
          line-height: 1.7;
          color: #475569;
          margin: 1.5rem 0;
        }
        
        .blog-content ul, .blog-content ol {
          margin: 1.5rem 0;
          padding-left: 2rem;
        }
        
        .blog-content li {
          margin: 0.5rem 0;
          font-size: 1.125rem;
          line-height: 1.6;
        }
        
        .blog-content blockquote {
          border-left: 4px solid #7c3aed;
          background: #f8fafc;
          padding: 1.5rem;
          margin: 2rem 0;
          border-radius: 0 0.5rem 0.5rem 0;
        }
        
        .blog-content blockquote p {
          margin: 0;
          font-style: italic;
          color: #64748b;
        }
        
        .blog-content pre {
          margin: 2rem 0;
        }
        
        .blog-content code:not(pre code) {
          background: #f1f5f9;
          padding: 0.2rem 0.4rem;
          border-radius: 0.25rem;
          font-size: 0.875rem;
          color: #475569;
        }
        
        .blog-content img {
          max-width: 100%;
          height: auto;
        }
        
        .blog-text-content {
          line-height: 1.7;
        }
        
        .blog-text-content h1,
        .blog-text-content h2,
        .blog-text-content h3,
        .blog-text-content h4,
        .blog-text-content h5,
        .blog-text-content h6 {
          color: #1e293b;
          margin: 2rem 0 1rem 0;
        }
        
        .blog-text-content p {
          color: #475569;
          margin: 1.5rem 0;
        }
        
        .blog-text-content a {
          color: #7c3aed;
          text-decoration: none;
        }
        
        .blog-text-content a:hover {
          color: #6d28d9;
          text-decoration: underline;
        }
        
        .blog-text-content strong {
          color: #1e293b;
          font-weight: 600;
        }
        
        .blog-text-content em {
          color: #475569;
          font-style: italic;
        }
        
        @media (max-width: 768px) {
          .blog-content h1 {
            font-size: 2rem;
          }
          
          .blog-content h2 {
            fontSize: 1.75rem;
          }
          
          .blog-content h3 {
            fontSize: 1.375rem;
          }
          
          .blog-content p {
            fontSize: 1rem;
          }
        }
      `}</style>
    </div>
  )
}