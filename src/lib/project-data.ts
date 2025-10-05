export interface Project {
  id: string
  title: string
  description: string
  image?: string | null
  liveUrl?: string | null
  repoUrl?: string | null
  tags: string[]
  featured: boolean
  createdAt: string
  updatedAt: string
  owner?: {
    id: string
    name: string | null
    email: string
    profileImage: string | null
  }
  ownerId?: string
}

export interface ProjectFilters {
  featured?: boolean
  ownerId?: string
  tags?: string[]
  search?: string
  page?: number
  limit?: number
}

// API base URL - adjust based on your environment
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api'

// API service functions
async function fetchFromAPI(endpoint: string, options?: RequestInit) {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Failed to fetch from ${endpoint}:`, error)
    throw error
  }
}

export async function getAllProjects(filters?: ProjectFilters) {
  try {
    const queryParams = new URLSearchParams()
    
    if (filters?.featured !== undefined) {
      queryParams.append('featured', filters.featured.toString())
    }
    if (filters?.ownerId) {
      queryParams.append('ownerId', filters.ownerId)
    }
    if (filters?.tags && filters.tags.length > 0) {
      filters.tags.forEach(tag => queryParams.append('tags', tag))
    }
    if (filters?.search) {
      queryParams.append('search', filters.search)
    }
    if (filters?.page) {
      queryParams.append('page', filters.page.toString())
    }
    if (filters?.limit) {
      queryParams.append('limit', filters.limit.toString())
    }

    const queryString = queryParams.toString()
    const endpoint = queryString ? `/projects?${queryString}` : '/projects'
    
    const data = await fetchFromAPI(endpoint)
    return data.data || data
  } catch (error) {
    console.error('Failed to get projects:', error)
    return []
  }
}

export async function getFeaturedProjects() {
  try {
    const data = await fetchFromAPI('/projects/featured')
    return data.data || data
  } catch (error) {
    console.error('Failed to get featured projects:', error)
    return []
  }
}

export async function getProjectById(id: string) {
  try {
    const data = await fetchFromAPI(`/projects/${id}`)
    return data.data || data
  } catch (error) {
    console.error(`Failed to get project ${id}:`, error)
    return null
  }
}

export async function getProjectsByTag(tag: string) {
  try {
    const data = await fetchFromAPI(`/projects/tags/${tag}`)
    return data.data || data
  } catch (error) {
    console.error(`Failed to get projects by tag ${tag}:`, error)
    return []
  }
}

export async function searchProjects(query: string) {
  try {
    const data = await fetchFromAPI(`/projects/search?q=${encodeURIComponent(query)}`)
    return data.data || data
  } catch (error) {
    console.error(`Failed to search projects:`, error)
    return []
  }
}

export async function createProject(projectData: Partial<Project>, token: string) {
  try {
    const data = await fetchFromAPI('/projects', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(projectData)
    })

    return data.data || data
  } catch (error) {
    console.error('Failed to create project:', error)
    throw error
  }
}

export async function updateProject(id: string, projectData: Partial<Project>, token: string) {
  try {
    const data = await fetchFromAPI(`/projects/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(projectData)
    })

    return data.data || data
  } catch (error) {
    console.error(`Failed to update project ${id}:`, error)
    throw error
  }
}

export async function deleteProject(id: string, token: string) {
  try {
    const data = await fetchFromAPI(`/projects/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    return data
  } catch (error) {
    console.error(`Failed to delete project ${id}:`, error)
    throw error
  }
}

export async function getAllProjectTags() {
  try {
    const projects = await getAllProjects()
    const allTags = projects.flatMap((project: Project) => project.tags || [])
    return [...new Set(allTags)].sort()
  } catch (error) {
    console.error('Failed to get project tags:', error)
    return []
  }
}