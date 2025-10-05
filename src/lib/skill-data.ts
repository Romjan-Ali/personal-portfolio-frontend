export interface Skill {
  id: string
  name: string
  level: number
  category: string
  color?: string | null
  order: number
  createdAt: string
  updatedAt: string
}

export interface SkillCategory {
  title: string
  skills: Skill[]
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

export async function getAllSkills() {
  try {
    const data = await fetchFromAPI('/skills')
    return data.data || data
  } catch (error) {
    console.error('Failed to get skills:', error)
    return []
  }
}

export async function getSkillsByCategory() {
  try {
    const data = await fetchFromAPI('/skills/categories')
    return data.data || data
  } catch (error) {
    console.error('Failed to get skills by category:', error)
    return []
  }
}

export async function getSkillCategories() {
  try {
    const data = await fetchFromAPI('/skills/categories/list')
    return data.data || data
  } catch (error) {
    console.error('Failed to get skill categories:', error)
    return []
  }
}

export async function getSkillById(id: string) {
  try {
    const data = await fetchFromAPI(`/skills/${id}`)
    return data.data || data
  } catch (error) {
    console.error(`Failed to get skill ${id}:`, error)
    return null
  }
}

export async function createSkill(skillData: Partial<Skill>, token: string) {
  try {
    const data = await fetchFromAPI('/skills', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(skillData)
    })

    return data.data || data
  } catch (error) {
    console.error('Failed to create skill:', error)
    throw error
  }
}

export async function updateSkill(id: string, skillData: Partial<Skill>, token: string) {
  try {
    const data = await fetchFromAPI(`/skills/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(skillData)
    })

    return data.data || data
  } catch (error) {
    console.error(`Failed to update skill ${id}:`, error)
    throw error
  }
}

export async function deleteSkill(id: string, token: string) {
  try {
    const data = await fetchFromAPI(`/skills/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    return data
  } catch (error) {
    console.error(`Failed to delete skill ${id}:`, error)
    throw error
  }
}

export async function createManySkills(skills: Partial<Skill>[], token: string) {
  try {
    const data = await fetchFromAPI('/skills/bulk', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ skills })
    })

    return data.data || data
  } catch (error) {
    console.error('Failed to create multiple skills:', error)
    throw error
  }
}

export async function reorderSkills(category: string, skillIds: string[], token: string) {
  try {
    const data = await fetchFromAPI(`/skills/reorder/${category}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ skillIds })
    })

    return data.data || data
  } catch (error) {
    console.error(`Failed to reorder skills for category ${category}:`, error)
    throw error
  }
}