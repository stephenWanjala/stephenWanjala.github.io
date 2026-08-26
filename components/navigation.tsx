'use client'

import { useCallback, useEffect, useState } from 'react'
import { useTheme } from './theme-provider'
import { contact } from '@/lib/data'
import { SunIcon, MoonIcon, MenuIcon, CloseIcon, GitHubIcon } from './icons'

const navItems = [
  { name: 'About', href: '#about', id: 'about' },
  { name: 'Experience', href: '#experience', id: 'experience' },
  { name: 'Projects', href: '#projects', id: 'projects' },
  { name: 'Skills', href: '#skills', id: 'skills' },
  { name: 'Contact', href: '#contact', id: 'contact' },
]

/**
 * Carbon UI Shell header. The bar stays Gray 100 in both themes, which is how
 * the shell behaves in the real system — the header is a fixed frame around
 * the themed content, not part of it.
 */
export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [active, setActive] = useState('about')
  const [progress, setProgress] = useState(0)
  const { theme, toggleTheme } = useTheme()

  // Highlight the section currently occupying the top of the viewport.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-48px 0px -60% 0px', threshold: 0 }
    )

    navItems.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  // Carbon ProgressBar hairline pinned under the header.
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // The side nav is a modal surface on small screens: lock scroll and honour Esc.
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Past `lg` the side nav and its trigger are both hidden, so a viewport that
  // grows while the menu is open would strand the scroll lock. Closing here
  // lets the effect above clean up.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 64rem)')
    const sync = () => mq.matches && setIsOpen(false)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  const close = useCallback(() => setIsOpen(false), [])

  return (
    <>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:top-0 focus:left-0 focus:z-[60] focus:h-12 focus:px-4 focus:inline-flex focus:items-center focus:bg-btn focus:text-white focus:text-body-compact-01"
      >
        Skip to main content
      </a>

      <header className="fixed top-0 inset-x-0 z-50 h-12 bg-gray-100 border-b border-[#393939]">
        <div className="flex items-center h-full">
          {/* Hamburger — Carbon pins it to the far left, flush with the edge */}
          <button
            onClick={() => setIsOpen((v) => !v)}
            className="lg:hidden w-12 h-12 inline-flex items-center justify-center text-gray-10 hover:bg-[#353535] transition-colors duration-[110ms] ease-productive focus-ring-inverse"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            aria-controls="side-nav"
          >
            {isOpen ? <CloseIcon /> : <MenuIcon />}
          </button>

          <a
            href="#about"
            className="h-12 inline-flex items-center pl-4 lg:pl-6 pr-8 text-body-compact-01 font-semibold text-white hover:bg-[#353535] transition-colors duration-[110ms] ease-productive focus-ring-inverse"
          >
            Stephen Wanjala
            <span className="hidden sm:inline font-normal text-gray-40 ml-2">
              / Software Developer
            </span>
          </a>

          {/* Header nav */}
          <nav className="hidden lg:flex h-full" aria-label="Main">
            {navItems.map((item) => {
              const isCurrent = active === item.id
              return (
                <a
                  key={item.name}
                  href={item.href}
                  aria-current={isCurrent ? 'page' : undefined}
                  className={`relative h-12 inline-flex items-center px-4 text-body-compact-01 transition-colors duration-[110ms] ease-productive focus-ring-inverse ${
                    isCurrent
                      ? 'text-white bg-[#353535]'
                      : 'text-gray-30 hover:bg-[#353535] hover:text-white'
                  }`}
                >
                  {item.name}
                  {isCurrent && (
                    <span
                      className="absolute inset-x-0 bottom-0 h-[3px] bg-blue-60"
                      aria-hidden="true"
                    />
                  )}
                </a>
              )
            })}
          </nav>

          {/* Global actions */}
          <div className="ml-auto flex items-center h-full">
            <a
              href={contact.github.link}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex w-12 h-12 items-center justify-center text-gray-10 hover:bg-[#353535] transition-colors duration-[110ms] ease-productive focus-ring-inverse"
              aria-label="GitHub profile"
            >
              <GitHubIcon className="w-5 h-5" />
            </a>
            <button
              onClick={toggleTheme}
              className="w-12 h-12 inline-flex items-center justify-center text-gray-10 hover:bg-[#353535] transition-colors duration-[110ms] ease-productive focus-ring-inverse"
              aria-label={`Switch to ${theme === 'dark' ? 'White' : 'Gray 100'} theme`}
            >
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>
        </div>

        {/* Reading progress */}
        <div
          className="absolute inset-x-0 -bottom-px h-[2px] bg-blue-60 origin-left transition-transform duration-75 ease-linear"
          style={{ transform: `scaleX(${progress / 100})` }}
          aria-hidden="true"
        />
      </header>

      {/* Side nav — Carbon slides it in from the left, over a scrim */}
      <div
        className={`lg:hidden fixed inset-0 z-40 bg-black/50 transition-opacity duration-[240ms] ease-productive ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={close}
        aria-hidden="true"
      />
      <nav
        id="side-nav"
        aria-label="Main"
        aria-hidden={!isOpen}
        className={`lg:hidden fixed top-12 bottom-0 left-0 z-40 w-64 bg-gray-100 border-r border-[#393939] transition-transform duration-[240ms] ${
          isOpen
            ? 'translate-x-0 ease-entrance'
            : '-translate-x-full ease-exit pointer-events-none'
        }`}
      >
        <ul className="py-2">
          {navItems.map((item) => {
            const isCurrent = active === item.id
            return (
              <li key={item.name}>
                <a
                  href={item.href}
                  onClick={close}
                  tabIndex={isOpen ? 0 : -1}
                  aria-current={isCurrent ? 'page' : undefined}
                  className={`flex items-center h-8 px-4 text-body-compact-01 transition-colors duration-[110ms] ease-productive focus-ring-inverse ${
                    isCurrent
                      ? 'text-white bg-[#353535] font-semibold border-l-[3px] border-blue-60 pl-[13px]'
                      : 'text-gray-30 hover:bg-[#353535] hover:text-white'
                  }`}
                >
                  {item.name}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    </>
  )
}
