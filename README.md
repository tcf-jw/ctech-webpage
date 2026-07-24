# claude-template

Opinionated starter for webapps and websites, wired for Claude Code.
One `pnpm install` away from a routed, themed, dark-mode, animated app -
with a dashboard reference page included.

## Stack

| Layer | Choice |
|---|---|
| Build | Vite + React 19 + TypeScript, pnpm |
| Routing | react-router (v7) |
| Styling | Tailwind CSS 4, shadcn/ui (radix primitives, CSS-variable theming) |
| Components | shadcn: button, card, table, tabs, select, badge, tooltip, skeleton, sonner, dropdown-menu |
| Animation | motion |
| Charts | visx (+ d3-array / d3-shape) |
| Numbers | @number-flow/react |
| Icons | lucide-react |
| Quality | oxlint, prettier |

## Quick start

```sh
gh repo create my-app --template tcf-jw/claude-template --private --clone
cd my-app
pnpm install
pnpm dev
```

Routes live in `src/App.tsx`; pages in `src/pages/`. The included demo page
(`src/pages/dashboard-demo.tsx`) is a living reference for the stack: stat
tiles with animated numbers, a visx chart bound to theme tokens with hover
tooltip and table view, dark/light toggle, toasts. Keep it while you build
(it doubles as a smoke test), crib from it, delete it when you ship.

## Claude Code integration

- `.claude/settings.json` - permission allowlist (pnpm, shadcn CLI) and
  auto-enabled plugins (frontend-design, security-guidance, superpowers,
  karpathy guidelines).
- `.claude/skills/design-system` - makes Claude use the installed stack
  instead of reinventing it, and keeps all color in theme tokens.
- `.claude/skills/dashboard-insights` - when a dashboard is being built,
  forces the "what should this show" interview before any code.
- `CLAUDE.md` - commands and conventions.

## Theming

All color lives in `src/index.css` as CSS variables (`:root` and `.dark`
blocks). Swap those token values to rebrand the entire app, charts included.
Components never hardcode color.

## Adding components

```sh
npx shadcn@latest add dialog
```

Official registry only. `src/components/ui/` is CLI-owned: regenerate,
do not hand-edit.
