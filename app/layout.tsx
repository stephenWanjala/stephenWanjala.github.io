import type { Metadata, Viewport } from 'next'
import { IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const plexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-plex-sans',
  display: 'swap',
})

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-plex-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Stephen Wanjala | Software Developer',
  description:
    'Software developer specializing in mobile, web, and backend development. Building robust solutions with Kotlin, React, and modern frameworks.',
  authors: [{ name: 'Stephen Wanjala' }],
  keywords: [
    'Software Developer',
    'Full Stack Developer',
    'React',
    'Next.js',
    'TypeScript',
    'Kotlin',
    'Android Developer',
    'Web Development',
    'Mobile Development',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://wanjalastephen.vercel.app',
    siteName: 'Stephen Wanjala',
    title: 'Stephen Wanjala | Software Developer',
    description:
      'Software developer specializing in mobile, web, and backend development.',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@wanjalastephen5',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#161616' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

/**
 * Applies the stored Carbon theme before first paint so the White theme never
 * flashes over Gray 100 (or vice versa).
 */
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(!t){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}document.documentElement.classList.add(t)}catch(e){document.documentElement.classList.add('dark')}})()`

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${plexSans.variable} ${plexMono.variable} font-sans antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
