---
name: design-system
description: Conventions for building UI in this repo - which installed package handles which job, and how theming works. Use when creating or styling components, adding animations, charts, icons, animated numbers, or toasts, or when tempted to add a new UI dependency.
---

# Design System

This repo ships a complete UI stack. The rule: use what is installed, never
hand-roll an equivalent, never add a new UI dependency without asking first.

## Which package for which job

| Job | Use | Never |
|---|---|---|
| Components (buttons, cards, dialogs...) | `npx shadcn@latest add <name>`, import from `@/components/ui` | hand-rolled primitives |
| Animation / transitions | `motion` (`import { motion } from 'motion/react'`) | CSS keyframe soup, new animation libs |
| Charts | `@visx/*` composables (see `src/components/demo/trend-chart.tsx`) | chart mega-libraries |
| Animated numbers / stats | `@number-flow/react` | hand-rolled counters |
| Icons | `lucide-react` | inline SVG paths, other icon sets |
| Toasts | `sonner` via `@/components/ui/sonner` | alert(), custom toast stacks |
| Class merging | `cn()` from `@/lib/utils` | string concatenation |

## Color and theming rules

- Every color comes from a CSS variable defined in `src/index.css`
  (`--background`, `--primary`, `--muted-foreground`, `--chart-1..5`, ...).
  No hardcoded hex/oklch in components - not in classNames, not in SVG
  attributes. In SVG use `fill="var(--chart-1)"` style references.
- Dark mode is the `.dark` class on `<html>`, toggled by
  `src/components/theme-toggle.tsx` and initialized in `index.html`.
  Every change must look right in both themes - check both before done.
- Text (labels, values, legends) always wears text tokens
  (`text-foreground`, `text-muted-foreground`), never a chart/series color.

## Charts specifically

Follow the dataviz skill when it is available. Baseline rules either way:
2px lines, recessive grid (`var(--border)`), axis labels in
`text-muted-foreground` at 11px, hover tooltip on plots, a table view
alongside any chart (see the Tabs pattern in `src/App.tsx`), no legend for a
single series, no dual axes ever.

## File conventions

- `src/components/ui/` is shadcn-owned: regenerate via CLI, do not hand-edit.
- Compose app components in `src/components/`, import via `@/` alias.
- Demo components in `src/components/demo/` are the living reference for
  these patterns - keep them working; extend them when adding a new pattern.
