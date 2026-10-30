const { test, expect } = require("@playwright/test");
const modes = ["editorial","casebook","systems","atelier","chromatic","pocket","studio","skull-os","xray","museum","terminal","canvas","brutalist","story"];

test("every reload rotates through all fourteen complete art directions", async ({ page }) => {
  await page.goto("./");
  const seen = [];
  for (let i=0;i<modes.length;i++) {
    const key = await page.locator("html").getAttribute("data-design");
    expect(modes).toContain(key);
    expect(seen).not.toContain(key);
    seen.push(key);
    await expect(page.locator("[data-design-name]")).not.toBeEmpty();
    await expect(page.locator("[data-design-index]")).toHaveText(/(0[1-9]|1[0-4]) \/ 14/);
    if (i < modes.length-1) await page.reload();
  }
  expect(new Set(seen).size).toBe(14);
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-design",seen[0]);
});
test("visitor can switch editions manually and the next reload selects another",async ({page})=>{
  await page.goto("./");
  const first = await page.locator("html").getAttribute("data-design");
  await page.locator("[data-design-next]").click();
  const next = await page.locator("html").getAttribute("data-design");
  expect(next).not.toBe(first);
  await page.reload();
  const third = await page.locator("html").getAttribute("data-design");
  expect(third).not.toBe(next);
  await page.locator("[data-design-prev]").click();
  await expect(page.locator("[data-design-name]")).not.toBeEmpty();
});
test("Spanish and English expose the same fourteen design controls",async ({page})=>{
  await page.goto("en/");
  await expect(page.locator("[data-design-next]")).toHaveText(/Next design/);
  await expect(page.locator("[data-design-name]")).not.toBeEmpty();
  await page.locator("[data-design-next]").click();
  await expect(page.locator("html")).toHaveAttribute("data-design",/editorial|casebook|systems|atelier|chromatic|pocket|studio|skull-os|xray|museum|terminal|canvas|brutalist|story/);
  await expect(page.locator(".design-about")).toContainText("Code matters.");
  await page.goto("./");
  await expect(page.locator(".design-about")).toContainText("El código importa.");
});
test("fourteen styles remain accessible on constrained mobile viewport",async({page})=>{
  await page.addInitScript(()=>{
    Object.defineProperty(navigator,"deviceMemory",{value:2,configurable:true});
    Object.defineProperty(navigator,"connection",{value:{saveData:true},configurable:true});
  });
  await page.setViewportSize({width:390,height:844});
  await page.goto("./");
  await expect(page.locator("html")).toHaveAttribute("data-performance","lite");
  for(let i=0;i<modes.length;i++){
    await expect(page.locator("[data-design-ribbon]")).toBeVisible();
    expect(await page.evaluate(()=>document.documentElement.scrollWidth <= innerWidth + 2)).toBe(true);
    await page.locator("[data-design-next]").click();
  }
});
