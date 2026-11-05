# Ryan Peart: portfolio

Source for https://rgpeart.github.io/portfolio/, a static [Astro](https://astro.build) site (plain HTML, no client-side JavaScript) so recruiters' tools and link previews can read it.

- Content: `src/data/site.ts`
- Build: `npm ci && npm run build` (output in `dist/`)
- Deploy: pushing to `master` runs `.github/workflows/deploy.yml` (GitHub Pages, source "GitHub Actions")
- The previous React version is kept on the `backup/react-site` branch.
