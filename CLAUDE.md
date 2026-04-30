# Landing Box

Experimental 3D z-depth scroll experience. A manifesto on creating and shipping, presented through punk collage visuals in a parallax tunnel.

## Tech Stack

- **Framework**: Vite + React + TypeScript
- **Animation**: GSAP + ScrollTrigger
- **3D**: CSS 3D transforms (designed for R3F migration)
- **Typography**: Clash Display (display), Geist Sans (body)

## Architecture

```
src/
├── components/     # React components (Scene, Zones, Collage, UI)
├── hooks/          # React hooks (scroll, parallax, snap, color)
├── systems/        # Pure logic (scroll controller, parallax engine, color interpolation)
├── data/           # Static data (zone definitions, content)
└── types/          # TypeScript interfaces
```

## Conventions

- **Pure calculations**: All transform/position math in `systems/`, no CSS in logic
- **R3F-ready**: Use Position3D/Transform3D interfaces for all 3D positioning
- **Performance**: Object pool collage elements, viewport culling, `will-change` on animated elements
- **Seeded random**: All procedural generation uses seeded random for reproducibility

## Key Patterns

### Parallax Positioning
```ts
const relativeZ = elementZ - cameraZ;
const scale = perspective / relativeZ;
```

### Zone-Based Architecture
12 zones from z=0 to z=9000. Each zone is either `chaos` (collage elements) or `text` (content clearing).

## Intent Layer

**Before modifying code in a subdirectory, read its AGENTS.md first.**

### Global Invariants

- All 3D transforms go through the parallax engine
- Colors are always derived from z-position via ColorInterpolator
- Never hard-code z-positions; use zone definitions from `data/zones.ts`
