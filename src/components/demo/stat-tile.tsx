import NumberFlow, { type Format } from '@number-flow/react'
import { motion } from 'motion/react'
import { Card, CardContent } from '@/components/ui/card'

type StatTileProps = {
  label: string
  value: number
  format?: Format
}

export function StatTile({ label, value, format }: StatTileProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <Card>
        <CardContent>
          <p className="text-sm text-muted-foreground">{label}</p>
          <NumberFlow
            value={value}
            format={format}
            className="text-3xl font-semibold tabular-nums"
          />
        </CardContent>
      </Card>
    </motion.div>
  )
}
