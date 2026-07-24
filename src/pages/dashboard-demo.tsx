import { useState } from 'react'
import { RefreshCw } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ThemeToggle } from '@/components/theme-toggle'
import { StatTile } from '@/components/demo/stat-tile'
import { TrendChart } from '@/components/demo/trend-chart'
import { generateSeries, totals } from '@/components/demo/data'

const currency = new Intl.NumberFormat('en-AU', {
  style: 'currency',
  currency: 'AUD',
  maximumFractionDigits: 0,
})

export default function DashboardDemo() {
  const [series, setSeries] = useState(generateSeries)
  const { revenue, orders, growth } = totals(series)

  function refresh() {
    setSeries(generateSeries())
    toast.success('Demo data refreshed')
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      <title>Dashboard Demo — Cellutech</title>
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Starter Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Living demo of the template stack: shadcn/ui, visx, motion,
            number-flow.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" aria-label="Refresh data" onClick={refresh}>
            <RefreshCw />
          </Button>
          <ThemeToggle />
        </div>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatTile
          label="Revenue (12 mo)"
          value={revenue}
          format={{ style: 'currency', currency: 'AUD', maximumFractionDigits: 0 }}
        />
        <StatTile label="Orders" value={orders} />
        <StatTile
          label="Revenue growth"
          value={growth}
          format={{ style: 'percent', maximumFractionDigits: 1 }}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Monthly revenue</CardTitle>
          <CardDescription>
            Single series, so no legend; hover for values, table view in the
            second tab.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="chart">
            <TabsList>
              <TabsTrigger value="chart">Chart</TabsTrigger>
              <TabsTrigger value="table">Table</TabsTrigger>
            </TabsList>
            <TabsContent value="chart">
              <TrendChart data={series} />
            </TabsContent>
            <TabsContent value="table">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Month</TableHead>
                    <TableHead className="text-right">Revenue</TableHead>
                    <TableHead className="text-right">Orders</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {series.map((d) => (
                    <TableRow key={d.month}>
                      <TableCell>{d.month}</TableCell>
                      <TableCell className="text-right tabular-nums">
                        {currency.format(d.revenue)}
                      </TableCell>
                      <TableCell className="text-right tabular-nums">
                        {d.orders}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
