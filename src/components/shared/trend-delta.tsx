import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type TrendDeltaProps = {
  value: string
  direction?: 'up' | 'down'
  className?: string
}

export function TrendDelta({ value, direction = 'up', className }: TrendDeltaProps) {
  const Icon = direction === 'up' ? ArrowUpRight : ArrowDownRight

  return (
    <span
      className={cn(
        'inline-flex items-center gap-0.5 font-mono text-xs',
        direction === 'up' ? 'text-success' : 'text-destructive',
        className,
      )}
    >
      <Icon className="size-3" aria-hidden />
      {value}
    </span>
  )
}
