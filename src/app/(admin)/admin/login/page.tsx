// app/admin/login/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/app/components/auth/auth-provider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Eye, EyeOff, Mail, Lock, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    const success = await login(email, password)
    if (!success) {
      setError('Invalid email or password')
    }
    setIsLoading(false)
  }

  console.log('login')

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Back to Site */}
        <Link
          href="/"
          className="inline-flex items-center text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Portfolio
        </Link>

        <Card className="border-slate-200 dark:border-slate-700 shadow-xl">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">RA</span>
            </div>
            <CardTitle className="text-2xl">Admin Login</CardTitle>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Sign in to manage your portfolio
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                  <p className="text-red-800 dark:text-red-200 text-sm">
                    {error}
                  </p>
                </div>
              )}

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@example.com"
                    className="pl-10 bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="pl-10 pr-10 bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2"
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
              <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-2">
                Demo Credentials:
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Email: admin@romjanali.com
                <br />
                Password: demo123
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
