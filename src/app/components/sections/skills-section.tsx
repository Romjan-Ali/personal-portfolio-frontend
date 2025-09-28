// components/sections/skills-section.tsx
export function SkillsSection() {
  const skills = [
    'React',
    'Node.js',
    'TypeScript',
    'Prisma',
    'Tailwind',
    'Expo',
  ]
  return (
    <section id="skills" className="py-16 px-6">
      <h2 className="text-3xl font-bold mb-6">Skills</h2>
      <div className="flex gap-3 flex-wrap">
        {skills.map((s) => (
          <span key={s} className="px-3 py-1 rounded-full border text-sm">
            {s}
          </span>
        ))}
      </div>
    </section>
  )
}
