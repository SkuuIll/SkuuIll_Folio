const { test, expect } = require("@playwright/test");

test("English routes have translated content, hreflang, and working case studies", async ({ page }) => {
  await page.goto("en/");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator("#hero-title")).toContainText("real software.");
  await expect(page.locator('link[rel="alternate"][hreflang="es-AR"]')).toHaveAttribute("href", /skuull\.pages\.dev/);
  await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute("href", /\/en\/$/);
  await expect(page.getByRole("link", { name: "EN", exact: true })).toHaveAttribute("aria-current", "page");
  await page.goto("en/projects/");
  await expect(page.locator("h1")).toContainText("More ways");
  await expect(page.locator(".catalog-row")).toHaveCount(21);
  await page.goto("en/projects/vigia/");
  await expect(page.locator("h1")).toContainText("Vigía");
  await expect(page.locator(".case-section").first()).toContainText("Connect the hotel's");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /\/en\/projects\/vigia\/$/);
});

test("Anatomy figure explains distinct states without loading WebGL", async ({ page }) => {
  await page.goto("./");
  const scene = page.locator(".anatomy-section");
  await expect(scene.getByRole("img")).toBeVisible();
  await expect(scene.locator("[data-anatomy-name]")).toHaveText("Interfaz");
  await scene.getByRole("button", { name: "02 Lógica" }).click();
  await expect(scene.locator("[data-anatomy-name]")).toHaveText("Lógica de aplicación");
  await expect(scene.getByRole("button", { name: "02 Lógica" })).toHaveAttribute("aria-pressed", "true");
  await scene.getByRole("button", { name: "03 Entrega" }).click();
  await expect(scene.locator("[data-anatomy-count]")).toHaveText("03 / 03");
});

test("Low-memory data saver devices keep readable fallbacks without heavy rendering", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "deviceMemory", { value: 2, configurable: true });
    Object.defineProperty(navigator, "connection", { value: { saveData: true }, configurable: true });
  });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("./");
  await expect(page.locator("html")).toHaveAttribute("data-performance", "lite");
  await expect(page.locator("html")).toHaveAttribute("data-effects", "off");
  await page.locator(".spatial-frame").scrollIntoViewIfNeeded();
  await expect(page.locator(".spatial-frame")).toHaveAttribute("data-renderer", "fallback");
  await expect(page.locator(".spatial-frame img")).toBeVisible();
  await expect(page.locator("#matrix-toggle")).toBeDisabled();
  await page.locator(".journey-stage").scrollIntoViewIfNeeded();
  await expect(page.locator('.journey-stage[data-spatial="journey"]')).toHaveAttribute("data-renderer", "fallback");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test("footer does not expose presentation preference clutter", async ({ page }) => {
  await page.goto("./");
  await expect(page.locator(".site-footer #material-mode")).toHaveCount(0);
  await expect(page.locator(".site-footer #palette-toggle")).toHaveCount(0);
  await expect(page.getByRole("link", { name: "EN", exact: true })).toBeVisible();
});
