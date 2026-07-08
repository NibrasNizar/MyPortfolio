# nibras.dev

Portfolio and learning-platform site for Nibras Ahmed Nizar (MLOps Engineer / Technical Lead)
built with Astro, Tailwind CSS, and MDX content collections.

## Project structure

```text
/
├── public/                  # static assets, resume.pdf, favicons
├── src/
│   ├── components/          # shared UI (Nav, Footer, cards, MetricCounter, ...)
│   ├── content/
│   │   ├── projects/*.mdx   # case studies (schema: src/content.config.ts)
│   │   ├── courses/*.mdx    # course pages
│   │   └── writing/*.mdx    # blog posts
│   ├── layouts/             # BaseLayout, CaseStudyLayout, PostLayout
│   └── pages/                # routes
├── design-system/           # ui-ux-pro-max persisted design tokens
├── PRODUCT.md / DESIGN.md   # impeccable-skill strategic + visual source of truth
└── astro.config.mjs
```

## Commands

| Command | Action |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview the production build locally |

## Branching

- `release/dev` → `release/qa` → `release/prod` is the release train.
- Feature work happens on `feature/<name>` branches cut from `release/dev`.
- The deploy workflow (`.github/workflows/deploy.yml`) triggers on push to `release/prod` only.

## Deploying to GitHub Pages

This repo is set up for GitHub Actions-based deployment (`withastro/action`), not the legacy
"deploy from a branch" method.

`site` and `base` in `astro.config.mjs` are read from the `SITE_URL` / `BASE_PATH` env vars
(defaulting to `https://nibras.dev` with no base path if unset), so switching hosts is a
one-line change in the workflow, not a code edit. Every internal link in the codebase goes
through `src/lib/url.ts`'s `withBase()` helper (or, for links written in MDX content prose, a
`rehype` plugin that rewrites them at render time) — so this stays correct automatically, no
per-file changes needed when the hosting setup changes.

### Current setup: GitHub Pages project site (no custom domain yet)

The site deploys to `https://nibrasnizar.github.io/MyPortfolio/`. `.github/workflows/deploy.yml`
sets:

```yaml
SITE_URL: https://nibrasnizar.github.io
BASE_PATH: /MyPortfolio
```

Nothing else to configure for this path — no CNAME, no DNS.

### Switching to a custom domain later (e.g. nibras.dev)

1. Buy the domain and point its DNS at GitHub Pages per
   [GitHub's custom domain docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).
2. Add a `public/CNAME` file containing just the domain (e.g. `nibras.dev`).
3. In `.github/workflows/deploy.yml`, set `SITE_URL: https://nibras.dev` and remove the
   `BASE_PATH` line entirely (a custom domain always serves at the root).
4. Re-run the deploy workflow.

### Enabling Pages

**Settings → Pages → Build and deployment → Source → GitHub Actions.** This only needs to be
done once per repo.

## Post-deploy checklist

- [ ] Submit `https://<your-domain>/sitemap-index.xml` to
      [Google Search Console](https://search.google.com/search-console).
- [ ] Run the [Rich Results Test](https://search.google.com/test/rich-results) against the
      homepage and a case-study page to validate the Person/WebSite/BlogPosting JSON-LD.
- [ ] Verify OG cards render correctly in the
      [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) (share the homepage
      and one project URL).
- [ ] Confirm `resume.pdf`, `robots.txt`, and `rss.xml` are reachable at the live domain.
- [ ] If a Buttondown account exists for the course waitlist, set `buttondownUsername` in
      `src/consts.ts` (falls back to a mailto link until then).
- [ ] If a GoatCounter account exists for analytics, set `goatcounterSite` in
      `src/consts.ts` (no tracking script ships until then).

## Learn more

[Astro documentation](https://docs.astro.build).
