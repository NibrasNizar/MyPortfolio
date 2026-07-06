---
target: landing/projects/courses/experience/about pages
total_score: 28
p0_count: 1
p1_count: 1
timestamp: 2026-07-06T19-24-54Z
slug: rc-pages-landing-projects-courses-about-experience
---
Method: dual-agent (A: general-purpose design-review · B: general-purpose detector+browser-evidence)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 3 | Mobile nav never applies the active-page state that desktop nav has |
| 2 | Match System / Real World | 4 | Copy reads like systems documentation, register nailed |
| 3 | User Control and Freedom | 3 | No breadcrumb from course detail back to its track |
| 4 | Consistency and Standards | 2 | 4 near-identical hand-rolled "stat tile" implementations across the site |
| 5 | Error Prevention | 2 | No custom 404 page — Astro default blank page will fire |
| 6 | Recognition Rather Than Recall | 3 | Sticky nav, consistent CTA copy |
| 7 | Flexibility and Efficiency | 3 | Resume reachable from both nav and hero |
| 8 | Aesthetic and Minimalist Design | 3 | Restrained palette/spacing, docked for repeated stat-tile pattern |
| 9 | Error Recovery | 2 | No custom 404; no tested empty/loading states |
| 10 | Help and Documentation | 3 | Appropriately minimal, footer gives one clear contact path |
| **Total** | | **28/40** | **Good** |

## Anti-Patterns Verdict

**LLM assessment**: Mostly clean — no gradient text, no glassmorphism, no numbered section eyebrows. One real hit: the landing-page metric strip (6+, 300+, 50%, 6+, ₹1.8M) is literally the "hero-metric template" PRODUCT.md's own anti-references call out, and the same stat-tile shape recurs 3 more times (CaseStudyLayout dl, metric-cards block, course-status badges) — repetition of a pattern rather than one clean instance.

**Deterministic scan**: 2 warnings, both about font usage (`overused-font`, `single-font` — Inter only). This reads as a false-ish flag: DESIGN.md documents a deliberate Inter (sans) + JetBrains Mono (mono) contrast pairing; the detector likely only scanned the primary `<link>` import line.

**Browser evidence**: No horizontal overflow, no console errors, no text clipping, no layout breaks across all 6 pages at 1440px and 375px. Focus outlines confirmed visible (2px solid, accent-colored) on every tabbed element. A visual "overlap" artifact on several full-page screenshots was confirmed to be the Astro dev toolbar (dev-mode only, fixed-position, baked into full-page screenshots) — not a real bug, won't exist in production build.

## Overall Impression

Solidly executed for a first pass — contrast is genuinely correct (rare for dark themes), case-study structure is real and not templated, reduced-motion is a real global mechanism. The single biggest gap: the site's actual differentiator (Gulf-market-ready, Arabic-speaking) never appears above the fold where an 8-second recruiter skim would see it — that's a positioning miss, not a visual one.

## What's Working

1. **Contrast is correct**: muted-foreground on background computes to ~6.96:1, accent to ~8.3:1 — both clear AA passes.
2. **Case studies are real**, not templated: problem → constraints → architecture → decisions → outcome → "what I'd do differently," confirmed in defect-agent.mdx.
3. **Reduced-motion is a real global override**, not per-component guesswork, and covers the availability-badge pulse too.

## Priority Issues

- **[P0] Hero never states the Gulf-market/Arabic niche.** PRODUCT.md's own design principle #1 requires this in the first sentence; it's currently only in About's "Now" panel, which an 8-second skim never reaches. *Fix: add it to the hero subhead or as a badge near AvailabilityBadge.*
- **[P1] Metric-strip orphan row on mobile.** `grid-cols-2 sm:grid-cols-3 lg:grid-cols-5` with 5 items leaves item 5 alone on its own row at 375px. *Fix: restructure the mobile grid so nothing orphans.*
- **[P2] No custom 404 page.** Undercuts PRODUCT.md's "the site itself is a work sample" principle directly. *Fix: add src/pages/404.astro.*
- **[P2] Four near-identical stat-tile implementations** (MetricCounter, CaseStudyLayout dl, metric-cards block, course status badges) with inconsistent sizing (text-xs vs text-[10px]). *Fix: consolidate where practical.*
- **[P3] Mobile nav has no active-page indicator**, unlike desktop nav. *Fix: apply the same isActive logic to the mobile menu links.*

## Persona Red Flags

- **Jordan (8-second skim)**: Never sees "Gulf-market-ready"/"Arabic-speaking" above the fold — the single biggest differentiator is invisible on first glance.
- **Casey (distracted mobile)**: Metric-strip orphan row reads as a layout bug on first mobile impression.
- **Riley (stress-test)**: Any stale/typo'd URL gets Astro's default blank 404 — a jarring break in an otherwise polished dark theme.

## Minor Observations

- ProjectCard and CourseCard are structurally near-identical; acceptable per DESIGN.md's "cards only where a real link exists" but hub pages could use more visual differentiation.
- Footer social links open in a new tab with no visual "opens in new tab" cue.
