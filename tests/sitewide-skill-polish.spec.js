const { test, expect } = require("@playwright/test");

test("archive shows true project imagery and clear status on narrow screens", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 780 });
  await page.goto("proyectos/?design=editorial");
  await expect(page.locator(".catalog-row")).toHaveCount(21);
  await expect(page.locator(".catalog-row .catalog-thumb")).toHaveCount(21);
  await expect(page.locator(".catalog-row .catalog-thumb img")).toHaveCount(4);
  await expect(page.locator(".catalog-row-status").first()).toBeVisible();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  expect(overflow).toBeLessThanOrEqual(2);
});

test("project journeys offer previous, next, and full archive in both languages", async ({ page }) => {
  await page.goto("proyectos/cpaul/?design=studio");
  const nav = page.getByRole("navigation", { name: "Navegar por los proyectos" });
  await expect(nav).toBeVisible();
  await expect(nav.getByText("02 / 21")).toBeVisible();
  await expect(nav.locator("a.project-journey-previous")).toHaveAttribute("href", /\/proyectos\/vigia\/$/);
  await expect(nav.locator("a.project-journey-next")).toHaveAttribute("href", /\/proyectos\//);
  await page.goto("en/projects/cpaul/?design=studio");
  const enNav = page.getByRole("navigation", { name: "Browse projects" });
  await expect(enNav).toBeVisible();
  await expect(enNav.locator("a.project-journey-all")).toHaveAttribute("href", /\/en\/projects\/$/);
});

test("English archive heading is grammatical and project navigation fits a phone", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 780 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("en/projects/?design=pocket");
  await expect(page.locator("h1")).toContainText("to build.");
  await expect(page.locator("h1")).not.toContainText("de to build.");
  await page.goto("en/projects/vigia/?design=pocket");
  await expect(page.locator(".project-journey-link")).toHaveCount(2);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  expect(overflow).toBeLessThanOrEqual(2);
});
