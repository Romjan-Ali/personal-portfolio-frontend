// app/admin/login/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Eye, EyeOff, Mail, Lock, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { getSession, signIn } from 'next-auth/react'
import Loading from '@/app/components/loading'

import { ZodError } from 'zod'
import { toast } from 'sonner'
import { loginSchema } from '@/lib/validation/login-validation'

const LoginPage = () => {
  const [email, setEmail] = useState('admin@example.com')
  const [password, setPassword] = useState('hashedPassword')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isComponentLoading, setIsComponentLoading] = useState(true)
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string
    password?: string
  }>({})
  const router = useRouter()

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession()
      console.log({ session })
      if (session?.user?.role === 'ADMIN') {
        router.push('/admin')
      }
      setIsComponentLoading(false)
    }
    checkSession()
  }, [router])

  if (isComponentLoading) {
    return <Loading />
  }

  const validateField = (field: 'email' | 'password', value: string) => {
    try {
      const tempData = { email, password, [field]: value }
      loginSchema.parse(tempData)

      setFieldErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    } catch (err) {
      if (err instanceof ZodError) {
        const fieldError = err.issues.find((issue) => issue.path[0] === field)
        if (fieldError) {
          setFieldErrors((prev) => ({
            ...prev,
            [field]: fieldError.message,
          }))
        }
      }
    }
  }

  // Update input handlers to include validation
  const handleEmailChange = (value: string) => {
    setEmail(value)
    validateField('email', value)
  }

  const handlePasswordChange = (value: string) => {
    setPassword(value)
    validateField('password', value)
  }

  // Add form validation function
  const isFormValid = () => {
    try {
      loginSchema.parse({ email, password })
      return true
    } catch {
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form before submission
    try {
      loginSchema.parse({ email, password })
    } catch (err) {
      if (err instanceof ZodError) {
        const errors: { email?: string; password?: string } = {}
        err.issues.forEach((issue) => {
          const field = issue.path[0] as string
          errors[field as keyof typeof errors] = issue.message
        })
        setFieldErrors(errors)
        toast.error('Please fix the validation errors')
        return
      }
    }

    setIsLoading(true)
    setError('')
    setFieldErrors({})

    try {
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
      })

      if (res?.error) {
        console.log('res.error', res.error)
        setError('Invalid email or password')
        toast.error('Invalid email or password')
      } else {
        toast.success('Login successful!')
        router.push('/admin')
      }
    } catch (error) {
      console.error('Login error:', error)
      toast.error('Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

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
                    onChange={(e) => handleEmailChange(e.target.value)}
                    placeholder="admin@example.com"
                    className={`pl-10 bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 ${
                      fieldErrors.email
                        ? 'border-red-500 dark:border-red-500'
                        : ''
                    }`}
                    required
                  />
                </div>
                {fieldErrors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {fieldErrors.email}
                  </p>
                )}
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
                    onChange={(e) => handlePasswordChange(e.target.value)}
                    placeholder="Enter your password"
                    className={`pl-10 pr-10 bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 ${
                      fieldErrors.password
                        ? 'border-red-500 dark:border-red-500'
                        : ''
                    }`}
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
                {fieldErrors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {fieldErrors.password}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isLoading || !isFormValid()}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2"
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default LoginPage