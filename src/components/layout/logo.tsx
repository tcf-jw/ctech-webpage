import { cn } from '@/lib/utils'

/** Contour-ring mark + wordmark. Inherits text color via currentColor. */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <svg
        viewBox="0 0 32 32"
        className="size-7 shrink-0 text-primary"
        aria-hidden
      >
        <g fill="none" stroke="currentColor" strokeLinecap="round">
          <circle cx="16" cy="16" r="2.5" fill="currentColor" stroke="none" />
          <path d="M23 16a7 7 0 1 0-7 7" strokeWidth="2" />
          <path d="M16 4a12 12 0 1 1-8.5 3.5" strokeWidth="2" />
        </g>
      </svg>
      <span className="font-heading text-lg font-semibold tracking-tight">
        cellutech
      </span>
    </span>
  )
}
