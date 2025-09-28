// app/components/sections/skills-section.tsx

export function SkillsSection() {
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
        { name: 'Bun', level: 80, color: 'bg-gray-800' },
        { name: 'Docker', level: 70, color: 'bg-blue-500' },
        { name: 'Linux (Ubuntu)', level: 85, color: 'bg-slate-600' },
      ],
    },
  ]

  return (
    <section id="skills" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Skills & Technologies
          </h2>
          <div className="w-24 h-1 bg-purple-600 mx-auto mb-6"></div>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            A comprehensive overview of my technical expertise and the tools I
            use to bring ideas to life
          </p>
        </div>

        <div className="grid md:grid-cols-2 2xl:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className="bg-slate-50 rounded-2xl p-8 border border-slate-200 hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">
                {category.title}
              </h3>

              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="group">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-slate-700">
                        {skill.name}
                      </span>
                      <span className="text-sm text-slate-500">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
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
          <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">
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
                className="bg-slate-100 rounded-lg px-4 py-3 text-center text-slate-700 font-medium hover:bg-purple-100 hover:text-purple-700 transition-colors duration-300 cursor-default"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
