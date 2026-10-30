import Link from 'next/link'
import { Hero } from '@/components/hero'
import { ProjectList } from '@/components/project-list'
import { Container } from '@/components/ui'
import { ArrowRightIcon } from '@/components/icons'
import { projects } from '@/lib/data'

export default function Home() {
  return (
    <>
      <Hero />
      <Container className="mt-16 md:mt-24">
        <div className="flex items-baseline justify-between gap-4 mb-8">
          <h2 className="text-heading-06 md:text-fluid-heading-05 font-bold tracking-tight">
            Recent projects
          </h2>
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-body-01 font-semibold underline underline-offset-4 decoration-2 hover:text-link focus-ring"
          >
            All projects <ArrowRightIcon />
          </Link>
        </div>
        <ProjectList items={projects.slice(0, 3)} />
      </Container>
    </>
  )
}
