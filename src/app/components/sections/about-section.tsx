// app/components/sections/about-section.tsx
import { Button } from '@/components/ui/button'
import { Download, MapPin, Calendar } from 'lucide-react'
import Image from 'next/image'

export function AboutSection() {
  const stats = [
    { number: '3+', label: 'Years Experience' },
    { number: '50+', label: 'Projects Completed' },
    { number: '25+', label: 'Happy Clients' },
    { number: '10+', label: 'Technologies' },
  ]
  

  return (
    <section id="about" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            About Me
          </h2>
          <div className="w-24 h-1 bg-purple-600 mx-auto mb-6"></div>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Passionate developer crafting digital solutions that make a difference
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <div className="relative">
            <div className="relative z-10">
              <div className="w-80 h-96 mx-auto bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl p-1">
                <div className="w-full h-full bg-slate-800 rounded-2xl flex items-center justify-center overflow-hidden">
                  <span className="text-white text-lg">
                    <Image className='object-cover' width={600} height={2000} src="/images/romjan-ali-2-3-r.png" alt="Romjan Ali" />
                  </span>
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
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Crafting Digital Excellence
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Hello! I&apos;m John Doe, a passionate Full Stack Developer with over 3 years of experience 
                creating web applications that solve real-world problems. I specialize in modern 
                JavaScript frameworks and love turning complex ideas into beautiful, functional code.
              </p>
              <p className="text-slate-600 leading-relaxed">
                When I&apos;m not coding, you can find me exploring new technologies, contributing to 
                open-source projects, or sharing my knowledge through blog posts and tutorials.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 py-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-4 bg-white rounded-lg shadow-sm border border-slate-200">
                  <div className="text-2xl font-bold text-purple-600 mb-1">{stat.number}</div>
                  <div className="text-sm text-slate-600">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Personal Info */}
            <div className="space-y-3">
              <div className="flex items-center text-slate-600">
                <MapPin className="w-5 h-5 mr-3 text-purple-600" />
                <span>New York, NY</span>
              </div>
              <div className="flex items-center text-slate-600">
                <Calendar className="w-5 h-5 mr-3 text-purple-600" />
                <span>Available for freelance work</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full">
                <Download className="w-4 h-4 mr-2" />
                Download CV
              </Button>
              <Button variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-100 px-8 py-3 rounded-full">
                View My Story
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}