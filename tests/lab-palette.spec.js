const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;

test('palette studio switches the sample without changing the site theme', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./?design=editorial');
  const originalPalette = await page.locator('html').getAttribute('data-palette');
  await page.getByRole('tab', { name: /Paletas/ }).click();
  const sample = page.locator('[data-palette-preview]');
  await expect(sample).toHaveAttribute('data-lab-palette', 'forest');
  await page.getByRole('button', { name: 'Cobre', exact: true }).click();
  await expect(sample).toHaveAttribute('data-lab-palette', 'copper');
  await expect(page.getByRole('button', { name: 'Cobre', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('html')).toHaveAttribute('data-palette', originalPalette);
  await page.getByRole('button', { name: 'Restablecer paleta' }).click();
  await expect(sample).toHaveAttribute('data-lab-palette', 'forest');
});

test('English lab state messages and palette controls are localized on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('en/');
  await page.getByRole('tab', { name: /Interfaces/ }).click();
  await page.getByRole('button', { name: 'Working', exact: true }).click();
  await expect(page.locator('#interface-status')).toHaveText('Processing your idea…');
  await page.getByRole('tab', { name: /Palettes/ }).click();
  await page.getByRole('button', { name: 'Copper', exact: true }).click();
  await expect(page.locator('[data-palette-preview]')).toHaveAttribute('data-lab-palette', 'copper');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBeTruthy();
});

test('all preview palettes meet automated accessibility checks', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./?design=editorial');
  await page.getByRole('tab', { name: /Paletas/ }).click();
  for (const name of ['Bosque', 'Cobre', 'Índigo']) {
    await page.getByRole('button', { name, exact: true }).click();
    const result = await new AxeBuilder({ page }).include('#panel-palette').withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    expect(result.violations, name).toEqual([]);
  }
});
