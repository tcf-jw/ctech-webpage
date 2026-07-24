import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

type PanelProps = {
  title: string
  action?: ReactNode
  children: ReactNode
  className?: string
}

export function Panel({ title, action, children, className }: PanelProps) {
  return (
    <div
      className={cn(
        'rounded-lg bg-card p-4 ring-1 ring-border transition-shadow duration-300 hover:ring-primary/25',
        className,
      )}
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <h4 className="font-mono text-[11px] font-medium tracking-[0.15em] text-muted-foreground uppercase">
          {title}
        </h4>
        {action}
      </div>
      {children}
    </div>
  )
}
