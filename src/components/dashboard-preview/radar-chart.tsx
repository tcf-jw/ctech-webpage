import { motion, useReducedMotion } from 'motion/react'
import { radarAxes, radarSeries } from '@/components/dashboard-preview/data'

const SIZE = 260
const CENTER = SIZE / 2
const RADIUS = 88
const RINGS = [1 / 3, 2 / 3, 1]

function pointFor(axisIndex: number, value: number): [number, number] {
  const angle = (Math.PI * 2 * axisIndex) / radarAxes.length - Math.PI / 2
  return [
    CENTER + Math.cos(angle) * RADIUS * value,
    CENTER + Math.sin(angle) * RADIUS * value,
  ]
}

function polygonPoints(values: number[]) {
  return values
    .map((v, i) =>
      pointFor(i, v)
        .map((n) => n.toFixed(1))
        .join(','),
    )
    .join(' ')
}

export function RadarChart() {
  const reduced = useReducedMotion()
  const [paddockSeries, districtSeries] = radarSeries

  const description = radarAxes
    .map(
      (axis, i) =>
        `${axis}: paddock ${Math.round(paddockSeries.values[i] * 100)}, district ${Math.round(districtSeries.values[i] * 100)}`,
    )
    .join('; ')

  return (
    <figure className="m-0">
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="mx-auto w-full max-w-[260px]"
        role="img"
        aria-label={`Nutrient profile out of 100, this paddock versus district median. ${description}`}
      >
        {/* Rings + spokes */}
        <g fill="none" stroke="var(--border)" strokeWidth={1}>
          {RINGS.map((ring) => (
            <polygon
              key={ring}
              points={polygonPoints(radarAxes.map(() => ring))}
            />
          ))}
          {radarAxes.map((axis, i) => {
            const [x, y] = pointFor(i, 1)
            return <line key={axis} x1={CENTER} y1={CENTER} x2={x} y2={y} />
          })}
        </g>

        {/* Axis labels */}
        {radarAxes.map((axis, i) => {
          const [x, y] = pointFor(i, 1.22)
          return (
            <text
              key={axis}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={10}
              className="font-mono"
              fill="var(--muted-foreground)"
            >
              {axis}
            </text>
          )
        })}

        <motion.g
          initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
        >
          {/* District median (comparison) */}
          <polygon
            points={polygonPoints(districtSeries.values)}
            fill="none"
            stroke="var(--muted-foreground)"
            strokeWidth={1.25}
            strokeDasharray="4 3"
          />
          {/* This paddock */}
          <polygon
            points={polygonPoints(paddockSeries.values)}
            fill="var(--chart-1)"
            fillOpacity={0.2}
            stroke="var(--chart-1)"
            strokeWidth={1.5}
          />
        </motion.g>
      </svg>

      <figcaption className="mt-2 flex justify-center gap-5 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <span
            className="inline-block h-0.5 w-4 rounded-full"
            style={{ background: 'var(--chart-1)' }}
            aria-hidden
          />
          {paddockSeries.label}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <svg width="16" height="2" aria-hidden>
            <line
              x1="0"
              y1="1"
              x2="16"
              y2="1"
              stroke="var(--muted-foreground)"
              strokeWidth="2"
              strokeDasharray="3 2"
            />
          </svg>
          {districtSeries.label}
        </span>
      </figcaption>
    </figure>
  )
}
