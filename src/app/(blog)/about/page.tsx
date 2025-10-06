// app/about/page.tsx
import { AboutSection } from '@/app/components/sections/about-section'
import { SkillsSection } from '@/app/components/sections/skills-section'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "About | Romjan Ali",
  description: "Learn more about Romjan Ali — a passionate MERN and React Native developer.",
  openGraph: {
    title: "About | Romjan Ali",
    description: "Full-stack MERN & React Native developer.",
    url: "romjan-ali.vercel.app",
    siteName: "Romjan Ali Portfolio",
    type: "website",
  },
};


export default function AboutPage() {
  return (
    <>
      <AboutSection />
      <SkillsSection />
    </>
  )
}
