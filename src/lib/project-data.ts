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

// Revalidation tags
export const PROJECT_TAGS = {
  ALL: 'projects',
  LIST: 'projects-list',
  FEATURED: 'projects-featured',
  BY_TAG: (tag: string) => `projects-tag-${tag}`,
  BY_SEARCH: (query: string) => `projects-search-${query}`,
  SINGLE: (id: string) => `project-${id}`,
} as const

// API service functions with revalidation support
async function fetchFromAPI(endpoint: string, options?: RequestInit & { next?: { tags?: string[]; revalidate?: number } }) {
  try {
    const { next, ...fetchOptions } = options || {}
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...fetchOptions?.headers,
      },
      ...fetchOptions,
      next: next ? { tags: next.tags, revalidate: next.revalidate } : undefined,
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

// Revalidation utility functions
async function revalidateTag(tag: string) {
  try {
    const response = await fetch('/api/revalidate?tag=' + encodeURIComponent(tag), {
      method: 'POST',
    })
    
    if (!response.ok) {
      throw new Error(`Revalidation failed for tag: ${tag}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error(`Failed to revalidate tag ${tag}:`, error)
  }
}

export async function revalidateProjects() {
  await revalidateTag(PROJECT_TAGS.ALL)
  await revalidateTag(PROJECT_TAGS.LIST)
}

export async function revalidateProject(id: string) {
  await revalidateTag(PROJECT_TAGS.SINGLE(id))
}

export async function revalidateProjectTag(tag: string) {
  await revalidateTag(PROJECT_TAGS.BY_TAG(tag))
}

export async function revalidateProjectSearch(query: string) {
  await revalidateTag(PROJECT_TAGS.BY_SEARCH(query))
}

// GET functions with revalidation
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
    
    // Determine revalidation tags
    const defaultTags: string[] = [PROJECT_TAGS.ALL, PROJECT_TAGS.LIST]
    
    if (filters?.featured) {
      defaultTags.push(PROJECT_TAGS.FEATURED)
    }
    
    if (filters?.tags && filters.tags.length > 0) {
      filters.tags.forEach(tag => defaultTags.push(PROJECT_TAGS.BY_TAG(tag)))
    }
    
    if (filters?.search) {
      defaultTags.push(PROJECT_TAGS.BY_SEARCH(filters.search))
    }

    const data = await fetchFromAPI(endpoint, {
      next: {
        tags: defaultTags,
        revalidate: 60, // Revalidate every 60 seconds
      }
    })
    
    return data.data || data
  } catch (error) {
    console.error('Failed to get projects:', error)
    return []
  }
}

export async function getFeaturedProjects() {
  try {
    const data = await fetchFromAPI('/projects/featured', {
      next: {
        tags: [PROJECT_TAGS.ALL, PROJECT_TAGS.FEATURED],
        revalidate: 60,
      }
    })
    return data.data || data
  } catch (error) {
    console.error('Failed to get featured projects:', error)
    return []
  }
}

export async function getProjectById(id: string) {
  try {
    const data = await fetchFromAPI(`/projects/${id}`, {
      next: {
        tags: [PROJECT_TAGS.ALL, PROJECT_TAGS.SINGLE(id)],
        revalidate: 60,
      }
    })
    return data.data || data
  } catch (error) {
    console.error(`Failed to get project ${id}:`, error)
    return null
  }
}

export async function getProjectsByTag(tag: string) {
  try {
    const data = await fetchFromAPI(`/projects/tags/${tag}`, {
      next: {
        tags: [PROJECT_TAGS.ALL, PROJECT_TAGS.BY_TAG(tag)],
        revalidate: 60,
      }
    })
    return data.data || data
  } catch (error) {
    console.error(`Failed to get projects by tag ${tag}:`, error)
    return []
  }
}

export async function searchProjects(query: string) {
  try {
    const data = await fetchFromAPI(`/projects/search?q=${encodeURIComponent(query)}`, {
      next: {
        tags: [PROJECT_TAGS.ALL, PROJECT_TAGS.BY_SEARCH(query)],
        revalidate: 60,
      }
    })
    return data.data || data
  } catch (error) {
    console.error(`Failed to search projects:`, error)
    return []
  }
}

// Mutation functions with manual revalidation
export async function createProject(projectData: Partial<Project>, token: string) {
  try {
    const data = await fetchFromAPI('/projects', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(projectData)
    })

    const result = data.data || data
    
    // Revalidate after successful creation
    if (result) {
      await revalidateProjects()
      if (result.id) {
        await revalidateProject(result.id)
      }
      // Revalidate tag pages if the project has tags
      if (result.tags && Array.isArray(result.tags)) {
        for (const tag of result.tags) {
          await revalidateProjectTag(tag)
        }
      }
      // Revalidate featured if project is featured
      if (result.featured) {
        await revalidateTag(PROJECT_TAGS.FEATURED)
      }
    }

    return result
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
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(projectData)
    })

    const result = data.data || data
    
    // Revalidate after successful update
    if (result) {
      await revalidateProjects()
      await revalidateProject(id)
      // Revalidate tag pages
      if (result.tags && Array.isArray(result.tags)) {
        for (const tag of result.tags) {
          await revalidateProjectTag(tag)
        }
      }
      // Revalidate featured if project is featured
      if (result.featured) {
        await revalidateTag(PROJECT_TAGS.FEATURED)
      }
    }

    return result
  } catch (error) {
    console.error(`Failed to update project ${id}:`, error)
    throw error
  }
}

export async function deleteProject(id: string, token: string) {
  try {
    // Get project data before deletion for revalidation
    const project = await getProjectById(id)
    
    const data = await fetchFromAPI(`/projects/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    // Revalidate after successful deletion
    await revalidateProjects()
    await revalidateProject(id)
    
    // Revalidate tag pages if the deleted project had tags
    if (project?.tags && Array.isArray(project.tags)) {
      for (const tag of project.tags) {
        await revalidateProjectTag(tag)
      }
    }
    // Revalidate featured if project was featured
    if (project?.featured) {
      await revalidateTag(PROJECT_TAGS.FEATURED)
    }

    return data
  } catch (error) {
    console.error(`Failed to delete project ${id}:`, error)
    throw error
  }
}

export async function getAllProjectTags() {
  try {
    const data = await fetchFromAPI('/projects/tags', {
      next: {
        tags: [PROJECT_TAGS.ALL, 'project-tags'],
        revalidate: 3600, // Cache tags longer (1 hour)
      }
    })
    return data.tags || data || []
  } catch (error) {
    console.error('Failed to get project tags:', error)
    return []
  }
}