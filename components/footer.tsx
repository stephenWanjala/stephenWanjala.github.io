import { contact } from '@/lib/data'
import { GitHubIcon, LinkedInIcon, TwitterIcon, ArrowUpRightIcon } from './icons'

const quickLinks = [
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
]

const socials = [
  { name: 'GitHub', href: contact.github.link, Icon: GitHubIcon },
  { name: 'LinkedIn', href: contact.linkedin.link, Icon: LinkedInIcon },
  { name: 'Twitter', href: contact.twitter.link, Icon: TwitterIcon },
]

/** Carbon footer: hairline-ruled columns on the 2x Grid, quiet by design. */
export function Footer() {
  return (
    <footer className="bg-bg">
      <div className="mx-auto max-w-[1584px] px-4 md:px-8 py-16 md:py-20">
        <div className="grid md:grid-cols-16 gap-10 md:gap-0">
          <div className="md:col-span-6 md:pr-12">
            <p className="text-heading-03 text-fg">Stephen Wanjala</p>
            <p className="mt-4 text-body-01 text-fg-secondary max-w-sm text-pretty">
              Building elegant solutions to complex problems. Always learning, always
              building.
            </p>
            <div className="w-12 h-[3px] bg-blue-60 mt-8" aria-hidden="true" />
          </div>

          <nav className="md:col-span-5 md:border-l border-line md:pl-12" aria-label="Footer">
            <p className="font-mono text-label-01 uppercase tracking-widest text-fg-helper mb-5">
              Navigate
            </p>
            <ul>
              {quickLinks.map((link) => (
                <li key={link.name} className="border-b border-line">
                  <a
                    href={link.href}
                    className="flex items-center justify-between py-3 text-body-01 text-fg-secondary hover:text-link transition-colors duration-[110ms] ease-productive focus-ring"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-5 md:border-l border-line md:pl-12">
            <p className="font-mono text-label-01 uppercase tracking-widest text-fg-helper mb-5">
              Connect
            </p>
            <ul>
              <li className="border-b border-line">
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center justify-between gap-4 py-3 text-body-01 text-fg-secondary hover:text-link transition-colors duration-[110ms] ease-productive focus-ring"
                >
                  <span className="break-all">{contact.email}</span>
                  <ArrowUpRightIcon className="w-4 h-4 shrink-0" />
                </a>
              </li>
              {socials.map(({ name, href, Icon }) => (
                <li key={name} className="border-b border-line">
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-4 py-3 text-body-01 text-fg-secondary hover:text-link transition-colors duration-[110ms] ease-productive focus-ring"
                  >
                    <span className="inline-flex items-center gap-3">
                      <Icon className="w-4 h-4" />
                      {name}
                    </span>
                    <ArrowUpRightIcon className="w-4 h-4 shrink-0" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-line">
          <p className="font-mono text-label-01 text-fg-helper">
            © {new Date().getFullYear()} Stephen Wanjala
          </p>
        </div>
      </div>
    </footer>
  )
}
