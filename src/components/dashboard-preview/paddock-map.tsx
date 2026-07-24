import { useState } from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Panel } from '@/components/dashboard-preview/panel'
import { GisOverlay } from '@/components/dashboard-preview/gis-overlay'
import { LayerToggle } from '@/components/dashboard-preview/layer-toggle'
import { AnimatedNumber } from '@/components/shared/animated-number'
import { Sparkline } from '@/components/shared/sparkline'
import { TrendDelta } from '@/components/shared/trend-delta'
import { ResponsiveImage } from '@/components/shared/responsive-image'
import { dronePaddocks } from '@/components/home/images'
import {
  paddock,
  sampleSites,
  type GisLayerKey,
} from '@/components/dashboard-preview/data'

export function PaddockMap({ className }: { className?: string }) {
  const [layers, setLayers] = useState<Set<GisLayerKey>>(
    () => new Set<GisLayerKey>(['grid', 'health', 'sites']),
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
          image={dronePaddocks}
          sizes="(min-width: 1024px) 620px, 100vw"
          className="h-full w-full"
        />
        <GisOverlay layers={layers} />

        {layers.has('sites') && (
          <TooltipProvider>
            {sampleSites.map((site) => (
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
        <LayerToggle active={layers} onToggle={toggleLayer} />
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
