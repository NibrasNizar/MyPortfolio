// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import rehypeBaseLinks from './src/lib/rehype-base-links.mjs';

// --- Hosting config, driven by env vars so switching hosts is a one-line change ---
// (set in .github/workflows/deploy.yml, or locally, not hardcoded here) --
//
// Current: GitHub Pages project site at https://<username>.github.io/<repo-name>
//   SITE_URL=https://nibrasnizar.github.io
//   BASE_PATH=/MyPortfolio
//
// Future: custom domain (e.g. nibras.dev), served at the root -- no BASE_PATH needed:
//   SITE_URL=https://nibras.dev
//   (BASE_PATH unset)
//
// See README for the full walkthrough, and src/lib/url.ts for how internal links stay
// base-aware without per-file edits.
const site = process.env.SITE_URL || 'https://nibras.dev';
const base = process.env.BASE_PATH || '/';

// https://astro.build/config
export default defineConfig({
  site,
  base,

  vite: {
    plugins: [tailwindcss()]
  },

  markdown: {
    rehypePlugins: [[rehypeBaseLinks, base]]
  },

  integrations: [mdx(), sitemap()]
});
