---
name: dashboard-insights
description: Decide what a dashboard should show before building it - audience, decisions, metric hierarchy. Use when creating or reworking a dashboard, adding tiles or charts, or when the user asks what to display, which metrics matter, or says a dashboard "doesn't show the right things".
---

# Dashboard Insights

Dashboards fail by showing the wrong things, not by being ugly. Plan the
insight set with the user BEFORE writing any component. Never skip to code.

## Step 1: Interview the user

Ask one question at a time. Required before proposing anything:

1. Who views this dashboard, and how often? (role, not name)
2. What decisions or actions do they take from it?
3. What questions do they ask today that it cannot answer?
4. What data actually exists? (read the data layer first - aggregations,
   API responses, source tables)

## Step 2: Apply the decision test

For every existing and proposed tile/chart:

> "What decision does this viewer make with it?"

No decision, no tile. Vanity metrics (totals that never change behavior,
counts nobody acts on) are cut, however impressive they look.

## Step 3: Build the metric hierarchy

- ONE headline metric: the number that answers "are we okay?" in 5 seconds.
  Largest, first, top-left.
- 3 to 5 driver metrics: the levers that explain the headline's movement.
- Everything else is drill-down: behind tabs, expandable rows, or a detail
  page. Never on the main surface.
- Single screen: if it scrolls, the hierarchy is wrong.

## Step 4: Propose, debate, get sign-off

Present the plan as keep / cut / add / reorder against what exists, with a
one-line decision rationale per item. Structure it as a narrative: what
should a viewer conclude in the first 5 seconds, then on inspection?
Debate it with the user. Only after sign-off does implementation start.

## Pairing

- `data-storytelling` skill: narrative structure, annotation, exec framing.
- `dataviz` skill: chart form, color, marks - the HOW after this skill
  settles the WHAT.
- `design-system` project skill: which packages implement it.
