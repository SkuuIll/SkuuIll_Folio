# SkuuIll / Skull — project guidance for coding agents

This is the public **Skull** portfolio (Astro 7, TypeScript, static output). The canonical production URL is https://skuull.pages.dev/. Cloudflare Pages builds `main` with `PORTFOLIO_BASE=/` and Node 24. The separate GitHub profile is `SkuuIll/SkuuIll`.

## Priorities

1. **Real work, truthful presentation.** Use verified projects and assets; distinguish public demos, private work, concept visuals and screenshots. Never disclose credentials, private code or confidential client information.
2. **Distinctive, legible UX.** Preserve the existing editorial/technical visual identity, thoughtful typography, clear calls to action and responsive navigation. Avoid generic gradients or decorative noise that obscures content.
3. **Accessibility first.** Test keyboard navigation, visible focus, semantic headings, alt text, color contrast, 200% zoom, smaller viewports and `prefers-reduced-motion`. Interactive Canvas/WebGL must degrade gracefully.
4. **Performance and privacy.** Prefer locally hosted assets, optimized media, lazy-loading of heavy effects and no unnecessary trackers or dependencies.
5. **Evidence before deployment.** Make focused changes; run `npm ci`, `npm run check`, `npm run check:privacy`, `npm run build` and `npx playwright test --workers=2` when browser dependencies are available. Never claim these checks ran when they did not.

## Optional external skills / agent workflows

See [docs/agent-toolkit.md](docs/agent-toolkit.md) for the current upstream links and supported install commands. These projects **are not vendored or installed by this file**:

- **UI UX Pro Max** — design system exploration, layout, typography, palettes and UX patterns.
- **Impeccable** — targeted visual critique, design audit and anti-pattern detection.
- **Superpowers** — plan-driven changes, test-first implementation, systematic debugging and verification.

When tools are installed in a developer's coding agent, use their current upstream instructions rather than assuming commands are universally available. Evaluate outputs against [docs/design-quality.md](docs/design-quality.md), preserve existing behavior, and review third-party dependencies/hooks before activating them.

## Delivery

- Each change should have a clear user-facing purpose, a reviewable diff and a validation record.
- Prefer a pull request for major visual changes. Preserve production URLs, canonical/OG metadata, and accessibility fallbacks.
- This repository is the website; the GitHub profile README is maintained separately.
