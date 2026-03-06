import { educations, languages, skills } from '@/lib/data'

export function Skills() {
  return (
    <section id="skills" className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Technical Skills */}
        <div className="mb-16">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary mb-3">
            Skills & Tech Stack
          </h2>
          <p className="text-muted-foreground mb-8">Technologies I work with daily.</p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {skills.map((skill) => (
              <div
                key={skill.title}
                className="px-4 py-3 rounded-lg border border-border bg-card hover:border-accent/50 transition-colors text-center"
              >
                <span className="text-sm font-medium text-primary">{skill.title}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-12">
          {/* Education */}
          <div>
            <h3 className="text-2xl font-serif font-bold text-primary mb-6">Education</h3>
            <div className="space-y-4">
              {educations.map((education) => (
                <div
                  key={education.degree}
                  className="pl-4 border-l-2 border-accent/30"
                >
                  <h4 className="font-semibold text-primary">{education.degree}</h4>
                  <p className="text-sm text-muted-foreground">{education.school}</p>
                  <p className="text-xs text-accent mt-1">{education.duration}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div>
            <h3 className="text-2xl font-serif font-bold text-primary mb-6">Languages</h3>
            <div className="space-y-3">
              {languages.map((language) => (
                <div
                  key={language.name}
                  className="flex items-center justify-between px-4 py-3 rounded-lg border border-border bg-card"
                >
                  <span className="font-medium text-primary">{language.name}</span>
                  <span className="text-sm text-muted-foreground">{language.description}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
