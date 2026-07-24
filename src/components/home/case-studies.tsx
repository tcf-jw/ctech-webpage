import { Card, CardContent } from '@/components/ui/card'
import { Section } from '@/components/shared/section'
import { StaggerGroup, StaggerItem } from '@/components/shared/stagger'
import { AnimatedNumber } from '@/components/shared/animated-number'
import { caseStudies } from '@/components/home/data'

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
            <Card className="h-full">
              <CardContent className="flex h-full flex-col">
                <p className="font-heading text-3xl font-medium tracking-tight md:text-4xl">
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
                <p className="mt-1 font-mono text-xs text-muted-foreground">
                  {study.timeframe}
                </p>
                <blockquote className="mt-5 flex-1 border-l-2 border-primary/40 pl-4 text-sm leading-relaxed text-foreground/90">
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
