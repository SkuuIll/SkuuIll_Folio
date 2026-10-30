import { defineConfig } from "astro/config";

// Primary canonical host: SkuuIll on Cloudflare Pages.
// GitHub Pages can override PORTFOLIO_SITE and PORTFOLIO_BASE in its workflow.
const deploymentBase = process.env.PORTFOLIO_BASE || "/SkuuIll_Folio";

export default defineConfig({
  site: process.env.PORTFOLIO_SITE || "https://skuuill.pages.dev",
  base: deploymentBase,
  output: "static",
  trailingSlash: "always",
  build: { format: "directory" },
  devToolbar: { enabled: false },
});
