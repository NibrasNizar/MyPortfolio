# nibras.dev

Portfolio and learning-platform site for Nibras Ahmed Nizar (MLOps Engineer / Technical Lead)
built with Astro, Tailwind CSS, and MDX content collections.

## Project structure

```text
/
├── public/                  # static assets, resume.pdf, favicons, robots.txt
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
"deploy from a branch" method. Two hosting styles are supported, and `astro.config.mjs` has
both documented inline; **uncomment the one you're using**.

### Option A: custom domain or `<username>.github.io` (recommended)

Use this if you buy a custom domain (e.g. `nibras.dev`) or host at the root of
`https://<username>.github.io`. No `base` path needed.

1. In `astro.config.mjs`, set `site: 'https://nibras.dev'` (or your `github.io` URL).
2. If using a custom domain, add a `public/CNAME` file containing just the domain
   (e.g. `nibras.dev`) and configure the domain's DNS with your registrar per
   [GitHub's custom domain docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).
3. In the repo's **Settings → Pages**, set the source to **GitHub Actions**.
4. Push to `release/prod` (or run the workflow manually via **Actions → Deploy to GitHub
   Pages → Run workflow**).

### Option B: project repo without a custom domain

If the site is served at `https://<username>.github.io/<repo-name>`:

1. In `astro.config.mjs`, set `site: 'https://<username>.github.io'` and
   `base: '/<repo-name>'`.
2. Follow steps 3-4 above (no CNAME file needed).

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
