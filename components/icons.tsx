/**
 * Icons drawn on Carbon's 32x32 art grid where practical, so strokes and
 * terminals line up with @carbon/icons. Brand marks keep their own viewBox.
 */
interface IconProps {
  className?: string
}

export function GitHubIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  )
}

export function LinkedInIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  )
}

export function TwitterIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

export function MailIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
      <path d="M28 6H4a2 2 0 00-2 2v16a2 2 0 002 2h24a2 2 0 002-2V8a2 2 0 00-2-2zm-2.2 2L16 14.78 6.2 8zM4 24V8.91l11.43 7.91a1 1 0 001.14 0L28 8.91V24z" />
    </svg>
  )
}

export function ExternalLinkIcon({ className = 'w-4 h-4' }: IconProps) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
      <path d="M26 28H6a2 2 0 01-2-2V6a2 2 0 012-2h10v2H6v20h20V16h2v10a2 2 0 01-2 2z" />
      <path d="M21 2v2h5.59L18 12.59 19.41 14 28 5.41V11h2V2h-9z" />
    </svg>
  )
}

/** Carbon's `arrow--right`, the standard trailing glyph on a primary button. */
export function ArrowRightIcon({ className = 'w-4 h-4' }: IconProps) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
      <path d="M18 6l-1.43 1.393L24.15 15H4v2h20.15l-7.58 7.573L18 26l10-10L18 6z" />
    </svg>
  )
}

export function ArrowUpRightIcon({ className = 'w-4 h-4' }: IconProps) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
      <path d="M10 6v2h12.59L6 24.59 7.41 26 24 9.41V22h2V6H10z" />
    </svg>
  )
}

export function ArrowDownIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
      <path d="M24.59 16.59L17 24.17V4h-2v20.17l-7.59-7.58L6 18l10 10 10-10-1.41-1.41z" />
    </svg>
  )
}

export function ChevronDownIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
      <path d="M16 22L6 12l1.4-1.4 8.6 8.6 8.6-8.6L26 12 16 22z" />
    </svg>
  )
}

export function MenuIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
      <path d="M4 6h24v2H4zm0 9h24v2H4zm0 9h24v2H4z" />
    </svg>
  )
}

export function CloseIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
      <path d="M24 9.4L22.6 8 16 14.6 9.4 8 8 9.4l6.6 6.6L8 22.6 9.4 24l6.6-6.6 6.6 6.6 1.4-1.4-6.6-6.6L24 9.4z" />
    </svg>
  )
}

/** Carbon `light` — the White theme switch. */
export function SunIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
      <path d="M16 12.005a4 4 0 11-4 4 4.005 4.005 0 014-4m0-2a6 6 0 106 6 6 6 0 00-6-6zM5.394 6.813L6.81 5.399l3.505 3.506L8.9 10.319zM2 15.005h5v2H2zm3.394 10.193L8.899 21.69l1.416 1.415-3.506 3.506zM15 25.005h2v5h-2zm6.687-1.9l1.414-1.415 3.506 3.506-1.414 1.414zM25 15.005h5v2h-5zm-3.313-6.101l3.506-3.506 1.414 1.414-3.506 3.506z" />
    </svg>
  )
}

/** Carbon `asleep` — the Gray 100 theme switch. */
export function MoonIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
      <path d="M13.503 5.414a15.076 15.076 0 0011.593 18.194 11.113 11.113 0 01-7.975 3.39c-.138 0-.278.005-.418 0a11.094 11.094 0 01-3.2-21.584M14.98 3a1.002 1.002 0 00-.175.016 13.096 13.096 0 001.825 25.981c.164.006.328 0 .49 0a13.072 13.072 0 0010.703-5.555 1.01 1.01 0 00-.783-1.565A13.08 13.08 0 0115.89 4.38 1.007 1.007 0 0014.98 3z" />
    </svg>
  )
}

export function DownloadIcon({ className = 'w-4 h-4' }: IconProps) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
      <path d="M26 24v4H6v-4H4v4a2 2 0 002 2h20a2 2 0 002-2v-4zM26 14l-1.41-1.41L17 20.17V2h-2v18.17l-7.59-7.58L6 14l10 10 10-10z" />
    </svg>
  )
}

export function CheckmarkIcon({ className = 'w-5 h-5' }: IconProps) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
      <path d="M13 24l-9-9 1.41-1.41L13 21.17 26.59 7.59 28 9 13 24z" />
    </svg>
  )
}

/** Carbon `error--filled`, used by inline notifications. */
export function ErrorFilledIcon({ className = 'w-4 h-4' }: IconProps) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
      <path d="M16 2a14 14 0 1014 14A14 14 0 0016 2zm-1.125 6h2.25v11h-2.25zm1.125 17a1.5 1.5 0 111.5-1.5 1.5 1.5 0 01-1.5 1.5z" />
    </svg>
  )
}

export function SendIcon({ className = 'w-4 h-4' }: IconProps) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
      <path d="M27.71 4.29a1 1 0 00-1.05-.23l-22 8a1 1 0 000 1.87l9.6 3.84 3.84 9.6a1 1 0 00.92.63h.06a1 1 0 00.9-.7l8-22a1 1 0 00-.27-1.01zM26 7.35L15.32 16.1l-6.2-2.48zm-7.13 18.53l-2.48-6.2L25.14 9z" />
    </svg>
  )
}

export function LocationIcon({ className = 'w-4 h-4' }: IconProps) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
      <path d="M16 18a5 5 0 115-5 5.006 5.006 0 01-5 5zm0-8a3 3 0 103 3 3.003 3.003 0 00-3-3z" />
      <path d="M16 30l-8.436-9.949a35.076 35.076 0 01-.348-.451A10.889 10.889 0 015 13a11 11 0 0122 0 10.884 10.884 0 01-2.215 6.597l-.001.003s-.3.394-.345.447zm-7.201-11.606c.002 0 .232.308.285.374L16 26.891l6.925-8.167c.043-.056.273-.365.274-.366A8.9 8.9 0 0025 13a9 9 0 10-18 0 8.905 8.905 0 001.799 5.394z" />
    </svg>
  )
}
