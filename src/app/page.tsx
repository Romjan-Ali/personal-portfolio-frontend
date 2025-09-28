import { Metadata } from 'next'
import { HeroSection } from '@/app/components/sections/hero-section'
import { AboutSection } from '@/app/components/sections/about-section'
import { ProjectsSection } from '@/app/components/sections/projects-section'
import { BlogSection } from '@/app/components/sections/blog-section'
import { ContactSection } from '@/app/components/sections/contact-section'
import { SkillsSection } from '@/app/components/sections/skills-section'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to my portfolio. I\'m a Full Stack Developer passionate about creating exceptional digital experiences.',
  openGraph: {
    title: 'John Doe - Full Stack Developer',
    description: 'Welcome to my portfolio. I\'m a Full Stack Developer passionate about creating exceptional digital experiences.',
    images: ['/og-home.jpg']
  },
  twitter: {
    title: 'John Doe - Full Stack Developer',
    description: 'Welcome to my portfolio. I\'m a Full Stack Developer passionate about creating exceptional digital experiences.',
    images: ['/og-home.jpg']
  }
}

export default async function HomePage() {
  // In a real app, you would fetch data here
  // const [projects, blogs, personalInfo] = await Promise.all([
  //   getProjects({ featured: true, limit: 3 }),
  //   getBlogs({ featured: true, limit: 3 }),
  //   getPersonalInfo()
  // ])

  return (
    <div className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <BlogSection />
      <ContactSection />
    </div>
  )
}

// This would be your data fetching functions
async function getProjects(options: { featured?: boolean; limit?: number }) {
  // Simulate API call
  return [
    {
      id: '1',
      title: 'E-commerce Platform',
      slug: 'ecommerce-platform',
      description: 'Full-stack e-commerce solution with React, Node.js, and PostgreSQL',
      featuredImage: '/projects/ecommerce.jpg',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
      liveUrl: 'https://ecommerce-demo.com',
      githubUrl: 'https://github.com/johndoe/ecommerce',
      status: 'COMPLETED' as const
    },
    {
      id: '2',
      title: 'Task Management App',
      slug: 'task-management-app',
      description: 'Collaborative task management with real-time updates',
      featuredImage: '/projects/taskapp.jpg',
      technologies: ['Next.js', 'Socket.io', 'MongoDB', 'Tailwind'],
      liveUrl: 'https://taskapp-demo.com',
      githubUrl: 'https://github.com/johndoe/taskapp',
      status: 'COMPLETED' as const
    },
    {
      id: '3',
      title: 'Weather Dashboard',
      slug: 'weather-dashboard',
      description: 'Beautiful weather dashboard with data visualization',
      featuredImage: '/projects/weather.jpg',
      technologies: ['React', 'Chart.js', 'API Integration', 'PWA'],
      liveUrl: 'https://weather-demo.com',
      githubUrl: 'https://github.com/johndoe/weather',
      status: 'COMPLETED' as const
    }
  ]
}

async function getBlogs(options: { featured?: boolean; limit?: number }) {
  // Simulate API call
  return [
    {
      id: '1',
      title: 'React Best Practices for 2024',
      slug: 'react-best-practices-2024',
      excerpt: 'Essential patterns and practices for building maintainable React applications in 2024.',
      featuredImage: '/blog/react-best-practices.jpg',
      publishedAt: '2024-01-15T10:00:00Z',
      readTime: 8,
      author: {
        name: 'John Doe',
        avatar: '/authors/john-doe.jpg'
      },
      tags: [
        { name: 'React', color: '#61DAFB' },
        { name: 'JavaScript', color: '#F7DF1E' },
        { name: 'Best Practices', color: '#10B981' }
      ]
    },
    {
      id: '2',
      title: 'Node.js Performance Optimization',
      slug: 'nodejs-performance-optimization',
      excerpt: 'Comprehensive guide to optimizing Node.js applications for better performance.',
      featuredImage: '/blog/nodejs-performance.jpg',
      publishedAt: '2024-01-10T14:30:00Z',
      readTime: 12,
      author: {
        name: 'John Doe',
        avatar: '/authors/john-doe.jpg'
      },
      tags: [
        { name: 'Node.js', color: '#339933' },
        { name: 'Performance', color: '#F59E0B' },
        { name: 'Backend', color: '#8B5CF6' }
      ]
    },
    {
      id: '3',
      title: 'Advanced TypeScript Patterns',
      slug: 'advanced-typescript-patterns',
      excerpt: 'Dive deep into advanced TypeScript features and patterns for robust applications.',
      featuredImage: '/blog/typescript-advanced.jpg',
      publishedAt: '2024-01-05T09:15:00Z',
      readTime: 15,
      author: {
        name: 'John Doe',
        avatar: '/authors/john-doe.jpg'
      },
      tags: [
        { name: 'TypeScript', color: '#3178C6' },
        { name: 'Advanced', color: '#EF4444' },
        { name: 'Patterns', color: '#06B6D4' }
      ]
    }
  ]
}