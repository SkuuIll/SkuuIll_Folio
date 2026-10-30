const { test, expect } = require("@playwright/test");

test("architecture diagram changes with the selected real project", async ({ page }) => {
  await page.goto("./");
  const demo = page.locator(".architecture-console");
  await demo.scrollIntoViewIfNeeded();
  await expect(demo.locator("[data-arch-title]")).toContainText("Vigía");
  await demo.locator('[data-arch-project="cpaul"]').click();
  await expect(demo.locator("[data-arch-title]")).toContainText("CPAUL");
  await expect(demo.locator("[data-arch-node-title]").first()).toHaveText("Next.js / React");
  await expect(demo.locator("[data-arch-case]")).toHaveAttribute("href", /\/proyectos\/cpaul\/$/);
  await demo.locator('[data-arch-node="2"]').click();
  await expect(demo.locator('[data-arch-node="2"]')).toHaveAttribute("aria-pressed", "true");
  await expect(demo.locator("[data-arch-detail]")).toContainText("Prisma");
  await demo.locator('[data-arch-project="repo-setup"]').click();
  await expect(demo.locator("[data-arch-node-title]").first()).toHaveText("Windows / Linux");
  await expect(demo.locator("[data-arch-case]")).toHaveAttribute("href", /\/proyectos\/repo-setup\/$/);
});

test("play button triggers visible packet animation and useful status text", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("./");
  const demo = page.locator(".architecture-console");
  await demo.locator("[data-arch-replay]").click();
  await expect(demo.locator(".architecture-stage")).toHaveAttribute("data-flow", "running");
  await expect(demo.locator(".architecture-wire").first()).toHaveCSS("animation-name", "arch-wire");
  await expect(demo.locator("[data-arch-replay]")).toBeDisabled();
  await expect(demo.locator(".architecture-stage")).toHaveAttribute("data-flow", "idle", {timeout:5000});
  await expect(demo.locator("[data-arch-feedback]")).toContainText("completado");
  await expect(demo.locator('[data-arch-node="3"]')).toHaveAttribute("aria-pressed", "true");
});

test("journey camera follows native scroll in both directions and stops when hidden", async ({
  page,
}) => {
  await page.goto("./");
  const stage = page.locator('[data-spatial="journey"]');
  const canvas = stage.locator("canvas");
  const seek = (progress) =>
    page.evaluate((p) => {
      const section = document.querySelector(".portal-journey");
      const stage = section.querySelector(".journey-stage");
      scrollTo(
        0,
        section.offsetTop + (section.offsetHeight - stage.offsetHeight) * p,
      );
    }, progress);
  await seek(0.1);
  await expect(stage).toHaveAttribute("data-ready", "true");
  await expect(canvas).toHaveAttribute("data-running", "true");
  await expect(page.locator("[data-journey-label]")).toHaveText("01 / ENTRAR");
  const start = await canvas.screenshot();
  await seek(0.8);
  await expect(page.locator("[data-journey-label]")).toHaveText(
    "03 / DESCUBRIR",
  );
  await page.waitForTimeout(400);
  expect((await canvas.screenshot()).equals(start)).toBe(false);
  await seek(0.45);
  await expect(page.locator("[data-journey-label]")).toHaveText(
    "02 / ATRAVESAR",
  );
  await page.evaluate(() => {
    Object.defineProperty(document, "hidden", {
      configurable: true,
      value: true,
    });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await expect(canvas).toHaveAttribute("data-running", "false");
  await page.evaluate(() => {
    Object.defineProperty(document, "hidden", {
      configurable: true,
      value: false,
    });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await expect(canvas).toHaveAttribute("data-running", "true");
  await page.getByRole("link", { name: /Ir al laboratorio/ }).click();
  await expect(page).toHaveURL(/#laboratorio$/);
  await expect(canvas).toHaveAttribute("data-running", "false");
});


test("WebGL failure preserves the diagram and portal fallback", async ({ page }) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function(type, options) {
      return type === "webgl2" ? null : original.call(this,type,options);
    };
  });
  await page.goto("./");
  const board = page.locator(".architecture-console");
  await board.scrollIntoViewIfNeeded();
  await expect(board.locator(".architecture-node")).toHaveCount(4);
  await board.locator('[data-arch-project="cpaul"]').click();
  await expect(board.locator("[data-arch-title]")).toContainText("CPAUL");
  await page.locator("#recorrido").scrollIntoViewIfNeeded();
  await expect(page.locator(".journey-fallback")).toBeVisible();
  await expect(page.locator("#journey-title")).toBeVisible();
  await page.getByRole("link", { name: /Ir al laboratorio/ }).click();
  await expect(page).toHaveURL(/#laboratorio$/);
});

test("touch controls and diagrams do not cause horizontal overflow", async ({ browser }) => {
  const context = await browser.newContext({
    viewport:{width:390,height:844}, hasTouch:true,isMobile:true,
  });
  try {
    const page = await context.newPage();
    await page.goto("http://127.0.0.1:4179/SkuuIll_Folio/");
    const board = page.locator(".architecture-console");
    await board.scrollIntoViewIfNeeded();
    await board.locator('[data-arch-project="repo-setup"]').click();
    await expect(board.locator("[data-arch-title]")).toHaveText("Repo Setup Kit");
    await board.locator('[data-arch-node="3"]').click();
    await expect(board.locator('[data-arch-node="3"]')).toHaveAttribute("aria-pressed","true");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  } finally { await context.close(); }
});
