import { motion, useReducedMotion } from 'motion/react'
import { Badge } from '@/components/ui/badge'
import { Panel } from '@/components/dashboard-preview/panel'
import { recommendations } from '@/components/dashboard-preview/data'
import { cn } from '@/lib/utils'

const impactStyles = {
  High: 'bg-primary/15 text-primary',
  Medium: 'bg-warning/15 text-warning',
  Low: 'bg-muted text-muted-foreground',
} as const

export function Recommendations({ className }: { className?: string }) {
  const reduced = useReducedMotion()

  return (
    <Panel title="Recommendations" className={className}>
      <motion.ul
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        transition={{ staggerChildren: 0.1 }}
        className="space-y-2"
      >
        {recommendations.map((rec) => (
          <motion.li
            key={rec.title}
            variants={{
              hidden: { opacity: 0, x: reduced ? 0 : 12 },
              visible: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.5, ease: 'easeOut' },
              },
            }}
            className="group/rec rounded-md bg-background/60 p-3 ring-1 ring-border transition-all hover:-translate-y-px hover:ring-primary/30"
          >
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm font-medium">{rec.title}</p>
              <Badge
                variant="secondary"
                className={cn(
                  'shrink-0 font-mono text-[10px]',
                  impactStyles[rec.impact],
                )}
              >
                {rec.impact} impact
              </Badge>
            </div>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              {rec.detail}
            </p>
          </motion.li>
        ))}
      </motion.ul>
    </Panel>
  )
}
