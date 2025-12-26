// app/components/sections/skills-section.tsx
'use client'

import { useEffect, useState } from 'react'
import {
  getSkillsByCategory,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type SkillCategory as ApiSkillCategory,
} from '@/lib/skill-data'

interface Skill {
  name: string
  level: number
  color: string
}

interface LocalSkillCategory {
  title: string
  skills: Skill[]
}

export function SkillsSection() {
  const [skillCategories, setSkillCategories] = useState<LocalSkillCategory[]>(
    []
  )
  const [loading, setLoading] = useState(true)

  // Default static data as fallback
  const defaultSkillCategories: LocalSkillCategory[] = [
    {
      title: 'Frontend',
      skills: [
        { name: 'React', level: 90, color: 'bg-blue-500' },
        { name: 'React Native (Expo)', level: 85, color: 'bg-indigo-500' },
        { name: 'TypeScript', level: 80, color: 'bg-blue-600' },
        { name: 'Next.js', level: 78, color: 'bg-black' },
        { name: 'Tailwind CSS', level: 92, color: 'bg-cyan-500' },
      ],
    },
    {
      title: 'Backend',
      skills: [
        { name: 'Node.js', level: 88, color: 'bg-green-500' },
        { name: 'Express.js', level: 85, color: 'bg-green-600' },
        { name: 'MongoDB', level: 82, color: 'bg-emerald-600' },
        { name: 'PostgreSQL', level: 75, color: 'bg-blue-700' },
        { name: 'Prisma ORM', level: 80, color: 'bg-purple-600' },
      ],
    },
    {
      title: 'State & Utilities',
      skills: [
        { name: 'Zustand', level: 78, color: 'bg-teal-500' },
        { name: 'Redux Toolkit Query', level: 75, color: 'bg-pink-500' },
        { name: 'Expo SecureStore', level: 70, color: 'bg-gray-600' },
        { name: 'Zod', level: 72, color: 'bg-yellow-600' },
      ],
    },
    {
      title: 'Tools & Others',
      skills: [
        { name: 'Git & GitHub', level: 90, color: 'bg-orange-500' },
        { name: 'Bun', level: 80, color: 'bg-gray-500' },
        { name: 'Docker', level: 70, color: 'bg-blue-500' },
        { name: 'Linux (Ubuntu)', level: 85, color: 'bg-slate-600' },
      ],
    },
  ]

  const additionalTechnologies = [
    'JavaScript (ES6+)',
    'HTML5 & CSS3',
    'jQuery',
    'Expo',
    'REST APIs',
    'Zod',
    'Redux Toolkit Query',
    'NativeWindCSS',
    'Prisma ORM',
    'PostgreSQL',
    'MongoDB',
    'Mongoose',
    'Git & GitHub',
    'Bun',
    'Linux (Ubuntu)',
    'Docker',
  ]

  useEffect(() => {
    const fetchSkillsData = async () => {
      try {
        const apiCategories = await getSkillsByCategory()

        if (apiCategories && apiCategories.length > 0) {
          // Transform API data to match the local structure
          const transformedCategories: LocalSkillCategory[] = apiCategories.map(
            (category: LocalSkillCategory) => ({
              title: category.title,
              skills: category.skills.map((skill) => ({
                name: skill.name,
                level: skill.level,
                color: skill.color || getDefaultColor(skill.level), // Use provided color or generate based on level
              })),
            })
          )
          setSkillCategories(transformedCategories)
        } else {
          setSkillCategories(defaultSkillCategories)
        }
      } catch (err) {
        console.error('Failed to fetch skills data:', err)
        setSkillCategories(defaultSkillCategories)
      } finally {
        setLoading(false)
      }
    }

    fetchSkillsData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Helper function to generate default colors based on skill level
  const getDefaultColor = (level: number): string => {
    if (level >= 90) return 'bg-green-500'
    if (level >= 80) return 'bg-blue-500'
    if (level >= 70) return 'bg-purple-500'
    if (level >= 60) return 'bg-yellow-500'
    return 'bg-gray-500'
  }

  // Use API data if available, otherwise use default data
  const displayCategories =
    skillCategories.length > 0 ? skillCategories : defaultSkillCategories

  if (loading) {
    return (
      <section
        id="skills"
        className="py-20 relative overflow-hidden 
        bg-linear-to-br from-slate-50 via-purple-50 to-pink-50 
        dark:from-slate-900 dark:via-slate-800 dark:to-purple-900"
      >
        {/* Decorative blobs */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-30"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-30"></div>

        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="h-10 bg-slate-300 dark:bg-slate-700 rounded w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="w-24 h-1 bg-purple-600 mx-auto mb-6"></div>
            <div className="h-6 bg-slate-300 dark:bg-slate-700 rounded w-96 mx-auto animate-pulse"></div>
          </div>

          <div className="grid md:grid-cols-2 2xl:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[1, 2, 3, 4].map((categoryIndex) => (
              <div
                key={categoryIndex}
                className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 animate-pulse"
              >
                <div className="h-8 bg-slate-300 dark:bg-slate-700 rounded w-32 mx-auto mb-6"></div>
                <div className="space-y-6">
                  {[1, 2, 3, 4, 5].map((skillIndex) => (
                    <div key={skillIndex} className="group">
                      <div className="flex justify-between items-center mb-2">
                        <div className="h-5 bg-slate-300 dark:bg-slate-700 rounded w-24"></div>
                        <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-8"></div>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
                        <div className="h-full bg-slate-300 dark:bg-slate-600 rounded-full w-3/4"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Additional Skills Grid Loading */}
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="h-8 bg-slate-300 dark:bg-slate-700 rounded w-48 mx-auto mb-8 animate-pulse"></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(
                (index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-slate-700 rounded-lg px-4 py-3 text-center animate-pulse"
                  >
                    <div className="h-5 bg-slate-300 dark:bg-slate-600 rounded w-full"></div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      id="skills"
      className="py-20 relative overflow-hidden 
      bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 
      dark:from-slate-900 dark:via-slate-800 dark:to-purple-900"
    >
      {/* Decorative blobs */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-30"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-30"></div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Skills & Technologies
          </h2>
          <div className="w-24 h-1 bg-purple-600 mx-auto mb-6"></div>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            A comprehensive overview of my technical expertise and the tools I
            use to bring ideas to life
          </p>
        </div>

        <div className="grid md:grid-cols-2 2xl:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {displayCategories.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">
                {category.title}
              </h3>

              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="group">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-slate-700 dark:text-slate-200">
                        {skill.name}
                      </span>
                      <span className="text-sm text-slate-500 dark:text-slate-400">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${skill.color} transition-all duration-1000 ease-out group-hover:scale-105`}
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Skills Grid */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 text-center">
            Additional Technologies
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {additionalTechnologies.map((tech, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-700 rounded-lg px-4 py-3 text-center 
  text-slate-700 dark:text-slate-200 font-medium 
  hover:bg-purple-100 dark:hover:bg-purple-800 
  hover:text-purple-700 dark:hover:text-purple-200 
  hover:scale-105 transition-transform duration-300 cursor-default"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
