import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { Button } from '@/components/ui/button'
import { Magnetic } from '@/components/shared/magnetic'
import { ResponsiveImage } from '@/components/shared/responsive-image'
import { PaddockHealthCard } from '@/components/home/paddock-health-card'
import { heroCopy } from '@/components/home/data'
import { heroFarmlandClean } from '@/components/home/images'

const entry = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' as const, delay },
})

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 120])

  return (
    <section
      ref={sectionRef}
      id="top"
      aria-label="Introduction"
      className="dark relative isolate flex min-h-[92svh] items-center overflow-hidden bg-background text-foreground"
    >
      {/* Parallax + slow-zoom photographic background */}
      <motion.div
        style={reduced ? undefined : { y: parallaxY }}
        className="absolute inset-[-8%] -z-10"
        aria-hidden
      >
        <motion.div
          animate={reduced ? undefined : { scale: [1, 1.07] }}
          transition={{
            duration: 22,
            ease: 'linear',
            repeat: Infinity,
            repeatType: 'mirror',
          }}
          className="h-full w-full"
        >
          <ResponsiveImage
            image={heroFarmlandClean}
            sizes="100vw"
            priority
            className="h-full w-full"
          />
        </motion.div>
      </motion.div>

      {/* Readability scrims */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-t from-background via-background/55 to-background/20"
        aria-hidden
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-background/85 via-background/35 to-transparent"
        aria-hidden
      />

      <div className="mx-auto w-full max-w-6xl px-6 pt-32 pb-20 lg:pt-24">
        <div className="max-w-xl">
          <motion.p
            {...entry(0)}
            className="mb-5 font-mono text-xs font-medium tracking-[0.25em] text-primary uppercase"
          >
            {heroCopy.eyebrow}
          </motion.p>
          <motion.h1
            {...entry(0.1)}
            className="text-5xl font-medium tracking-tight text-balance md:text-7xl"
          >
            Intelligence Beneath Every{' '}
            <span className="text-primary">Hectare</span>
          </motion.h1>
          <motion.p
            {...entry(0.2)}
            className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground"
          >
            {heroCopy.subheading}
          </motion.p>
          <motion.div {...entry(0.3)} className="mt-9 flex flex-wrap gap-3">
            <Magnetic>
              <Button asChild size="lg" className="rounded-lg">
                <a href="#demo">{heroCopy.primaryCta}</a>
              </Button>
            </Magnetic>
            <Magnetic>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-lg bg-background/40 backdrop-blur-sm"
              >
                <a href="#platform">
                  {heroCopy.secondaryCta}
                  <ArrowRight aria-hidden />
                </a>
              </Button>
            </Magnetic>
          </motion.div>
        </div>

        <PaddockHealthCard className="mt-14 lg:absolute lg:top-1/2 lg:right-[7%] lg:mt-0 lg:-translate-y-1/2" />
      </div>
    </section>
  )
}
