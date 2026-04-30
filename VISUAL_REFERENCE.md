# Visual Style Reference: Landing Box

## 1. Core Aesthetic

**Architectural Wireframe Brutalism**

A stark, mathematical approach to design that treats the canvas as a three-dimensional void. The philosophy centers on exposing the underlying structure—grid lines as bones, negative space as architecture, typography as inhabitant.

**Key influences:**
- Architectural blueprint/technical drawing
- Swiss International Style (grid discipline)
- Brutalist architecture (raw structure exposed)
- Cyberpunk interfaces (dark theme, wireframe aesthetic)
- OMA/Rem Koolhaas visual language

---

## 2. Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| **Void Black** | `#1a1a1a` | Primary background, creates depth |
| **Grid White** | `#ffffff` | Grid lines, primary text |
| **Muted White** | `#b0b0b0` | Secondary text, distant grid lines |
| **Faded Grey** | `#4a4a4a` | Tertiary information, receding elements |

**Total colors: 4** (strict monochromatic)

**Key insight:** The design achieves visual hierarchy purely through opacity and scale, not color variation. This creates a sense of infinite depth.

---

## 3. Typography System

### Headline Style
- **Weight:** Bold/Black (700-900)
- **Family type:** Geometric sans-serif (similar to Clash Display, GT America, or Helvetica Neue)
- **Scale:** Extremely large (80-120px equivalent), commanding presence
- **Treatment:** Stacked lines, left-aligned, tight line-height (~0.9em)

### Body/Secondary Text
- **Weight:** Regular (400)
- **Family type:** Clean sans-serif (Geist Sans, Inter, or similar)
- **Scale:** Small (12-14px), functional
- **Treatment:** Left or right-aligned to edges, often rotated 90°

### Hierarchy Structure
1. **Primary headline** — Maximum scale, full opacity, positioned in upper third
2. **Location/venue text** — Medium scale, stacked vertically on sides
3. **Date/details** — Large but secondary, bottom positioning
4. **Credits/metadata** — Smallest, edge-positioned, often rotated

### Special Considerations
- **Bilingual text:** English primary, Chinese secondary (smaller, adjacent)
- **Rotated text:** Used for marginal information (90° rotation)
- **Credits:** Horizontal divider lines separate categories

---

## 4. Key Design Elements

### Textures and Treatments
- **No textures** — Pure flat rendering
- **Opacity gradients** — Grid lines fade with "distance" in the 3D space
- **Sharp edges** — No anti-aliasing blur on grid lines (crisp 1px)

### Graphic Elements
- **Grid lines:** 1px white lines forming rectangular grid (approx. 80-100px cells)
- **Perspective box:** Central 3D wireframe room/box with vanishing point
- **Floating rectangles:** Solid grey/muted shapes within the 3D space suggesting depth
- **No curves** — Everything is rectilinear

### Layout Structure
- **Grid system:** The 3D wireframe IS the grid — floor, ceiling, walls converge to center
- **Z-depth zones:**
  - Foreground: Large typography
  - Midground: 3D box structure
  - Background: Fading grid lines, floating shapes
- **Edge utilization:** Text positioned at document edges, creating tension with center void

### Unique Stylistic Choices
- **Central void:** The vanishing point is intentionally empty—draws the eye inward
- **Floating solids:** Grey rectangles at various depths suggest physical objects in the wireframe space
- **Asymmetric balance:** Heavy text on left, lighter on right, unified by central perspective

---

## 5. Visual Concept

### Conceptual Bridge
The design visualizes the theme "Subverting The Borders" by literally depicting a bounded space (the wireframe box) while text and shapes break free of that containment. The grid suggests order and structure; the floating elements and asymmetric typography suggest disruption.

### Element Relationships
- **Grid ↔ Typography:** The grid provides the stage; typography occupies it without obeying it
- **3D Space ↔ 2D Text:** Tension between dimensional representation and flat type
- **Center ↔ Edges:** The void pulls inward while text pushes outward

### Ideal Use Cases
- Architectural exhibitions
- Tech/art crossover events
- Manifestos and statements
- Experimental landing pages
- Music/cultural event promotion
- Any context requiring gravitas + edge

---

## Implementation Notes for Landing Box

### For the 3D scroll experience:

1. **Grid must fill viewport** — Floor, ceiling, left wall, right wall, back wall all visible
2. **Grid line styling:** 1px solid white, opacity 0.4-0.8 depending on distance
3. **Floating shapes:** Grey rectangles (`#4a4a4a` to `#7a7a7a`) at various Z-depths
4. **Typography zones:**
   - Large display text: Clash Display Bold
   - Body text: Geist Sans Regular
   - Neon underlines for emphasis (magenta `#ff00ff`, cyan `#00ffff`, yellow `#ffff00`)
5. **Vanishing point:** Center of screen, creates natural focal point
6. **Depth cues:** Elements fade in opacity as they recede

### Text Treatment for Scroll Zones
- **Zone 2 (Paragraph):** Multi-line, left-aligned, medium size
- **Zone 4 (Sentence):** Single powerful line, large scale
- **Zone 6 (Words):** Individual words, massive scale, with neon underlines
- **Zone 8 (Paragraph):** Final message, centered
- **Zone 10 (Closing):** Call to action, command
