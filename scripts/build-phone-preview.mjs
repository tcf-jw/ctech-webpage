// Builds a fully self-contained single-file HTML preview of the homepage
// (JS, CSS, fonts and one WebP size per image inlined as data URIs) for
// viewing on a phone without a server. Usage:
//   node scripts/build-phone-preview.mjs [outFile]
// Generated intermediates live in scripts/.phone/ (gitignored).
import { execSync } from 'node:child_process'
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const ROOT = process.cwd()
const PHONE = path.join(ROOT, 'scripts/.phone')
const OUT = process.argv[2] ?? path.join(ROOT, 'dist-phone/cellutech-preview.html')

await mkdir(PHONE, { recursive: true })

// 1. Inline-image map: one representative size per asset (960w, or the
// closest available), keyed by manifest base name.
const files = (await readdir('public/images')).filter((f) => f.endsWith('.webp'))
const grouped = {}
for (const file of files) {
  const match = file.match(/^(.+)-(\d+)\.webp$/)
  if (!match) continue
  ;(grouped[match[1]] ??= []).push(Number(match[2]))
}
const map = {}
for (const [base, widths] of Object.entries(grouped)) {
  const width = widths.sort((a, b) => Math.abs(a - 960) - Math.abs(b - 960))[0]
  const buf = await readFile(`public/images/${base}-${width}.webp`)
  map[base] = `data:image/webp;base64,${buf.toString('base64')}`
}
await writeFile(path.join(PHONE, 'inline-images.json'), JSON.stringify(map))

// 2. Shim module: same exports as the real manifest, but URL builders
// return data URIs. The alias in the vite config swaps it in.
await writeFile(
  path.join(PHONE, 'images-inline.ts'),
  `import inline from './inline-images.json'
import type { ImageAsset } from '../../src/components/home/images'
export * from '../../src/components/home/images'
const map = inline as Record<string, string>
export function srcSetFor(image: ImageAsset) {
  return \`\${map[image.base]} \${image.width}w\`
}
export function srcFor(image: ImageAsset) {
  return map[image.base]
}
`,
)

// 3. Vite config for the single-file build.
await writeFile(
  path.join(PHONE, 'vite.config.ts'),
  `import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')

export default defineConfig({
  root,
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: [
      {
        find: /^@\\/components\\/home\\/images$/,
        replacement: path.join(root, 'scripts/.phone/images-inline.ts'),
      },
      { find: '@', replacement: path.join(root, 'src') },
    ],
  },
  build: {
    outDir: 'dist-phone',
    emptyOutDir: true,
    assetsInlineLimit: 1_000_000_000,
    cssCodeSplit: false,
    rolldownOptions: { output: { inlineDynamicImports: true } },
  },
})
`,
)

execSync('npx vite build --config scripts/.phone/vite.config.ts', {
  stdio: 'inherit',
})

// 4. Collapse dist-phone into one HTML file.
let html = await readFile('dist-phone/index.html', 'utf8')

// NOTE: replacements use functions so `$&`/`$1` sequences inside the
// minified bundle are not expanded by String.replace.
const cssMatch = html.match(/<link rel="stylesheet"[^>]*href="\/(assets\/[^"]+\.css)"[^>]*>/)
if (cssMatch) {
  const css = await readFile(path.join('dist-phone', cssMatch[1]), 'utf8')
  html = html.replace(cssMatch[0], () => `<style>${css}</style>`)
}

const jsMatch = html.match(/<script type="module"[^>]*src="\/(assets\/[^"]+\.js)"[^>]*><\/script>/)
if (jsMatch) {
  let js = await readFile(path.join('dist-phone', jsMatch[1]), 'utf8')
  js = js.replaceAll('</script>', '<\\/script>')
  html = html.replace(jsMatch[0], () => `<script type="module">${js}</script>`)
}

// Preload targets don't exist inside a single file; favicon becomes a data URI.
html = html.replace(/<link\s+rel="preload"\s+as="image"[\s\S]*?\/>/, '')
const favicon = await readFile('public/favicon.svg')
html = html.replace(
  /href="\/favicon\.svg"/,
  `href="data:image/svg+xml;base64,${favicon.toString('base64')}"`,
)

await writeFile(OUT, html)
console.log(`wrote ${OUT} (${(html.length / 1024 / 1024).toFixed(1)} MB)`)
