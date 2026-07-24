import { SkipLink } from '@/components/layout/skip-link'
import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'
import { Hero } from '@/components/home/hero'
import { PlatformOverview } from '@/components/home/platform-overview'
import { DashboardPreview } from '@/components/dashboard-preview/dashboard-preview'
import { Industries } from '@/components/home/industries'
import { HowItWorks } from '@/components/home/how-it-works'
import { Features } from '@/components/home/features'
import { CaseStudies } from '@/components/home/case-studies'
import { Faq } from '@/components/home/faq'
import { Cta } from '@/components/home/cta'

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
        <DashboardPreview />
        <Industries />
        <HowItWorks />
        <Features />
        <CaseStudies />
        <Faq />
        <Cta />
      </main>
      <SiteFooter />
    </>
  )
}
