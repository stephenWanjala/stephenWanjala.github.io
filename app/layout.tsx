import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
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
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
