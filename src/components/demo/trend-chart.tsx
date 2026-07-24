import { useMemo, useState } from 'react'
import { ParentSize } from '@visx/responsive'
import { Group } from '@visx/group'
import { AreaClosed, LinePath } from '@visx/shape'
import { curveMonotoneX } from '@visx/curve'
import { GridRows } from '@visx/grid'
import { scaleLinear, scalePoint } from '@visx/scale'
import type { MonthlyPoint } from './data'

const MARGIN = { top: 8, right: 12, bottom: 28, left: 48 }
const HEIGHT = 260

const currency = new Intl.NumberFormat('en-AU', {
  style: 'currency',
  currency: 'AUD',
  maximumFractionDigits: 0,
})

const axisCurrency = new Intl.NumberFormat('en-AU', {
  notation: 'compact',
  maximumFractionDigits: 0,
})

type ChartProps = {
  data: MonthlyPoint[]
  width: number
}

function Chart({ data, width }: ChartProps) {
  const [hovered, setHovered] = useState<number | null>(null)

  const innerWidth = Math.max(width - MARGIN.left - MARGIN.right, 0)
  const innerHeight = HEIGHT - MARGIN.top - MARGIN.bottom

  const xScale = useMemo(
    () =>
      scalePoint<string>({
        domain: data.map((d) => d.month),
        range: [0, innerWidth],
      }),
    [data, innerWidth],
  )

  const yScale = useMemo(() => {
    const max = Math.max(...data.map((d) => d.revenue))
    return scaleLinear<number>({
      domain: [0, max * 1.1],
      range: [innerHeight, 0],
      nice: true,
    })
  }, [data, innerHeight])

  const x = (d: MonthlyPoint) => xScale(d.month) ?? 0
  const y = (d: MonthlyPoint) => yScale(d.revenue)

  function handlePointerMove(event: React.PointerEvent<SVGSVGElement>) {
    const rect = event.currentTarget.getBoundingClientRect()
    const px = event.clientX - rect.left - MARGIN.left
    const step = xScale.step()
    const index = Math.min(
      data.length - 1,
      Math.max(0, Math.round(px / Math.max(step, 1))),
    )
    setHovered(index)
  }

  const hoveredPoint = hovered !== null ? data[hovered] : null

  return (
    <div className="relative">
      <svg
        width={width}
        height={HEIGHT}
        role="img"
        aria-label="Monthly revenue trend"
        onPointerMove={handlePointerMove}
        onPointerLeave={() => setHovered(null)}
      >
        <defs>
          <linearGradient id="trend-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--chart-2)" stopOpacity={0.25} />
            <stop offset="100%" stopColor="var(--chart-2)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <Group left={MARGIN.left} top={MARGIN.top}>
          <GridRows
            scale={yScale}
            width={innerWidth}
            numTicks={4}
            stroke="var(--border)"
          />
          {yScale.ticks(4).map((tick) => (
            <text
              key={tick}
              x={-8}
              y={yScale(tick)}
              dy="0.32em"
              textAnchor="end"
              fontSize={11}
              fill="var(--muted-foreground)"
            >
              {axisCurrency.format(tick)}
            </text>
          ))}
          {data.map((d, i) =>
            i % 2 === 0 ? (
              <text
                key={d.month}
                x={x(d)}
                y={innerHeight + 18}
                textAnchor="middle"
                fontSize={11}
                fill="var(--muted-foreground)"
              >
                {d.month}
              </text>
            ) : null,
          )}
          <AreaClosed<MonthlyPoint>
            data={data}
            x={x}
            y={y}
            yScale={yScale}
            curve={curveMonotoneX}
            fill="url(#trend-fill)"
          />
          <LinePath<MonthlyPoint>
            data={data}
            x={x}
            y={y}
            curve={curveMonotoneX}
            stroke="var(--chart-2)"
            strokeWidth={2}
          />
          {hoveredPoint && (
            <>
              <line
                x1={x(hoveredPoint)}
                x2={x(hoveredPoint)}
                y1={0}
                y2={innerHeight}
                stroke="var(--muted-foreground)"
                strokeWidth={1}
                strokeDasharray="3,3"
              />
              <circle
                cx={x(hoveredPoint)}
                cy={y(hoveredPoint)}
                r={5}
                fill="var(--chart-2)"
                stroke="var(--background)"
                strokeWidth={2}
              />
            </>
          )}
        </Group>
      </svg>
      {hoveredPoint && (
        <div
          className="pointer-events-none absolute rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md"
          style={{
            left: Math.min(
              MARGIN.left + x(hoveredPoint) + 12,
              width - 130,
            ),
            top: MARGIN.top + y(hoveredPoint) - 40,
          }}
        >
          <span className="text-muted-foreground">{hoveredPoint.month}</span>{' '}
          {currency.format(hoveredPoint.revenue)}
        </div>
      )}
    </div>
  )
}

export function TrendChart({ data }: { data: MonthlyPoint[] }) {
  return (
    <ParentSize>
      {({ width }) => (width > 0 ? <Chart data={data} width={width} /> : null)}
    </ParentSize>
  )
}
