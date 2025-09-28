// lib/blog-data.ts
export interface BlogPost {
  id: string
  title: string
  slug: string
  summary: string
  content: string
  published: boolean
  thumbnail?: string
  images: string[]
  author?: {
    id: string
    name: string
    email: string
    profileImage?: string
  }
  authorId?: string
  createdAt: string
  updatedAt: string
}

export interface User {
  id: string
  email: string
  name?: string
  profileImage?: string
  role: 'USER' | 'ADMIN'
}

// Demo data following the Prisma schema exactly
export const demoUser: User = {
  id: 'user-1',
  email: 'john.doe@example.com',
  name: 'John Doe',
  profileImage: '/authors/john-doe.jpg',
  role: 'ADMIN'
}

export const blogPosts: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'React Best Practices for 2024',
    slug: 'react-best-practices-2024',
    summary: 'Essential patterns and practices for building maintainable React applications in 2024. Learn about hooks optimization, component composition, and performance tips.',
    content: `# React Best Practices for 2024

React has evolved significantly over the years, and staying up-to-date with best practices is crucial for building maintainable and performant applications.

## Key Points

- Use functional components and hooks
- Implement proper error boundaries
- Optimize performance with React.memo and useMemo
- Follow component composition patterns`,
    published: true,
    thumbnail: '/blog/react-best-practices.jpg',
    images: ['/blog/react-best-practices-1.jpg', '/blog/react-best-practices-2.jpg'],
    author: demoUser,
    authorId: demoUser.id,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 'blog-2',
    title: 'Node.js Performance Optimization',
    slug: 'nodejs-performance-optimization',
    summary: 'Comprehensive guide to optimizing Node.js applications for better performance. Covers clustering, caching strategies, and memory management techniques.',
    content: `# Node.js Performance Optimization

Optimizing Node.js applications is crucial for handling high traffic and providing excellent user experiences.

## Performance Techniques

- Implement clustering for multi-core utilization
- Use Redis for caching
- Monitor memory usage
- Optimize database queries`,
    published: true,
    thumbnail: '/blog/nodejs-performance.jpg',
    images: ['/blog/nodejs-performance-1.jpg'],
    author: demoUser,
    authorId: demoUser.id,
    createdAt: '2024-01-10T14:30:00Z',
    updatedAt: '2024-01-10T14:30:00Z'
  },
  {
    id: 'blog-3',
    title: 'Advanced TypeScript Patterns',
    slug: 'advanced-typescript-patterns',
    summary: 'Dive deep into advanced TypeScript features and patterns for robust applications. Explore conditional types, template literals, and advanced generics.',
    content: `# Advanced TypeScript Patterns

TypeScript offers powerful features that go beyond basic type annotations.

## Advanced Features

- Conditional types
- Template literal types
- Mapped types
- Utility types`,
    published: true,
    thumbnail: '/blog/typescript-advanced.jpg',
    images: [],
    author: demoUser,
    authorId: demoUser.id,
    createdAt: '2024-01-05T09:15:00Z',
    updatedAt: '2024-01-05T09:15:00Z'
  },
  {
    id: 'blog-4',
    title: 'Building Scalable CSS Architecture',
    slug: 'scalable-css-architecture',
    summary: 'Learn how to create maintainable and scalable CSS architecture using modern methodologies like BEM, ITCSS, and utility-first approaches.',
    content: `# Building Scalable CSS Architecture

Creating maintainable CSS for large-scale applications is challenging.`,
    published: true,
    thumbnail: '/blog/css-architecture.jpg',
    images: [],
    author: demoUser,
    authorId: demoUser.id,
    createdAt: '2024-01-20T11:00:00Z',
    updatedAt: '2024-01-20T11:00:00Z'
  },
  {
    id: 'blog-5',
    title: 'Database Design Patterns',
    slug: 'database-design-patterns',
    summary: 'Explore common database design patterns and when to use them. Covers normalization, indexing strategies, and performance considerations.',
    content: `# Database Design Patterns

Designing efficient databases is crucial for application performance.`,
    published: true,
    thumbnail: '/blog/database-design.jpg',
    images: [],
    author: demoUser,
    authorId: demoUser.id,
    createdAt: '2024-01-25T16:45:00Z',
    updatedAt: '2024-01-25T16:45:00Z'
  }
]

// Utility functions that match Prisma schema
export function getBlogPosts(options?: { 
  featured?: boolean; 
  limit?: number;
  tag?: string;
  published?: boolean;
}) {
  let posts = [...blogPosts]

  // Filter by published status (default to only published posts)
  const showPublished = options?.published !== false
  if (showPublished) {
    posts = posts.filter(post => post.published)
  }

  // For featured, we'll use a simple heuristic (first 2 posts)
  if (options?.featured) {
    posts = posts.slice(0, 2)
  }

  if (options?.limit) {
    posts = posts.slice(0, options.limit)
  }

  // Sort by creation date (newest first)
  posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  return posts
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug && post.published)
}

export function getRelatedPosts(currentPostId: string, limit: number = 3): BlogPost[] {
  return blogPosts
    .filter(post => post.id !== currentPostId && post.published)
    .slice(0, limit)
}

// Calculate read time based on content
export function calculateReadTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

// Extract tags from content (simulated - in real app, this would be a field in the schema)
export function extractTags(content: string): string[] {
  const commonTags = ['React', 'TypeScript', 'Node.js', 'CSS', 'Database', 'Performance', 'Best Practices', 'Frontend', 'Backend', 'Web Development', 'JavaScript', 'Programming']
  return commonTags.filter(tag => 
    content.toLowerCase().includes(tag.toLowerCase())
  ).slice(0, 3)
}

// Get all unique tags from all blog posts
export function getAllTags(): string[] {
  const allTags = blogPosts.flatMap(post => extractTags(post.content))
  const uniqueTags = [...new Set(allTags)]
  return uniqueTags.sort()
}

// Get posts by tag
export function getPostsByTag(tag: string): BlogPost[] {
  return blogPosts.filter(post => 
    extractTags(post.content).some(postTag => 
      postTag.toLowerCase().includes(tag.toLowerCase())
    ) && post.published
  )
}

// Search posts by title, summary, or content
export function searchPosts(query: string): BlogPost[] {
  const searchTerm = query.toLowerCase()
  return blogPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm) ||
    post.summary.toLowerCase().includes(searchTerm) ||
    post.content.toLowerCase().includes(searchTerm)
  )
}