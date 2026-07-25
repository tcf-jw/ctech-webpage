// Illustrative product data for the marketing dashboard preview.
// Metric hierarchy (per design.md / mockup): headline = Paddock Health
// Index; drivers = organic carbon, microbial diversity, nitrogen;
// drill-down = recommendations + reports.

export const paddock = {
  name: 'Springfield South',
  paddockCount: 14,
  healthScore: 82,
  healthDelta: '12%',
  healthSeries: [64, 66, 65, 68, 70, 69, 72, 74, 73, 77, 80, 82],
}

export const radarAxes = [
  'Total N',
  'Phosphorus',
  'Potassium',
  'Sulfur',
  'Organic C',
  'pH',
]

// Normalised 0-1 against agronomic optimum
export const radarSeries = [
  {
    label: 'This paddock',
    values: [0.55, 0.72, 0.65, 0.5, 0.78, 0.62],
  },
  {
    label: 'District median',
    values: [0.62, 0.55, 0.6, 0.45, 0.5, 0.66],
  },
]

export type SoilDriver = {
  label: string
  delta: string
  value?: number
  decimals?: number
  suffix?: string
  text?: string
}

export const soilDrivers = [
  {
    label: 'Organic Carbon',
    value: 2.65,
    decimals: 2,
    suffix: '%',
    delta: '8%',
  },
  { label: 'Microbial Diversity', text: 'High', delta: '15%' },
  {
    label: 'Available Nitrogen',
    value: 42,
    decimals: 0,
    suffix: ' mg/kg',
    delta: '6%',
  },
] as SoilDriver[]

export const recommendations = [
  {
    title: 'Increase legume rotation',
    detail:
      'Improve soil nitrogen and organic matter by increasing legume rotation in this zone.',
    impact: 'High' as const,
  },
  {
    title: 'Apply compost',
    detail: 'Improve microbial activity and soil structure.',
    impact: 'Medium' as const,
  },
  {
    title: 'Monitor soil moisture',
    detail: 'Irrigation timing optimal in 7–10 days.',
    impact: 'Low' as const,
  },
]

export const reports = [
  { title: 'Soil Health Report', date: 'Generated 2 May 2026' },
  { title: 'Carbon Report', date: 'Generated 2 May 2026' },
  { title: 'Biodiversity Report', date: 'Generated 28 Apr 2026' },
]

export const gisLayers = [
  { key: 'paddocks', label: 'Paddocks' },
  { key: 'grid', label: 'Grid' },
  { key: 'health', label: 'Soil health' },
  { key: 'contours', label: 'Contours' },
  { key: 'sites', label: 'Sample sites' },
] as const

export type GisLayerKey = (typeof gisLayers)[number]['key']
