// One-off asset pipeline: converts the raw photography in design/raw-images
// into responsive WebP sets in public/images (committed). Re-run after adding
// a new raw image: node scripts/optimize-images.mjs
import { mkdir, readdir } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const RAW_DIR = 'design/raw-images'
const OUT_DIR = 'public/images'

const HERO_WIDTHS = [640, 1280, 1920, 2560]
const CARD_WIDTHS = [480, 960, 1440]
const HEROES = new Set(['hero-farmland-clean', 'hero-farmland-ui-overlay'])

await mkdir(OUT_DIR, { recursive: true })
const files = (await readdir(RAW_DIR)).filter((f) => f.endsWith('.png'))
const manifest = []

for (const file of files) {
  const base = path.basename(file, '.png')
  const src = sharp(path.join(RAW_DIR, file))
  const { width, height } = await src.metadata()
  const isHero = HEROES.has(base)
  const widths = (isHero ? HERO_WIDTHS : CARD_WIDTHS).filter((w) => w < width)
  widths.push(width) // native width is always the top rung

  for (const w of widths) {
    await src
      .clone()
      .resize({ width: w })
      .webp({ quality: isHero ? 78 : 75 })
      .toFile(path.join(OUT_DIR, `${base}-${w}.webp`))
  }
  manifest.push({ base, width, height, widths })
}

// Social card from the hero with the baked-in UI overlay.
await sharp(path.join(RAW_DIR, 'hero-farmland-ui-overlay.png'))
  .resize({ width: 1200, height: 630, fit: 'cover', position: 'attention' })
  .jpeg({ quality: 80 })
  .toFile(path.join(OUT_DIR, 'og.jpg'))

console.log(JSON.stringify(manifest, null, 2))
