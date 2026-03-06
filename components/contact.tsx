'use client'

import { contact } from '@/lib/data'
import { useState } from 'react'

interface FormState {
  name: string
  email: string
  message: string
  submitted: boolean
  loading: boolean
  error: string
}

export function Contact() {
  const [formState, setFormState] = useState<FormState>({
    name: '',
    email: '',
    message: '',
    submitted: false,
    loading: false,
    error: '',
  })

  const [validationErrors, setValidationErrors] = useState<Partial<Record<keyof FormState, string>>>({})

  const validateForm = (): boolean => {
    const errors: Partial<Record<keyof FormState, string>> = {}

    if (!formState.name.trim()) {
      errors.name = 'Name is required'
    }

    if (!formState.email.trim()) {
      errors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      errors.email = 'Please enter a valid email address'
    }

    if (!formState.message.trim()) {
      errors.message = 'Message is required'
    } else if (formState.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters'
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setFormState((prev) => ({ ...prev, loading: true, error: '' }))

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          message: formState.message,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to send message')
      }

      setFormState((prev) => ({
        ...prev,
        submitted: true,
        loading: false,
        name: '',
        email: '',
        message: '',
      }))

      setTimeout(() => {
        setFormState((prev) => ({ ...prev, submitted: false }))
      }, 4000)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to send message. Please try again.'
      setFormState((prev) => ({ ...prev, loading: false, error: errorMessage }))
    }
  }

  return (
    <section id="contact" className="py-20 px-4 bg-card">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">Get in Touch</h2>
          <div className="h-1 w-20 bg-accent rounded-full mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? I'd love to hear from you. Send me a message and I'll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 items-start">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-primary mb-2">Email</h3>
              <a
                href={`mailto:${contact.email}`}
                className="text-accent hover:opacity-80 transition-opacity break-all"
              >
                {contact.email}
              </a>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-primary mb-2">Phone</h3>
              <a href={`tel:${contact.phone}`} className="text-accent hover:opacity-80 transition-opacity">
                {contact.phone}
              </a>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-primary mb-4">Social Links</h3>
              <div className="space-y-3">
                <a
                  href={contact.github.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-accent hover:text-primary transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </a>
                <a
                  href={contact.linkedin.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-accent hover:text-primary transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                  LinkedIn
                </a>
                <a
                  href={contact.twitter.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-accent hover:text-primary transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7z" />
                  </svg>
                  Twitter
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="md:col-span-2 space-y-6 bg-background rounded-lg p-8 border border-card">
            {/* Success Message */}
            {formState.submitted && (
              <div className="p-4 bg-accent/10 border border-accent rounded-lg">
                <p className="text-accent font-medium">
                  Thank you! I've received your message and will get back to you soon.
                </p>
              </div>
            )}

            {/* Error Message */}
            {formState.error && (
              <div className="p-4 bg-red-500/10 border border-red-500 rounded-lg">
                <p className="text-red-600 dark:text-red-400 font-medium">{formState.error}</p>
              </div>
            )}

            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-primary mb-2">
                Name <span className="text-accent">*</span>
              </label>
              <input
                type="text"
                id="name"
                value={formState.name}
                onChange={(e) => {
                  setFormState({ ...formState, name: e.target.value })
                  if (validationErrors.name) setValidationErrors({ ...validationErrors, name: '' })
                }}
                className={`w-full px-4 py-2 bg-card border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none transition-colors ${
                  validationErrors.name ? 'border-red-500 focus:border-red-500' : 'border-card focus:border-accent'
                }`}
                placeholder="Your name"
              />
              {validationErrors.name && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.name}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-primary mb-2">
                Email <span className="text-accent">*</span>
              </label>
              <input
                type="email"
                id="email"
                value={formState.email}
                onChange={(e) => {
                  setFormState({ ...formState, email: e.target.value })
                  if (validationErrors.email) setValidationErrors({ ...validationErrors, email: '' })
                }}
                className={`w-full px-4 py-2 bg-card border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none transition-colors ${
                  validationErrors.email ? 'border-red-500 focus:border-red-500' : 'border-card focus:border-accent'
                }`}
                placeholder="your.email@example.com"
              />
              {validationErrors.email && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.email}</p>
              )}
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-primary mb-2">
                Message <span className="text-accent">*</span>
              </label>
              <textarea
                id="message"
                value={formState.message}
                onChange={(e) => {
                  setFormState({ ...formState, message: e.target.value })
                  if (validationErrors.message) setValidationErrors({ ...validationErrors, message: '' })
                }}
                rows={6}
                className={`w-full px-4 py-2 bg-card border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none transition-colors resize-none ${
                  validationErrors.message ? 'border-red-500 focus:border-red-500' : 'border-card focus:border-accent'
                }`}
                placeholder="Tell me about your project or inquiry..."
              />
              {validationErrors.message && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.message}</p>
              )}
              <p className="text-xs text-muted-foreground mt-1">
                Minimum 10 characters required
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={formState.loading}
              className="w-full px-6 py-3 bg-accent text-accent-foreground font-semibold rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
            >
              {formState.loading ? 'Sending...' : formState.submitted ? 'Message sent!' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
