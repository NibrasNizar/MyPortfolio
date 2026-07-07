// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // --- GitHub Pages deployment ---
  // Pick ONE of the following depending on how the site is hosted. See README for details.
  //
  // 1) Custom domain (recommended, e.g. nibras.dev) OR <username>.github.io user/org site:
  //      site: 'https://nibras.dev',
  //      // no `base` needed
  //
  // 2) Project repo served at <username>.github.io/<repo-name> (no custom domain):
  //      site: 'https://<username>.github.io',
  //      base: '/<repo-name>',
  site: 'https://nibras.dev',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [mdx(), sitemap()]
});