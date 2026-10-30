import type { Metadata } from 'next'
import { Container, PageHeader, ExternalButton } from '@/components/ui'
import { ProjectList } from '@/components/project-list'
import { GitHubIcon } from '@/components/icons'
import { projects } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Projects | Stephen Wanjala',
  description: 'Libraries, apps, and tools by Stephen Wanjala, most of them open source.',
}

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        title="Projects"
        lede="Libraries, apps and tools. Most are open source."
      />
      <Container className="py-12 md:py-16">
        <ProjectList items={projects} />
        <div className="mt-12">
          <ExternalButton
            href="https://github.com/stephenWanjala?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            kind="secondary"
            icon={<GitHubIcon className="w-4 h-4" />}
          >
            More on GitHub
          </ExternalButton>
        </div>
      </Container>
    </>
  )
}
