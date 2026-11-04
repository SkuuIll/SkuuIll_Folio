const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;

test('X-Ray guided animation moves between layers and can be interrupted', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('./?design=xray');
  const experience = page.locator('[data-xray]');
  const play = experience.getByRole('button', { name: 'Reproducir recorrido' });
  await expect(play).toBeVisible();
  await play.click();
  await expect(experience).toHaveAttribute('data-playing', 'true');
  await expect(experience).toHaveAttribute('data-step', '1', { timeout: 3000 });
  await experience.locator('[data-xray-pick="3"]').click();
  await expect(experience).toHaveAttribute('data-playing', 'false');
  await expect(experience).toHaveAttribute('data-step', '3');
  await expect(experience.locator('[data-xray-count]')).toHaveText('04');
});

test('X-Ray works with reduced motion and mobile keyboard controls', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./en/?design=xray');
  const experience = page.locator('[data-xray]');
  await expect(experience.locator('[data-xray-play]')).toHaveCount(1);
  await expect(experience.getByRole('button', { name: 'Play sequence' })).toBeHidden();
  const data = experience.getByRole('button', { name: /Data/ });
  await data.focus();
  await page.keyboard.press('Enter');
  await expect(data).toHaveAttribute('aria-pressed', 'true');
  await expect(experience.locator('[data-xray-description]')).toContainText('Persistence');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
});

test('background tab stops the sequence and pauses ambient motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('./?design=xray');
  const experience = page.locator('[data-xray]');
  await experience.getByRole('button', { name: 'Reproducir recorrido' }).click();
  await expect(experience).toHaveAttribute('data-in-view', 'true');
  await page.evaluate(() => {
    Object.defineProperty(document, 'hidden', { configurable: true, value: true });
    document.dispatchEvent(new Event('visibilitychange'));
  });
  await expect(experience).toHaveAttribute('data-playing', 'false');
  await expect(experience).toHaveAttribute('data-in-view', 'false');
});

test('X-Ray controls meet automated accessibility checks in both themes', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./?design=xray');
  for (const theme of ['dark', 'light']) {
    if (await page.locator('html').getAttribute('data-theme') !== theme) await page.locator('#theme-toggle').click();
    const result = await new AxeBuilder({ page }).include('[data-xray]').withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    expect(result.violations, theme).toEqual([]);
  }
});
