// app/components/admin/admin-header.tsx
'use client'

import { Bell, User, Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'

export function AdminHeader() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    // Check if dark mode is enabled on component mount
    const isDark = document.documentElement.classList.contains('dark')
    setDarkMode(isDark)
  }, [])

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  return (
    <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 p-4 transition-colors duration-300">
      <div className="flex items-center justify-end">
        

        <div className="flex items-center space-x-4">
          {/* Dark/Light Mode Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
            title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="text-slate-600 dark:text-slate-300"
          >
            <Bell className="w-5 h-5" />
          </Button>

          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="text-sm">
              <div className="font-medium text-slate-900 dark:text-white">
                Romjan Ali
              </div>
              <div className="text-slate-500 dark:text-slate-400">Admin</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}