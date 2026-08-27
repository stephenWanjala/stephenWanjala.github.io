import Image from 'next/image'
import { contact, experiences, projects, skills } from '@/lib/data'
import { ButtonLink, IconLink } from './ui'
import {
  GitHubIcon,
  LinkedInIcon,
  TwitterIcon,
  MailIcon,
  DownloadIcon,
  ArrowRightIcon,
  ArrowDownIcon,
} from './icons'

/** Years since the earliest role on record, so the strip never goes stale. */
function yearsWorking(): number {
  const starts = experiences.flatMap((e) => e.roles.map((r) => r.time.start.getTime()))
  const earliest = new Date(Math.min(...starts))
  const now = new Date()
  let years = now.getUTCFullYear() - earliest.getUTCFullYear()
  const months = now.getUTCMonth() - earliest.getUTCMonth()
  // Drop the in-progress year when this year's anniversary has not landed yet.
  if (months < 0 || (months === 0 && now.getUTCDate() < earliest.getUTCDate())) years--
  return Math.max(1, years)
}

const stats = [
  { label: 'Years building', value: `${yearsWorking()}+` },
  { label: 'Public projects', value: `${projects.length}` },
  { label: 'Core stack', value: `${skills.length}` },
  { label: 'Based in', value: 'Kenya' },
]

export function Hero() {
  return (
    <section id="about" className="border-b border-line">
      <div className="mx-auto max-w-[1584px] px-4 md:px-8">
        <div className="grid lg:grid-cols-16">
          {/* Content column — 9 of 16 */}
          <div className="lg:col-span-9 py-16 md:py-24 lg:py-28 lg:pr-16">
            <p className="font-mono text-label-01 tracking-[0.16em] uppercase text-link mb-6">
              Software Developer
            </p>

            <h1 className="text-fluid-display-01 text-fg text-balance">
              Stephen Wanjala
            </h1>

            <div className="w-16 h-[3px] bg-blue-60 my-8" aria-hidden="true" />

            <p className="text-fluid-heading-05 text-fg-secondary max-w-2xl text-pretty">
              Mobile, web, and backend engineering — with a bias toward systems that
              stay maintainable long after launch.
            </p>

            <p className="mt-8 text-body-02 text-fg-secondary max-w-xl text-pretty">
              I build and maintain production software across Kotlin, Jetpack Compose,
              JavaFX, and modern web stacks. Currently maintaining the HR &amp; Payroll
              system inside the MaliPlus ERP at PrimeSoft Solutions.
            </p>

            <div className="mt-12 flex flex-wrap gap-px">
              <ButtonLink href="#contact" icon={<ArrowRightIcon />}>
                Get in touch
              </ButtonLink>
              <ButtonLink
                href="/Wanjala_Stephen_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                kind="tertiary"
                icon={<DownloadIcon />}
              >
                Download CV
              </ButtonLink>
            </div>

            {/* Social row */}
            <div className="mt-12 flex items-center gap-4">
              <span className="font-mono text-label-01 uppercase tracking-widest text-fg-helper">
                Elsewhere
              </span>
              <span className="h-px w-8 bg-line" aria-hidden="true" />
              <div className="flex -ml-2">
                <IconLink
                  href={contact.github.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <GitHubIcon />
                </IconLink>
                <IconLink
                  href={contact.linkedin.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon />
                </IconLink>
                <IconLink
                  href={contact.twitter.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                >
                  <TwitterIcon />
                </IconLink>
                <IconLink href={`mailto:${contact.email}`} aria-label="Email">
                  <MailIcon />
                </IconLink>
              </div>
            </div>
          </div>

          {/* Image column — 7 of 16, separated by a grid rule */}
          <div className="lg:col-span-7 lg:border-l border-line lg:pl-16 pb-16 lg:py-28 flex items-start">
            <div className="relative w-full max-w-md mx-auto lg:mx-0">
              {/* Carbon accent block, offset behind the tile */}
              <div
                className="absolute -top-4 -left-4 w-24 h-24 bg-blue-60 hidden sm:block"
                aria-hidden="true"
              />
              {/* The source is a 9:16 portrait, so a square tile would crop the
                  head and torso. A 4:5 tile with the focal point held high keeps
                  the full figure from the hair down. */}
              <div className="relative aspect-[4/5] w-full bg-layer overflow-hidden">
                <Image
                  src="/images/profile.jpg"
                  alt="Stephen Wanjala"
                  fill
                  className="object-cover object-[50%_20%]"
                  priority
                  sizes="(max-width: 1024px) 90vw, 40vw"
                />
              </div>
              <div className="border-t border-line px-4 py-3 bg-layer">
                <p className="font-mono text-label-01 text-fg-helper">
                  stephenWanjala
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* At-a-glance strip. The gap-px over a line-coloured track is how Carbon
          gets exact 1px rules between cells without doubling borders. */}
      <div className="border-t border-line">
        <div className="mx-auto max-w-[1584px]">
          <dl className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-line">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-bg px-4 md:px-8 py-6 lg:py-8">
                <dt className="font-mono text-label-01 uppercase tracking-widest text-fg-helper">
                  {stat.label}
                </dt>
                <dd className="mt-2 text-heading-04 font-light text-fg">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="border-t border-line">
        <div className="mx-auto max-w-[1584px] px-4 md:px-8">
          <a
            href="#experience"
            className="group inline-flex items-center gap-3 h-12 pr-4 text-body-compact-01 text-fg-secondary hover:text-link transition-colors duration-[110ms] ease-productive focus-ring"
          >
            <ArrowDownIcon className="w-4 h-4 transition-transform duration-[240ms] ease-productive group-hover:translate-y-1" />
            Continue to experience
          </a>
        </div>
      </div>
    </section>
  )
}
