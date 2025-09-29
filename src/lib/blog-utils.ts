// lib/blog-utils.ts

/**
 * Calculate reading time based on content
 * @param content - The blog post content
 * @param wordsPerMinute - Average reading speed (default: 200 words/minute)
 * @returns Estimated reading time in minutes
 */
export function calculateReadTime(
  content: string,
  wordsPerMinute: number = 200
): number {
  if (!content || typeof content !== 'string') {
    return 1 // Default to 1 minute for empty content
  }

  // Remove code blocks, HTML tags, and markdown syntax for accurate word count
  const cleanContent = content
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`[^`]*`/g, '') // Remove inline code
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/[#*\-_~>]/g, '') // Remove markdown symbols
    .replace(/\n/g, ' ') // Replace newlines with spaces
    .trim()

  // Count words (split by spaces and filter out empty strings)
  const words = cleanContent.split(/\s+/).filter((word) => word.length > 0)
  const wordCount = words.length

  // Calculate reading time
  const readingTime = Math.ceil(wordCount / wordsPerMinute)

  // Ensure at least 1 minute
  return Math.max(1, readingTime)
}

/**
 * Extract relevant tags from blog post content
 * @param content - The blog post content
 * @param maxTags - Maximum number of tags to extract (default: 3)
 * @returns Array of tags
 */
export function extractTags(content: string, maxTags: number = 3): string[] {
  if (!content || typeof content !== 'string') {
    return ['General']
  }

  // Common technology and programming tags
  const commonTags = [
    // Frontend
    'React',
    'Vue',
    'Angular',
    'Svelte',
    'JavaScript',
    'TypeScript',
    'HTML',
    'CSS',
    'Tailwind',
    'Bootstrap',
    'Next.js',
    'Nuxt.js',
    'Gatsby',
    'SASS',
    'SCSS',

    // Backend
    'Node.js',
    'Express',
    'NestJS',
    'Python',
    'Django',
    'Flask',
    'Ruby',
    'Rails',
    'PHP',
    'Laravel',
    'Java',
    'Spring',
    'C#',
    'ASP.NET',
    'Go',
    'Rust',

    // Database
    'MySQL',
    'PostgreSQL',
    'MongoDB',
    'Redis',
    'SQLite',
    'Firebase',
    'Supabase',

    // DevOps & Tools
    'Docker',
    'Kubernetes',
    'AWS',
    'Azure',
    'GCP',
    'Git',
    'GitHub',
    'CI/CD',
    'Webpack',
    'Vite',
    'Jest',
    'Testing',
    'DevOps',

    // Concepts
    'Performance',
    'Optimization',
    'Security',
    'Authentication',
    'Authorization',
    'REST',
    'GraphQL',
    'API',
    'Microservices',
    'Serverless',
    'PWA',
    'Responsive Design',
    'Accessibility',
    'SEO',
    'UX',
    'UI',

    // Programming Concepts
    'Algorithms',
    'Data Structures',
    'Design Patterns',
    'Clean Code',
    'Best Practices',
    'Tutorial',
    'Guide',
    'Beginner',
    'Advanced',

    // General
    'Web Development',
    'Mobile Development',
    'Full Stack',
    'Frontend',
    'Backend',
  ]

  const contentLower = content.toLowerCase()
  const foundTags: string[] = []

  // Find tags that appear in the content
  for (const tag of commonTags) {
    if (foundTags.length >= maxTags) break

    const tagLower = tag.toLowerCase()

    // Check if tag appears in content (as whole word for better accuracy)
    const regex = new RegExp(`\\b${tagLower}\\b`, 'i')
    if (regex.test(contentLower)) {
      foundTags.push(tag)
    }
  }

  // If no specific tags found, return some general ones based on content analysis
  if (foundTags.length === 0) {
    return getFallbackTags(content, maxTags)
  }

  return foundTags
}

/**
 * Get fallback tags when no specific tags are found
 */
function getFallbackTags(content: string, maxTags: number): string[] {
  const fallbackTags: string[] = []
  const contentLower = content.toLowerCase()

  // Check for programming languages
  const languageKeywords = {
    JavaScript: ['javascript', 'js ', 'es6', 'ecmascript'],
    TypeScript: ['typescript', 'ts '],
    Python: ['python', 'py '],
    React: ['react', 'jsx', 'hooks'],
    'Node.js': ['node', 'nodejs'],
    CSS: ['css', 'stylesheet', 'styling'],
    HTML: ['html', 'markup'],
  }

  for (const [tag, keywords] of Object.entries(languageKeywords)) {
    if (fallbackTags.length >= maxTags) break
    if (keywords.some((keyword) => contentLower.includes(keyword))) {
      fallbackTags.push(tag)
    }
  }

  // Check for content type
  if (fallbackTags.length < maxTags) {
    if (
      contentLower.includes('tutorial') ||
      contentLower.includes('guide') ||
      contentLower.includes('step by step')
    ) {
      fallbackTags.push('Tutorial')
    } else if (
      contentLower.includes('best practice') ||
      contentLower.includes('tips')
    ) {
      fallbackTags.push('Best Practices')
    } else if (
      contentLower.includes('performance') ||
      contentLower.includes('optimization')
    ) {
      fallbackTags.push('Performance')
    }
  }

  // Add general tags if still needed
  while (fallbackTags.length < maxTags) {
    const generalTags = ['Web Development', 'Programming', 'Technology']
    const nextTag = generalTags[fallbackTags.length % generalTags.length]
    if (!fallbackTags.includes(nextTag)) {
      fallbackTags.push(nextTag)
    }
  }

  return fallbackTags.slice(0, maxTags)
}

/**
 * Generate a slug from a title
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
}

/**
 * Format date for display
 */
export function formatBlogDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}



















// lib/blog-utils.ts

import { BlogPost } from "./blog-data"

/**
 * Get blog post by slug
 */
export function getBlogPostBySlug(posts: BlogPost[], slug: string): BlogPost | undefined {
  if (!slug || typeof slug !== 'string') {
    return undefined
  }

  return posts.find(post => 
    post.slug.toLowerCase() === slug.toLowerCase() && 
    post.published === true
  )
}

/**
 * Get related posts based on tags, title similarity, and content
 */
export function getRelatedPosts(
  posts: BlogPost[], 
  currentPostId: string, 
  limit: number = 3
): BlogPost[] {
  if (!posts.length || !currentPostId) {
    return []
  }

  const currentPost = posts.find(post => post.id === currentPostId)
  if (!currentPost) {
    return []
  }

  // Calculate similarity scores for all other posts
  const postsWithScores = posts
    .filter(post => post.id !== currentPostId && post.published)
    .map(post => ({
      post,
      score: calculatePostSimilarity(currentPost, post)
    }))
    .filter(item => item.score > 0) // Only include posts with some similarity
    .sort((a, b) => b.score - a.score) // Sort by highest similarity first
    .slice(0, limit) // Take top N posts
    .map(item => item.post)

  // If we don't have enough similar posts, fill with recent posts
  if (postsWithScores.length < limit) {
    const recentPosts = getRecentPosts(posts, currentPostId, limit - postsWithScores.length)
    const uniqueRecentPosts = recentPosts.filter(recentPost => 
      !postsWithScores.some(post => post.id === recentPost.id)
    )
    postsWithScores.push(...uniqueRecentPosts)
  }

  return postsWithScores
}

/**
 * Calculate similarity between two posts based on tags, title, and content
 */
function calculatePostSimilarity(postA: BlogPost, postB: BlogPost): number {
  let score = 0

  // 1. Tag similarity (40% weight)
  const tagsA = extractTags(postA.content)
  const tagsB = extractTags(postB.content)
  const commonTags = tagsA.filter(tag => tagsB.includes(tag))
  score += (commonTags.length / Math.max(tagsA.length, tagsB.length)) * 0.4

  // 2. Title similarity (30% weight)
  const titleSimilarity = calculateTextSimilarity(postA.title, postB.title)
  score += titleSimilarity * 0.3

  // 3. Content keyword similarity (30% weight)
  const contentSimilarity = calculateTextSimilarity(
    getContentKeywords(postA.content),
    getContentKeywords(postB.content)
  )
  score += contentSimilarity * 0.3

  return score
}

/**
 * Calculate text similarity using simple word overlap
 */
function calculateTextSimilarity(textA: string, textB: string): number {
  if (!textA || !textB) return 0

  const wordsA = new Set(
    textA.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 3) // Only consider words longer than 3 chars
  )

  const wordsB = new Set(
    textB.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 3)
  )

  if (wordsA.size === 0 || wordsB.size === 0) return 0

  const commonWords = [...wordsA].filter(word => wordsB.has(word))
  return commonWords.length / Math.max(wordsA.size, wordsB.size)
}

/**
 * Extract keywords from content for similarity comparison
 */
function getContentKeywords(content: string): string {
  if (!content) return ''

  // Remove code blocks, markdown, and get the first few paragraphs
  return content
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]*`/g, '')
    .replace(/[#*\-_~>]/g, '')
    .split('\n')
    .slice(0, 5) // Take first 5 lines
    .join(' ')
    .trim()
}

/**
 * Get recent posts (fallback for related posts)
 */
function getRecentPosts(posts: BlogPost[], excludePostId: string, limit: number): BlogPost[] {
  return posts
    .filter(post => post.id !== excludePostId && post.published)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit)
}

