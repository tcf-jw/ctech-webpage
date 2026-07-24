// Copy and demo data for the marketing homepage. All figures are
// illustrative product-marketing numbers, not customer data.

export const heroCopy = {
  eyebrow: 'AI-powered soil intelligence',
  headline: 'Intelligence Beneath Every Hectare',
  subheading:
    'AI-powered soil intelligence combining chemistry, microbiology and spatial analytics to deliver evidence-based recommendations for Australian landscapes.',
  primaryCta: 'Request a Demo',
  secondaryCta: 'Explore Platform',
}

export type HealthMetric = {
  label: string
  delta: string
  value?: number
  decimals?: number
  suffix?: string
  text?: string
}

export const paddockHealth = {
  label: 'Paddock Health Index',
  score: 82,
  delta: '12%',
  // 12 weeks of index history for the sparkline
  series: [64, 66, 65, 68, 70, 69, 72, 74, 73, 77, 80, 82],
  metrics: [
    { label: 'Organic Carbon', value: 2.65, decimals: 2, suffix: '%', delta: '8%' },
    { label: 'Microbial Diversity', text: 'High', delta: '15%' },
    { label: 'Available Nitrogen', value: 42, decimals: 0, suffix: ' mg/kg', delta: '6%' },
  ] as HealthMetric[],
}

export const platformStats = [
  { value: 2.4, suffix: 'M', decimals: 1, label: 'hectares analysed' },
  { value: 180, suffix: 'K', decimals: 0, label: 'samples sequenced' },
  { value: 96, suffix: '%', decimals: 0, label: 'recommendation confidence' },
  { value: 12, suffix: 'yr', decimals: 0, label: 'soil archive depth' },
]
