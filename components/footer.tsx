import { contact } from '@/lib/data'

export function Footer() {
  return (
    <footer className="border-t border-card bg-card/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          {/* Left Column */}
          <div>
            <h3 className="text-2xl font-serif font-bold text-primary mb-4">Stephen Wanjala</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Software developer passionate about building elegant solutions to complex problems. 
              Always learning, always building.
            </p>
            <div className="flex gap-4">
              <a
                href={contact.github.link}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-secondary hover:bg-accent text-foreground hover:text-accent-foreground transition-colors"
                aria-label="GitHub"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a
                href={contact.linkedin.link}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-secondary hover:bg-accent text-foreground hover:text-accent-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href={contact.twitter.link}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-secondary hover:bg-accent text-foreground hover:text-accent-foreground transition-colors"
                aria-label="Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Column - Links */}
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-primary mb-3">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#about" className="text-muted-foreground hover:text-accent transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#experience" className="text-muted-foreground hover:text-accent transition-colors">
                    Experience
                  </a>
                </li>
                <li>
                  <a href="#projects" className="text-muted-foreground hover:text-accent transition-colors">
                    Projects
                  </a>
                </li>
                <li>
                  <a href="#skills" className="text-muted-foreground hover:text-accent transition-colors">
                    Skills
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-primary mb-3">Contact</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-muted-foreground hover:text-accent transition-colors break-all"
                  >
                    {contact.email}
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${contact.phone}`}
                    className="text-muted-foreground hover:text-accent transition-colors"
                  >
                    {contact.phone}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-card pt-8">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Stephen Wanjala. All rights reserved. Built with React & Next.js.
          </p>
        </div>
      </div>
    </footer>
  )
}
