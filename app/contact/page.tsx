import type { Metadata } from 'next'
import { Container, PageHeader } from '@/components/ui'
import { ContactSection } from '@/components/contact'

export const metadata: Metadata = {
  title: 'Contact | Stephen Wanjala',
  description: 'Get in touch with Stephen Wanjala about a project, a role, or a question.',
}

export default function ContactPage() {
  return (
    <>
      <PageHeader title="Contact" lede="Email me, or use the form. I usually reply within two days." />
      <Container className="py-12 md:py-16">
        <ContactSection />
      </Container>
    </>
  )
}
