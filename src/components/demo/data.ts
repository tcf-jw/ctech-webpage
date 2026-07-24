export type MonthlyPoint = {
  month: string
  revenue: number
  orders: number
}

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

export function generateSeries(): MonthlyPoint[] {
  let revenue = 42_000
  let orders = 310
  return MONTHS.map((month) => {
    revenue = Math.round(revenue * (0.94 + Math.random() * 0.18))
    orders = Math.round(orders * (0.95 + Math.random() * 0.16))
    return { month, revenue, orders }
  })
}

export function totals(series: MonthlyPoint[]) {
  const revenue = series.reduce((sum, d) => sum + d.revenue, 0)
  const orders = series.reduce((sum, d) => sum + d.orders, 0)
  const first = series[0].revenue
  const last = series[series.length - 1].revenue
  const growth = (last - first) / first
  return { revenue, orders, growth }
}
