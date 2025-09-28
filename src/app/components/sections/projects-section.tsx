// app/components/sections/projects-section.tsx

"use client"

import { Button } from '@/components/ui/button'
import { ExternalLink, Github, ArrowRight } from 'lucide-react'

export function ProjectsSection() {
  const projects = [
    {
      id: '1',
      title: 'E-commerce Platform',
      description: 'Full-stack e-commerce solution with React, Node.js, and PostgreSQL featuring user authentication, payment processing, and admin dashboard.',
      image: '/projects/ecommerce.jpg',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Redis'],
      liveUrl: 'https://ecommerce-demo.com',
      githubUrl: 'https://github.com/johndoe/ecommerce',
      featured: true
    },
    {
      id: '2',
      title: 'Task Management App',
      description: 'Collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
      image: '/projects/taskapp.jpg',
      technologies: ['Next.js', 'Socket.io', 'MongoDB', 'Tailwind', 'tRPC'],
      liveUrl: 'https://taskapp-demo.com',
      githubUrl: 'https://github.com/johndoe/taskapp',
      featured: true
    },
    {
      id: '3',
      title: 'Weather Dashboard',
      description: 'Beautiful weather dashboard with data visualization, location-based forecasts, and progressive web app capabilities.',
      image: '/projects/weather.jpg',
      technologies: ['React', 'Chart.js', 'PWA', 'API Integration', 'CSS3'],
      liveUrl: 'https://weather-demo.com',
      githubUrl: 'https://github.com/johndoe/weather',
      featured: false
    }
  ]

  return (
    <section id="projects" className="py-20 bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-purple-400 mx-auto mb-6"></div>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            A showcase of my recent work and personal projects that demonstrate my skills and passion for development
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <div 
              key={project.id}
              className="group bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 hover:border-purple-500 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20"
            >
              {/* Project Image */}
              <div className="relative h-48 bg-gradient-to-br from-purple-500 to-pink-500 overflow-hidden">
                <div className="absolute inset-0 bg-slate-900/50 flex items-center justify-center">
                  <span className="text-white text-lg font-semibold">{project.title} Image</span>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex space-x-4">
                    <Button 
                      size="sm" 
                      className="bg-white/20 backdrop-blur-sm text-white border-white hover:bg-white hover:text-slate-900"
                      onClick={() => window.open(project.liveUrl, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="border-white text-white hover:bg-white hover:text-slate-900"
                      onClick={() => window.open(project.githubUrl, '_blank')}
                    >
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </Button>
                  </div>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  {project.featured && (
                    <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full">
                      Featured
                    </span>
                  )}
                </div>
                
                <p className="text-slate-400 mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="bg-slate-700 text-slate-300 px-3 py-1 rounded-full text-sm border border-slate-600"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between items-center">
                  <Button 
                    variant="ghost" 
                    className="text-purple-400 hover:text-purple-300 hover:bg-slate-700 p-0 group/btn"
                    onClick={() => window.open(project.liveUrl, '_blank')}
                  >
                    View Project
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </Button>
                  
                  <div className="flex space-x-3">
                    <button 
                      onClick={() => window.open(project.liveUrl, '_blank')}
                      className="text-slate-400 hover:text-white transition-colors duration-300"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => window.open(project.githubUrl, '_blank')}
                      className="text-slate-400 hover:text-white transition-colors duration-300"
                    >
                      <Github className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            size="lg" 
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full border border-purple-500"
          >
            View All Projects
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  )
}