import { Card } from '@/components/ui/card'
import { Section } from '@/components/shared/section'
import { StaggerGroup, StaggerItem } from '@/components/shared/stagger'
import { FadeIn } from '@/components/shared/fade-in'
import { ResponsiveImage } from '@/components/shared/responsive-image'
import {
  governmentCallout,
  industries,
} from '@/components/home/data'
import {
  contourRevegetationAerial,
  dronePaddocks,
  riverMeanderAerial,
  wetlandBillabongAerial,
  type ImageAsset,
} from '@/components/home/images'

const industryImages: Record<string, ImageAsset> = {
  dronePaddocks,
  contourRevegetationAerial,
  wetlandBillabongAerial,
  riverMeanderAerial,
}

export function Industries() {
  return (
    <Section
      id="industries"
      eyebrow="Industries"
      title="Built for the people who answer for the land"
      description="From production agriculture to mine closure, Cellutech turns soil evidence into decisions that stand up to agronomic, regulatory and scientific scrutiny."
    >
      <StaggerGroup className="grid gap-4 md:grid-cols-3">
        {industries.map((industry) => (
          <StaggerItem key={industry.title}>
            <Card className="group h-full gap-0 overflow-hidden py-0 transition-shadow duration-300 hover:ring-primary/30">
              <div className="relative aspect-[16/10] overflow-hidden">
                <ResponsiveImage
                  image={industryImages[industry.imageKey]}
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent"
                  aria-hidden
                />
              </div>
              <div className="p-6">
                <p className="mb-2 font-mono text-[11px] tracking-wide text-primary uppercase">
                  {industry.tag}
                </p>
                <h3 className="text-lg font-medium">{industry.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {industry.description}
                </p>
              </div>
            </Card>
          </StaggerItem>
        ))}
      </StaggerGroup>

      <FadeIn className="mt-4">
        <Card className="group gap-0 overflow-hidden py-0 transition-shadow duration-300 hover:ring-primary/30 md:grid md:grid-cols-[1.2fr_2fr]">
          <div className="relative aspect-[16/10] overflow-hidden md:aspect-auto md:h-full">
            <ResponsiveImage
              image={industryImages[governmentCallout.imageKey]}
              sizes="(min-width: 768px) 38vw, 100vw"
              className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>
          <div className="flex flex-col justify-center p-6 md:p-10">
            <p className="mb-2 font-mono text-[11px] tracking-wide text-primary uppercase">
              {governmentCallout.tag}
            </p>
            <h3 className="text-lg font-medium">{governmentCallout.title}</h3>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
              {governmentCallout.description}
            </p>
          </div>
        </Card>
      </FadeIn>
    </Section>
  )
}
