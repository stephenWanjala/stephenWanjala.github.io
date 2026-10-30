import type { Metadata } from 'next'
import { Container, PageHeader } from '@/components/ui'
import { SkillsGrid, Background } from '@/components/skills'

export const metadata: Metadata = {
  title: 'Skills | Stephen Wanjala',
  description: 'The technologies Stephen Wanjala reaches for, plus education and languages.',
}

export default function SkillsPage() {
  return (
    <>
      <PageHeader title="Skills" lede="What I use, plus school and languages." />
      <Container className="py-12 md:py-16 space-y-12">
        <SkillsGrid />
        <Background />
      </Container>
    </>
  )
}
