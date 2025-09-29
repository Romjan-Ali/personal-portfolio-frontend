



























// lib/blog-data.ts
import { 
  calculateReadTime, 
  extractTags, 
  generateSlug, 
  formatBlogDate,
  getBlogPostBySlug,
  getRelatedPosts,
  getPostsByTag,
  searchPosts,
  getPopularPosts,
  getAllTags
} from './blog-utils'

export interface BlogPost {
  id: string
  title: string
  slug: string
  summary: string
  content: string
  published: boolean
  views: number
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

export const demoUser = {
  id: '1',
  name: "John Doe",
  email: 'john@email.com',
  role: 'ADMIN'
}

// Your existing blog data and functions remain the same...
export const blogPosts: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'React Best Practices for 2024',
    slug: 'react-best-practices-2024',
    summary: 'Essential patterns and practices for building maintainable React applications in 2024. Learn about hooks optimization, component composition, and performance tips.',
    content: `# React Best Practices for 2024

React has evolved significantly over the years, and staying up-to-date with best practices is crucial for building maintainable and performant applications.

## 1. Functional Components and Hooks

With the introduction of Hooks, functional components have become the standard. Here's how to use them effectively:

### Custom Hooks for Logic Reuse
Instead of repeating logic across multiple components, create custom hooks that can be reused throughout your application.

### useEffect Dependencies
Always specify the correct dependencies in your useEffect hooks to prevent unnecessary re-renders and memory leaks.

## 2. Performance Optimization

### React.memo and useMemo
Use React.memo for component memoization and useMemo for expensive calculations to optimize performance.

### Code Splitting
Implement code splitting with React.lazy and Suspense to reduce your bundle size and improve load times.

## 3. TypeScript Integration

Using TypeScript with React provides better type safety and developer experience.

### Proper Typing
Ensure all your components, props, and hooks are properly typed to catch errors at compile time.

## Conclusion

By following these React best practices, you'll create more maintainable, performant, and scalable applications.`,
    published: true,
    views: 1247,
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

## 1. Clustering for Multi-Core Utilization

Node.js runs on a single thread, but you can leverage multiple CPU cores using the cluster module to improve performance.

## 2. Caching Strategies

### Redis Implementation
Use Redis for session storage and caching frequently accessed data to reduce database load.

### Memory Management
Monitor your application's memory usage and implement proper garbage collection strategies.

## 3. Database Optimization

### Connection Pooling
Use connection pooling to manage database connections efficiently and reduce connection overhead.

### Query Optimization
Optimize your database queries and use indexes properly to improve response times.

## Conclusion

These Node.js optimization techniques will help you build faster and more efficient applications.`,
    published: true,
    views: 892,
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

## 1. Conditional Types

Conditional types allow you to create types that depend on other types, enabling more flexible and reusable type definitions.

## 2. Template Literal Types

Create complex string literal types that can be used for type-safe APIs and configuration.

## 3. Advanced Generics

### Generic Constraints
Use generic constraints to ensure type parameters meet specific requirements.

### Mapped Types
Leverage mapped types to transform existing types into new ones.

## 4. Utility Types

TypeScript provides built-in utility types that can help with common type transformations.

## Conclusion

Mastering these advanced TypeScript patterns will make your code more type-safe and maintainable.`,
    published: true,
    views: 1563,
    thumbnail: '/blog/typescript-advanced.jpg',
    images: [],
    author: demoUser,
    authorId: demoUser.id,
    createdAt: '2024-01-05T09:15:00Z',
    updatedAt: '2024-01-05T09:15:00Z'
  }
  // ... other posts
]

// Main data functions
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

  // For featured, use first post as featured
  if (options?.featured) {
    posts = posts.slice(0, 1)
  }

  if (options?.tag) {
    posts = getPostsByTag(posts, options.tag)
  }

  if (options?.limit) {
    posts = posts.slice(0, options.limit)
  }

  // Sort by creation date (newest first)
  posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  return posts
}

// Export individual functions with blogPosts pre-bound
export const getBlogPostBySlugBound = (slug: string) => getBlogPostBySlug(blogPosts, slug)
export const getRelatedPostsBound = (currentPostId: string, limit?: number) => 
  getRelatedPosts(blogPosts, currentPostId, limit)
export const getPostsByTagBound = (tag: string) => getPostsByTag(blogPosts, tag)
export const searchPostsBound = (query: string) => searchPosts(blogPosts, query)
export const getPopularPostsBound = (limit?: number) => getPopularPosts(blogPosts, limit)
export const getAllTagsBound = () => getAllTags(blogPosts)

// Re-export utilities
export { 
  calculateReadTime, 
  extractTags, 
  generateSlug, 
  formatBlogDate 
}

// Alias the bound functions for easier usage
export {
  getBlogPostBySlugBound as getBlogPostBySlug,
  getRelatedPostsBound as getRelatedPosts,
  getPostsByTagBound as getPostsByTag,
  searchPostsBound as searchPosts,
  getPopularPostsBound as getPopularPosts,
  getAllTagsBound as getAllTags
}