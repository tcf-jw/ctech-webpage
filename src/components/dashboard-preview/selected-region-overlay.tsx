import { useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import type { GisLayerKey } from '@/components/dashboard-preview/data'
import {
  selectedOverlayRegions,
  toCropPercent,
  type OverlayBase,
} from '@/components/dashboard-preview/selected-overlay-data'

// Overlay marks are photo-anchored: they sit on photographic imagery that
// is identical in both site themes, so they deliberately use fixed colors
// (NDVI-style heat ramp, light survey strokes, brand-cyan boundary)
// rather than theme tokens.

type SelectedRegionOverlayProps = {
  base: OverlayBase
  layers: Set<GisLayerKey>
}

const fade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.28, ease: 'easeOut' as const },
}

function bbox(points: [number, number][]) {
  const xs = points.map((p) => p[0])
  const ys = points.map((p) => p[1])
  return {
    minX: Math.min(...xs),
    minY: Math.min(...ys),
    maxX: Math.max(...xs),
    maxY: Math.max(...ys),
  }
}

function polygonPoints(points: [number, number][]) {
  return points.map(([x, y]) => `${x},${y}`).join(' ')
}

function gridLines(
  points: [number, number][],
  cols = 8,
  rows = 6,
  tilt = 0.08,
) {
  const box = bbox(points)
  const width = box.maxX - box.minX
  const height = box.maxY - box.minY
  const lines: {
    x1: number
    y1: number
    x2: number
    y2: number
    major: boolean
  }[] = []

  for (let c = 0; c <= cols; c++) {
    const x = box.minX + (width * c) / cols
    const dx = (c / cols - 0.5) * tilt * width * 0.08
    lines.push({
      x1: x - dx,
      y1: box.minY - 15,
      x2: x + dx,
      y2: box.maxY + 15,
      major: c % 2 === 0,
    })
  }

  for (let r = 0; r <= rows; r++) {
    const y = box.minY + (height * r) / rows
    const dy = (r / rows - 0.5) * tilt * height * 0.05
    lines.push({
      x1: box.minX - 15,
      y1: y - dy,
      x2: box.maxX + 15,
      y2: y + dy,
      major: r % 2 === 0,
    })
  }

  return lines
}

function contourPaths(points: [number, number][], count = 10) {
  const box = bbox(points)
  const width = box.maxX - box.minX
  const height = box.maxY - box.minY

  return Array.from({ length: count }, (_, i) => {
    const y = box.minY + height * (0.07 + (0.86 * i) / (count - 1))
    const amp = height * (0.05 + (i % 3) * 0.012)
    const x0 = box.minX - 15
    const x1 = box.minX + width * 0.3
    const x2 = box.minX + width * 0.66
    const x3 = box.maxX + 15

    return {
      major: i % 3 === 0,
      d: `M ${x0} ${y} C ${x1} ${y - amp}, ${x2} ${y + amp * 0.8}, ${x3} ${y - amp * 0.18}`,
    }
  })
}

