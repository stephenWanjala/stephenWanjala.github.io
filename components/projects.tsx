import { projects } from '@/lib/data'
import Image from 'next/image'
import { GitHubIcon, ExternalLinkIcon } from './icons'

export function Projects() {
  return (
    <section id="projects" className="py-20 px-4 bg-card">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary mb-3">
            Projects
          </h2>
          <p className="text-muted-foreground">A selection of things I&apos;ve built.</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {projects.map((project) => (
            <article
              key={project.name}
              className="group rounded-xl border border-border bg-background overflow-hidden hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/5 flex flex-col"
            >
              {project.image && (
                <div className="relative h-48 bg-secondary overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                </div>
              )}

              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-lg font-semibold text-primary mb-1.5 group-hover:text-accent transition-colors">
                  {project.title}
                </h3>

                {project.description && (
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                )}

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-xs font-medium bg-secondary text-secondary-foreground rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3 mt-auto">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium border border-border text-primary rounded-lg hover:bg-secondary transition-colors focus-ring"
                  >
                    <GitHubIcon className="w-4 h-4" />
                    Source
                  </a>

                  {project.webLink && (
                    <a
                      href={project.webLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-opacity focus-ring"
                    >
                      <ExternalLinkIcon className="w-4 h-4" />
                      Demo
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
