/**
 * Carbon component primitives.
 *
 * Sizing follows Carbon's field heights: `lg` = 48px (the default for
 * expressive layouts), `md` = 40px. Buttons put the label hard left and the
 * icon hard right, which is what makes a Carbon button read as one.
 */
import type { ReactNode } from 'react'

type ButtonKind = 'primary' | 'secondary' | 'tertiary' | 'ghost'

const buttonKind: Record<ButtonKind, string> = {
  primary:
    'bg-btn text-white hover:bg-btn-hover active:bg-btn-active focus-ring-filled',
  secondary:
    'bg-btn-secondary text-white hover:bg-btn-secondary-hover active:bg-btn-active focus-ring-filled',
  tertiary:
    'bg-transparent text-link border border-link hover:bg-link hover:text-white active:bg-btn-active active:border-btn-active focus-ring',
  ghost:
    'bg-transparent text-link hover:bg-layer-hover active:bg-layer-accent focus-ring',
}

const buttonBase =
  'group inline-flex items-center justify-between gap-8 text-body-compact-01 font-normal ' +
  'transition-colors duration-[110ms] ease-productive disabled:cursor-not-allowed ' +
  'disabled:bg-layer-accent disabled:text-fg-placeholder disabled:border-transparent'

interface CarbonButtonProps {
  children: ReactNode
  icon?: ReactNode
  kind?: ButtonKind
  className?: string
}

/** Anchor styled as a Carbon button. */
export function ButtonLink({
  children,
  icon,
  kind = 'primary',
  className = '',
  ...props
}: CarbonButtonProps & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      className={`${buttonBase} ${buttonKind[kind]} h-12 pl-4 pr-4 min-w-[11rem] ${className}`}
      {...props}
    >
      <span>{children}</span>
      {icon}
    </a>
  )
}

/** <button> styled as a Carbon button. */
export function Button({
  children,
  icon,
  kind = 'primary',
  className = '',
  ...props
}: CarbonButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`${buttonBase} ${buttonKind[kind]} h-12 pl-4 pr-4 min-w-[11rem] ${className}`}
      {...props}
    >
      <span>{children}</span>
      {icon}
    </button>
  )
}

/** Carbon icon-only link — 40px square, square corners, no label. */
export function IconLink({
  children,
  className = '',
  ...props
}: { children: ReactNode; className?: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      className={`inline-flex items-center justify-center w-10 h-10 text-fg-secondary hover:bg-layer-hover hover:text-fg transition-colors duration-[110ms] ease-productive focus-ring ${className}`}
      {...props}
    >
      {children}
    </a>
  )
}

/**
 * Carbon tag. Tags are the one component in the system that keeps a radius —
 * a full pill at 0.9375rem.
 */
export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center h-6 px-3 rounded-full bg-layer-accent text-fg text-label-01 whitespace-nowrap">
      {children}
    </span>
  )
}

/**
 * Section heading: a mono index, the blue rule, then a fluid expressive
 * heading — the Carbon editorial pattern.
 */
export function SectionHeading({
  index,
  title,
  lede,
}: {
  index: string
  title: string
  lede?: string
}) {
  return (
    <header className="mb-12 md:mb-16">
      <p className="font-mono text-label-01 text-link tracking-widest mb-4">{index}</p>
      <div className="w-12 h-[3px] bg-blue-60 mb-6" aria-hidden="true" />
      <h2 className="text-fluid-heading-05 text-fg max-w-2xl text-balance">
        {title}
      </h2>
      {lede && (
        <p className="mt-4 text-body-02 text-fg-secondary max-w-xl text-pretty">{lede}</p>
      )}
    </header>
  )
}
