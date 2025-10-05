export interface StatItem {
  number: string
  label: string
}

export interface About {
  id: string
  fullName: string
  title: string
  bio: string
  shortBio: string
  email: string
  phone: string
  location: string
  imageUrl: string
  resumeUrl: string
  status: string
  stats: { number: string; label: string }[]
  createdAt: string
  updatedAt: string
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

export async function getAbout() {
  try {
    const data = await fetchFromAPI('/about')
    return data.data || data
  } catch (error) {
    console.error('Failed to get about information:', error)
    return null
  }
}

export async function getPublicAbout() {
  try {
    const data = await fetchFromAPI('/about/public')
    return data.data || data
  } catch (error) {
    console.error('Failed to get public about information:', error)
    return null
  }
}

export async function getAboutById(id: string) {
  try {
    const data = await fetchFromAPI(`/about/${id}`)
    return data.data || data
  } catch (error) {
    console.error(`Failed to get about ${id}:`, error)
    return null
  }
}

export async function createAbout(aboutData: Partial<About>, token: string) {
  try {
    const data = await fetchFromAPI('/about', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(aboutData),
    })

    return data.data || data
  } catch (error) {
    console.error('Failed to create about information:', error)
    throw error
  }
}

export async function updateAbout(
  id: string,
  aboutData: Partial<About>,
  token: string
) {
  try {
    const data = await fetchFromAPI(`/about/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(aboutData),
    })

    return data.data || data
  } catch (error) {
    console.error(`Failed to update about ${id}:`, error)
    throw error
  }
}

export async function upsertAbout(aboutData: Partial<About>, token: string) {
  try {
    const data = await fetchFromAPI('/about', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(aboutData),
    })

    return data.data || data
  } catch (error) {
    console.error('Failed to upsert about information:', error)
    throw error
  }
}

export async function deleteAbout(id: string, token: string) {
  try {
    const data = await fetchFromAPI(`/about/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return data
  } catch (error) {
    console.error(`Failed to delete about ${id}:`, error)
    throw error
  }
}

// Helper functions for common about data operations
export async function getAboutStats() {
  try {
    const about = await getAbout()
    return about?.stats || []
  } catch (error) {
    console.error('Failed to get about stats:', error)
    return []
  }
}

export async function getAboutForHomepage() {
  try {
    const about = await getPublicAbout()
    if (!about) return null

    // Return only the fields needed for homepage
    return {
      fullName: about.fullName,
      title: about.title,
      shortBio: about.shortBio,
      imageUrl: about.imageUrl,
      stats: about.stats,
      location: about.location,
      status: about.status,
    }
  } catch (error) {
    console.error('Failed to get about for homepage:', error)
    return null
  }
}
