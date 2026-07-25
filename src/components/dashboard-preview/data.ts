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

export type Quad = {
  tl: [number, number]
  tr: [number, number]
  br: [number, number]
  bl: [number, number]
}

export type MapSite = {
  id: string
  x: number
  y: number
  reading: string
}

export type BaseView = {
  quad: Quad
  contours: string[]
  sites: MapSite[]
}

// Overlay geometry is tuned per base image (SVG viewBox 400x300 over an
// aspect-4/3 crop of the 16:9 source): the analysis quad sits on an actual
// paddock block in each photo, and sample sites land on ground, not sky
// or creek.
export const baseViews: Record<'drone' | 'satellite', BaseView> = {
  drone: {
    // hero-farmland-clean: central paddock mosaic, oblique perspective
    quad: {
      tl: [105, 112],
      tr: [330, 120],
      br: [365, 238],
      bl: [70, 226],
    },
    contours: [
      'M 90 215 Q 160 170 230 190 T 355 165',
      'M 110 235 Q 190 195 270 210 T 370 190',
      'M 80 185 Q 150 140 240 158 T 345 138',
    ],
    sites: [
      { id: 'P1', x: 30, y: 52, reading: 'OC 3.1% · pH 6.4' },
      { id: 'P2', x: 45, y: 43, reading: 'OC 2.8% · pH 6.2' },
      { id: 'P3', x: 62, y: 48, reading: 'OC 2.2% · pH 5.8' },
      { id: 'P4', x: 40, y: 66, reading: 'OC 2.9% · pH 6.1' },
      { id: 'P5', x: 70, y: 63, reading: 'OC 2.6% · pH 6.0' },
    ],
  },
  satellite: {
    // satellite-intelligence: nadir; the quad sits ON the image's own
    // traced field (upper left) so the baked boundary and the live
    // analysis layers read as one system
    quad: {
      tl: [112, 94],
      tr: [204, 100],
      br: [197, 184],
      bl: [103, 176],
    },
    contours: [
      'M 318 24 Q 288 85 246 138 T 122 278',
      'M 336 30 Q 305 95 262 150 T 140 288',
      'M 300 18 Q 272 78 230 130 T 105 268',
    ],
    sites: [
      { id: 'P1', x: 34, y: 38, reading: 'OC 3.1% · pH 6.4' },
      { id: 'P2', x: 43, y: 55, reading: 'OC 2.8% · pH 6.2' },
      { id: 'P3', x: 78, y: 55, reading: 'OC 2.2% · pH 5.8' },
      { id: 'P4', x: 60, y: 20, reading: 'OC 2.9% · pH 6.1' },
      { id: 'P5', x: 25, y: 72, reading: 'OC 2.6% · pH 6.0' },
    ],
  },
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
  { key: 'grid', label: 'Grid' },
  { key: 'health', label: 'Soil health' },
  { key: 'contours', label: 'Contours' },
  { key: 'sites', label: 'Sample sites' },
] as const

export type GisLayerKey = (typeof gisLayers)[number]['key']
