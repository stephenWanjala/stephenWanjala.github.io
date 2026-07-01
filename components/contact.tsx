'use client'

import { contact } from '@/lib/data'
import { useEffect, useRef, useState } from 'react'
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile'
import { GitHubIcon, LinkedInIcon, TwitterIcon, MailIcon } from './icons'

interface FormData {
  name: string
  email: string
  message: string
}

interface FormMeta {
  submitted: boolean
  loading: boolean
  error: string
}

export function Contact() {
  const [form, setForm] = useState<FormData>({ name: '', email: '', message: '' })
  const [meta, setMeta] = useState<FormMeta>({ submitted: false, loading: false, error: '' })
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const turnstileRef = useRef<TurnstileInstance>(undefined)
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const validate = (): boolean => {
    const e: Partial<Record<keyof FormData, string>> = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email address'
    if (!form.message.trim()) e.message = 'Message is required'
    else if (form.message.trim().length < 10) e.message = 'At least 10 characters'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validate()) return

    if (!turnstileToken) {
      setMeta({ submitted: false, loading: false, error: 'Please complete the CAPTCHA' })
      return
    }

    setMeta({ submitted: false, loading: true, error: '' })

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, turnstileToken }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to send message')
      }

      setForm({ name: '', email: '', message: '' })
      setTurnstileToken(null)
      turnstileRef.current?.reset()
      setMeta({ submitted: true, loading: false, error: '' })
    } catch (err) {
      turnstileRef.current?.reset()
      setTurnstileToken(null)
      setMeta({
        submitted: false,
        loading: false,
        error: err instanceof Error ? err.message : 'Something went wrong',
      })
    }
  }

  const updateField = (field: keyof FormData, value: string) => {
    setForm((p) => ({ ...p, [field]: value }))
    if (errors[field]) setErrors((p) => ({ ...p, [field]: undefined }))
  }

  const inputClass = (field: keyof FormData) =>
    `w-full px-4 py-2.5 bg-background border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background transition-colors ${
      errors[field] ? 'border-red-500' : 'border-border'
    }`

  return (
    <section id="contact" className="py-20 px-4 bg-card">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary mb-3">
            Get in Touch
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Have a project in mind or want to collaborate? I&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-[1fr_2fr] gap-10 items-start">
          {/* Contact Info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-primary uppercase tracking-wider mb-3">Email</h3>
              <a
                href={`mailto:${contact.email}`}
                className="text-accent hover:underline text-sm break-all"
              >
                {contact.email}
              </a>
            </div>

            <div>
              <h3 className="text-sm font-medium text-primary uppercase tracking-wider mb-3">Social</h3>
              <div className="flex gap-2">
                <a
                  href={contact.github.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-muted-foreground hover:text-primary hover:bg-secondary rounded-lg transition-colors focus-ring"
                  aria-label="GitHub"
                >
                  <GitHubIcon />
                </a>
                <a
                  href={contact.linkedin.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-muted-foreground hover:text-primary hover:bg-secondary rounded-lg transition-colors focus-ring"
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon />
                </a>
                <a
                  href={contact.twitter.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-muted-foreground hover:text-primary hover:bg-secondary rounded-lg transition-colors focus-ring"
                  aria-label="Twitter"
                >
                  <TwitterIcon />
                </a>
                <a
                  href={`mailto:${contact.email}`}
                  className="p-2 text-muted-foreground hover:text-primary hover:bg-secondary rounded-lg transition-colors focus-ring"
                  aria-label="Email"
                >
                  <MailIcon />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-background rounded-xl p-6 sm:p-8 border border-border">
            {meta.submitted ? (
              <div className="flex flex-col items-center justify-center gap-4 py-10 text-center">
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-accent/15">
                  <svg
                    className="w-7 h-7 text-accent"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-lg font-semibold text-primary">Message sent!</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Thanks for reaching out. I&apos;ll get back to you as soon as possible.
                  </p>
                </div>
                <button
                  onClick={() => setMeta((p) => ({ ...p, submitted: false }))}
                  className="mt-2 text-sm text-accent hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {meta.error && (
                  <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <p className="text-sm text-red-600 dark:text-red-400 font-medium">{meta.error}</p>
                  </div>
                )}

                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-primary mb-1.5">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={form.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    className={inputClass('name')}
                    placeholder="Your name"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-primary mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={form.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    className={inputClass('email')}
                    placeholder="you@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-primary mb-1.5">
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={form.message}
                    onChange={(e) => updateField('message', e.target.value)}
                    rows={5}
                    className={`${inputClass('message')} resize-none`}
                    placeholder="Tell me about your project..."
                  />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                </div>

                <Turnstile
                  ref={turnstileRef}
                  siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                  onSuccess={setTurnstileToken}
                  onExpire={() => setTurnstileToken(null)}
                  onError={() => setTurnstileToken(null)}
                  options={{ theme: 'auto' }}
                />

                <button
                  type="submit"
                  disabled={meta.loading || (mounted && !turnstileToken)}
                  className="w-full px-5 py-2.5 bg-accent text-accent-foreground font-medium rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity focus-ring"
                >
                  {meta.loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
