import { useRef } from 'react'
import NumberFlow, { type Format } from '@number-flow/react'
import { useInView } from 'motion/react'

type AnimatedNumberProps = {
  value: number
  format?: Format
  prefix?: string
  suffix?: string
  className?: string
}

/**
 * NumberFlow animates on value change, not on mount — so hold 0 until the
 * element scrolls into view, then set the real value to run the counter.
 */
export function AnimatedNumber({
  value,
  format,
  prefix,
  suffix,
  className,
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <span ref={ref} className={className}>
      <NumberFlow
        value={inView ? value : 0}
        format={format}
        prefix={prefix}
        suffix={suffix}
        className="tabular-nums"
      />
    </span>
  )
}
