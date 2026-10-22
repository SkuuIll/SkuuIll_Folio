const { test, expect } = require("@playwright/test");

test("featured work links to six complete case studies", async ({ page }) => {
  await page.goto("./");
  const section = page.locator("#trabajo");
  await expect(section.getByRole("heading", { name: /software/i })).toBeVisible();
  await expect(section.locator(".portfolio-work-card")).toHaveCount(6);
  await expect(page.locator("#capacidades .portfolio-capability")).toHaveCount(4);
  for (const link of await section.locator(".portfolio-work-link").all()) {
    const url = await link.getAttribute("href");
    expect(url).toMatch(/\/SkuuIll_Folio\/proyectos\/[a-z0-9-]+\/$/);
    expect(await link.getAttribute("aria-label")).toMatch(/Ver el caso/);
  }
});

for (const width of [360, 768, 1440]) {
  test(`showcase fits ${width}px viewport`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("./");
    await expect(page.locator("#trabajo")).toBeVisible();
    await expect(page.locator("#capacidades")).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    await expect(page.locator("html")).toHaveAttribute("data-motion-mode", "reduced");
  });
}

test("system motion changes affect the canvas without hiding content", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("./");
  await expect(page.locator("#signal-canvas")).toHaveAttribute("data-running", "false");
  await expect(page.locator("#trabajo .portfolio-work-card").first()).toBeVisible();
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(page.locator("html")).toHaveAttribute("data-effects", "full");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator("html")).toHaveAttribute("data-effects", "off");
});
