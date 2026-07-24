import { Logo } from '@/components/layout/logo'

const footerColumns = [
  {
    heading: 'Platform',
    links: [
      { label: 'Platform Overview', href: '#platform' },
      { label: 'Dashboard', href: '#dashboard' },
      { label: 'Features', href: '#features' },
      { label: 'How It Works', href: '#how-it-works' },
    ],
  },
  {
    heading: 'Industries',
    links: [
      { label: 'Agriculture', href: '#industries' },
      { label: 'Mining Rehabilitation', href: '#industries' },
      { label: 'Environmental Restoration', href: '#industries' },
      { label: 'Government & Research', href: '#industries' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'Case Studies', href: '#case-studies' },
      { label: 'FAQ', href: '#faq' },
      { label: 'Request a Demo', href: '#demo' },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t">
      {/* Topographic contour texture */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-5"
        aria-hidden
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 800 400"
      >
        <g fill="none" stroke="var(--foreground)" strokeWidth="1">
          <path d="M-50 320 Q 150 240 320 300 T 700 260 T 900 320" />
          <path d="M-50 260 Q 180 190 360 240 T 720 200 T 900 260" />
          <path d="M-50 200 Q 200 140 400 180 T 740 150 T 900 200" />
          <path d="M-50 140 Q 220 90 430 130 T 760 100 T 900 140" />
          <path d="M-50 80 Q 240 40 460 70 T 780 50 T 900 80" />
        </g>
      </svg>

      <div className="relative mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              AI-powered soil intelligence for Australian landscapes —
              chemistry, microbiology and spatial analytics in one platform.
            </p>
          </div>
          {footerColumns.map((column) => (
            <nav key={column.heading} aria-label={column.heading}>
              <h3 className="mb-4 font-mono text-xs font-medium tracking-[0.15em] text-muted-foreground uppercase">
                {column.heading}
              </h3>
              <ul className="space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Cellutech. All rights reserved.</p>
          <p className="font-mono">
            Intelligence beneath every hectare · Made in Australia
          </p>
        </div>
      </div>
    </footer>
  )
}
