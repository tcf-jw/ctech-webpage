import { Dna, FlaskConical, Satellite } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Section } from '@/components/shared/section'
import { StaggerGroup, StaggerItem } from '@/components/shared/stagger'
import { FadeIn } from '@/components/shared/fade-in'
import { AnimatedNumber } from '@/components/shared/animated-number'
import { platformPillars, platformStats } from '@/components/home/data'

const pillarIcons = {
  flask: FlaskConical,
  dna: Dna,
  satellite: Satellite,
} as const

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
              <Card className="h-full transition-shadow duration-300 hover:ring-primary/25">
                <CardContent>
                  <span className="mb-5 inline-flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="text-lg font-medium">{pillar.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {pillar.description}
                  </p>
                </CardContent>
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