/**
 * Get posts by tag
 */
export function getPostsByTag(posts: BlogPost[], tag: string): BlogPost[] {
  if (!tag) return []

  const tagLower = tag.toLowerCase()
  return posts.filter(post => 
    post.published &&
    extractTags(post.content).some(postTag => 
      postTag.toLowerCase().includes(tagLower)
    )
  )
}

/**
 * Search posts by query in title, summary, or content
 */
export function searchPosts(posts: BlogPost[], query: string): BlogPost[] {
  if (!query) return []

  const queryLower = query.toLowerCase()
  return posts.filter(post => 
    post.published && (
      post.title.toLowerCase().includes(queryLower) ||
      post.summary.toLowerCase().includes(queryLower) ||
      post.content.toLowerCase().includes(queryLower)
    )
  )
}

/**
 * Get popular posts based on views
 */
export function getPopularPosts(posts: BlogPost[], limit: number = 3): BlogPost[] {
  return posts
    .filter(post => post.published)
    .sort((a, b) => b.views - a.views)
    .slice(0, limit)
}

/**
 * Get posts by author
 */
export function getPostsByAuthor(posts: BlogPost[], authorId: string): BlogPost[] {
  return posts.filter(post => 
    post.published && post.authorId === authorId
  )
}

/**
 * Get all unique tags from all posts
 */
export function getAllTags(posts: BlogPost[]): string[] {
  const allTags = posts
    .filter(post => post.published)
    .flatMap(post => extractTags(post.content))
  
  const uniqueTags = [...new Set(allTags)]
  return uniqueTags.sort()
}