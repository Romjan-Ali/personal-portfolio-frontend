// services/auth-service.ts
import { apiClient } from '@/lib/api-client'

export interface User {
  id: string
  email: string
  name: string
  profileImage?: string
  role: string
}

export interface AuthResponse {
  success: boolean
  data: {
    user: User
    token: string
  }
}

class AuthService {
  private token: string | null = null

  constructor() {
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth_token')
    }
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/login', {
      email,
      password,
    })

    if (response.success) {
      this.setToken(response.data.token)
    }

    return response
  }

  async register(userData: {
    email: string
    name: string
    password: string
    profileImage?: string
  }): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/register', userData)

    if (response.success) {
      this.setToken(response.data.token)
    }

    return response
  }

  async getCurrentUser(): Promise<{ success: boolean; data: User }> {
    return apiClient.get<{ success: boolean; data: User }>('/auth/me', {
      headers: this.getAuthHeaders(),
    })
  }

  setToken(token: string) {
    this.token = token
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token)
    }
  }

  getToken(): string | null {
    return this.token
  }

  getAuthHeaders() {
    return this.token ? { Authorization: `Bearer ${this.token}` } : {}
  }

  logout() {
    this.token = null
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token')
    }
  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  isAdmin(): boolean {
    // In a real app, you'd decode the token to check the role
    // For now, we'll assume admin based on token presence
    return this.isAuthenticated()
  }
}

export const authService = new AuthService()