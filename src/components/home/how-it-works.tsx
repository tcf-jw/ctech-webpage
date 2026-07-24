import { ClipboardCheck } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { Section } from '@/components/shared/section'
import { StaggerGroup, StaggerItem } from '@/components/shared/stagger'
import { ResponsiveImage } from '@/components/shared/responsive-image'
import { howItWorksSteps } from '@/components/home/data'
import {
  agronomistSoilSampling,
  soilLabAnalysis,
  weatherStationField,
  type ImageAsset,
} from '@/components/home/images'

const stepImages: Record<string, ImageAsset> = {
  agronomistSoilSampling,
  soilLabAnalysis,
  weatherStationField,
}

export function HowItWorks() {
  const reduced = useReducedMotion()

  return (
    <Section
      id="how-it-works"
      eyebrow="How it works"
      title="From core to recommendation in four steps"
      description="A single chain of custody runs from the paddock to the dashboard — every recommendation traceable back to the cores that produced it."
    >
      {/* Connecting line that draws in as the steps enter */}
      <motion.div
        initial={{ scaleX: reduced ? 1 : 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="mb-10 hidden h-px origin-left bg-gradient-to-r from-primary/60 via-border to-border lg:block"
        aria-hidden
      />
      <StaggerGroup className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {howItWorksSteps.map((step) => (
          <StaggerItem key={step.number} className="flex h-full flex-col">
            <div className="relative mb-5 aspect-[4/3] overflow-hidden rounded-xl ring-1 ring-border">
              {step.imageKey ? (
                <ResponsiveImage
                  image={stepImages[step.imageKey]}
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                  className="h-full w-full"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-card">
                  <span className="inline-flex size-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <ClipboardCheck className="size-7" aria-hidden />
                  </span>
                </div>
              )}
              <span className="absolute top-3 left-3 rounded-md bg-background/80 px-2 py-1 font-mono text-xs font-medium text-primary backdrop-blur-sm">
                {step.number}
              </span>
            </div>
            <h3 className="text-lg font-medium">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {step.description}
            </p>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  )
}