export function SelectedRegionOverlay({
  base,
  layers,
}: SelectedRegionOverlayProps) {
  const reduced = useReducedMotion()
  const [active, setActive] = useState(false)
  const region = selectedOverlayRegions[base]
  const clipId = `${region.id}-${base}-clip`
  const gradientId = `${region.id}-${base}-heat`
  const tilt = base === 'drone' ? 0.18 : 0.04

  const grid = useMemo(
    () => gridLines(region.points, 8, 6, tilt),
    [region, tilt],
  )
  const contours = useMemo(() => contourPaths(region.points, 10), [region])

  const anchor = useMemo(() => {
    const box = bbox(region.points)
    return toCropPercent((box.minX + box.maxX) / 2, box.minY)
  }, [region])

  const showBoundary = layers.has('paddocks')

  return (
    <>
      <svg
        viewBox={`0 0 ${region.width} ${region.height}`}
        className="pointer-events-none absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden={showBoundary ? undefined : true}
      >
        <defs>
          <clipPath id={clipId}>
            <polygon points={polygonPoints(region.points)} />
          </clipPath>
          <linearGradient id={gradientId} x1="25%" y1="15%" x2="75%" y2="85%">
            <stop offset="0%" stopColor="#2AA86B" stopOpacity="0.52" />
            <stop offset="38%" stopColor="#8DCE53" stopOpacity="0.52" />
            <stop offset="68%" stopColor="#D9CF4A" stopOpacity="0.52" />
            <stop offset="100%" stopColor="#EC8C20" stopOpacity="0.52" />
          </linearGradient>
        </defs>

        <AnimatePresence>
          {layers.has('health') && (
            <motion.g
              key={`health-${base}`}
              {...fade}
              clipPath={`url(#${clipId})`}
            >
              <polygon
                points={polygonPoints(region.points)}
                fill={`url(#${gradientId})`}
              />
            </motion.g>
          )}

          {layers.has('grid') && (
            <motion.g
              key={`grid-${base}`}
              {...fade}
              clipPath={`url(#${clipId})`}
            >
              {grid.map((line, index) => (
                <line
                  key={index}
                  x1={line.x1}
                  y1={line.y1}
                  x2={line.x2}
                  y2={line.y2}
                  stroke="#DDF5FF"
                  strokeOpacity={line.major ? 0.28 : 0.15}
                  strokeWidth={line.major ? 0.95 : 0.55}
                />
              ))}
            </motion.g>
          )}

          {layers.has('contours') && (
            <motion.g
              key={`contours-${base}`}
              {...fade}
              clipPath={`url(#${clipId})`}
            >
              {contours.map((path, index) => (
                <motion.path
                  key={index}
                  d={path.d}
                  fill="none"
                  stroke="#F6F8F9"
                  strokeOpacity={path.major ? 0.72 : 0.42}
                  strokeWidth={path.major ? 1.15 : 0.68}
                  strokeLinecap="round"
                  initial={{ pathLength: reduced ? 1 : 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{
                    pathLength: {
                      duration: reduced ? 0 : 0.78,
                      ease: 'easeOut',
                      delay: reduced ? 0 : index * 0.03,
                    },
                    opacity: { duration: reduced ? 0 : 0.2 },
                  }}
                />
              ))}
            </motion.g>
          )}

          {showBoundary && (
            <motion.polygon
              key={`boundary-${base}`}
              points={polygonPoints(region.points)}
              fill="rgba(28,241,200,0.05)"
              stroke="#56CFFF"
              strokeOpacity={active ? 1 : 0.85}
              strokeWidth={active ? 3 : 2.3}
              className="pointer-events-auto cursor-pointer outline-none"
              role="button"
              tabIndex={0}
              aria-label={`${region.name} (${region.code}): health ${region.health} of 100, organic carbon ${region.organicCarbon}%`}
              onPointerEnter={() => setActive(true)}
              onPointerLeave={() => setActive(false)}
              onFocus={() => setActive(true)}
              onBlur={() => setActive(false)}
              {...fade}
            />
          )}
        </AnimatePresence>
      </svg>

      <AnimatePresence>
        {showBoundary && active && (
          <motion.div
            key={`readout-${base}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="pointer-events-none absolute z-10 w-48 -translate-x-1/2 -translate-y-full rounded-md bg-popover/95 p-3 text-popover-foreground ring-1 ring-border backdrop-blur-sm"
            style={{
              left: `${Math.min(Math.max(anchor.x, 18), 82)}%`,
              top: `${Math.max(anchor.y - 3, 12)}%`,
            }}
          >
            <p className="font-mono text-[10px] tracking-wide text-muted-foreground uppercase">
              {region.code}
            </p>
            <p className="mt-0.5 text-sm font-medium">{region.name}</p>
            <dl className="mt-1.5 space-y-0.5 font-mono text-[11px]">
              <div className="flex justify-between gap-3">
                <dt className="text-muted-foreground">Health</dt>
                <dd className="tabular-nums">{region.health}/100</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted-foreground">Organic C</dt>
                <dd className="tabular-nums">{region.organicCarbon}%</dd>
              </div>
            </dl>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
