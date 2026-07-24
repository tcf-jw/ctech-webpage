import { Card, CardContent } from '@/components/ui/card'
import { Section } from '@/components/shared/section'
import { FadeIn } from '@/components/shared/fade-in'
import { DemoRequestForm } from '@/components/home/demo-request-form'

export function Cta() {
  return (
    <Section id="demo" className="relative overflow-hidden">
      {/* Topographic line texture behind the CTA band */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 800 600"
      >
        <g fill="none" className="stroke-primary/10" strokeWidth="1">
          <path d="M-60 520 Q 140 430 340 490 T 720 440 T 920 500" />
          <path d="M-60 440 Q 160 350 380 410 T 740 350 T 920 420" />
          <path d="M-60 360 Q 180 280 400 330 T 760 270 T 920 340" />
          <path d="M-60 280 Q 200 200 420 250 T 780 190 T 920 260" />
          <path d="M-60 200 Q 220 130 440 170 T 800 120 T 920 180" />
          <path d="M-60 120 Q 240 60 460 100 T 820 50 T 920 100" />
        </g>
      </svg>

      <div className="relative">
        <FadeIn className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-4 font-mono text-xs font-medium tracking-[0.2em] text-primary uppercase">
            Get started
          </p>
          <h2
            id="demo-title"
            className="text-4xl font-medium tracking-tight text-balance md:text-5xl"
          >
            See your soil the way Cellutech does
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            A 30-minute walkthrough with an agronomist on your own region’s
            data. No obligation, no setup required.
          </p>
        </FadeIn>

        <FadeIn delay={0.1} className="mx-auto max-w-2xl">
          <Card>
            <CardContent>
              <DemoRequestForm />
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </Section>
  )
}
