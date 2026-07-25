// Selected analysis region geometry from the Cellutech region asset pack
// (design/region-pack/). Coordinates are in the full 1376x768 image space
// of the drone/satellite base photos; the overlay SVG uses the same
// viewBox with preserveAspectRatio="slice" so everything crops in step
// with the object-cover base imagery.

export type OverlayBase = 'drone' | 'satellite'

export type OverlaySite = {
  id: string
  /** Full-image coordinates (1376x768) */
  x: number
  y: number
  reading: string
}

export type SelectedOverlayRegion = {
  id: string
  code: string
  name: string
  width: number
  height: number
  points: [number, number][]
  sites: OverlaySite[]
  health: number
  organicCarbon: number
}

export const selectedOverlayRegions: Record<
  OverlayBase,
  SelectedOverlayRegion
> = {
  drone: {
    id: 'droneHero',
    code: 'AUS-NW-042',
    name: 'Selected South Field',
    width: 1376,
    height: 768,
    points: [
      [490, 542],
      [798, 516],
      [1143, 615],
      [894, 758],
      [724, 676],
      [736, 625],
      [630, 578],
    ],
    sites: [
      { id: 'P1', x: 725, y: 603, reading: 'OC 3.1% · pH 6.4' },
      { id: 'P2', x: 872, y: 584, reading: 'OC 2.8% · pH 6.2' },
      { id: 'P3', x: 1094, y: 636, reading: 'OC 2.2% · pH 5.8' },
      { id: 'P4', x: 700, y: 716, reading: 'OC 2.9% · pH 6.1' },
      { id: 'P5', x: 862, y: 739, reading: 'OC 2.6% · pH 6.0' },
    ],
    health: 82,
    organicCarbon: 2.65,
  },
  satellite: {
    id: 'satHero',
    code: 'AUS-NW-042',
    name: 'Selected Creekside Block',
    width: 1376,
    height: 768,
    points: [
      [510, 261],
      [666, 278],
      [778, 331],
      [780, 390],
      [734, 430],
      [722, 505],
      [682, 587],
      [568, 602],
      [485, 549],
      [453, 469],
      [453, 349],
    ],
    sites: [
      { id: 'P1', x: 557, y: 322, reading: 'OC 3.1% · pH 6.4' },
      { id: 'P2', x: 724, y: 414, reading: 'OC 2.8% · pH 6.2' },
      { id: 'P3', x: 639, y: 462, reading: 'OC 2.4% · pH 5.9' },
      { id: 'P4', x: 529, y: 541, reading: 'OC 2.9% · pH 6.1' },
      { id: 'P5', x: 688, y: 549, reading: 'OC 2.6% · pH 6.0' },
      { id: 'P6', x: 624, y: 503, reading: 'OC 2.2% · pH 5.8' },
    ],
    health: 82,
    organicCarbon: 2.65,
  },
}

/**
 * Map full-image coordinates to percentages of the visible aspect-4/3
 * center crop (the map container). The 16:9 source loses 12.5% on each
 * side under object-cover.
 */
export function toCropPercent(x: number, y: number) {
  return {
    x: ((x / 1376 - 0.125) / 0.75) * 100,
    y: (y / 768) * 100,
  }
}
