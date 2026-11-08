# Contributing

`master` is protected: nothing is committed to it directly. Every change goes through a pull request whose build passes. Merging to `master` deploys the site to GitHub Pages.

## Workflow

1. Branch from an up-to-date `master`: `feature/<topic>`, `fix/<topic>` or `docs/<topic>`.
2. Make small commits, one logical step each, with an imperative subject and a body that says why.
3. Check the build locally: `npm ci && npm run build`, then `npm run preview` to look at it.
4. Open a pull request using the template. State what you checked and what you did not.
5. The `check` build must pass and open review conversations must be resolved.
6. The maintainer merges. Merge commits and rebase merges are allowed, squash is not. The branch is deleted after merge.

Site content lives in `src/data/site.ts`. The daily scheduled deploy only rebuilds the site (it refreshes the GitHub contributions graph) and does not commit.
