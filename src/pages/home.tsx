import { SkipLink } from '@/components/layout/skip-link'
import { SiteHeader } from '@/components/layout/site-header'
import { SiteFooter } from '@/components/layout/site-footer'
import { Hero } from '@/components/home/hero'

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
      </main>
      <SiteFooter />
    </>
  )
}
