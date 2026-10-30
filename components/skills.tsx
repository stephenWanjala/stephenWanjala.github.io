import { educations, languages, skills } from '@/lib/data'

export function SkillsGrid() {
  return (
    <ul className="border-t-2 border-line-strong">
      {skills.map((skill) => (
        <li
          key={skill.title}
          className="flex items-center gap-5 py-5 md:py-6 border-b border-line-strong"
        >
          <i className={`${skill.icon} colored text-4xl md:text-5xl w-12 text-center shrink-0`} aria-hidden="true" />
          <span className="text-heading-05 md:text-fluid-heading-05 font-bold tracking-tight">
            {skill.title}
          </span>
        </li>
      ))}
    </ul>
  )
}

export function Background() {
  return (
    <div className="grid md:grid-cols-2 gap-12 md:gap-16">
      <section>
        <h2 className="text-heading-04 font-bold pb-3 border-b-2 border-line-strong">Education</h2>
        <ul>
          {educations.map((e) => (
            <li key={e.degree} className="py-4 border-b border-line">
              <p className="text-body-02 font-semibold">{e.degree}</p>
              <p className="text-body-01 text-fg-secondary">
                {e.school}, {e.duration}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-heading-04 font-bold pb-3 border-b-2 border-line-strong">Languages</h2>
        <ul>
          {languages.map((l) => (
            <li key={l.name} className="py-4 border-b border-line flex justify-between gap-4">
              <span className="text-body-02 font-semibold">{l.name}</span>
              <span className="text-body-01 text-fg-secondary">{l.description}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
