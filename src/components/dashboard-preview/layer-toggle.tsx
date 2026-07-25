import { Button } from '@/components/ui/button'
import {
  gisLayers,
  type GisLayerKey,
} from '@/components/dashboard-preview/data'
import { cn } from '@/lib/utils'

type LayerToggleProps = {
  active: Set<GisLayerKey>
  onToggle: (key: GisLayerKey) => void
  available?: readonly GisLayerKey[]
}

export function LayerToggle({ active, onToggle, available }: LayerToggleProps) {
  const layers = available
    ? gisLayers.filter((layer) => available.includes(layer.key))
    : gisLayers

  return (
    <div
      className="flex flex-wrap gap-1.5"
      role="group"
      aria-label="Map layers"
    >
      {layers.map((layer) => {
        const isActive = active.has(layer.key)
        return (
          <Button
            key={layer.key}
            size="xs"
            variant="outline"
            aria-pressed={isActive}
            onClick={() => onToggle(layer.key)}
            className={cn(
              'font-mono text-[11px]',
              isActive &&
                'border-primary/40 bg-primary/15 text-primary hover:bg-primary/20 hover:text-primary',
            )}
          >
            {layer.label}
          </Button>
        )
      })}
    </div>
  )
}
