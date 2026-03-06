'use client'

import { experiences } from '@/lib/data'
import { useState } from 'react'

export function Experience() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)

  return (
    <section id="experience" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">Experience</h2>
          <div className="h-1 w-20 bg-accent rounded-full" />
        </div>

        <div className="space-y-6">
          {experiences.map((experience, expIndex) => (
            <div
              key={expIndex}
              className="border border-card rounded-lg overflow-hidden hover:border-accent transition-colors"
            >
              {/* Company Header */}
              <button
                onClick={() =>
                  setExpandedIndex(expandedIndex === expIndex ? null : expIndex)
                }
                className="w-full px-6 py-4 bg-card hover:bg-secondary/50 transition-colors flex items-center justify-between group"
              >
                <div className="text-left flex-1">
                  <h3 className="text-xl font-semibold text-primary group-hover:text-accent transition-colors">
                    {experience.company}
                  </h3>
                  <a
                    href={experience.companyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-accent hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {experience.companyLink}
                  </a>
                </div>
                <svg
                  className={`w-6 h-6 text-muted-foreground transition-transform ${
                    expandedIndex === expIndex ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7-7m0 0L5 14m7-7v12"
                  />
                </svg>
              </button>

              {/* Roles */}
              {expandedIndex === expIndex && (
                <div className="px-6 py-4 bg-background border-t border-card space-y-6">
                  {experience.roles.map((role, roleIndex) => (
                    <div key={roleIndex} className="border-l-2 border-accent pl-4">
                      <h4 className="text-lg font-semibold text-primary mb-2">{role.jobTitle}</h4>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="px-3 py-1 bg-secondary text-sm rounded-full text-foreground">
                          {role.employmentType}
                        </span>
                        <span className="px-3 py-1 bg-secondary text-sm rounded-full text-muted-foreground">
                          {role.time.start.toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                          })}{' '}
                          –{' '}
                          {role.time.current
                            ? 'Present'
                            : role.time.end?.toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                              })}
                        </span>
                      </div>
                      <ul className="space-y-2">
                        {role.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="text-muted-foreground leading-relaxed flex gap-3">
                            <span className="text-accent mt-1 flex-shrink-0">▪</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
