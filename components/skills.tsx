import { educations, languages, skills } from '@/lib/data'

export function Skills() {
  return (
    <section id="skills" className="py-20 px-4 bg-card">
      <div className="max-w-4xl mx-auto">
        {/* Technical Skills */}
        <div className="mb-20">
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">Skills & Tech Stack</h2>
            <div className="h-1 w-20 bg-accent rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {skills.map((skill, index) => (
              <div key={index} className="bg-background rounded-lg p-6 border border-card hover:border-accent transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-primary">{skill.title}</h3>
                  <span className="text-accent font-bold">{skill.level}%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div
                    className="bg-accent h-2 rounded-full transition-all duration-500"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="mb-20">
          <div className="mb-12">
            <h3 className="text-3xl font-serif font-bold text-primary mb-4">Education</h3>
            <div className="h-1 w-20 bg-accent rounded-full" />
          </div>

          <div className="space-y-4">
            {educations.map((education, index) => (
              <div
                key={index}
                className="bg-background rounded-lg p-6 border border-card hover:border-accent transition-colors"
              >
                <h4 className="text-lg font-semibold text-primary mb-2">{education.degree}</h4>
                <p className="text-muted-foreground">{education.school}</p>
                <p className="text-sm text-accent mt-2">{education.duration}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Languages */}
        <div>
          <div className="mb-12">
            <h3 className="text-3xl font-serif font-bold text-primary mb-4">Languages</h3>
            <div className="h-1 w-20 bg-accent rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {languages.map((language, index) => (
              <div
                key={index}
                className="bg-background rounded-lg p-4 border border-card hover:border-accent transition-colors"
              >
                <h4 className="font-semibold text-primary">{language.name}</h4>
                <p className="text-sm text-muted-foreground">{language.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
