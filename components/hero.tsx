import { contact } from '@/lib/data'
import Image from 'next/image'
import { GitHubIcon, LinkedInIcon, TwitterIcon, MailIcon, DownloadIcon, ArrowDownIcon } from './icons'

export function Hero() {
  return (
    <section id="about" className="min-h-[calc(100vh-4rem)] flex items-center px-4 py-16 sm:py-20">
      <div className="max-w-5xl mx-auto w-full">
        <div className="grid md:grid-cols-[1fr,auto] gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="order-2 md:order-1">
            <p className="text-accent font-medium mb-3 text-sm tracking-wide uppercase">
              Software Developer
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-primary mb-6 text-balance leading-[1.1]">
              Stephen Wanjala
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mb-8 text-pretty">
              Experienced software developer with expertise in mobile, web, and backend development.
              Passionate about creating innovative solutions and continuously learning new technologies.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-10">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-accent-foreground font-medium rounded-lg hover:opacity-90 transition-opacity focus-ring"
              >
                <MailIcon className="w-4 h-4" />
                Get in Touch
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-primary font-medium rounded-lg hover:bg-secondary transition-colors focus-ring"
              >
                <DownloadIcon className="w-4 h-4" />
                Resume
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Find me on</span>
              <div className="h-px w-8 bg-border" />
              <div className="flex gap-3">
                <a
                  href={contact.github.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-muted-foreground hover:text-primary hover:bg-secondary rounded-lg transition-colors focus-ring"
                  aria-label="GitHub"
                >
                  <GitHubIcon />
                </a>
                <a
                  href={contact.linkedin.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-muted-foreground hover:text-primary hover:bg-secondary rounded-lg transition-colors focus-ring"
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon />
                </a>
                <a
                  href={contact.twitter.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-muted-foreground hover:text-primary hover:bg-secondary rounded-lg transition-colors focus-ring"
                  aria-label="Twitter"
                >
                  <TwitterIcon />
                </a>
                <a
                  href={`mailto:${contact.email}`}
                  className="p-2 text-muted-foreground hover:text-primary hover:bg-secondary rounded-lg transition-colors focus-ring"
                  aria-label="Email"
                >
                  <MailIcon />
                </a>
              </div>
            </div>
          </div>

          {/* Profile Image */}
          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-accent/10 rounded-full blur-2xl" />
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden ring-2 ring-border ring-offset-4 ring-offset-background">
                <Image
                  src="/images/profile.jpg"
                  alt="Stephen Wanjala"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 224px, (max-width: 1024px) 256px, 288px"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-16 flex justify-center">
          <a
            href="#experience"
            className="animate-bounce text-muted-foreground hover:text-accent transition-colors focus-ring rounded-full p-1"
            aria-label="Scroll to experience"
          >
            <ArrowDownIcon className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  )
}
