import Image from 'next/image'
import { projects } from '@/lib/data'
import { SectionHeading, Tag } from './ui'
import { GitHubIcon, ArrowUpRightIcon } from './icons'

/**
 * Carbon tile grid. Tiles sit on a 1px `$border-subtle` track (gap-px over a
 * line-coloured background) so the whole block reads as one ruled surface.
 */
export function Projects() {
  return (
    <section id="projects" className="border-b border-line bg-layer">
      <div className="mx-auto max-w-[1584px] px-4 md:px-8 pt-20 md:pt-28">
        <SectionHeading
          index="02 / Projects"
          title="Selected work"
          lede="Libraries, apps, and tools — most of them open source."
        />
      </div>

      <div className="mx-auto max-w-[1584px] px-4 md:px-8 pb-20 md:pb-28">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-px bg-line border border-line">
          {projects.map((project, i) => (
            <article
              key={project.name}
              className="group relative flex flex-col bg-bg hover:bg-layer-hover transition-colors duration-[110ms] ease-productive"
            >
              {project.image && (
                <div className="relative aspect-[16/10] overflow-hidden bg-layer">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-[700ms] ease-expressive group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                </div>
              )}

              <div className="flex flex-col flex-1 p-6">
                <p className="font-mono text-label-01 text-fg-helper mb-3">
                  {String(i + 1).padStart(2, '0')}
                </p>

                <h3 className="text-heading-03 text-fg">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring hover:text-link transition-colors duration-[110ms] ease-productive"
                  >
                    {project.title}
                  </a>
                </h3>

                {project.description && (
                  <p className="mt-3 text-body-01 text-fg-secondary text-pretty">
                    {project.description}
                  </p>
                )}

                <ul className="flex flex-wrap gap-2 mt-6 mb-8">
                  {project.tags.map((tag) => (
                    <li key={tag}>
                      <Tag>{tag}</Tag>
                    </li>
                  ))}
                </ul>

                {/* Carbon splits tile actions into full-height cells at the foot */}
                <div className="mt-auto -mx-6 -mb-6 grid grid-cols-2 gap-px bg-line border-t border-line">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-4 h-12 px-4 bg-layer hover:bg-layer-accent text-body-compact-01 text-fg transition-colors duration-[110ms] ease-productive focus-ring"
                  >
                    Source
                    <GitHubIcon className="w-4 h-4" />
                  </a>

                  {project.webLink ? (
                    <a
                      href={project.webLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between gap-4 h-12 px-4 bg-btn hover:bg-btn-hover text-white text-body-compact-01 transition-colors duration-[110ms] ease-productive focus-ring-filled"
                    >
                      Live demo
                      <ArrowUpRightIcon className="w-4 h-4" />
                    </a>
                  ) : (
                    <div
                      className="flex items-center h-12 px-4 bg-layer font-mono text-label-01 text-fg-placeholder"
                      aria-hidden="true"
                    >
                      No demo
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}

          {/* Trailing tile: link out to the rest of the work */}
          <a
            href="https://github.com/stephenWanjala?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col justify-between gap-8 bg-bg hover:bg-layer-hover p-6 min-h-56 transition-colors duration-[110ms] ease-productive focus-ring"
          >
            <p className="font-mono text-label-01 text-fg-helper">
              {String(projects.length + 1).padStart(2, '0')}
            </p>
            <div>
              <p className="text-heading-03 text-fg">More on GitHub</p>
              <p className="mt-3 text-body-01 text-fg-secondary">
                Experiments, forks, and everything else.
              </p>
            </div>
            <ArrowUpRightIcon className="w-5 h-5 text-link transition-transform duration-[240ms] ease-productive group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </div>
      </div>
    </section>
  )
}
