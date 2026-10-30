const { test, expect } = require("@playwright/test");
const choose = async (page,mode) => {
 await page.locator("[data-design-select]").selectOption(mode);
 await expect(page.locator("html")).toHaveAttribute("data-design",mode);
};
test("first visit shows SKULL ident, skip works, subsequent loads do not wait",async({page})=>{
 await page.emulateMedia({reducedMotion:"no-preference"});
 await page.goto("./");
 const intro=page.locator("[data-sk-intro]");
 await expect(intro).toBeVisible();
 await intro.getByRole("button",{name:"Omitir intro"}).click();
 await expect(intro).toBeHidden();
 await page.reload();
 await expect(page.locator("[data-sk-intro]")).toBeHidden();
 await page.goto("en/");
 await expect(page.locator("[data-sk-intro]")).toBeHidden();
});
test("intro dismisses automatically and never blocks navigation indefinitely",async({page})=>{
 await page.emulateMedia({reducedMotion:"no-preference"});
 await page.goto("./");
 await expect(page.locator("[data-sk-intro]")).toBeVisible();
 await expect(page.locator("[data-sk-intro]")).toBeHidden({timeout:4200});
 await expect(page.locator("[data-design-select]")).toBeVisible();
});
test("reduced motion skips the intro",async({page})=>{
 await page.emulateMedia({reducedMotion:"reduce"});
 await page.goto("./");
 await expect(page.locator("[data-sk-intro]")).toBeHidden();
});
test("low memory and save-data devices bypass the overlay",async({page})=>{
 await page.addInitScript(()=>{
  Object.defineProperty(navigator,"deviceMemory",{configurable:true,value:2});
  Object.defineProperty(navigator,"connection",{configurable:true,value:{saveData:true}});
 });
 await page.goto("./");
 await expect(page.locator("html")).toHaveAttribute("data-performance","lite");
 await expect(page.locator("[data-sk-intro]")).toBeHidden();
});
test("editorial canvas uses real artwork and reversible accessible project cards",async({page})=>{
 await page.goto("./");
 await choose(page,"canvas");
 const first=page.locator('[data-canvas-card="vigia"]');
 await expect(first.locator("img")).toHaveAttribute("src",/vigia-modules\.webp$/);
 const front=first.locator("[data-canvas-front]");
 const back=first.locator("[data-canvas-back]");
 await expect(front).toBeVisible();await expect(back).toBeHidden();
 await front.locator("button").click();
 await expect(front).toBeHidden();await expect(back).toBeVisible();
 await expect(back.locator("a")).toHaveAttribute("href",/\/proyectos\/vigia\/$/);
 await back.locator("button").click();
 await expect(front).toBeVisible();await expect(back).toBeHidden();
});
test("Story Mode chapters update original imagery and stamped progress",async({page})=>{
 await page.goto("en/");
 await choose(page,"story");
 const story=page.locator("[data-story]");
 await expect(story.locator("[data-story-photo]")).toHaveAttribute("src",/vigia-modules\.webp$/);
 await story.locator("[data-story-next]").click();
 await expect(story.locator("[data-story-index]")).toHaveText("02");
 await expect(story.locator("[data-story-photo]")).toHaveAttribute("src",/atelier-colors\.webp$/);
 await expect(story.locator("[data-story-seal-number]")).toHaveText("02");
 await story.focus();await page.keyboard.press("ArrowRight");
 await expect(story.locator("[data-story-index]")).toHaveText("03");
});
test("intro and illustrated modes do not overflow a small phone",async({page})=>{
 await page.setViewportSize({width:390,height:844});
 await page.goto("./");
 for(const mode of ["canvas","story","museum","terminal"]){
  await choose(page,mode);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2)).toBe(true);
 }
});
