// components/sections/projects-section.tsx
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import Link from 'next/link'

type Project = {
  id: string
  title: string
  description: string
  liveUrl?: string
  repoUrl?: string
}

const sampleProjects: Project[] = [
  {
    id: '1',
    title: 'MRA Jobs',
    description: 'Task/Jobs platform for micro-tasks.',
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    id: '2',
    title: 'Library API',
    description: 'Borrow/return API example with Prisma.',
    liveUrl: '#',
    repoUrl: '#',
  },
]

export function ProjectsSection() {
  return (
    <section id="projects" className="py-16 px-6">
      <h2 className="text-3xl font-bold mb-6">Projects</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {sampleProjects.map((p) => (
          <Card key={p.id}>
            <CardContent>
              <h3 className="text-xl font-semibold">{p.title}</h3>
              <p className="mt-2">{p.description}</p>
            </CardContent>
            <CardFooter className="flex gap-3">
              {p.liveUrl && (
                <Link href={p.liveUrl} className="text-sm underline">
                  Live
                </Link>
              )}
              {p.repoUrl && (
                <Link href={p.repoUrl} className="text-sm underline">
                  Repo
                </Link>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}
