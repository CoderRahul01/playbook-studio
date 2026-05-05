# Design Brief

## Direction

Playbook Builder — Icon-driven, step-centric SaaS for creating visual walkthroughs from web app screenshots.

## Tone

Confident, streamlined, task-focused. Minimalist geometric shapes with sharp teal accents. No decoration—every element serves clarity and sequential flow.

## Differentiation

Large numbered step badges (1, 2, 3, 4) paired with icon-driven action buttons and visual flow. Cards cascade as a process timeline, not a generic list.

## Color Palette

| Token              | OKLCH          | Role                                |
| ------------------ | -------------- | ----------------------------------- |
| background         | 0.16 0.02 260  | Dark base (cool charcoal)           |
| foreground         | 0.93 0.01 260  | Primary text (light cool-gray)      |
| card               | 0.20 0.025 260 | Elevated surfaces                   |
| primary            | 0.65 0.18 195  | Teal/cyan—CTAs, step indicators     |
| accent             | 0.68 0.16 85   | Warm amber/rust—secondary emphasis  |
| muted              | 0.25 0.02 260  | Disabled, inactive states           |
| destructive        | 0.55 0.22 25   | Delete, remove actions (red)        |

## Typography

- Display: **Space Grotesk** — Bold, geometric. Headings (h1–h3), step numbers. 500–700 weights.
- Body: **General Sans** — Refined clarity. UI labels, instructions, descriptions. 400–600 weights.
- Scale: `.text-hero` (5xl md:7xl bold), `.text-heading` (3xl md:4xl bold), `.text-label` (xs semibold uppercase), body (base, lg).

## Elevation & Depth

Two-tier shadow hierarchy: `.shadow-card` (4px, 0.15 opacity) for main content; `.shadow-elevated` (8px, 0.2 opacity) for modals/overlays. No ambient glow. Sharp geometric borders on cards (rounded-lg).

## Structural Zones

| Zone    | Background        | Border                 | Notes                                |
| ------- | ----------------- | ---------------------- | ------------------------------------ |
| Header  | card (0.20)       | border (0.30)          | Logo, nav, sticky top                |
| Content | background (0.16) | —                      | Alternating card (0.20) for sections |
| Footer  | muted (0.25)      | border-top (0.30)      | Links, copyright, subtle background |

## Spacing & Rhythm

Large section gaps (6–8 units) for breathing room between workflow sections. Step cards stacked with 3–4 units between. Micro-spacing: 2–3 units for icon-label pairs, badge-text relationships. Density: spacious (not compact).

## Component Patterns

- Buttons: Solid teal primary (bg-primary text-primary-foreground), tertiary outline for secondary. Rounded-md, 12px padding. Hover: brightness +10%.
- Cards: bg-card, border border-border, shadow-card, rounded-lg. No gradient.
- Step badges: 48×48px, bg-primary, text-primary-foreground, font-bold, rounded-lg. Number + icon centered.
- Icons: 24px, monochrome, placed left of labels or centered in badges.

## Motion

- Entrance: `.fade-in` (0.3s ease-out) on page load. `.slide-in-down` (0.3s ease-out) for modals.
- Hover: Subtle scale (1.02x) on interactive cards, text color shift on links, shadow depth increase on buttons.
- Decorative: None. Smooth transitions on all interactive elements (transition-smooth).

## Constraints

- No full-page gradients. No glow or neon shadows.
- Two fonts only: Space Grotesk (display) + General Sans (body). No serif for body.
- Accent color (teal) used **sparingly**—primary actions, active steps, highlights. Not for text or backgrounds.
- Dark mode only. No light mode variant for MVP.

## Signature Detail

Step badges with sequential numbering (1, 2, 3) replace generic list indices. Paired with action-specific icons (click, scroll, input). Transforms process visualization from instruction list to **visual journey**.
