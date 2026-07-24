import { Panel } from '@/components/dashboard-preview/panel'
import { RadarChart } from '@/components/dashboard-preview/radar-chart'
import { AnimatedNumber } from '@/components/shared/animated-number'
import { TrendDelta } from '@/components/shared/trend-delta'
import { soilDrivers } from '@/components/dashboard-preview/data'

export function SoilAnalysis({ className }: { className?: string }) {
  return (
    <Panel title="Soil Analysis" className={className}>
      <RadarChart />
      <dl className="mt-4 space-y-2.5 border-t pt-4">
        {soilDrivers.map((driver) => (
          <div
            key={driver.label}
            className="flex items-center justify-between gap-3"
          >
            <dt className="text-sm text-muted-foreground">{driver.label}</dt>
            <dd className="flex items-center gap-2">
              <span className="font-mono text-sm tabular-nums">
                {driver.text ?? (
                  <AnimatedNumber
                    value={driver.value ?? 0}
                    format={{
                      minimumFractionDigits: driver.decimals ?? 0,
                      maximumFractionDigits: driver.decimals ?? 0,
                    }}
                    suffix={driver.suffix}
                  />
                )}
              </span>
              <TrendDelta value={driver.delta} />
            </dd>
          </div>
        ))}
      </dl>
    </Panel>
  )
}
