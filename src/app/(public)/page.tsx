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