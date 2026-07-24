import { useMemo } from 'react'
import { ArrowRight } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { LinePath } from '@visx/shape'
import { curveMonotoneX } from '@visx/curve'
import { scaleLinear, scalePoint } from '@visx/scale'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { AnimatedNumber } from '@/components/shared/animated-number'
import { TrendDelta } from '@/components/shared/trend-delta'
import { paddockHealth } from '@/components/home/data'

const SPARK_WIDTH = 260
const SPARK_HEIGHT = 36

function Sparkline({ series }: { series: number[] }) {
  const reduced = useReducedMotion()
  const { xScale, yScale } = useMemo(() => {
    const min = Math.min(...series)
    const max = Math.max(...series)
    return {
      xScale: scalePoint<number>({
        domain: series.map((_, i) => i),
        range: [2, SPARK_WIDTH - 2],
      }),
      yScale: scaleLinear<number>({
        domain: [min - 2, max + 2],
        range: [SPARK_HEIGHT - 2, 2],
      }),
    }
  }, [series])

  return (
    <svg
      width={SPARK_WIDTH}
      height={SPARK_HEIGHT}
      viewBox={`0 0 ${SPARK_WIDTH} ${SPARK_HEIGHT}`}
      className="w-full"
      role="img"
      aria-label={`Paddock health trend over 12 weeks, rising from ${paddockHealth.series[0]} to ${paddockHealth.score}`}
    >
      <LinePath<number>
        data={series}
        x={(_, i) => xScale(i) ?? 0}
        y={(d) => yScale(d)}
        curve={curveMonotoneX}
      >
        {({ path }) => (
          <motion.path
            d={path(series) || ''}
            fill="none"
            stroke="var(--chart-1)"
            strokeWidth={1.5}
            strokeLinecap="round"
            initial={{ pathLength: reduced ? 1 : 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.9, ease: 'easeOut', delay: 0.9 }}
          />
        )}
      </LinePath>
    </svg>
  )
}

export function PaddockHealthCard({ className }: { className?: string }) {
  const reduced = useReducedMotion()

  return (
    <motion.div
      initial={
        reduced ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.97 }
      }
      animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.7, ease: 'easeOut' }}
      className={className}
    >
      <motion.div
        animate={reduced ? undefined : { y: [0, -6, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="w-80 rounded-xl bg-card/80 p-5 ring-1 ring-foreground/15 backdrop-blur-md shadow-[0_24px_80px_-24px_rgb(0_0_0/0.55)]"
      >
        <div className="flex items-center justify-between">
          <p className="font-mono text-[11px] font-medium tracking-[0.15em] text-muted-foreground uppercase">
            {paddockHealth.label}
          </p>
          <TrendDelta value={paddockHealth.delta} />
        </div>

        <p className="mt-2 flex items-baseline gap-1">
          <AnimatedNumber
            value={paddockHealth.score}
            className="font-heading text-5xl font-medium tracking-tight"
          />
          <span className="text-sm text-muted-foreground">/100</span>
        </p>

        <div className="mt-3">
          <Sparkline series={paddockHealth.series} />
        </div>

        <Separator className="my-4" />

        <dl className="space-y-3">
          {paddockHealth.metrics.map((metric) => (
            <div
              key={metric.label}
              className="flex items-center justify-between gap-3"
            >
              <dt className="text-sm text-muted-foreground">{metric.label}</dt>
              <dd className="flex items-center gap-2">
                <span className="font-mono text-sm tabular-nums">
                  {metric.text ?? (
                    <AnimatedNumber
                      value={metric.value ?? 0}
                      format={{
                        minimumFractionDigits: metric.decimals ?? 0,
                        maximumFractionDigits: metric.decimals ?? 0,
                      }}
                      suffix={metric.suffix}
                    />
                  )}
                </span>
                <TrendDelta value={metric.delta} />
              </dd>
            </div>
          ))}
        </dl>

        <Button
          asChild
          variant="ghost"
          size="sm"
          className="mt-4 -ml-2 text-primary hover:text-primary"
        >
          <a href="#dashboard">
            View Full Report
            <ArrowRight aria-hidden />
          </a>
        </Button>
      </motion.div>
    </motion.div>
  )
}
