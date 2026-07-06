# Design

## Theme

Dark only (no light mode toggle) — near-black slate background, single sky-blue accent, mono
accents for metrics/code. Chosen for the "modern engineer" register: developer tools,
dashboards, and technical credibility all skew dark, and it's a deliberate visual echo of the
terminals/IDEs the target audience (recruiters evaluating an infra engineer) already associate
with real engineering work.

## Color

| Role | Value | CSS Variable |
|---|---|---|
| Background | `#0f172a` | `--color-background` |
| Foreground | `#f8fafc` | `--color-foreground` |
| Primary (surface) | `#1e293b` | `--color-primary` |
| Secondary | `#334155` | `--color-secondary` |
| Accent | `#38bdf8` | `--color-accent` |
| Accent foreground | `#0f172a` | `--color-accent-foreground` |
| Muted surface | `#272f42` | `--color-muted` |
| Muted text | `#94a3b8` | `--color-muted-foreground` |
| Border | `#475569` | `--color-border` |
| Destructive | `#ef4444` | `--color-destructive` |
| Ring (focus) | `#38bdf8` | `--color-ring` |

Strategy: **restrained** — tinted dark neutrals plus one accent, used for links, primary CTAs,
metrics, and focus states. Accent never exceeds ~10% of any surface. Body text is
`--color-foreground` (near-white) on `--color-background`, not a low-contrast gray-on-gray
pairing.

## Typography

- **Sans (headings + body):** Inter, weights 300–800.
- **Mono (metrics, code, nav wordmark, tags):** JetBrains Mono, weights 400–600.
- Pairing rationale: geometric/humanist sans for prose, monospace for anything that reads as
  data or system output (metrics, stack badges, timestamps) — a contrast axis, not two similar
  sans-serifs.
- Hero h1 caps around `text-6xl` (≈60px) on desktop; never pushed past a 6rem ceiling.

## Layout

- Max content width `max-w-6xl` for hub/grid pages, `max-w-3xl` for long-form prose
  (case studies, courses, about, writing) — caps body line length.
- Section rhythm: `py-16` to `py-24` between major sections, not a single uniform spacing value
  applied everywhere.
- Cards used only where a real link target exists (project/course cards); no nested cards.

## Components

- **Buttons:** solid accent primary (`bg-accent`, dark text for contrast), outlined secondary.
- **Badges (`TagBadge`):** pill, muted surface, mono text — used for stack/skill tags only, not
  as decorative eyebrows.
- **ArchitectureDiagram:** horizontal (desktop) / vertical (mobile) boxes-and-arrows flow, pure
  CSS/SVG, no client-side rendering library.
- **MetricCounter:** count-up animation on scroll into view, `prefers-reduced-motion` shows the
  final value immediately with no animation.

## Motion

- Reduced-motion: global `@media (prefers-reduced-motion: reduce)` override collapses all
  animation/transition durations to near-zero.
- No decorative infinite animation other than the availability-badge status dot (a
  conventional "live" indicator, not ornamental).
- Hover states: 150–300ms transitions, `-translate-y-0.5`/`-translate-y-1` lift on cards and
  primary buttons, no bounce/elastic easing.
