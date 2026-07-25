# CELLUTECH DESIGN SYSTEM

## Brand Position

Enterprise SaaS platform for agronomists.

Think: Planet Labs x Stripe x ArcGIS

NOT farm supplies.
NOT agriculture blog.
NOT government website.

---

## Design Principles

- The product is the hero.
- Data over decoration.
- White space.
- Large typography.
- Calm motion.
- Scientific precision.
- Trust.
- Australian.
- Premium.

---

## Personality

- Scientific
- Confident
- Modern
- Minimal
- Technical
- Evidence-based
- Enterprise

---

## Colour Palette

| Token          | Hex       |
| -------------- | --------- |
| Background     | `#081118` |
| Surface        | `#111A22` |
| Border         | `#243241` |
| Primary        | `#18C37E` |
| Accent         | `#52C7FF` |
| Text Primary   | `#F6F8FA` |
| Text Secondary | `#B5C0CA` |
| Earth          | `#A47B52` |
| Success        | `#47D78C` |
| Warning        | `#F2B94B` |

---

## Typography

| Role    | Typeface      |
| ------- | ------------- |
| Display | Satoshi       |
| Body    | Inter         |
| Data    | IBM Plex Mono |

---

## Border Radius

| Element | Radius |
| ------- | ------ |
| Cards   | 20px   |
| Buttons | 14px   |
| Inputs  | 12px   |

---

## Shadows

- Very subtle.
- No heavy blur.
- Large soft shadows only.

---

## Motion

Motion library: `motion`

Use:

- fade
- stagger
- scale
- parallax
- number counters

Rules:

- No bouncing.
- No flashy animations.
- Animation duration: 0.4–0.8s
- Ease: easeOut

---

## Hero

**Headline**

> Intelligence Beneath Every Hectare

**Subheading**

> AI-powered soil intelligence combining chemistry, microbiology and spatial analytics to deliver evidence-based recommendations for Australian landscapes.

**Primary CTA:** Request a Demo

**Secondary CTA:** Explore Platform

---

## Homepage Structure

1. Navigation
2. Hero
3. Platform Overview
4. Interactive Dashboard
5. Industries
6. How It Works
7. Platform Features
8. Case Studies
9. FAQ
10. CTA
11. Footer

---

## Visual Language

- Topographic lines
- GIS grids
- Soil particles
- Contour maps
- Subtle gradients
- Scientific diagrams
- Minimal icons

---

## Image Rules

- Real photography first.
- AI only enhances.
- No fake humans.
- No obvious AI artwork.
- Landscape is always the hero.

## Image Assets

Raw PNGs live in `design/raw-images/`; `scripts/optimize-images.mjs`
generates the responsive WebP sets served from `public/images/`. More to
come.

| File                           | Content                                                     | Suggested use                    |
| ------------------------------ | ----------------------------------------------------------- | -------------------------------- |
| `hero-farmland-ui-overlay.png` | Aerial patchwork farmland at golden hour, floating UI card  | Hero                             |
| `hero-farmland-clean.png`      | Same aerial farmland, no overlay                            | Hero alternative / backgrounds   |
| `drone-paddocks.png`           | Drone in flight over green paddocks                         | How It Works / data capture      |
| `agronomist-soil-sampling.png` | Agronomist taking a soil core sample in the field           | Case studies / trust             |
| `soil-roots-macro.png`         | Macro of soil profile with roots and moisture droplets      | Soil science / platform features |
| `wetland-billabong-aerial.png` | Aerial wetland/billabong winding through dry pasture        | Environment / carbon             |
| `contour-revegetation-aerial.png` | Aerial of contoured, revegetated terrain rings           | Regeneration / land management   |
| `soil-lab-analysis.png`        | Soil lab bench with sample beakers and instruments          | Chemistry / methodology          |
| `weather-station-field.png`    | Solar-powered weather and soil monitoring station in field  | Sensors / weather                |
| `river-meander-aerial.png`     | Aerial river meander through golden hills                   | Catchments / spatial analytics   |
| `satellite-intelligence.png`   | Satellite view, traced boundaries + sampling grid overlay   | Satellite intelligence           |
| `winter-crop-aerial.png`       | Emerald winter crops, red tracks, lifting mist              | Green-season variety / agriculture |
| `microbial-life-macro.png`     | Backlit root hairs and fungal threads in dark soil          | Microbial Biology pillar         |
| `mine-site-monitoring.png`     | Workers with tablet on revegetated mine slope               | Mining rehabilitation / evidence |

## Flags / Backlog

Deferred items to pick up in a local session:

1. **Demo form backend** — `demo-request-form.tsx` validates and toasts but
   posts nowhere. Wire to an endpoint/email service (and add spam
   protection) before launch.
