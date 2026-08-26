import { educations, languages, skills } from '@/lib/data'
import { SectionHeading } from './ui'

/**
 * Carbon StructuredList — header row in `$heading-01`, rows divided by
 * `$border-subtle`, hover on the whole row.
 */
function StructuredList({
  caption,
  columns,
  rows,
}: {
  caption: string
  columns: [string, string]
  rows: { key: string; primary: string; secondary?: string; meta?: string }[]
}) {
  return (
    <section aria-label={caption}>
      <h3 className="text-heading-02 text-fg mb-6">{caption}</h3>
      <div className="border-t-2 border-line-strong">
        <div className="grid grid-cols-[1fr_auto] gap-4 px-4 py-3 border-b border-line">
          <span className="text-heading-01 text-fg">{columns[0]}</span>
          <span className="text-heading-01 text-fg">{columns[1]}</span>
        </div>
        {rows.map((row) => (
          <div
            key={row.key}
            className="grid grid-cols-[1fr_auto] gap-4 px-4 py-4 border-b border-line hover:bg-layer-hover transition-colors duration-[110ms] ease-productive"
          >
            <div className="min-w-0">
              <p className="text-body-01 text-fg">{row.primary}</p>
              {row.secondary && (
                <p className="mt-1 text-body-01 text-fg-secondary">{row.secondary}</p>
              )}
            </div>
            <span className="font-mono text-label-01 text-fg-helper whitespace-nowrap pt-1">
              {row.meta}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

export function Skills() {
  return (
    <section id="skills" className="border-b border-line">
      <div className="mx-auto max-w-[1584px] px-4 md:px-8 py-20 md:py-28">
        <SectionHeading
          index="03 / Capabilities"
          title="Tools, stack, and background"
          lede="The technologies I reach for, and the record behind them."
        />

        {/* Stack tiles on a hairline track */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-px bg-line border border-line mb-20">
          {skills.map((skill, i) => (
            <div
              key={skill.title}
              className="group relative bg-bg hover:bg-layer-hover p-5 min-h-32 flex flex-col justify-between transition-colors duration-[110ms] ease-productive"
            >
              <span className="font-mono text-label-01 text-fg-helper">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-heading-02 text-fg text-balance">{skill.title}</span>
              <span
                className="absolute bottom-0 left-0 h-[3px] w-full bg-blue-60 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-[240ms] ease-productive"
                aria-hidden="true"
              />
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <StructuredList
            caption="Education"
            columns={['Qualification', 'Years']}
            rows={educations.map((education) => ({
              key: education.degree,
              primary: education.degree,
              secondary: education.school,
              meta: education.duration,
            }))}
          />

          <StructuredList
            caption="Languages"
            columns={['Language', 'Level']}
            rows={languages.map((language) => ({
              key: language.name,
              primary: language.name,
              meta: language.description,
            }))}
          />
        </div>
      </div>
    </section>
  )
}
