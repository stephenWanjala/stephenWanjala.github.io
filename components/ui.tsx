/** Shared primitives. Square corners, hard rules, one accent colour. */
import Link from 'next/link'
import type { ComponentProps, ReactNode } from 'react'

type ButtonKind = 'primary' | 'secondary'

const buttonKind: Record<ButtonKind, string> = {
  primary: 'bg-btn text-fg-on-color hover:bg-btn-hover',
  secondary: 'border-2 border-line-strong text-fg hover:bg-fg hover:text-fg-inverse',
}

const buttonBase =
  'inline-flex items-center justify-between gap-6 h-12 px-5 text-body-compact-01 font-semibold ' +
  'transition-colors duration-[110ms] ease-productive focus-ring ' +
  'disabled:cursor-not-allowed disabled:bg-layer-accent disabled:text-fg-placeholder'

interface ButtonProps {
  icon?: ReactNode
  kind?: ButtonKind
}

export function ButtonLink({
  children,
  icon,
  kind = 'primary',
  className = '',
  ...props
}: ButtonProps & ComponentProps<typeof Link>) {
  return (
    <Link className={`${buttonBase} ${buttonKind[kind]} ${className}`} {...props}>
      {children}
      {icon}
    </Link>
  )
}

export function ExternalButton({
  children,
  icon,
  kind = 'primary',
  className = '',
  ...props
}: ButtonProps & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={`${buttonBase} ${buttonKind[kind]} ${className}`} {...props}>
      {children}
      {icon}
    </a>
  )
}

export function Button({
  children,
  icon,
  kind = 'primary',
  className = '',
  ...props
}: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`${buttonBase} ${buttonKind[kind]} ${className}`} {...props}>
      {children}
      {icon}
    </button>
  )
}

export function IconLink({
  children,
  className = '',
  ...props
}: { children: ReactNode; className?: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      className={`inline-flex items-center justify-center w-10 h-10 text-fg hover:bg-fg hover:text-fg-inverse transition-colors duration-[110ms] focus-ring ${className}`}
      {...props}
    >
      {children}
    </a>
  )
}

export function Container({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={`mx-auto w-full max-w-[90rem] px-5 md:px-10 ${className}`}>{children}</div>
}

/** Page title: one big word, a short plain sentence, a heavy rule underneath. */
export function PageHeader({ title, lede }: { title: string; lede?: string }) {
  return (
    <div className="border-b-2 border-line-strong">
      <Container className="pt-14 pb-10 md:pt-24 md:pb-14">
        <h1 className="text-fluid-display-02 text-fg">
          {title}
          <span className="text-blue-60">.</span>
        </h1>
        {lede && (
          <p className="mt-6 text-heading-03 text-fg-secondary max-w-2xl text-pretty">{lede}</p>
        )}
      </Container>
    </div>
  )
}
