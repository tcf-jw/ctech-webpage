import { lazy, Suspense } from 'react'
import { SkipLink } from '@/components/layout/skip-link'
import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'
import { Hero } from '@/components/home/hero'
import { PlatformOverview } from '@/components/home/platform-overview'

// Below-fold sections are code-split so the initial bundle stays lean;
// they stream in immediately after hydration, well before they scroll in.
const DashboardPreview = lazy(() =>
  import('@/components/dashboard-preview/dashboard-preview').then((m) => ({
    default: m.DashboardPreview,
  })),
)
const Industries = lazy(() =>
  import('@/components/home/industries').then((m) => ({
    default: m.Industries,
  })),
)
const HowItWorks = lazy(() =>
  import('@/components/home/how-it-works').then((m) => ({
    default: m.HowItWorks,
  })),
)
const Features = lazy(() =>
  import('@/components/home/features').then((m) => ({ default: m.Features })),
)
const CaseStudies = lazy(() =>
  import('@/components/home/case-studies').then((m) => ({
    default: m.CaseStudies,
  })),
)
const Faq = lazy(() =>
  import('@/components/home/faq').then((m) => ({ default: m.Faq })),
)
const Cta = lazy(() =>
  import('@/components/home/cta').then((m) => ({ default: m.Cta })),
)

export default function Home() {
  return (
    <>
      <title>Cellutech — Intelligence Beneath Every Hectare</title>
      <meta
        name="description"
        content="AI-powered soil intelligence combining chemistry, microbiology and spatial analytics to deliver evidence-based recommendations for Australian landscapes."
      />
      <SkipLink />
      <SiteHeader />
      <main id="main">
        <Hero />
        <PlatformOverview />
        <Suspense fallback={null}>
          <DashboardPreview />
          <Industries />
          <HowItWorks />
          <Features />
          <CaseStudies />
          <Faq />
          <Cta />
        </Suspense>
      </main>
      <SiteFooter />
    </>
  )
}
