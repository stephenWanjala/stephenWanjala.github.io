import { experiences } from '@/lib/data'
import { ArrowUpRightIcon } from './icons'

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', timeZone: 'UTC' })
}

export function ExperienceList() {
  return (
    <div className="border-t-2 border-line-strong">
      {experiences.map((experience) => (
        <section
          key={experience.company}
          className="grid md:grid-cols-12 gap-6 md:gap-10 py-10 md:py-14 border-b border-line-strong"
        >
          <div className="md:col-span-4">
            <div className="md:sticky md:top-24">
              <h2 className="text-heading-05 font-bold tracking-tight">{experience.company}</h2>
              <a
                href={experience.companyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1.5 text-body-01 underline underline-offset-4 hover:text-link focus-ring"
              >
                {experience.companyLink.replace(/^https?:\/\//, '')}
                <ArrowUpRightIcon />
              </a>
            </div>
          </div>

          <div className="md:col-span-8 space-y-12">
            {experience.roles.map((role) => (
              <div key={role.jobTitle + role.time.start.getTime()}>
                <h3 className="text-heading-04 font-semibold">{role.jobTitle}</h3>
                <p className="mt-1 text-body-01 text-fg-helper">
                  {formatDate(role.time.start)} to{' '}
                  {role.time.current ? 'present' : role.time.end ? formatDate(role.time.end) : ''}
                  {role.employmentType && `, ${role.employmentType.toLowerCase()}`}
                </p>
                <ul className="mt-5 space-y-3 list-disc pl-5 marker:text-blue-60">
                  {role.details.map((d, i) => (
                    <li key={i} className="text-body-02 text-fg-secondary text-pretty pl-1">
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
