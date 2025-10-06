// app/components/sections/about-section.tsx

import { Button } from '@/components/ui/button'
import { personalDetails } from '@/lib/about-data'
import { Download, MapPin, Calendar } from 'lucide-react'
import Image from 'next/image'

export function AboutSection() {
  const stats = personalDetails.stats
  const displayData = personalDetails

  return (
    <section
      id="about"
      className="py-20 relative overflow-hidden 
      bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 
      dark:from-slate-900 dark:via-slate-800 dark:to-purple-900"
    >
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-30"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-30"></div>

      <div className="relative container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            About Me
          </h2>
          <div className="w-24 h-1 bg-purple-600 mx-auto mb-6"></div>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            {displayData.shortBio}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <div className="relative">
            <div className="relative z-10">
              <div className="w-80 h-96 mx-auto bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl p-1">
                <div className="w-full h-full bg-slate-800 rounded-2xl flex items-center justify-center overflow-hidden">
                  <Image
                    className="object-cover w-full h-full"
                    width={320}
                    height={384}
                    src={displayData.imageUrl}
                    alt={displayData.fullName}
                    priority
                  />
                </div>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-30"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-30"></div>
          </div>

          {/* Content Section */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                {displayData.title}
              </h3>
              <div className="text-slate-600 dark:text-slate-300 leading-relaxed space-y-4">
                {displayData.bio?.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 py-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700"
                >
                  <div className="text-2xl font-bold text-purple-600 mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Personal Info */}
            <div className="space-y-3">
              <div className="flex items-center text-slate-600 dark:text-slate-300">
                <MapPin className="w-5 h-5 mr-3 text-purple-600" />
                <span>{displayData.location}</span>
              </div>
              <div className="flex items-center text-slate-600 dark:text-slate-300">
                <Calendar className="w-5 h-5 mr-3 text-purple-600" />
                <span>{displayData.status}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6" id='download-cv'>
              <Button
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full"
                asChild
              >
                <a
                  href="https://drive.google.com/file/d/1v_EuoLYsOK1758Gh58_TCLvhO0f9IVWm/view?usp=drive_link"
                  target="_blank"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download CV
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