2. **Satoshi display font** — Fontshare is blocked from the remote build
   environment, so Geist stands in via the `--font-heading` token. Locally:
   download Satoshi from fontshare.com, drop `Satoshi-Variable.woff2` in
   `public/fonts/`, add an `@font-face`, and put `'Satoshi Variable'` first
   in `--font-heading` in `src/index.css`.
3. ~~IMAGE 02 satellite asset~~ — RESOLVED: real Gemini render in place
   (chosen from the candidate batch). Batch-2 prompts for additional shots
   (microbe macro, mine site monitoring, winter crop aerial) live in
   `design/gemini-image-prompts-2.md`; assets pending.
4. **shadcn vendored components** — ui.shadcn.com was proxy-blocked, so
   accordion/sheet/input/textarea/label/separator were vendored from the
   shadcn-ui repo sources (radix-vega style). Optionally re-run
   `npx shadcn@latest add` locally to let the CLI own them.
5. **Absolute URLs for SEO** — og:image and the JSON-LD Organization need
   the production domain once confirmed (currently relative /
   domain-less).
6. **Mobile Lighthouse** — desktop scores 99/100/100/100; mobile-throttled
   perf ~82–85 (SPA boot cost). If mobile perf becomes a hard target,
   consider SSG/prerendering the homepage.
7. **QUEUED: satellite + batch-2 placements** — (a) Paddock Overview gets
   a Drone/Satellite base-imagery toggle using `satellite-intelligence`
   (crossfade, GIS overlays work on both bases) — preferred placement,
   product-first; (b) afterwards, dress all three Platform pillar cards
   together with `soil-lab-analysis`, `microbial-life-macro` and
   `satellite-intelligence` photo headers (all three or none, for
   symmetry). Mine-site-monitoring and winter-crop-aerial placements
   still open (mining industry card / case-studies band).

## Image Generation Pack Mappings

Images are generated from the Cellutech Gemini image pack (one premium
photography campaign: documentary, ultra realistic, Australian landscapes,
golden hour, medium contrast, slightly desaturated, rich earth tones;
scientific overlays subtle, max 15% opacity; no fake people, no neon, no
obvious AI style).

| Pack ID  | Subject                              | Asset in `public/images/`                          |
| -------- | ------------------------------------ | -------------------------------------------------- |
| IMAGE 01 | Homepage hero (broadacre, GIS overlay, floating card) | `hero-farmland-ui-overlay.png` (clean variant: `hero-farmland-clean.png`) |
| IMAGE 02 | Satellite intelligence               | `satellite-intelligence.png` — Gemini render, true nadir: paddock patchwork, creek corridors, traced boundaries + sampling points |
| IMAGE 03 | Macro soil profile                   | `soil-roots-macro.png`                              |
| IMAGE 04 | Agronomist collecting samples        | `agronomist-soil-sampling.png`                      |
| IMAGE 05 | Drone survey over crops              | `drone-paddocks.png`                                |
| IMAGE 06 | Environmental restoration (wetlands) | `wetland-billabong-aerial.png`                      |
| IMAGE 07 | Mining rehabilitation (revegetated)  | `contour-revegetation-aerial.png`                   |
| IMAGE 08 | River system aerial                  | `river-meander-aerial.png`                          |
| IMAGE 09 | Weather station / sensors            | `weather-station-field.png`                         |
| IMAGE 10 | Soil science laboratory              | `soil-lab-analysis.png`                             |
| IMAGE 11 | Microbial life macro (batch 2)       | `microbial-life-macro.png`                          |
| IMAGE 12 | Mine site monitoring (batch 2)       | `mine-site-monitoring.png`                          |
| IMAGE 13 | Winter crop aerial (batch 2)         | `winter-crop-aerial.png`                            |

## Design Reference

`design/homepage-mockup.png` is the visual north star: hero layout with nav
(Platform, Solutions, Industries, Resources, Company, Request a Demo CTA),
floating Paddock Health Index card (score /100, Organic Carbon %, Microbial
Diversity, Available Nitrogen with trend deltas), dashboard preview panels
(Paddock Overview map, Soil Analysis with radar chart, Recommendations with
impact tags, Reports list), industry image packs (Agriculture, Environmental,
Mining Rehabilitation), thin-line green icon style, Satoshi display type.

Audience per the image pack brief: agronomists, agricultural consultants,
mining rehabilitation, environmental restoration, government, research
organisations. Feel: Apple / Planet Labs / Linear / Stripe / OpenAI /
Palantir — not generic farming or sci-fi AI.

Note: the mockup's palette chips (#16A34A green family) predate this
document — the Colour Palette section above (`#18C37E` primary on `#081118`)
is canonical.

---

## Dashboard

- Dark UI
- Map first
- Recommendations
- Analytics
- Weather
- Soil
- Carbon
- Reports
- Layer controls
- Enterprise quality

---

## Components

- Sticky nav
- Glass header
- Hero
- Dashboard preview
- Industry cards
- Statistics
- Testimonials
- CTA
- Footer

All reusable.
