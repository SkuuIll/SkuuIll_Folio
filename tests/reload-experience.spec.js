const { test, expect } = require("@playwright/test");

test("reloading the home page shows the intro and a different edition", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("./");
  await page.locator("[data-intro-skip]").click();
  const first = await page.locator("html").getAttribute("data-design");
  await page.reload();
  await expect(page.locator("[data-sk-intro]")).toBeVisible();
  const second = await page.locator("html").getAttribute("data-design");
  expect(second).not.toBe(first);
  await page.locator("[data-intro-skip]").click();
  await page.reload();
  await expect(page.locator("[data-sk-intro]")).toBeVisible();
  expect(await page.locator("html").getAttribute("data-design")).not.toBe(second);
});

test("an explicitly linked edition remains stable and reduced motion skips the intro", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("./?design=xray");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-design", "xray");
  await expect(page.locator("[data-sk-intro]")).toBeHidden();
});

test("edition background images respect the deployment base path", async ({ page, request }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const [edition, image] of [["casebook", "atelier-colors.webp"], ["studio", "vigia-modules.webp"]]) {
    await page.goto(`./?design=${edition}`);
    const background = await page.locator(".sp-hero").evaluate((element) => getComputedStyle(element, "::before").backgroundImage);
    expect(background).toContain(`/SkuuIll_Folio/media/${image}`);
    const response = await request.get(`/SkuuIll_Folio/media/${image}`);
    expect(response.ok()).toBeTruthy();
  }
});
