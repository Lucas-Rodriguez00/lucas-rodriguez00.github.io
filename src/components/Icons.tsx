type IconProps = {
  size?: number
  strokeWidth?: number
}

export function ArrowUpRight({ size = 18, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M5 19 19 5M8 5h11v11" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function Github({ size = 18, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M9 19c-4 1.3-4-2-5.6-2.6M14.6 21v-3.3c0-1 .1-1.4-.5-2 2.1-.2 4.3-1 4.3-4.8 0-1-.3-1.8-.8-2.4.1-.2.4-1.2-.1-2.4 0 0-.7-.2-2.5.9a8.6 8.6 0 0 0-4.5 0c-1.8-1.1-2.5-.9-2.5-.9-.5 1.2-.2 2.2-.1 2.4-.5.6-.8 1.4-.8 2.4 0 3.8 2.2 4.6 4.3 4.8-.3.3-.5.8-.5 1.6V21" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.8 21H6.5" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  )
}

export function Linkedin({ size = 18, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M7 9v8M7 6.5v.1M11 17v-4.2a3 3 0 0 1 6 0V17M11 9v8" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" stroke="currentColor" strokeWidth={strokeWidth} />
    </svg>
  )
}

export function Mail({ size = 18, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="3.5" y="5" width="17" height="14" rx="2" stroke="currentColor" strokeWidth={strokeWidth} />
      <path d="m4.5 7 7.5 5.5L19.5 7" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function Menu({ size = 22, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  )
}

export function Close({ size = 22, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  )
}
