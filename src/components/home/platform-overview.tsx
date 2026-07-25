import { Dna, FlaskConical, Satellite } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Section } from '@/components/shared/section'
import { StaggerGroup, StaggerItem } from '@/components/shared/stagger'
import { FadeIn } from '@/components/shared/fade-in'
import { AnimatedNumber } from '@/components/shared/animated-number'
import { ResponsiveImage } from '@/components/shared/responsive-image'
import { platformPillars, platformStats } from '@/components/home/data'
import {
  microbialLifeMacro,
  satelliteIntelligence,
  soilLabAnalysis,
  type ImageAsset,
} from '@/components/home/images'

const pillarIcons = {
  flask: FlaskConical,
  dna: Dna,
  satellite: Satellite,
} as const

const pillarImages: Record<keyof typeof pillarIcons, ImageAsset> = {
  flask: soilLabAnalysis,
  dna: microbialLifeMacro,
  satellite: satelliteIntelligence,
}

export function PlatformOverview() {
  return (
    <Section
      id="platform"
      eyebrow="Platform"
      title="Three sciences. One picture of your soil."
      description="Cellutech fuses laboratory chemistry, microbial genomics and spatial analytics into a single evidence base — so every recommendation is grounded in what is actually happening beneath the surface."
    >
      <StaggerGroup className="grid gap-4 md:grid-cols-3">
        {platformPillars.map((pillar) => {
          const Icon = pillarIcons[pillar.icon]
          return (
            <StaggerItem key={pillar.title}>
              <Card className="group h-full gap-0 overflow-hidden py-0 transition-shadow duration-300 hover:ring-primary/25">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <ResponsiveImage
                    image={pillarImages[pillar.icon]}
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-card/40 to-transparent dark:from-card/70"
                    aria-hidden
                  />
                  <span className="absolute bottom-3 left-4 inline-flex size-10 items-center justify-center rounded-lg bg-background/70 text-primary backdrop-blur-sm">
                    <Icon className="size-5" aria-hidden />
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-medium">{pillar.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {pillar.description}
                  </p>
                </div>
              </Card>
            </StaggerItem>
          )
        })}
      </StaggerGroup>

      <FadeIn className="mt-16">
        <dl className="grid grid-cols-2 gap-8 border-y py-10 md:grid-cols-4">
          {platformStats.map((stat) => (
            <div key={stat.label}>
              <dd className="font-heading text-3xl font-medium tracking-tight md:text-4xl">
                <AnimatedNumber
                  value={stat.value}
                  format={{
                    minimumFractionDigits: stat.decimals,
                    maximumFractionDigits: stat.decimals,
                  }}
                  suffix={stat.suffix}
                />
              </dd>
              <dt className="mt-1.5 font-mono text-xs tracking-wide text-muted-foreground uppercase">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>
      </FadeIn>
    </Section>
  )
}
