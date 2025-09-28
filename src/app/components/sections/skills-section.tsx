// app/components/sections/skills-section.tsx

export function SkillsSection() {
  const skillCategories = [
    {
      title: "Frontend",
      skills: [
        { name: "React", level: 90, color: "bg-blue-500" },
        { name: "TypeScript", level: 85, color: "bg-blue-600" },
        { name: "Next.js", level: 88, color: "bg-black" },
        { name: "Tailwind CSS", level: 92, color: "bg-cyan-500" },
      ]
    },
    {
      title: "Backend",
      skills: [
        { name: "Node.js", level: 85, color: "bg-green-500" },
        { name: "PostgreSQL", level: 80, color: "bg-blue-700" },
        { name: "MongoDB", level: 75, color: "bg-green-600" },
        { name: "Redis", level: 70, color: "bg-red-500" },
      ]
    },
    {
      title: "Tools & Others",
      skills: [
        { name: "Git", level: 90, color: "bg-orange-500" },
        { name: "Docker", level: 75, color: "bg-blue-500" },
        { name: "AWS", level: 70, color: "bg-yellow-500" },
        { name: "Figma", level: 80, color: "bg-purple-500" },
      ]
    }
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
            A comprehensive overview of my technical expertise and the tools I use to bring ideas to life
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {skillCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-slate-50 rounded-2xl p-8 border border-slate-200 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">
                {category.title}
              </h3>
              
              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="group">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-slate-700">{skill.name}</span>
                      <span className="text-sm text-slate-500">{skill.level}%</span>
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
              "JavaScript (ES6+)", "HTML5 & CSS3", "SASS/SCSS", "GraphQL",
              "REST APIs", "Jest", "Cypress", "Webpack",
              "Vite", "Prisma", "tRPC", "WebSockets",
              "CI/CD", "Linux", "Nginx", "PM2"
            ].map((tech, index) => (
              <div key={index} className="bg-slate-100 rounded-lg px-4 py-3 text-center text-slate-700 font-medium hover:bg-purple-100 hover:text-purple-700 transition-colors duration-300 cursor-default">
                {tech}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}