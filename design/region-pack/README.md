# Cellutech selected-region asset pack

This pack contains the **selected analysis region** from the stronger concept examples, split into individual transparent assets so Claude Code can layer them on top of the **original drone and satellite images**.

## Included

### Originals
- `originals/drone-original.png`
- `originals/satellite-original.png`

### Individual transparent assets
For each base (`drone` and `satellite`):
- `*-heatmap.svg`
- `*-grid.svg`
- `*-contours.svg`
- `*-sample-sites.svg`
- `*-boundary.svg`
- `*-combined.svg`

### Drop-in code
- `src-dropin/selected-overlay-data.ts`
- `src-dropin/selected-region-overlay.tsx`
- `src-dropin/PATCH.md`

### Claude handover
- `prompts/claude-code-handover.md`

## Recommended usage
Prefer the drop-in React component for production in the website.
Use the raw SVG assets for:
- QA
- design reference
- or direct layer stacking if needed

## Image sizes
- Drone original: 1376 × 768
- Satellite original: 1376 × 768