// app/components/sections/hero-section.tsx

import { Button } from '@/components/ui/button'
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <div className="mb-6">
          <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 p-1">
            <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center">
              <span className="text-2xl font-bold">
                <Image
                  className="rounded-full"
                  width={800}
                  height={800}
                  src="https://romjan-ali.netlify.app/static/media/romjan-ali.ff69abe51f82a3b04b55.jpg"
                  alt="Romjan Ali"
                />
              </span>
            </div>
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          Romjan Ali
        </h1>

        <div className="text-xl md:text-2xl text-gray-300 mb-8">
          <span className="typing-animation">
            Full Stack Developer & UI/UX Enthusiast
          </span>
        </div>

        <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          I create exceptional digital experiences with modern technologies.
          Passionate about clean code, user-centric design, and innovative
          solutions.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Link
            href="#projects"
            className="rounded-full overflow-hidden transition-all duration-300 transform hover:scale-105"
          >
            <Button
              size="lg"
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 font-semibold"
            >
              View My Work
              <ArrowDown className="ml-2 w-4 h-4" />
            </Button>
          </Link>
          <Link
            href="#contact"
            className="rounded-full overflow-hidden transition-all duration-300 transform hover:scale-105"
          >
            <Button
              variant="outline"
              size="lg"
              className="border-white text-slate-600 hover:bg-white hover:text-slate-900 px-8 py-3 rounded-full font-semibold"
            >
              Get In Touch
              <ArrowDown className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="flex justify-center space-x-6">
          <a
            href="https://github.com"
            className="text-gray-400 hover:text-white transition-colors duration-300 transform hover:scale-110"
          >
            <Github className="w-6 h-6" />
          </a>
          <a
            href="https://linkedin.com"
            className="text-gray-400 hover:text-white transition-colors duration-300 transform hover:scale-110"
          >
            <Linkedin className="w-6 h-6" />
          </a>
          <a
            href="mailto:john@example.com"
            className="text-gray-400 hover:text-white transition-colors duration-300 transform hover:scale-110"
          >
            <Mail className="w-6 h-6" />
          </a>
        </div>
      </div>
    </section>
  )
}
