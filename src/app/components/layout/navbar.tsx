// app/components/layout/navbar.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Menu, X, Sun, Moon, Download } from 'lucide-react'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      // Update active section based on scroll position
      const sections = [
        'home',
        'about',
        'skills',
        'projects',
        'blog',
        'contact',
      ]
      const current = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (current) setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' },
  ]

  const scrollToSection = (href: string) => {
    const sectionId = href.replace('#', '')
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsOpen(false)
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    if (!darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-lg border-b border-slate-200 dark:border-slate-700'
          : 'bg-transparent dark:bg-gradient-to-b dark:from-slate-900/50 dark:to-slate-900/30'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="#home"
            onClick={() => scrollToSection('#home')}
            className="flex items-center space-x-2 group"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">RA</span>
            </div>
            <span
              className={`font-bold text-lg transition-colors duration-300 ${
                isScrolled
                  ? 'text-slate-900 dark:text-white'
                  : 'text-slate-700 dark:text-slate-100'
              } group-hover:text-purple-600 dark:group-hover:text-purple-400`}
            >
              Romjan Ali
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`relative font-medium transition-all duration-300 text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400
                 ${
                   activeSection === item.href.replace('#', '')
                     ? 'text-purple-600 dark:text-purple-400 font-semibold'
                     : ''
                 }`}
              >
                {item.name}
                {activeSection === item.href.replace('#', '') && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-purple-600 dark:bg-purple-400"></span>
                )}
              </button>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg transition-all duration-300 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {darkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            <Button
              onClick={() => scrollToSection('#contact')}
              className="rounded-full transition-all duration-300 bg-purple-600 hover:bg-purple-700 text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              Resume
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 rounded-lg transition-all duration-300 ${
              isScrolled ? 'text-slate-700 dark:text-slate-300' : 'text-white'
            }`}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            isOpen ? 'max-h-96 pb-4' : 'max-h-0'
          }`}
        >
          <div className="flex flex-col space-y-4 pt-4 border-t border-slate-200 dark:border-slate-700">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`text-left font-medium transition-all duration-300 ${
                  isScrolled
                    ? 'text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400'
                    : 'text-white/90 hover:text-white'
                } ${
                  activeSection === item.href.replace('#', '')
                    ? 'text-purple-600 dark:text-purple-400 font-semibold'
                    : ''
                }`}
              >
                {item.name}
              </button>
            ))}

            <div className="flex items-center space-x-4 pt-4">
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  isScrolled
                    ? 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    : 'text-white/90 hover:bg-white/10'
                }`}
              >
                {darkMode ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>

              <Button
                onClick={() => {
                  scrollToSection('#contact')
                  setIsOpen(false)
                }}
                className={`flex-1 rounded-full transition-colors duration-300 ${
                  isScrolled
                    ? 'bg-purple-600 hover:bg-purple-700 text-white dark:bg-purple-500 dark:hover:bg-purple-600 dark:text-white'
                    : 'bg-slate-100/70 backdrop-blur-sm text-slate-900 hover:bg-white hover:text-slate-900 border border-slate-300 dark:bg-slate-800/20 dark:text-white dark:hover:bg-slate-700 dark:hover:text-white dark:border-slate-600'
                }`}
              >
                <Download className="w-4 h-4 mr-2" />
                Resume
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
