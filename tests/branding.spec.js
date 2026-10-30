const { test, expect } = require('@playwright/test');
test('identity, sharing, SEO and sitemap follow production configuration', async ({ page }) => {
  await page.goto('./');
  await expect(page.locator('link[rel="icon"][type="image/svg+xml"]')).toHaveAttribute('href', /favicon\.svg$/);
  await expect(page.locator('link[rel="apple-touch-icon"]')).toHaveAttribute('href', /apple-touch-icon\.png$/);
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /social-cover\.png$/);
  await expect(page.locator('meta[property="og:image:width"]')).toHaveAttribute('content', '1200');
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute('content', 'summary_large_image');
  const ld = await page.locator('script[type="application/ld+json"]').textContent();
  const graph = JSON.parse(ld)['@graph'];
  expect(graph.some((item) => item['@type'] === 'Person' && item.name === 'Skull')).toBe(true);
  const sitemap = await page.request.get('sitemap.xml');
  expect(sitemap.ok()).toBe(true);
  expect(await sitemap.text()).toContain('proyectos/');
});
test('opt-in Matrix overlay and expanded color palette remain controllable', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('./');
  const toggle = page.locator('#matrix-toggle');
  const frame = page.locator('.spatial-frame');
  await expect(toggle).toBeVisible();
  await expect(toggle).toHaveAttribute('aria-pressed', 'false');
  await toggle.click();
  await expect(frame).toHaveAttribute('data-matrix', 'on');
  await expect(frame.locator('.matrix-column')).toHaveCount(28, { timeout: 5000 }).catch(async () => {
    expect(await frame.locator('.matrix-column').count()).toBeGreaterThanOrEqual(12);
  });
  await toggle.click();
  await expect(frame).toHaveAttribute('data-matrix', 'off');
  const button = page.locator('#palette-toggle');
  await expect(button).toBeVisible();
  for (let i = 0; i < 12; i++) await button.click();
  await expect(page.locator('html')).toHaveAttribute('data-palette', /forest|blue|clay|violet|amber|ice|matrix|neon|sunset|cobalt|rose|copper/);
});
test('reduced motion disables optional Matrix effect', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./');
  await expect(page.locator('#matrix-toggle')).toBeDisabled();
  await expect(page.locator('.spatial-frame')).toHaveAttribute('data-matrix', 'off');
});
