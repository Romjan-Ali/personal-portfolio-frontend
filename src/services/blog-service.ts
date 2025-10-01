// services/blog-service.ts
import { apiClient } from '@/lib/api-client'

export interface Blog {
  id: string
  title: string
  slug: string
  summary: string
  content: string
  published: boolean
  views: number
  thumbnail?: string
  images: string[]
  author: {
    id: string
    name: string
    email: string
    profileImage?: string
  }
  createdAt: string
  updatedAt: string
}

export interface BlogListResponse {
  success: boolean
  data: Blog[]
  pagination?: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

export interface BlogResponse {
  success: boolean
  data: Blog
}

export interface BlogQuery {
  page?: number
  limit?: number
  search?: string
  tag?: string
  published?: boolean
}

export interface CreateBlogData {
  title: string
  slug: string
  summary: string
  content: string
  published?: boolean
  thumbnail?: string
  images?: string[]
}

export interface UpdateBlogData extends Partial<CreateBlogData> {}

class BlogService {
  private getAuthHeaders() {
    const token = localStorage.getItem('auth_token')
    return token ? { Authorization: `Bearer ${token}` } : {}
  }

  // GET Operations
  async getBlogs(query: BlogQuery = {}): Promise<BlogListResponse> {
    return apiClient.get<BlogListResponse>('/blogs', query)
  }

  async getBlogBySlug(slug: string): Promise<BlogResponse> {
    return apiClient.get<BlogResponse>(`/blogs/${slug}`)
  }

  async getBlogById(id: string): Promise<BlogResponse> {
    return apiClient.get<BlogResponse>(`/blogs/${id}`)
  }

  async getFeaturedBlogs(limit: number = 3): Promise<BlogListResponse> {
    return this.getBlogs({ limit, page: 1 })
  }

  async getPopularBlogs(limit: number = 5): Promise<BlogListResponse> {
    const response = await this.getBlogs({ limit, page: 1 })
    response.data.sort((a, b) => b.views - a.views)
    return response
  }

  async searchBlogs(searchTerm: string): Promise<BlogListResponse> {
    return this.getBlogs({ search: searchTerm, page: 1, limit: 10 })
  }

  async getBlogsByTag(tag: string): Promise<BlogListResponse> {
    return this.getBlogs({ tag, page: 1, limit: 10 })
  }

  // CREATE Operation
  async createBlog(blogData: CreateBlogData): Promise<BlogResponse> {
    return apiClient.post<BlogResponse>('/blogs', blogData, {
      headers: this.getAuthHeaders(),
    })
  }

  // UPDATE Operation
  async updateBlog(id: string, blogData: UpdateBlogData): Promise<BlogResponse> {
    return apiClient.put<BlogResponse>(`/blogs/${id}`, blogData, {
      headers: this.getAuthHeaders(),
    })
  }

  // DELETE Operation
  async deleteBlog(id: string): Promise<{ success: boolean; message: string }> {
    return apiClient.delete<{ success: boolean; message: string }>(`/blogs/${id}`, {
      headers: this.getAuthHeaders(),
    })
  }

  // Publish/Unpublish
  async publishBlog(id: string): Promise<BlogResponse> {
    return this.updateBlog(id, { published: true })
  }

  async unpublishBlog(id: string): Promise<BlogResponse> {
    return this.updateBlog(id, { published: false })
  }
}

export const blogService = new BlogService()