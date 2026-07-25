# Claude Code handover — selected heatmap and contours assets

You are working in `tcf-jw/ctech-webpage`.

## Goal
Use the supplied transparent overlay assets and drop-in files to render the selected paddock analysis region on top of the **existing original drone and satellite images**.

The user specifically wants:
- the **heatmap** and **contours** as individual assets,
- the ability to apply them on top of the original image,
- and a clean handover implementation for Claude Code.

## Files provided
- `originals/drone-original.png`
- `originals/satellite-original.png`

### Transparent assets
For each base there are:
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

## Implementation preference
Prefer the React / inline-SVG implementation from:
- `selected-overlay-data.ts`
- `selected-region-overlay.tsx`

Use the raw SVG assets mainly as:
- visual references
- QA references
- or a fallback if needed

## Required behaviour
1. Keep the current drone/satellite base image system.
2. Keep the current layer toggle UX.
3. Render the selected region only — do not add multi-field switching in this pass.
4. Preserve the current dark, premium Cellutech UI.
5. Use the supplied geometry so the selected region aligns with the originals.
6. Ensure:
   - `health` toggles only the heatmap
   - `grid` toggles only the grid
   - `contours` toggles only the contours
   - `sites` toggles only the sample markers
   - `paddocks` shows the selected boundary
7. Verify desktop and mobile layouts.
8. Keep the overlay as `pointer-events-none`.

## Acceptance criteria
- The original images remain unchanged.
- Heatmap and contours can be treated as distinct visual layers.
- The selected region visually matches the stronger concept examples.
- No layout overflow or broken Safari/mobile sizing.
- `pnpm lint` passes.
- `pnpm build` passes.

After implementation, summarise:
- what files were changed
- whether you used the code implementation or raw SVG stacking
- any coordinate tweaks made during browser QA