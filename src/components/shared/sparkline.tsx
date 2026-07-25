import { useMemo } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { LinePath } from '@visx/shape'
import { curveMonotoneX } from '@visx/curve'
import { scaleLinear, scalePoint } from '@visx/scale'

type SparklineProps = {
  series: number[]
  width?: number
  height?: number
  delay?: number
  ariaLabel: string
  className?: string
}

export function Sparkline({
  series,
  width = 260,
  height = 36,
  delay = 0.2,
  ariaLabel,
  className,
}: SparklineProps) {
  const reduced = useReducedMotion()
  const { xScale, yScale } = useMemo(() => {
    const min = Math.min(...series)
    const max = Math.max(...series)
    return {
      xScale: scalePoint<number>({
        domain: series.map((_, i) => i),
        range: [2, width - 2],
      }),
      yScale: scaleLinear<number>({
        domain: [min - 2, max + 2],
        range: [height - 2, 2],
      }),
    }
  }, [series, width, height])

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      role="img"
      aria-label={ariaLabel}
    >
      <LinePath<number>
        data={series}
        x={(_, i) => xScale(i) ?? 0}
        y={(d) => yScale(d)}
        curve={curveMonotoneX}
      >
        {({ path }) => (
          // Draws on mount rather than in-view: IntersectionObserver on
          // SVG elements never fires on iOS WebKit.
          <motion.path
            d={path(series) || ''}
            fill="none"
            stroke="var(--chart-1)"
            strokeWidth={1.5}
            strokeLinecap="round"
            initial={{ pathLength: reduced ? 1 : 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.9, ease: 'easeOut', delay }}
          />
        )}
      </LinePath>
    </svg>
  )
}
