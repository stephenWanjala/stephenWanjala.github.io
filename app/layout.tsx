import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Stephen Wanjala - Full Stack Developer',
  description:
    'Software developer passionate about crafting accessible, pixel-perfect digital experiences. Specializing in modern web and mobile development.',
  authors: [{ name: 'Stephen Wanjala' }],
  keywords: [
    'Software Developer',
    'Full Stack',
    'React',
    'Next.js',
    'TypeScript',
    'Kotlin',
    'Android',
    'Web Development',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://stephenwanjala.dev',
    siteName: 'Stephen Wanjala',
    title: 'Stephen Wanjala - Full Stack Developer',
    description:
      'Software developer passionate about crafting accessible, pixel-perfect digital experiences.',
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#1a3a4a" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body>{children}</body>
    </html>
  )
}
