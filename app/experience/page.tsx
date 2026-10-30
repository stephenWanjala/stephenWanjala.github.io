import type { Metadata } from 'next'
import { Container, PageHeader } from '@/components/ui'
import { ExperienceList } from '@/components/experience'

export const metadata: Metadata = {
  title: 'Experience | Stephen Wanjala',
  description: 'Roles, responsibilities, and the systems Stephen Wanjala has shipped and maintained.',
}

export default function ExperiencePage() {
  return (
    <>
      <PageHeader title="Experience" lede="Where I've worked, and what I did there." />
      <Container className="py-12 md:py-16">
        <ExperienceList />
      </Container>
    </>
  )
}
