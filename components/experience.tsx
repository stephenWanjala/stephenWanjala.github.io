'use client'

import { experiences } from '@/lib/data'
import { useState } from 'react'
import { ChevronDownIcon } from './icons'

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
}

export function Experience() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)

  return (
    <section id="experience" className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary mb-3">
            Experience
          </h2>
          <p className="text-muted-foreground">Where I&apos;ve worked and what I&apos;ve built.</p>
        </div>

        <div className="space-y-4">
          {experiences.map((experience, expIndex) => {
            const isExpanded = expandedIndex === expIndex
            return (
              <div
                key={expIndex}
                className={`rounded-xl border transition-colors ${
                  isExpanded ? 'border-accent/50 bg-card' : 'border-border hover:border-muted'
                }`}
              >
                <button
                  onClick={() => setExpandedIndex(isExpanded ? null : expIndex)}
                  className="w-full px-5 py-4 flex items-center justify-between gap-4 text-left focus-ring rounded-xl"
                  aria-expanded={isExpanded}
                >
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold text-primary truncate">
                      {experience.company}
                    </h3>
                    <a
                      href={experience.companyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-accent hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {experience.companyLink.replace(/^https?:\/\//, '')}
                    </a>
                  </div>
                  <ChevronDownIcon
                    className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-200 ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-5 pb-5 space-y-6">
                    <div className="h-px bg-border" />
                    {experience.roles.map((role, roleIndex) => (
                      <div key={roleIndex} className="relative pl-5 border-l-2 border-accent/30">
                        <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-accent" />
                        <div className="mb-3">
                          <h4 className="text-base font-semibold text-primary">
                            {role.jobTitle}
                          </h4>
                          <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1">
                            <span className="text-sm text-muted-foreground">
                              {formatDate(role.time.start)} &ndash;{' '}
                              {role.time.current ? 'Present' : role.time.end ? formatDate(role.time.end) : ''}
                            </span>
                            {role.employmentType && (
                              <>
                                <span className="text-muted hidden sm:inline">&middot;</span>
                                <span className="text-sm text-muted-foreground">{role.employmentType}</span>
                              </>
                            )}
                          </div>
                        </div>
                        <ul className="space-y-2">
                          {role.details.map((detail, i) => (
                            <li key={i} className="text-sm text-muted-foreground leading-relaxed flex gap-2">
                              <span className="text-accent mt-0.5 flex-shrink-0 text-xs">&#9679;</span>
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
