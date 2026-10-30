import { contact } from '@/lib/data'
import { Container } from './ui'

export function Footer() {
  const links = [
    { name: 'GitHub', href: contact.github.link },
    { name: 'LinkedIn', href: contact.linkedin.link },
    { name: 'Twitter', href: contact.twitter.link },
  ]
  return (
    <footer className="mt-32 border-t-2 border-line-strong">
      <Container className="py-10">
        <div className="flex flex-wrap items-center justify-between gap-4 text-body-compact-01 text-fg-secondary">
          <ul className="flex gap-6">
            {links.map((l) => (
              <li key={l.name}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 hover:text-fg focus-ring"
                >
                  {l.name}
                </a>
              </li>
            ))}
          </ul>
          <p>© {new Date().getFullYear()} Stephen Wanjala</p>
        </div>
      </Container>
    </footer>
  )
}
