import Image from 'next/image'
import type { Project } from '@/lib/types'
import { ArrowUpRightIcon } from './icons'

/** Ruled list of projects: image on one side, plain description on the other. */
export function ProjectList({ items }: { items: Project[] }) {
  return (
    <ul className="border-t-2 border-line-strong">
      {items.map((p, i) => (
        <li key={p.name} className="border-b border-line-strong">
          <article className="grid md:grid-cols-12 gap-6 md:gap-10 py-8 md:py-12">
            <div className={`md:col-span-5 ${i % 2 ? 'md:order-2' : ''}`}>
              <div className="relative aspect-[16/10] bg-layer overflow-hidden">
                <Image
                  src={p.image}
                  alt={`${p.title} screenshot`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
            </div>

            <div className="md:col-span-7 flex flex-col">
              <h2 className="text-heading-06 md:text-fluid-heading-05 font-bold tracking-tight">
                {p.title}
              </h2>
              {p.description && (
                <p className="mt-4 text-body-02 text-fg-secondary max-w-xl text-pretty">
                  {p.description}
                </p>
              )}
              <p className="mt-4 text-body-compact-01 text-fg-helper">{p.tags.join(', ')}</p>

              <div className="mt-auto pt-8 flex flex-wrap gap-x-8 gap-y-2 text-body-01 font-semibold">
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 underline underline-offset-4 decoration-2 hover:text-link focus-ring"
                >
                  Source <ArrowUpRightIcon />
                </a>
                {p.webLink && (
                  <a
                    href={p.webLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 underline underline-offset-4 decoration-2 hover:text-link focus-ring"
                  >
                    Live site <ArrowUpRightIcon />
                  </a>
                )}
              </div>
            </div>
          </article>
        </li>
      ))}
    </ul>
  )
}
