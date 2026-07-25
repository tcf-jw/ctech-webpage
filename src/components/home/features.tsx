import { CloudSun, Dna, FlaskConical, Layers, Leaf, Target } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Section } from '@/components/shared/section'
import { StaggerGroup, StaggerItem } from '@/components/shared/stagger'
import { FadeIn } from '@/components/shared/fade-in'
import { ResponsiveImage } from '@/components/shared/responsive-image'
import { features } from '@/components/home/data'
import { soilRootsMacro } from '@/components/home/images'

const featureIcons = {
  flask: FlaskConical,
  dna: Dna,
  layers: Layers,
  leaf: Leaf,
  cloud: CloudSun,
  target: Target,
} as const

export function Features() {
  return (
    <Section
      id="features"
      eyebrow="Platform features"
      title="Everything between the sample and the decision"
      description="One platform carries the full workflow — analysis, mapping, monitoring and reporting — with the scientific rigour enterprise programs require."
    >
      <StaggerGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => {
          const Icon = featureIcons[feature.icon]
          return (
            <StaggerItem key={feature.title}>
              <Card
                size="sm"
                className="h-full transition-shadow duration-300 hover:ring-primary/25"
              >
                <CardContent>
                  <span className="mb-4 inline-flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="font-medium">{feature.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </StaggerItem>
          )
        })}
      </StaggerGroup>

      <FadeIn className="mt-4">
        <Card className="group relative gap-0 overflow-hidden py-0">
          <div className="relative aspect-[21/8] overflow-hidden max-sm:aspect-[4/3]">
            <ResponsiveImage
              image={soilRootsMacro}
              sizes="(min-width: 1152px) 1104px, 100vw"
              className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
            <div
              className="absolute inset-0 bg-gradient-to-r from-card/85 via-card/25 to-transparent dark:from-card/90 dark:via-card/40"
              aria-hidden
            />
            <div className="absolute inset-0 flex flex-col justify-center p-6 md:p-10">
              <p className="mb-2 font-mono text-[11px] tracking-wide text-primary uppercase">
                Beneath the surface
              </p>
              <h3 className="max-w-sm text-xl font-medium md:text-2xl">
                The living half of your soil, finally measured
              </h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                Roots, microbes and moisture — the biology that drives yield and
                resilience, quantified alongside the chemistry.
              </p>
            </div>
          </div>
        </Card>
      </FadeIn>
    </Section>
  )
}
