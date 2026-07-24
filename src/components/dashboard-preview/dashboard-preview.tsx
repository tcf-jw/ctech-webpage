import { Section } from '@/components/shared/section'
import { FadeIn } from '@/components/shared/fade-in'
import { PaddockMap } from '@/components/dashboard-preview/paddock-map'
import { SoilAnalysis } from '@/components/dashboard-preview/soil-analysis'
import { Recommendations } from '@/components/dashboard-preview/recommendations'
import { Reports } from '@/components/dashboard-preview/reports'
import { paddock } from '@/components/dashboard-preview/data'

export function DashboardPreview() {
  return (
    <Section
      id="dashboard"
      eyebrow="The platform"
      title="Enterprise soil intelligence, live"
      description="Map-first, evidence-linked and built for daily agronomy work — this is the dashboard your team logs into, not a mock-up."
    >
      <FadeIn y={32}>
        {/* Forced-dark: the product UI stays dark in both site themes */}
        <div className="dark overflow-hidden rounded-xl bg-background text-foreground shadow-2xl ring-1 ring-foreground/10">
          {/* Window chrome */}
          <div className="flex items-center gap-3 border-b border-border/70 px-4 py-3">
            <span className="flex gap-1.5" aria-hidden>
              <span className="size-2.5 rounded-full bg-muted" />
              <span className="size-2.5 rounded-full bg-muted" />
              <span className="size-2.5 rounded-full bg-muted" />
            </span>
            <p className="truncate font-mono text-xs text-muted-foreground">
              cellutech · {paddock.name} — {paddock.paddockCount} paddocks
            </p>
          </div>

          <div className="grid gap-3 p-3 lg:grid-cols-12">
            <PaddockMap className="lg:col-span-7 lg:row-span-2" />
            <SoilAnalysis className="lg:col-span-5" />
            <Recommendations className="lg:col-span-5" />
            <Reports className="lg:col-span-7 lg:col-start-1 lg:row-start-3" />
          </div>
        </div>
      </FadeIn>
    </Section>
  )
}
