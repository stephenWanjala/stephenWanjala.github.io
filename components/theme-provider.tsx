'use client'

import { createContext, useCallback, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'
/** Must match `--color-bg` in globals.css; keeps the mobile browser chrome in step. */
const THEME_COLOR: Record<Theme, string> = { dark: '#0a0a0a', light: '#f4f1ea' }

const ThemeContext = createContext<{
  theme: Theme
  toggleTheme: () => void
}>({
  theme: 'dark',
  toggleTheme: () => {},
})

export function useTheme() {
  return useContext(ThemeContext)
}

const isTheme = (v: unknown): v is Theme => v === 'light' || v === 'dark'

/** Writes the theme to <html> and the `theme-color` meta. */
function applyTheme(theme: Theme) {
  const root = document.documentElement
  root.classList.remove('light', 'dark')
  root.classList.add(theme)

  let meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"][data-app]')
  if (!meta) {
    meta = document.createElement('meta')
    meta.name = 'theme-color'
    meta.dataset.app = ''
    document.head.appendChild(meta)
  }
  meta.content = THEME_COLOR[theme]
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark')

  // The inline script in `app/layout.tsx` already set the class before first
  // paint; read it back rather than deciding a second time.
  useEffect(() => {
    const current = document.documentElement.classList.contains('light') ? 'light' : 'dark'
    setTheme(current)
    applyTheme(current)
  }, [])

  // Keep other open tabs in step with the one the user toggled.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && isTheme(e.newValue)) {
        setTheme(e.newValue)
        applyTheme(e.newValue)
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const toggleTheme = useCallback(() => {
    const next: Theme = document.documentElement.classList.contains('light') ? 'dark' : 'light'
    setTheme(next)
    applyTheme(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* storage unavailable: the toggle still works for this session */
    }
  }, [])

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}
