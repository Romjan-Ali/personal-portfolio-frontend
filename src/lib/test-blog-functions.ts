// lib/test-blog-functions.ts
import { blogPosts } from './blog-data'
import { getBlogPostBySlug, getRelatedPosts } from './blog-utils'

// Test getBlogPostBySlug
console.log('=== Testing getBlogPostBySlug ===')

const existingPost = getBlogPostBySlug(blogPosts, 'react-best-practices-2024')
console.log('Found post:', existingPost?.title) // Should find the React post

const nonExistingPost = getBlogPostBySlug(blogPosts, 'non-existing-slug')
console.log('Non-existing post:', nonExistingPost) // Should be undefined

// Test getRelatedPosts
console.log('\n=== Testing getRelatedPosts ===')

if (existingPost) {
  const related = getRelatedPosts(blogPosts, existingPost.id, 2)
  console.log(`Related posts for "${existingPost.title}":`)
  related.forEach(post => {
    console.log(`- ${post.title} (similarity based on tags/content)`)
  })
}

// Test with different scenarios
console.log('\n=== Testing Edge Cases ===')

// Empty posts array
const emptyResult = getBlogPostBySlug([], 'test')
console.log('Empty posts result:', emptyResult) // undefined

// Invalid slug
const invalidResult = getBlogPostBySlug(blogPosts, '')
console.log('Invalid slug result:', invalidResult) // undefined

// Related posts for non-existent post
const nonExistentRelated = getRelatedPosts(blogPosts, 'non-existent-id')
console.log('Non-existent post related:', nonExistentRelated) // []