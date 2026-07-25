import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import {
  paddockPolygons,
  type PaddockPolygon,
} from '@/components/dashboard-preview/data'
import { cn } from '@/lib/utils'

/**
 * Interactive paddock boundaries traced on the clean satellite base.
 * Hover or keyboard-focus a paddock to highlight it and read its live
 * stats — SVG polygons carry tabindex so the layer is keyboard operable.
 */
export function PaddockPolygons() {
  const [active, setActive] = useState<PaddockPolygon | null>(null)

  return (
    <>
      <svg
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        aria-label="Paddock boundaries"
        role="group"
      >
        {paddockPolygons.map((paddock) => {
          const isActive = active?.id === paddock.id
          return (
            <motion.polygon
              key={paddock.id}
              points={paddock.points}
              role="button"
              tabIndex={0}
              aria-label={`${paddock.name}: health ${paddock.health} of 100, organic carbon ${paddock.organicCarbon}%`}
              className="cursor-pointer outline-none"
              fill="var(--primary)"
              stroke="var(--accent-cyan)"
              initial={false}
              animate={{
                fillOpacity: isActive ? 0.18 : 0.02,
                strokeOpacity: isActive ? 0.95 : 0.55,
                strokeWidth: isActive ? 1.75 : 1,
              }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onPointerEnter={() => setActive(paddock)}
              onPointerLeave={() => setActive(null)}
              onFocus={() => setActive(paddock)}
              onBlur={() => setActive(null)}
            />
          )
        })}
      </svg>

      <AnimatePresence>
        {active && (
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={cn(
              'pointer-events-none absolute z-10 w-44 -translate-x-1/2 rounded-md bg-popover/95 p-3 text-popover-foreground ring-1 ring-border backdrop-blur-sm',
              active.anchor[1] > 55 ? '-translate-y-full' : '',
            )}
            style={{
              left: `${active.anchor[0]}%`,
              top: `${active.anchor[1] > 55 ? active.anchor[1] - 4 : active.anchor[1] + 4}%`,
            }}
          >
            <p className="font-mono text-[10px] tracking-wide text-muted-foreground uppercase">
              {active.id}
            </p>
            <p className="mt-0.5 text-sm font-medium">{active.name}</p>
            <dl className="mt-1.5 space-y-0.5 font-mono text-[11px]">
              <div className="flex justify-between gap-3">
                <dt className="text-muted-foreground">Health</dt>
                <dd className="tabular-nums">{active.health}/100</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted-foreground">Organic C</dt>
                <dd className="tabular-nums">{active.organicCarbon}%</dd>
              </div>
            </dl>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
