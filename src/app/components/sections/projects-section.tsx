// app/components/sections/projects-section.tsx

import { Button } from '@/components/ui/button'
import { getAllProjects, Project } from '@/lib/project-data'
import { ExternalLink, Github, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

async function ProjectsSection() {
  let projects: Project[] = []

  try {
    // Fetch projects with ISR
    projects = await getAllProjects({
      page: 1,
      limit: 10,
    })
  } catch (err) {
    console.error('Failed to fetch projects:', err)
    // Fallback to empty array if fetch fails
    projects = []
  }

  // Fallback projects data in case API fails
  const fallbackProjects = [
    {
      id: '1',
      title: 'Wallex',
      description: 'Wallex is a full-stack digital wallet platform built with React, TypeScript, Node.js, and MongoDB. It allows users to securely register, log in, and perform financial transactions such as cash-in, cash-out, send money, and payments.',
      image: 'https://i.postimg.cc/pTXD49g7/image.png',
      tags: ['React.js', 'TypeScript', 'MongoDB', 'Node.js', 'TailwindCSS'],
      liveUrl: 'https://programming-hero-level2-b5-a6-assignment-frontend-6qd3ix5ur.vercel.app/',
      repoUrl: 'https://github.com/Romjan-Ali/wallex/',
      featured: true,
    },
    {
      id: '2',
      title: 'Litera',
      description: 'A full-stack web application for managing a library: books, authors, borrowers, and transactions. Powered by a Node/Express backend and a React frontend, this system offers both administrative and user functionality.',
      image: 'https://i.postimg.cc/02wKjdx9/image.png',
      tags: ['React.js', 'Tailwind CSS', 'React Router', 'Axios', 'Redux RTK Query', 'Node.js', 'Express'],
      liveUrl: 'https://programming-hero-level2-b5-a4-assig-phi.vercel.app/',
      repoUrl: 'https://github.com/Romjan-Ali/book-library-management',
      featured: true,
    },
    {
      id: '3',
      title: 'TaskHub - Project Manager',
      description: 'TaskHub is a project management web application designed to help users organize and track tasks seamlessly. Users can create, edit, delete, and categorize tasks.',
      image: 'https://i.postimg.cc/KjfdPpdH/image.png',
      tags: ['React', 'TailwindCSS', 'Framer Motion', 'Shadcn UI'],
      liveUrl: 'https://task-hub-steel.vercel.app/',
      repoUrl: 'https://github.com/Romjan-Ali/project-manager',
      featured: false,
    },
    {
      id: '4',
      title: 'NSFW Detector',
      description: 'A web application that uses TensorFlow.js and the NSFW JS model to detect inappropriate (NSFW) content in images directly in the browser.',
      image: 'https://i.postimg.cc/RF5Yqf3B/image.png',
      tags: ['React.js', 'NSFW JS', 'TensorFlow.js', 'Express'],
      liveUrl: 'https://nsfw-detector-93nm.onrender.com/',
      repoUrl: 'https://github.com/Romjan-Ali/nsfw-detector',
      featured: false,
    },
  ]

 const displayProjects = (projects.length > 0 ? projects : fallbackProjects).filter(
  (project) => project.liveUrl && project.repoUrl
)


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
          {displayProjects.map((project) => (
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
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 bg-white/70 dark:bg-slate-900/50 flex items-center justify-center">
                    <span className="text-slate-900 dark:text-white text-lg font-semibold">
                      {project.title}
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex space-x-4">
                    {project.liveUrl && (
                      <Button
                        size="sm"
                        className="bg-white/20 dark:bg-white/20 backdrop-blur-sm text-white border-white hover:bg-white hover:text-slate-900"
                        asChild
                      >
                        <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Live Demo
                        </Link>
                      </Button>
                    )}
                    {project.repoUrl && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="
                          border-slate-300 dark:border-white 
                        text-slate-700 dark:text-white 
                        hover:bg-slate-100 dark:hover:bg-white 
                        hover:text-slate-900 dark:hover:text-slate-900
                      "
                        asChild
                      >
                        <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-2" />
                          Code
                        </Link>
                      </Button>
                    )}
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

                <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.slice(0, 5).map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-full text-sm border border-slate-200 dark:border-slate-600"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tags.length > 5 && (
                    <span className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-full text-sm border border-slate-200 dark:border-slate-600">
                      +{project.tags.length - 5} more
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between items-center">
                  {project.liveUrl && (
                    <Button
                      variant="ghost"
                      className="text-purple-600 dark:text-purple-400 hover:text-purple-500 dark:hover:text-purple-300 hover:bg-slate-100 dark:hover:bg-slate-700 p-0 group/btn"
                      asChild
                    >
                      <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        View Project
                        <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </Link>
                    </Button>
                  )}

                  <div className="flex space-x-3">
                    {project.liveUrl && (
                      <Link
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-300"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </Link>
                    )}
                    {project.repoUrl && (
                      <Link
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors duration-300"
                      >
                        <Github className="w-5 h-5" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Projects Button */}
        {/* <div className="text-center mt-12">
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 
  text-white px-8 py-3 rounded-full shadow-lg shadow-purple-500/20 transition-all duration-300"
            asChild
          >
            <Link href="/projects">
              View All Projects
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div> */}

        {/* Error message if no projects loaded */}
        {displayProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-yellow-700 dark:text-yellow-400">
                Unable to load projects at the moment. Please check back later.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export { ProjectsSection }