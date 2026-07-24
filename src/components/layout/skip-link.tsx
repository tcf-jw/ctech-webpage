export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only z-[100] rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4"
    >
      Skip to content
    </a>
  )
}
