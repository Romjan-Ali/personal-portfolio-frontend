// app/components/sections/projects-section.tsx

'use client'

import { Button } from '@/components/ui/button'
import { ExternalLink, Github, ArrowRight } from 'lucide-react'
import Image from 'next/image'

export function ProjectsSection() {
  const projects = [
    {
      id: '1',
      title: 'Wallex',
      description:
        'Wallex is a full-stack digital wallet platform built with React, TypeScript, Node.js, and MongoDB. It allows users to securely register, log in, and perform financial transactions such as cash-in, cash-out, send money, and payments. The app includes role-based access (admin, user, agent), transaction history tracking, and a responsive TailwindCSS-powered UI.',
      image: 'https://i.postimg.cc/pTXD49g7/image.png',
      technologies: [
        'React.js',
        'TypeScript',
        'MongoDB',
        'Node.js',
        'TailwindCSS',
      ],
      liveUrl:
        'https://programming-hero-level2-b5-a6-assignment-frontend-6qd3ix5ur.vercel.app/',
      githubUrl: 'https://github.com/Romjan-Ali/wallex/',
      featured: true,
    },
    {
      id: '2',
      title: 'Litera',
      description:
        'A full-stack web application for managing a library: books, authors, borrowers, and transactions. Powered by a Node/Express backend and a React frontend, this system offers both administrative and user functionality.',
      image: 'https://i.postimg.cc/02wKjdx9/image.png',
      technologies: [
        'React.js',
        'Tailwind CSS',
        'React Router',
        'Axios',
        'Redux RTK Query',
        'Node.js',
        'Express',
      ],
      liveUrl: 'https://programming-hero-level2-b5-a4-assig-phi.vercel.app/',
      githubUrl: 'https://github.com/Romjan-Ali/book-library-management',
      featured: true,
    },
    {
      id: '3',
      title: 'TaskHub - Project Manager',
      description:
        'TaskHub is a project management web application designed to help users organize and track tasks seamlessly. Users can create, edit, delete, and categorize tasks. The app features smooth UI interactions, responsive design, and interactive animations, making task management intuitive and enjoyable.',
      image: 'https://i.postimg.cc/KjfdPpdH/image.png',
      technologies: ['React', 'TailwindCSS', 'Framer Motion', 'Shadcn UI'],
      liveUrl: 'https://task-hub-steel.vercel.app/',
      githubUrl: 'https://github.com/Romjan-Ali/project-manager',
    },
    {
      id: '4',
      title: 'NSFW Detector',
      description:
        'A web application that uses TensorFlow.js and the NSFW JS model to detect inappropriate (NSFW) content in images directly in the browser. Built with React.js for the frontend and Express for the backend, it provides real-time classification, ensuring safe content moderation without uploading sensitive data to external servers.',
      image: 'https://i.postimg.cc/RF5Yqf3B/image.png',
      technologies: ['React.js', 'NSFW JS', 'TensorFlow.js', 'Express'],
      liveUrl: 'https://nsfw-detector-93nm.onrender.com/',
      githubUrl: 'https://github.com/Romjan-Ali/nsfw-detector',
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
          {projects.map((project) => (
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
                    <Image
                      src={project.image}
                      width={1200}
                      height={300}
                      alt="project"
                    />{' '}
                  </span>
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

        {/* <div className="text-center mt-12">
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 
  text-white px-8 py-3 rounded-full shadow-lg shadow-purple-500/20 transition-all duration-300"
          >
            View All Projects
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div> */}
      </div>
    </section>
  )
}
