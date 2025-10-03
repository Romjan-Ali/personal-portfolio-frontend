// app/components/sections/projects-section.tsx

'use client'

import { Button } from '@/components/ui/button'
import { ExternalLink, Github, ArrowRight } from 'lucide-react'
import Image from 'next/image'

export function ProjectsSection() {
  const projects = [
    {
      id: '1',
      title: 'Job Portal Platform',
      description:
        'A full-stack job portal where users can post jobs, apply, and manage applications. Includes authentication, admin dashboard, and role-based access.',
      image: '/projects/jobportal.jpg',
      technologies: [
        'Next.js',
        'TypeScript',
        'PostgreSQL',
        'Prisma',
        'TailwindCSS',
      ],
      liveUrl: 'https://jobportal-demo.vercel.app',
      githubUrl: 'https://github.com/romjan-ali/jobportal',
      featured: true,
    },
    {
      id: '2',
      title: 'Chat Application',
      description:
        'A real-time chat app with private and group messaging, typing indicators, and file sharing. Built with WebSockets for live communication.',
      image: '/projects/chatapp.jpg',
      technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Zustand'],
      liveUrl: 'https://chatapp-demo.vercel.app',
      githubUrl: 'https://github.com/romjan-ali/chatapp',
      featured: true,
    },
    {
      id: '3',
      title: 'Personal Portfolio Website',
      description:
        'Modern portfolio website to showcase projects, blogs, and skills. Built with a clean UI, SEO optimization, and responsive design.',
      image: '/projects/portfolio.jpg',
      technologies: ['Next.js', 'TailwindCSS', 'Framer Motion', 'Shadcn UI'],
      liveUrl: 'https://romjan-ali.netlify.app',
      githubUrl: 'https://github.com/romjan-ali/portfolio',
      featured: false,
    },
    {
      id: '4',
      title: 'E-Learning Platform',
      description:
        'A learning management system (LMS) where users can enroll in courses, track progress, and complete quizzes. Includes instructor dashboard.',
      image: '/projects/elearning.jpg',
      technologies: ['Next.js', 'tRPC', 'Prisma', 'Stripe', 'PostgreSQL'],
      liveUrl: 'https://elearning-demo.vercel.app',
      githubUrl: 'https://github.com/romjan-ali/elearning',
      featured: false,
    },
  ]

  return (
    <section
      id="projects"
      className="
    py-20 
    bg-gradient-to-b from-white via-slate-50 to-white 
    dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 
    relative
  "
    >
      <div
        className="absolute inset-0 pointer-events-none 
    bg-[radial-gradient(circle_at_top_left,_#c084fc_0%,_transparent_60%)] 
    dark:bg-[radial-gradient(circle_at_top_left,_#4c1d95_0%,_transparent_60%)] 
    opacity-10
  "
      ></div>
      <div
        className="absolute inset-0 pointer-events-none 
    bg-[radial-gradient(circle_at_bottom_right,_#f9a8d4_0%,_transparent_60%)] 
    dark:bg-[radial-gradient(circle_at_bottom_right,_#be185d_0%,_transparent_60%)] 
    opacity-10
  "
      ></div>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-purple-600 mx-auto mb-6"></div>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            A showcase of my recent work and personal projects that demonstrate
            my skills and passion for development
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="
                group 
                bg-white dark:bg-slate-800 
                rounded-2xl overflow-hidden 
                border border-slate-200 dark:border-slate-700 
                hover:border-purple-500 
                transition-all duration-500 
                hover:shadow-2xl hover:shadow-purple-500/20
              "
            >
              {/* Project Image */}
              <div className="relative h-48 bg-gradient-to-br from-purple-500 to-pink-500 overflow-hidden">
                <div className="absolute inset-0 bg-white/70 dark:bg-slate-900/50 flex items-center justify-center">
                  <span className="text-slate-900 dark:text-white text-lg font-semibold">
                    <Image src="https://images.unsplash.com/uploads/141103282695035fa1380/95cdfeef" width={1200} height={300} alt='project' />                  </span>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex space-x-4">
                    <Button
                      size="sm"
                      className="bg-white/20 dark:bg-white/20 backdrop-blur-sm text-white border-white hover:bg-white hover:text-slate-900"
                      onClick={() => window.open(project.liveUrl, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="
                          border-slate-300 dark:border-white 
                        text-slate-700 dark:text-white 
                        hover:bg-slate-100 dark:hover:bg-white 
                        hover:text-slate-900 dark:hover:text-slate-900
                      "
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
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  {project.featured && (
                    <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full">
                      Featured
                    </span>
                  )}
                </div>

                <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-full text-sm border border-slate-200 dark:border-slate-600"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between items-center">
                  <Button
                    variant="ghost"
                    className="text-purple-600 dark:text-purple-400 hover:text-purple-500 dark:hover:text-purple-300 hover:bg-slate-100 dark:hover:bg-slate-700 p-0 group/btn"
                    onClick={() => window.open(project.liveUrl, '_blank')}
                  >
                    View Project
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </Button>

                  <div className="flex space-x-3">
                    <button
                      onClick={() => window.open(project.liveUrl, '_blank')}
                      className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-300"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => window.open(project.githubUrl, '_blank')}
                      className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-300"
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
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 
  text-white px-8 py-3 rounded-full shadow-lg shadow-purple-500/20 transition-all duration-300"
          >
            View All Projects
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  )
}
