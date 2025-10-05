// app/about/page.tsx
import { Button } from '@/components/ui/button'
import { Download, MapPin, Calendar, Mail, Phone } from 'lucide-react'
import Image from 'next/image'

export default function AboutPage() {
  const stats = [
    { number: '2+', label: 'Years Experience' },
    { number: '5+', label: 'Projects Completed' },
    { number: '2+', label: 'Happy Clients' },
    { number: '10+', label: 'Technologies' },
  ]

    const skillCategories = [
    {
      title: 'Frontend',
      skills: [
        { name: 'React', level: 90, color: 'bg-blue-500' },
        { name: 'React Native (Expo)', level: 85, color: 'bg-indigo-500' },
        { name: 'TypeScript', level: 80, color: 'bg-blue-600' },
        { name: 'Next.js', level: 78, color: 'bg-black' },
        { name: 'Tailwind CSS', level: 92, color: 'bg-cyan-500' },
      ],
    },
    {
      title: 'Backend',
      skills: [
        { name: 'Node.js', level: 88, color: 'bg-green-500' },
        { name: 'Express.js', level: 85, color: 'bg-green-600' },
        { name: 'MongoDB', level: 82, color: 'bg-emerald-600' },
        { name: 'PostgreSQL', level: 75, color: 'bg-blue-700' },
        { name: 'Prisma ORM', level: 80, color: 'bg-purple-600' },
      ],
    },
    {
      title: 'State & Utilities',
      skills: [
        { name: 'Zustand', level: 78, color: 'bg-teal-500' },
        { name: 'Redux Toolkit Query', level: 75, color: 'bg-pink-500' },
        { name: 'Expo SecureStore', level: 70, color: 'bg-gray-600' },
        { name: 'Zod', level: 72, color: 'bg-yellow-600' },
      ],
    },
    {
      title: 'Tools & Others',
      skills: [
        { name: 'Git & GitHub', level: 90, color: 'bg-orange-500' },
        { name: 'Bun', level: 80, color: 'bg-gray-500' },
        { name: 'Docker', level: 70, color: 'bg-blue-500' },
        { name: 'Linux (Ubuntu)', level: 85, color: 'bg-slate-600' },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-slate-800 dark:to-purple-900">
      {/* Background Decorations */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-30"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-30"></div>

      <div className="relative container mx-auto px-4 py-20">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            About Me
          </h1>
          <div className="w-24 h-1 bg-purple-600 mx-auto mb-6"></div>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Passionate developer crafting digital solutions that make a
            difference
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Image Section */}
          <div className="relative">
            <div className="relative z-10">
              <div className="w-80 h-96 mx-auto bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl p-1">
                <div className="w-full h-full bg-slate-800 rounded-2xl flex items-center justify-center overflow-hidden">
                  <Image
                    className="object-cover w-full h-full"
                    width={600}
                    height={2000}
                    src="/images/romjan-ali-2-3-r.png"
                    alt="Romjan Ali"
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
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Crafting Digital Excellence
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                Hello! I&apos;m Romjan Ali, a passionate Full Stack Developer
                with over 2 years of experience creating web applications that
                solve real-world problems. I specialize in modern JavaScript
                frameworks and love turning complex ideas into beautiful,
                functional code.
              </p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                When I&apos;m not coding, you can find me exploring new
                technologies, contributing to open-source projects, or sharing
                my knowledge through blog posts and tutorials.
              </p>
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
                <span>Dhaka, Bangladesh</span>
              </div>
              <div className="flex items-center text-slate-600 dark:text-slate-300">
                <Calendar className="w-5 h-5 mr-3 text-purple-600" />
                <span>Available for freelance work</span>
              </div>
              <div className="flex items-center text-slate-600 dark:text-slate-300">
                <Mail className="w-5 h-5 mr-3 text-purple-600" />
                <span>000romjanali@gmail.com</span>
              </div>
              <div className="flex items-center text-slate-600 dark:text-slate-300">
                <Phone className="w-5 h-5 mr-3 text-purple-600" />
                <span>+8801402857913</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full">
                <Download className="w-4 h-4 mr-2" />
                Download CV
              </Button>
              {/* <Button
                variant="outline"
                className="border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 px-8 py-3 rounded-full transition-colors duration-300"
              >
                View My Story
              </Button> */}
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <section
          id="skills"
          className="py-20 relative overflow-hidden 
      bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 
      dark:from-slate-900 dark:via-slate-800 dark:to-purple-900"
        >
          {/* Decorative blobs */}
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-30"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-30"></div>
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                Skills & Technologies
              </h2>
              <div className="w-24 h-1 bg-purple-600 mx-auto mb-6"></div>
              <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                A comprehensive overview of my technical expertise and the tools
                I use to bring ideas to life
              </p>
            </div>

            <div className="grid md:grid-cols-2 2xl:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {skillCategories.map((category, categoryIndex) => (
                <div
                  key={categoryIndex}
                  className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow duration-300"
                >
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">
                    {category.title}
                  </h3>

                  <div className="space-y-6">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skillIndex} className="group">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-semibold text-slate-700 dark:text-slate-200">
                            {skill.name}
                          </span>
                          <span className="text-sm text-slate-500 dark:text-slate-400">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${skill.color} transition-all duration-1000 ease-out group-hover:scale-105`}
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Skills Grid */}
            <div className="mt-16 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 text-center">
                Additional Technologies
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  'JavaScript (ES6+)',
                  'HTML5 & CSS3',
                  'jQuery',
                  'Expo',
                  'REST APIs',
                  'Zod',
                  'Redux Toolkit Query',
                  'NativeWindCSS',
                  'Prisma ORM',
                  'PostgreSQL',
                  'MongoDB',
                  'Mongoose',
                  'Git & GitHub',
                  'Bun',
                  'Linux (Ubuntu)',
                  'Docker',
                ].map((tech, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-slate-700 rounded-lg px-4 py-3 text-center 
  text-slate-700 dark:text-slate-200 font-medium 
  hover:bg-purple-100 dark:hover:bg-purple-800 
  hover:text-purple-700 dark:hover:text-purple-200 
  hover:scale-105 transition-transform duration-300 cursor-default"
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
