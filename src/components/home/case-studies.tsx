import { Card, CardContent } from '@/components/ui/card'
import { Section } from '@/components/shared/section'
import { StaggerGroup, StaggerItem } from '@/components/shared/stagger'
import { AnimatedNumber } from '@/components/shared/animated-number'
import { ResponsiveImage } from '@/components/shared/responsive-image'
import { caseStudies } from '@/components/home/data'
import {
  mineSiteMonitoring,
  winterCropAerial,
  type ImageAsset,
} from '@/components/home/images'

const studyImages: Record<string, ImageAsset> = {
  winterCropAerial,
  mineSiteMonitoring,
}

export function CaseStudies() {
  return (
    <Section
      id="case-studies"
      eyebrow="Case studies"
      title="Results that show up in the soil"
    >
      <StaggerGroup className="grid gap-4 md:grid-cols-2">
        {caseStudies.map((study) => (
          <StaggerItem key={study.role}>
            <Card className="group h-full gap-0 overflow-hidden py-0">
              <div className="relative aspect-[16/8] overflow-hidden">
                <ResponsiveImage
                  image={studyImages[study.imageKey]}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-card via-card/15 to-transparent dark:via-card/30"
                  aria-hidden
                />
                <p className="absolute bottom-3 left-6 font-heading text-3xl font-medium tracking-tight md:text-4xl">
                  <span className="text-primary">
                    {study.metricPrefix}
                    <AnimatedNumber
                      value={study.metric}
                      format={{
                        maximumFractionDigits: study.metric % 1 ? 1 : 0,
                      }}
                    />
                    {study.metricSuffix}
                  </span>
                </p>
              </div>
              <CardContent className="flex flex-1 flex-col p-6 pt-4">
                <p className="font-mono text-xs text-muted-foreground">
                  {study.timeframe}
                </p>
                <blockquote className="mt-4 flex-1 border-l-2 border-primary/40 pl-4 text-sm leading-relaxed text-foreground/90">
                  “{study.quote}”
                </blockquote>
                <footer className="mt-4 text-xs text-muted-foreground">
                  — {study.role}
                </footer>
              </CardContent>
            </Card>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  )
}
