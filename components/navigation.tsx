'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { navItems } from '@/lib/nav'
import { useTheme } from './theme-provider'
import { SunIcon, MoonIcon, MenuIcon, CloseIcon } from './icons'

const isActive = (pathname: string, href: string) =>
  href === '/' ? pathname === '/' : pathname.startsWith(href)

export function Navigation() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const { toggleTheme } = useTheme()

  useEffect(() => setOpen(false), [pathname])

  // The mobile menu covers the page, so lock scroll and honour Esc while open.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'

    // The panel is `md:hidden`; if the viewport grows past `md` while it is
    // open, close it so the lock does not outlive the visible menu.
    const mq = window.matchMedia('(min-width: 48rem)')
    const onChange = () => mq.matches && setOpen(false)
    onChange()
    mq.addEventListener('change', onChange)

    return () => {
      mq.removeEventListener('change', onChange)
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  const iconBtn =
    'inline-flex items-center justify-center w-10 h-10 text-fg hover:bg-fg hover:text-fg-inverse transition-colors duration-[110ms] focus-ring'

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:px-4 focus:py-2 focus:bg-btn focus:text-fg-on-color focus:font-semibold"
      >
        Skip to main content
      </a>

      <header className="sticky top-0 z-50 bg-bg border-b border-line">
        <div className="mx-auto max-w-[90rem] h-14 px-5 md:px-10 flex items-center">
          <Link href="/" className="font-bold text-heading-02 tracking-tight focus-ring">
            Stephen Wanjala
          </Link>

          <nav className="hidden md:flex items-center gap-7 ml-auto mr-6" aria-label="Main">
            {navItems.slice(1).map((item) => {
              const current = isActive(pathname, item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={current ? 'page' : undefined}
                  className={`text-body-compact-01 py-1 border-b-2 focus-ring ${
                    current
                      ? 'border-blue-60 text-fg font-semibold'
                      : 'border-transparent text-fg-secondary hover:text-fg'
                  }`}
                >
                  {item.name}
                </Link>
              )
            })}
          </nav>

          <div className="ml-auto md:ml-0 flex items-center">
            <button
              onClick={toggleTheme}
              className={iconBtn}
              aria-label="Toggle light and dark theme"
            >
              <SunIcon className="w-5 h-5 hidden dark:block" />
              <MoonIcon className="w-5 h-5 dark:hidden" />
            </button>
            <button
              onClick={() => setOpen((v) => !v)}
              className={`md:hidden ${iconBtn}`}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-nav"
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </header>

      <nav
        id="mobile-nav"
        aria-label="Mobile"
        hidden={!open}
        className="md:hidden fixed inset-x-0 top-14 bottom-0 z-40 overflow-y-auto overscroll-contain bg-bg px-5 pt-6 pb-6"
      >
        <ul>
          {navItems.map((item) => (
            <li key={item.href} className="border-b border-line">
              <Link
                href={item.href}
                aria-current={isActive(pathname, item.href) ? 'page' : undefined}
                className="block py-4 text-heading-06 font-bold tracking-tight aria-[current=page]:text-blue-60 focus-ring"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}
