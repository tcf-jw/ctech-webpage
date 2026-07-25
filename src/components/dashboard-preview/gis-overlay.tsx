import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { heatMatrix } from '@/components/dashboard-preview/data'
import type { GisLayerKey, Quad } from '@/components/dashboard-preview/data'

const VIEW_W = 400
const VIEW_H = 300

const COLS = heatMatrix[0].length
const ROWS = heatMatrix.length

/** Bilinear interpolation inside a perspective quad. u,v in [0,1]. */
function lerpQuad(quad: Quad, u: number, v: number): [number, number] {
  const top = [
    quad.tl[0] + (quad.tr[0] - quad.tl[0]) * u,
    quad.tl[1] + (quad.tr[1] - quad.tl[1]) * u,
  ]
  const bottom = [
    quad.bl[0] + (quad.br[0] - quad.bl[0]) * u,
    quad.bl[1] + (quad.br[1] - quad.bl[1]) * u,
  ]
  return [top[0] + (bottom[0] - top[0]) * v, top[1] + (bottom[1] - top[1]) * v]
}

function cellPoints(quad: Quad, col: number, row: number) {
  const u0 = col / COLS
  const u1 = (col + 1) / COLS
  const v0 = row / ROWS
  const v1 = (row + 1) / ROWS
  return [
    lerpQuad(quad, u0, v0),
    lerpQuad(quad, u1, v0),
    lerpQuad(quad, u1, v1),
    lerpQuad(quad, u0, v1),
  ]
    .map((p) => p.map((n) => n.toFixed(1)).join(','))
    .join(' ')
}

function cellFill(intensity: number) {
  if (intensity >= 0.75) return 'var(--warning)'
  if (intensity >= 0.5) return 'var(--chart-4)'
  return 'var(--chart-1)'
}

const fade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.4, ease: 'easeOut' as const },
}

type GisOverlayProps = {
  layers: Set<GisLayerKey>
  quad: Quad
  contours: string[]
}

export function GisOverlay({ layers, quad, contours }: GisOverlayProps) {
  const reduced = useReducedMotion()

  const lattice: string[] = []
  for (let c = 0; c <= COLS; c++) {
    const from = lerpQuad(quad, c / COLS, 0)
    const to = lerpQuad(quad, c / COLS, 1)
    lattice.push(`M ${from[0]} ${from[1]} L ${to[0]} ${to[1]}`)
  }
  for (let r = 0; r <= ROWS; r++) {
    const from = lerpQuad(quad, 0, r / ROWS)
    const to = lerpQuad(quad, 1, r / ROWS)
    lattice.push(`M ${from[0]} ${from[1]} L ${to[0]} ${to[1]}`)
  }

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden
    >
      <AnimatePresence>
        {layers.has('health') && (
          <motion.g key={`health-${quad.tl[0]}`} {...fade}>
            {heatMatrix.map((row, r) =>
              row.map((intensity, c) => {
                const pulse = !reduced && intensity >= 0.75
                return (
                  <motion.polygon
                    key={`${r}-${c}`}
                    points={cellPoints(quad, c, r)}
                    fill={cellFill(intensity)}
                    initial={{ opacity: 0 }}
                    animate={
                      pulse
                        ? {
                            opacity: [
                              0.18 + intensity * 0.27,
                              0.1 + intensity * 0.27,
                              0.18 + intensity * 0.27,
                            ],
                          }
                        : { opacity: 0.14 + intensity * 0.27 }
                    }
                    transition={
                      pulse
                        ? {
                            duration: 5,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: (r * COLS + c) * 0.02,
                          }
                        : {
                            duration: 0.5,
                            ease: 'easeOut',
                            delay: (r * COLS + c) * 0.02,
                          }
                    }
                  />
                )
              }),
            )}
          </motion.g>
        )}

        {layers.has('grid') && (
          <motion.g key={`grid-${quad.tl[0]}`} {...fade}>
            {lattice.map((d) => (
              <path
                key={d}
                d={d}
                fill="none"
                stroke="var(--accent-cyan)"
                strokeOpacity={0.28}
                strokeWidth={0.5}
              />
            ))}
          </motion.g>
        )}

        {layers.has('contours') && (
          <motion.g key={`contours-${quad.tl[0]}`} {...fade}>
            {contours.map((d, i) => (
              <motion.path
                key={d}
                d={d}
                fill="none"
                stroke="var(--accent-cyan)"
                strokeOpacity={0.55}
                strokeWidth={0.75}
                initial={{ pathLength: reduced ? 1 : 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: 'easeOut', delay: i * 0.2 }}
              />
            ))}
          </motion.g>
        )}
      </AnimatePresence>
    </svg>
  )
}
