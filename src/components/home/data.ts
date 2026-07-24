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

export const platformPillars = [
  {
    icon: 'flask',
    title: 'Soil Chemistry',
    description:
      'Full-spectrum chemical panels — nutrients, pH, cation exchange, carbon fractions — benchmarked against a 12-year Australian soil archive.',
  },
  {
    icon: 'dna',
    title: 'Microbial Biology',
    description:
      'DNA sequencing of the soil microbiome quantifies the living engine of your soil: diversity, function and disease-suppression potential.',
  },
  {
    icon: 'satellite',
    title: 'Spatial Analytics',
    description:
      'Satellite imagery, GIS layers and environmental datasets place every sample in landscape context, from paddock to catchment scale.',
  },
] as const

export const industries = [
  {
    title: 'Agriculture',
    tag: 'Broadacre · Horticulture · Grazing',
    description:
      'Variable-rate nutrition, rotation planning and soil-carbon baselines built on evidence, not averages.',
    imageKey: 'dronePaddocks',
  },
  {
    title: 'Mining Rehabilitation',
    tag: 'Closure · Compliance · Cover design',
    description:
      'Track substrate development against completion criteria with defensible, auditable soil evidence.',
    imageKey: 'contourRevegetationAerial',
  },
  {
    title: 'Environmental Restoration',
    tag: 'Wetlands · Revegetation · Biodiversity',
    description:
      'Measure recovery below the surface — microbial succession and soil function, not just canopy cover.',
    imageKey: 'wetlandBillabongAerial',
  },
] as const

export const governmentCallout = {
  title: 'Government & Research',
  tag: 'Catchment scale · Open standards',
  description:
    'Landscape-scale soil monitoring for policy, carbon programs and research partnerships — exportable, versioned and methodologically transparent.',
  imageKey: 'riverMeanderAerial',
} as const

export const howItWorksSteps = [
  {
    number: '01',
    title: 'Sample',
    description:
      'Agronomists collect georeferenced cores on an optimised sampling grid — every core barcoded from paddock to lab.',
    imageKey: 'agronomistSoilSampling',
  },
  {
    number: '02',
    title: 'Analyse',
    description:
      'NATA-aligned chemistry panels and microbial DNA sequencing run side by side on every sample.',
    imageKey: 'soilLabAnalysis',
  },
  {
    number: '03',
    title: 'Model',
    description:
      'Machine learning fuses lab results with satellite, weather and sensor data to map soil function across every hectare.',
    imageKey: 'weatherStationField',
  },
  {
    number: '04',
    title: 'Act',
    description:
      'Ranked, evidence-linked recommendations land in the dashboard — each with the expected impact and the data behind it.',
    imageKey: null,
  },
] as const

export const features = [
  {
    icon: 'flask',
    title: 'Soil chemistry panels',
    description:
      'Complete nutrient, carbon and constraint profiling with trend tracking across seasons.',
  },
  {
    icon: 'dna',
    title: 'Microbial DNA sequencing',
    description:
      'Genomic profiling of the soil microbiome, scored for function and diversity.',
  },
  {
    icon: 'layers',
    title: 'GIS layer mapping',
    description:
      'Nutrient, moisture and health surfaces rendered as toggleable paddock layers.',
  },
  {
    icon: 'leaf',
    title: 'Carbon & nitrogen reporting',
    description:
      'Audit-ready soil carbon baselines and nitrogen budgets, exportable in one click.',
  },
  {
    icon: 'cloud',
    title: 'Weather & sensor integration',
    description:
      'On-farm stations and public feeds stream straight into the models.',
  },
  {
    icon: 'target',
    title: 'Evidence-based recommendations',
    description:
      'Every recommendation carries its confidence level and the samples that support it.',
  },
] as const

export const caseStudies = [
  {
    metric: 0.4,
    metricPrefix: '+',
    metricSuffix: '% organic carbon',
    timeframe: '18 months · NSW mixed cropping',
    quote:
      'The microbial data changed how we sequence our rotation. Carbon is up on every monitored paddock, and we can show exactly why.',
    role: 'Senior Agronomist, NSW mixed cropping enterprise',
  },
  {
    metric: 32,
    metricPrefix: '−',
    metricSuffix: '% input spend',
    timeframe: '2 seasons · Bowen Basin rehabilitation',
    quote:
      'Cellutech gave us completion-criteria evidence regulators accepted first pass. The savings on blanket ameliorant applications paid for the program.',
    role: 'Rehabilitation Lead, Bowen Basin mining operation',
  },
] as const

export const faqs = [
  {
    question: 'What sampling density do you recommend?',
    answer:
      'It depends on variability, not on a fixed grid. Our optimiser designs the sampling plan from satellite-derived zones and any prior data — typically one core site per 2–4 hectares for broadacre baselines, denser for rehabilitation compliance work.',
  },
  {
    question: 'How long until results come back?',
    answer:
      'Chemistry panels are typically returned within 10 business days of the lab receiving samples; microbial sequencing adds about a week. Results stream into your dashboard as they clear QC — you never wait for the full batch.',
  },
  {
    question: 'Who owns the data?',
    answer:
      'You do, outright. Your data is never sold or shared without your written direction, and you can export or delete everything at any time. De-identified aggregates improve regional benchmarks only if you opt in.',
  },
  {
    question: 'Does Cellutech integrate with my existing tools?',
    answer:
      'Yes — variable-rate prescription export to all major equipment formats, an API for farm-management platforms, and shapefile/GeoTIFF export for any GIS workflow.',
  },
  {
    question: 'Where do you operate?',
    answer:
      'Sampling networks currently cover every Australian state and territory, with models calibrated on Australian soils. International programs are considered case by case for research partners.',
  },
  {
    question: 'How is the platform priced?',
    answer:
      'A per-hectare subscription that includes sampling design, lab analysis, the dashboard and recommendations — no per-seat fees. Rehabilitation and research programs are quoted per project scope.',
  },
] as const

