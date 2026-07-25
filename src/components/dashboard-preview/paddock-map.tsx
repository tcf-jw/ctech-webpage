import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Panel } from '@/components/dashboard-preview/panel'
import { GisOverlay } from '@/components/dashboard-preview/gis-overlay'
import { LayerToggle } from '@/components/dashboard-preview/layer-toggle'
import { PaddockPolygons } from '@/components/dashboard-preview/paddock-polygons'
import { AnimatedNumber } from '@/components/shared/animated-number'
import { Sparkline } from '@/components/shared/sparkline'
import { TrendDelta } from '@/components/shared/trend-delta'
import { ResponsiveImage } from '@/components/shared/responsive-image'
import { heroFarmlandClean, satelliteBaseClean } from '@/components/home/images'
import {
  baseViews,
  paddock,
  type GisLayerKey,
} from '@/components/dashboard-preview/data'
import { cn } from '@/lib/utils'

const BASES = [
  { key: 'drone', label: 'Drone' },
  { key: 'satellite', label: 'Satellite' },
] as const

type BaseKey = (typeof BASES)[number]['key']

// The oblique drone photo can't carry traced boundaries credibly, so the
// interactive paddocks layer is satellite-only.
const LAYERS_BY_BASE: Record<BaseKey, readonly GisLayerKey[]> = {
  drone: ['grid', 'health', 'contours', 'sites'],
  satellite: ['paddocks', 'grid', 'health', 'contours', 'sites'],
}

export function PaddockMap({ className }: { className?: string }) {
  const reduced = useReducedMotion()
  const [base, setBase] = useState<BaseKey>('drone')
  const [layers, setLayers] = useState<Set<GisLayerKey>>(
    () => new Set<GisLayerKey>(['paddocks', 'grid', 'health', 'sites']),
  )

  function toggleLayer(key: GisLayerKey) {
    setLayers((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  return (
    <Panel
      title="Paddock Overview"
      className={className}
      action={
        <div className="flex items-center gap-2">
          <span className="flex items-baseline gap-1 font-heading text-xl font-medium tracking-tight">
            <AnimatedNumber value={paddock.healthScore} />
            <span className="text-xs font-normal text-muted-foreground">
              /100
            </span>
          </span>
          <TrendDelta value={paddock.healthDelta} />
        </div>
      }
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-md">
        <ResponsiveImage
          image={heroFarmlandClean}
          sizes="(min-width: 1024px) 620px, 100vw"
          className="h-full w-full"
        />
        {/* Satellite base crossfades over the drone imagery */}
        <motion.div
          className="absolute inset-0"
          initial={false}
          animate={{ opacity: base === 'satellite' ? 1 : 0 }}
          transition={{ duration: reduced ? 0 : 0.5, ease: 'easeOut' }}
          style={{ pointerEvents: 'none' }}
        >
          <ResponsiveImage
            image={satelliteBaseClean}
            sizes="(min-width: 1024px) 620px, 100vw"
            className="h-full w-full"
          />
        </motion.div>

        <GisOverlay
          layers={layers}
          quad={baseViews[base].quad}
          contours={baseViews[base].contours}
        />

        {base === 'satellite' && layers.has('paddocks') && <PaddockPolygons />}

        {/* Base imagery switch, floated like a real map control */}
        <div
          role="group"
          aria-label="Base imagery"
          className="absolute top-2 right-2 flex gap-1 rounded-md bg-background/70 p-1 backdrop-blur-sm"
        >
          {BASES.map((option) => (
            <Button
              key={option.key}
              size="xs"
              variant="ghost"
              aria-pressed={base === option.key}
              onClick={() => setBase(option.key)}
              className={cn(
                'h-6 px-2 font-mono text-[11px]',
                base === option.key
                  ? 'bg-primary/20 text-primary hover:bg-primary/25 hover:text-primary'
                  : 'text-muted-foreground',
              )}
            >
              {option.label}
            </Button>
          ))}
        </div>

        {layers.has('sites') && (
          <TooltipProvider>
            {baseViews[base].sites.map((site) => (
              <Tooltip key={site.id}>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    aria-label={`Sample site ${site.id}: ${site.reading}`}
                    className="absolute size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary ring-2 ring-background transition-transform hover:scale-125 focus-visible:ring-[3px] focus-visible:ring-ring/60 focus-visible:outline-none"
                    style={{ left: `${site.x}%`, top: `${site.y}%` }}
                  />
                </TooltipTrigger>
                <TooltipContent className="font-mono text-xs">
                  {site.id} · {site.reading}
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        )}
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <LayerToggle
          active={layers}
          onToggle={toggleLayer}
          available={LAYERS_BY_BASE[base]}
        />
        <Sparkline
          series={paddock.healthSeries}
          width={120}
          height={28}
          ariaLabel="Paddock health index trend, last 12 weeks"
          className="max-sm:hidden"
        />
      </div>
    </Panel>
  )
}
