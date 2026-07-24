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

// 8x6 soil-health intensity lattice (0 = healthy, 1 = attention)
export const heatMatrix = [
  [0.15, 0.2, 0.3, 0.45, 0.35, 0.25, 0.2, 0.15],
  [0.2, 0.3, 0.5, 0.7, 0.55, 0.35, 0.25, 0.2],
  [0.25, 0.4, 0.65, 0.9, 0.75, 0.45, 0.3, 0.2],
  [0.2, 0.35, 0.55, 0.8, 0.85, 0.5, 0.35, 0.25],
  [0.15, 0.25, 0.4, 0.55, 0.6, 0.4, 0.25, 0.15],
  [0.1, 0.15, 0.25, 0.35, 0.4, 0.3, 0.2, 0.1],
]

export const sampleSites = [
  { id: 'P1', x: 22, y: 30, reading: 'OC 3.1% · pH 6.4' },
  { id: 'P2', x: 48, y: 22, reading: 'OC 2.8% · pH 6.2' },
  { id: 'P3', x: 71, y: 38, reading: 'OC 2.2% · pH 5.8' },
  { id: 'P4', x: 38, y: 62, reading: 'OC 2.9% · pH 6.1' },
  { id: 'P5', x: 63, y: 74, reading: 'OC 2.6% · pH 6.0' },
]

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
  { label: 'Organic Carbon', value: 2.65, decimals: 2, suffix: '%', delta: '8%' },
  { label: 'Microbial Diversity', text: 'High', delta: '15%' },
  { label: 'Available Nitrogen', value: 42, decimals: 0, suffix: ' mg/kg', delta: '6%' },
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
  { key: 'grid', label: 'Grid' },
  { key: 'health', label: 'Soil health' },
  { key: 'contours', label: 'Contours' },
  { key: 'sites', label: 'Sample sites' },
] as const

export type GisLayerKey = (typeof gisLayers)[number]['key']
