// One-off: derive a satellite-style placeholder for IMAGE 02 from the real
// river-meander aerial (design.md image rules: photography first, overlays
// subtle at <=15% opacity). Replaced by the real Gemini render later.
import sharp from 'sharp'

const W = 1376
const H = 768

const overlay = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <!-- faint lat/long graticule -->
  <g stroke="#52C7FF" stroke-opacity="0.07" stroke-width="1" fill="none">
    ${Array.from({ length: 9 }, (_, i) => `<line x1="${(i + 1) * (W / 10)}" y1="0" x2="${(i + 1) * (W / 10)}" y2="${H}"/>`).join('')}
    ${Array.from({ length: 5 }, (_, i) => `<line x1="0" y1="${(i + 1) * (H / 6)}" x2="${W}" y2="${(i + 1) * (H / 6)}"/>`).join('')}
  </g>
  <!-- traced paddock boundary vectors -->
  <g stroke="#52C7FF" stroke-opacity="0.35" stroke-width="1.5" fill="none">
    <polygon points="180,120 430,95 470,290 210,330"/>
    <polygon points="905,410 1180,375 1240,560 950,610"/>
    <polygon points="520,470 740,440 790,640 545,680"/>
  </g>
  <!-- one analysed field, subtle heat tint -->
  <polygon points="905,410 1180,375 1240,560 950,610" fill="#18C37E" fill-opacity="0.12"/>
  <polygon points="180,120 430,95 470,290 210,330" fill="#F2B94B" fill-opacity="0.08"/>
  <!-- sampling grid on the analysed field -->
  <g stroke="#52C7FF" stroke-opacity="0.15" stroke-width="0.75" fill="none">
    ${Array.from({ length: 4 }, (_, i) => {
      const t = (i + 1) / 5
      const x1 = 905 + (1180 - 905) * t
      const y1 = 410 + (375 - 410) * t
      const x2 = 950 + (1240 - 950) * t
      const y2 = 610 + (560 - 610) * t
      return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>`
    }).join('')}
    ${Array.from({ length: 4 }, (_, i) => {
      const t = (i + 1) / 5
      const x1 = 905 + (950 - 905) * t
      const y1 = 410 + (610 - 410) * t
      const x2 = 1180 + (1240 - 1180) * t
      const y2 = 375 + (560 - 375) * t
      return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>`
    }).join('')}
  </g>
  <!-- corner registration ticks -->
  <g stroke="#52C7FF" stroke-opacity="0.25" stroke-width="1.5" fill="none">
    <path d="M 24 44 v -20 h 20"/>
    <path d="M ${W - 24} 44 v -20 h -20"/>
    <path d="M 24 ${H - 44} v 20 h 20"/>
    <path d="M ${W - 24} ${H - 44} v 20 h -20"/>
  </g>
</svg>`

await sharp('design/raw-images/river-meander-aerial.png')
  .resize({ width: W, height: H, fit: 'cover' })
  .modulate({ saturation: 0.82, brightness: 0.97 })
  .composite([{ input: Buffer.from(overlay) }])
  .png()
  .toFile('design/raw-images/satellite-intelligence.png')

console.log('wrote design/raw-images/satellite-intelligence.png')
