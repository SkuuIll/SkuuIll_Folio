const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;

for (const language of ['', 'en/']) {
  test(`the seven original editions have distinct headlines in ${language || 'Spanish'}`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    const headlines = [];
    for (const edition of ['editorial', 'casebook', 'systems', 'atelier', 'chromatic', 'pocket', 'studio']) {
      await page.goto(`${language}?design=${edition}`);
      const heading = page.locator('#hero-title');
      await expect(heading).toBeVisible();
      headlines.push((await heading.innerText()).replace(/\s+/g, ' ').trim());
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
    }
    expect(new Set(headlines).size).toBe(7);
    if (language) expect(headlines[0].toLowerCase()).toContain('into real software');
  });
}

test('each edition gives the project section its own heading', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const headings = [];
  for (const edition of ['editorial','casebook','systems','atelier','chromatic','pocket','studio','skull-os','xray','museum','terminal','canvas','brutalist','story']) {
    await page.goto(`./?design=${edition}`);
    headings.push((await page.locator('#portfolio-work-title').innerText()).replace(/\s+/g, ' ').trim());
  }
  expect(new Set(headings).size).toBe(14);
});

test('edition-specific project evidence is visible and usable on phones', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const [edition, selector] of [['systems','.hero-detail--systems'],['atelier','.hero-detail--atelier'],['chromatic','.hero-detail--chromatic'],['pocket','.hero-detail--pocket']]) {
    await page.goto(`./?design=${edition}`);
    const detail=page.locator(selector);
    await expect(detail).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), edition).toBe(true);
    for (const image of await detail.locator('img').all()) {
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate(element => element.naturalWidth)).toBeGreaterThan(0);
    }
    if (edition !== 'systems') await expect(detail.locator('a').first()).toHaveAttribute('href', /\/proyectos\//);
  }
});

test('each edition hero has accessible controls and contrast in light and dark', async ({ page }) => {
  test.setTimeout(120000);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const editions = ['editorial','casebook','systems','atelier','chromatic','pocket','studio','skull-os','xray','museum','terminal','canvas','brutalist','story'];
  for (const theme of ['light', 'dark']) {
    await page.goto('./');
    await page.evaluate(value => localStorage.setItem('skull-theme', value), theme);
    for (const [index, edition] of editions.entries()) {
      await page.goto(`./?design=${edition}`);
      const selector = index < 7 ? '.sp-hero' : `[data-edition-scene="${edition}"]`;
      const result = await new AxeBuilder({ page }).include(selector).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
      expect(result.violations.map(v => ({id:v.id, nodes:v.nodes.map(n=>n.target)})), `${edition} / ${theme}`).toEqual([]);
    }
  }
});
