'use client'

import { useState } from 'react'
import { experiences } from '@/lib/data'
import { SectionHeading } from './ui'
import { ChevronDownIcon, ArrowUpRightIcon } from './icons'

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
}

/**
 * Carbon Accordion (flush variant): full-width rows separated by hairlines,
 * chevron at the end, content revealed with the productive easing curve.
 */
export function Experience() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)

  return (
    <section id="experience" className="border-b border-line">
      <div className="mx-auto max-w-[1584px] px-4 md:px-8 py-20 md:py-28">
        <div className="grid lg:grid-cols-16 gap-y-12">
          <div className="lg:col-span-5 lg:pr-12">
            <SectionHeading
              index="01 / Experience"
              title="Where I've worked"
              lede="Roles, responsibilities, and the systems I've shipped and maintained."
            />
          </div>

          <div className="lg:col-span-11">
            <div className="border-t border-line">
              {experiences.map((experience, expIndex) => {
                const isExpanded = expandedIndex === expIndex
                const current = experience.roles.some((r) => r.time.current)

                return (
                  <div key={experience.company} className="border-b border-line">
                    <h3>
                      <button
                        id={`experience-trigger-${expIndex}`}
                        onClick={() => setExpandedIndex(isExpanded ? null : expIndex)}
                        aria-expanded={isExpanded}
                        aria-controls={`experience-panel-${expIndex}`}
                        className="w-full flex items-start justify-between gap-6 px-4 py-5 text-left hover:bg-layer-hover transition-colors duration-[110ms] ease-productive focus-ring"
                      >
                        <span className="min-w-0">
                          <span className="flex flex-wrap items-center gap-3">
                            <span className="text-heading-03 text-fg">
                              {experience.company}
                            </span>
                            {current && (
                              <span className="inline-flex items-center h-5 px-2 bg-blue-60 text-white text-label-01 font-mono uppercase tracking-wider">
                                Current
                              </span>
                            )}
                          </span>
                          <span className="mt-1 block font-mono text-label-01 text-fg-helper">
                            {experience.roles.length}{' '}
                            {experience.roles.length === 1 ? 'role' : 'roles'}
                          </span>
                        </span>
                        <ChevronDownIcon
                          className={`w-5 h-5 shrink-0 mt-1 text-fg transition-transform duration-[240ms] ease-productive ${
                            isExpanded ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                    </h3>

                    {/* 0fr → 1fr keeps the reveal animated without measuring
                        heights; `inert` keeps collapsed content out of the
                        tab order and off the accessibility tree. */}
                    <div
                      id={`experience-panel-${expIndex}`}
                      role="region"
                      aria-labelledby={`experience-trigger-${expIndex}`}
                      inert={!isExpanded}
                      className={`grid transition-[grid-template-rows] duration-[240ms] ${
                        isExpanded
                          ? 'grid-rows-[1fr] ease-entrance'
                          : 'grid-rows-[0fr] ease-exit'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="px-4 pb-8">
                          <a
                            href={experience.companyLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 mb-8 text-body-01 text-link hover:text-link-hover hover:underline underline-offset-2 focus-ring"
                          >
                            {experience.companyLink.replace(/^https?:\/\//, '')}
                            <ArrowUpRightIcon className="w-4 h-4" />
                          </a>

                          <ol className="space-y-10">
                        {experience.roles.map((role, roleIndex) => (
                          <li
                            key={roleIndex}
                            className="relative pl-6 border-l border-line"
                          >
                            {/* Timeline marker on the rule */}
                            <span
                              className={`absolute -left-[4.5px] top-1.5 w-2 h-2 ${
                                role.time.current ? 'bg-blue-60' : 'bg-line-strong'
                              }`}
                              aria-hidden="true"
                            />

                            <h4 className="text-heading-02 text-fg">{role.jobTitle}</h4>

                            <p className="mt-1 font-mono text-label-01 uppercase tracking-wider text-fg-helper">
                              {formatDate(role.time.start)}
                              {' — '}
                              {role.time.current
                                ? 'Present'
                                : role.time.end
                                  ? formatDate(role.time.end)
                                  : ''}
                              {role.employmentType && (
                                <span className="normal-case tracking-normal">
                                  {' · '}
                                  {role.employmentType}
                                </span>
                              )}
                            </p>

                            <ul className="mt-4 space-y-3">
                              {role.details.map((detail, i) => (
                                <li
                                  key={i}
                                  className="flex gap-3 text-body-01 text-fg-secondary"
                                >
                                  <span
                                    className="mt-[0.5em] w-2 h-px bg-line-strong shrink-0"
                                    aria-hidden="true"
                                  />
                                  <span className="text-pretty">{detail}</span>
                                </li>
                              ))}
                            </ul>
                          </li>
                        ))}
                          </ol>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
