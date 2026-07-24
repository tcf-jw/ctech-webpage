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

Stored in `public/images/`. More to come.

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

## Image Generation Pack Mappings

Images are generated from the Cellutech Gemini image pack (one premium
photography campaign: documentary, ultra realistic, Australian landscapes,
golden hour, medium contrast, slightly desaturated, rich earth tones;
scientific overlays subtle, max 15% opacity; no fake people, no neon, no
obvious AI style).

| Pack ID  | Subject                              | Asset in `public/images/`                          |
| -------- | ------------------------------------ | -------------------------------------------------- |
| IMAGE 01 | Homepage hero (broadacre, GIS overlay, floating card) | `hero-farmland-ui-overlay.png` (clean variant: `hero-farmland-clean.png`) |
| IMAGE 02 | Satellite intelligence               | _not yet uploaded_                                  |
| IMAGE 03 | Macro soil profile                   | `soil-roots-macro.png`                              |
| IMAGE 04 | Agronomist collecting samples        | `agronomist-soil-sampling.png`                      |
| IMAGE 05 | Drone survey over crops              | `drone-paddocks.png`                                |
| IMAGE 06 | Environmental restoration (wetlands) | `wetland-billabong-aerial.png`                      |
| IMAGE 07 | Mining rehabilitation (revegetated)  | `contour-revegetation-aerial.png`                   |
| IMAGE 08 | River system aerial                  | `river-meander-aerial.png`                          |
| IMAGE 09 | Weather station / sensors            | `weather-station-field.png`                         |
| IMAGE 10 | Soil science laboratory              | `soil-lab-analysis.png`                             |

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
