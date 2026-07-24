import { cn } from '@/lib/utils'
import { FadeIn } from '@/components/shared/fade-in'
import type { ReactNode } from 'react'

type SectionProps = {
  id: string
  eyebrow?: string
  title?: string
  description?: string
  children: ReactNode
  className?: string
  containerClassName?: string
}

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
  containerClassName,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={title ? `${id}-title` : undefined}
      className={cn('scroll-mt-24 py-24 md:py-32', className)}
    >
      <div className={cn('mx-auto max-w-6xl px-6', containerClassName)}>
        {(eyebrow || title) && (
          <FadeIn className="mb-14 max-w-2xl md:mb-20">
            {eyebrow && (
              <p className="mb-4 font-mono text-xs font-medium tracking-[0.2em] text-primary uppercase">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2
                id={`${id}-title`}
                className="text-4xl font-medium tracking-tight text-balance md:text-5xl"
              >
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                {description}
              </p>
            )}
          </FadeIn>
        )}
        {children}
      </div>
    </section>
  )
}
