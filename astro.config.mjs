import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// GitHub Pages project site: https://rgpeart.github.io/portfolio/
export default defineConfig({
  site: 'https://rgpeart.github.io',
  base: '/portfolio',
  trailingSlash: 'always',
  integrations: [sitemap()],
});
