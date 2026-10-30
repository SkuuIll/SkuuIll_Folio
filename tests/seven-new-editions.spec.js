const {test,expect}=require("@playwright/test");
const editions=["skull-os","xray","museum","terminal","canvas","brutalist","story"];
async function select(page,key){await page.locator("[data-design-select]").selectOption(key);await expect(page.locator("html")).toHaveAttribute("data-design",key);await expect(page.locator('[data-edition-scene="'+key+'"]')).toBeVisible();}
test("all seven new editions are navigable from the selector and keep bilingual content",async({page})=>{
 for(const language of ["./","en/"]){
  await page.goto(language);
  await expect(page.locator("[data-design-select] option")).toHaveCount(14);
  for(const key of editions){
   await select(page,key);
   expect(await page.locator('[data-edition-scene="'+key+'"] h2').count()).toBe(1);
  }
 }
});
test("SKULL OS windows switch projects and link to real case studies",async({page})=>{
 await page.goto("./");await select(page,"skull-os");
 const desk=page.locator("[data-os]");
 await desk.locator('[data-os-open="cpaul"]').click();
 await expect(desk.locator("[data-os-name]")).toContainText("Atelier");
 await expect(desk.locator("[data-os-link]")).toHaveAttribute("href",/\/proyectos\/cpaul\/$/);
 await desk.locator('[data-os-open="repo-setup"]').click();
 await expect(desk.locator("[data-os-placeholder]")).toBeVisible();
 await expect(desk.locator("[data-os-image]")).toBeHidden();
});
test("X-Ray layers update technical explanations without WebGL",async({page})=>{
 await page.goto("./");await select(page,"xray");
 await page.locator('[data-xray-pick="2"]').click();
 await expect(page.locator("[data-xray-count]")).toHaveText("03");
 await expect(page.locator("[data-xray-description]")).toContainText("Persistencia");
 await expect(page.locator('[data-xray-pick="2"]')).toHaveAttribute("aria-pressed","true");
});
test("Museum advances exhibit and links to each documented project",async({page})=>{
 await page.goto("./");await select(page,"museum");
 await page.locator("[data-museum-next]").click();
 await expect(page.locator("[data-museum-title]")).toContainText("Atelier");
 await expect(page.locator("[data-museum-link]")).toHaveAttribute("href",/\/proyectos\/cpaul\/$/);
 await page.locator("[data-museum-previous]").click();
 await expect(page.locator("[data-museum-title]")).toHaveText("Vigía");
});
test("Terminal executes supported commands safely",async({page})=>{
 await page.goto("en/");await select(page,"terminal");
 const input=page.locator("[data-terminal-input]");
 await input.fill("projects");await page.locator("[data-terminal-form] button").click();
 await expect(page.locator("[data-terminal-history] a")).toHaveCount(4);
 await input.fill("<script>alert(1)</script>");await page.locator("[data-terminal-form] button").click();
 await expect(page.locator("[data-terminal-history]")).toContainText("Unknown command");
 expect(await page.locator("[data-terminal-history] script").count()).toBe(0);
 await page.locator('[data-terminal-quick="contact"]').click();
 await expect(page.locator("[data-terminal-history]")).toContainText("moreappmix@gmail.com");
});
test("Canvas supports keyboard panning and bounded zoom",async({page})=>{
 await page.goto("./");await select(page,"canvas");
 const board=page.locator("[data-canvas-viewport]");
 await board.focus();await board.press("ArrowLeft");
 await expect.poll(()=>page.locator("[data-canvas-space]").evaluate(el=>el.style.getPropertyValue("--pan-x"))).toBe("75px");
 await page.locator('[data-zoom="in"]').click();
 await expect(page.locator("[data-canvas-zoom]")).toHaveText("115%");
 await page.locator('[data-zoom="reset"]').click();
 await expect(page.locator("[data-canvas-zoom]")).toHaveText("100%");
});
test("Brutalist and Story controls have meaningful state changes",async({page})=>{
 await page.goto("./");await select(page,"brutalist");
 await page.locator('[data-brutal-pick="3"]').click();
 await expect(page.locator("[data-brutal-count]")).toHaveText("04 / 04");
 await select(page,"story");
 await page.locator("[data-story-next]").click();
 await expect(page.locator("[data-story-index]")).toHaveText("02");
 await expect(page.locator('[data-story-pick="1"]')).toHaveAttribute("aria-current","step");
});
test("new editions remain responsive and switch light/dark on low-memory phones",async({page})=>{
 await page.addInitScript(()=>{
  Object.defineProperty(navigator,"deviceMemory",{configurable:true,value:2});
  Object.defineProperty(navigator,"connection",{configurable:true,value:{saveData:true}});
 });
 await page.setViewportSize({width:390,height:844});
 await page.goto("./");
 for(const key of editions){
  await select(page,key);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2)).toBe(true);
  const before=await page.locator("html").getAttribute("data-theme");
  await page.locator("#theme-toggle").click();
  expect(await page.locator("html").getAttribute("data-theme")).not.toBe(before);
 }
});
