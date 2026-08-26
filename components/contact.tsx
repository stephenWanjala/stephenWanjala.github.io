'use client'

import { contact } from '@/lib/data'
import { useEffect, useRef, useState } from 'react'
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile'
import { useTheme } from './theme-provider'
import { SectionHeading, Button, IconLink } from './ui'
import {
  GitHubIcon,
  LinkedInIcon,
  TwitterIcon,
  MailIcon,
  SendIcon,
  CheckmarkIcon,
  ErrorFilledIcon,
  ArrowUpRightIcon,
} from './icons'

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

/**
 * Carbon TextInput: label above in `$label-01`, a `$field-01` fill, a single
 * `$border-strong` rule along the bottom, and a 2px inset focus outline.
 * Invalid fields swap the rule for `$support-error` and show helper text.
 */
const fieldClass = (invalid: boolean) =>
  [
    'w-full bg-field px-4 text-body-01 text-fg placeholder:text-fg-placeholder',
    'border-0 border-b transition-colors duration-[110ms] ease-productive',
    'focus:outline-2 focus:outline-focus focus:-outline-offset-2',
    invalid ? 'border-b-error' : 'border-b-line-strong hover:bg-field-hover',
  ].join(' ')

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p id={id} role="alert" className="mt-2 text-helper-01 text-error flex items-center gap-2">
      <ErrorFilledIcon className="w-4 h-4 shrink-0" />
      {message}
    </p>
  )
}

export function Contact() {
  const [form, setForm] = useState<FormData>({ name: '', email: '', message: '' })
  const [meta, setMeta] = useState<FormMeta>({ submitted: false, loading: false, error: '' })
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const turnstileRef = useRef<TurnstileInstance>(undefined)
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()

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

  return (
    <section id="contact" className="bg-layer border-b border-line">
      <div className="mx-auto max-w-[1584px] px-4 md:px-8 py-20 md:py-28">
        <SectionHeading
          index="04 / Contact"
          title="Let's build something"
          lede="Have a project, a role, or a question? Send a message and I'll get back to you."
        />

        <div className="grid lg:grid-cols-16 gap-12 lg:gap-0">
          {/* Contact details */}
          <div className="lg:col-span-5 lg:pr-12">
            <dl className="border-t border-line">
              <div className="py-5 border-b border-line">
                <dt className="font-mono text-label-01 uppercase tracking-widest text-fg-helper mb-2">
                  Email
                </dt>
                <dd>
                  <a
                    href={`mailto:${contact.email}`}
                    className="inline-flex items-center gap-2 text-body-01 text-link hover:text-link-hover hover:underline underline-offset-2 break-all focus-ring"
                  >
                    {contact.email}
                    <ArrowUpRightIcon className="w-4 h-4 shrink-0" />
                  </a>
                </dd>
              </div>

              <div className="py-5 border-b border-line">
                <dt className="font-mono text-label-01 uppercase tracking-widest text-fg-helper mb-2">
                  Response time
                </dt>
                <dd className="text-body-01 text-fg-secondary">Usually within 48 hours</dd>
              </div>

              <div className="py-5 border-b border-line">
                <dt className="font-mono text-label-01 uppercase tracking-widest text-fg-helper mb-2">
                  Social
                </dt>
                <dd className="flex -ml-2">
                  <IconLink
                    href={contact.github.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                  >
                    <GitHubIcon />
                  </IconLink>
                  <IconLink
                    href={contact.linkedin.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  >
                    <LinkedInIcon />
                  </IconLink>
                  <IconLink
                    href={contact.twitter.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter"
                  >
                    <TwitterIcon />
                  </IconLink>
                  <IconLink href={`mailto:${contact.email}`} aria-label="Email">
                    <MailIcon />
                  </IconLink>
                </dd>
              </div>
            </dl>
          </div>

          {/* Form */}
          <div className="lg:col-span-11 lg:border-l border-line lg:pl-12">
            {meta.submitted ? (
              /* Carbon inline notification — success */
              <div className="flex gap-4 bg-bg border-l-[3px] border-success p-4">
                <CheckmarkIcon className="w-5 h-5 text-success shrink-0 mt-0.5" />
                <div>
                  <p className="text-heading-01 text-fg">Message sent</p>
                  <p className="mt-1 text-body-01 text-fg-secondary">
                    Thanks for reaching out — I&apos;ll get back to you as soon as I can.
                  </p>
                  <button
                    onClick={() => setMeta((p) => ({ ...p, submitted: false }))}
                    className="mt-4 text-body-01 text-link hover:text-link-hover underline underline-offset-2 focus-ring"
                  >
                    Send another message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                {meta.error && (
                  /* Carbon inline notification — error */
                  <div
                    role="alert"
                    className="flex gap-4 bg-bg border-l-[3px] border-error p-4"
                  >
                    <ErrorFilledIcon className="w-5 h-5 text-error shrink-0 mt-0.5" />
                    <div>
                      <p className="text-heading-01 text-fg">Message not sent</p>
                      <p className="mt-1 text-body-01 text-fg-secondary">{meta.error}</p>
                    </div>
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-label-01 text-fg-secondary mb-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={form.name}
                      onChange={(e) => updateField('name', e.target.value)}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                      className={`${fieldClass(!!errors.name)} h-12`}
                      placeholder="Your name"
                    />
                    <FieldError id="name-error" message={errors.name} />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-label-01 text-fg-secondary mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={form.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      className={`${fieldClass(!!errors.email)} h-12`}
                      placeholder="you@example.com"
                    />
                    <FieldError id="email-error" message={errors.email} />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-label-01 text-fg-secondary mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={form.message}
                    onChange={(e) => updateField('message', e.target.value)}
                    rows={6}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    className={`${fieldClass(!!errors.message)} py-3 resize-none`}
                    placeholder="Tell me about your project..."
                  />
                  <FieldError id="message-error" message={errors.message} />
                </div>

                <Turnstile
                  ref={turnstileRef}
                  siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                  onSuccess={setTurnstileToken}
                  onExpire={() => setTurnstileToken(null)}
                  onError={() => setTurnstileToken(null)}
                  options={{ theme: theme === 'dark' ? 'dark' : 'light' }}
                />

                <Button
                  type="submit"
                  disabled={meta.loading || (mounted && !turnstileToken)}
                  icon={<SendIcon />}
                  className="w-full sm:w-auto"
                >
                  {meta.loading ? 'Sending…' : 'Send message'}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
