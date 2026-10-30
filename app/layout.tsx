import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, IBM_Plex_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import './globals.css'

const display = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
})

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-plex-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Stephen Wanjala | Software Developer',
    template: '%s',
  },
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
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

/**
 * Applies the stored theme before first paint so light never flashes over dark.
 */
const themeScript = `(function(){var t='dark';try{var s=localStorage.getItem('theme');if(s==='light'||s==='dark')t=s}catch(e){}document.documentElement.classList.add(t)})()`

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${plexMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.17.0/devicon.min.css"
        />
      </head>
      <body
        className="font-sans antialiased"
      >
        <ThemeProvider>
          <Navigation />
          <main id="main">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
