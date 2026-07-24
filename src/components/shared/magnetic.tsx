import { useRef, useState } from 'react'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'motion/react'
import type { ReactNode } from 'react'

const MAX_X = 6
const MAX_Y = 4

/**
 * Subtle magnetic hover: the wrapped element eases a few pixels toward the
 * pointer and springs back on leave. Inert for touch input and under
 * prefers-reduced-motion.
 */
export function Magnetic({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const [finePointer] = useState(
    () => window.matchMedia('(pointer: fine)').matches,
  )
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 220, damping: 18, mass: 0.4 })
  const y = useSpring(my, { stiffness: 220, damping: 18, mass: 0.4 })

  const active = finePointer && !reduced

  function onPointerMove(event: React.PointerEvent) {
    if (!active || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const dx = (event.clientX - rect.left - rect.width / 2) / (rect.width / 2)
    const dy = (event.clientY - rect.top - rect.height / 2) / (rect.height / 2)
    mx.set(Math.max(-MAX_X, Math.min(MAX_X, dx * MAX_X)))
    my.set(Math.max(-MAX_Y, Math.min(MAX_Y, dy * MAX_Y)))
  }

  function onPointerLeave() {
    mx.set(0)
    my.set(0)
  }

  return (
    <motion.div
      ref={ref}
      style={active ? { x, y } : undefined}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={className}
    >
      {children}
    </motion.div>
  )
}
