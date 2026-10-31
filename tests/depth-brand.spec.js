const {test,expect}=require("@playwright/test");
test("three real project screenshots form a controllable depth scene",async({page})=>{
 await page.setViewportSize({width:1280,height:900});
 await page.emulateMedia({reducedMotion:"no-preference"});
 await page.goto("./");
 const scene=page.locator(".depth-showcase");
 await scene.scrollIntoViewIfNeeded();
 await expect(scene.locator(".depth-layer img")).toHaveCount(3);
 await expect(scene.locator(".depth-layer img").nth(0)).toHaveAttribute("src",/vigia-modules\.webp$/);
 await expect(scene.locator(".depth-layer img").nth(1)).toHaveAttribute("src",/atelier-colors\.webp$/);
 await expect(scene.locator(".depth-layer img").nth(2)).toHaveAttribute("src",/tactical-map\.webp$/);
 await expect(scene.locator("[data-depth-stage]")).toHaveAttribute("data-active","vigia");
 await scene.locator('[data-depth-pick="cpaul"]').click();
 await expect(scene.locator("[data-depth-stage]")).toHaveAttribute("data-active","cpaul");
 await expect(scene.locator("[data-depth-link]")).toHaveAttribute("href",/\/proyectos\/cpaul\/$/);
 await expect(scene.locator("[data-depth-description]")).toContainText("Editor 3D");
 const rect=await scene.locator("[data-depth-stage]").boundingBox();
 await page.mouse.move(rect.x+rect.width*.72,rect.y+rect.height*.35);
 await expect.poll(()=>scene.locator("[data-depth-stage]").evaluate(el=>el.style.getPropertyValue("--ry"))).not.toBe("0deg");
});
test("mobile keeps readable screenshots and functional project selection",async({page})=>{
 await page.addInitScript(()=>{
  Object.defineProperty(navigator,"deviceMemory",{value:2,configurable:true});
  Object.defineProperty(navigator,"connection",{value:{saveData:true},configurable:true});
 });
 await page.setViewportSize({width:390,height:844});
 await page.goto("./");
 const scene=page.locator(".depth-showcase");
 await scene.scrollIntoViewIfNeeded();
 await expect(page.locator("html")).toHaveAttribute("data-performance","lite");
 await scene.locator('[data-depth-pick="pubg-map"]').click();
 await expect(scene.locator("[data-depth-name]")).toHaveText("Tactical Map");
 await expect(scene.locator("[data-depth-link]")).toHaveAttribute("href",/\/proyectos\/pubg-map\/$/);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2)).toBe(true);
});
test("English project depth is localized and all modes keep their own composition",async({page})=>{
 await page.goto("en/");
 const scene=page.locator(".depth-showcase");
 await expect(scene.getByRole("heading",{name:/Depth with/})).toBeVisible();
 await scene.locator('[data-depth-pick="cpaul"]').click();
 await expect(scene.locator("[data-depth-link]")).toHaveAttribute("href",/\/en\/projects\/cpaul\/$/);
 await expect(page.locator(".brand svg")).toHaveAttribute("viewBox","0 0 64 64");
 await expect(page.locator('link[rel="icon"][type="image/svg+xml"]')).toHaveAttribute("href",/favicon\.svg$/);
 const styles=[];
 await page.goto("en/?design=editorial");
 for(let i=0;i<7;i++){
  const mode=await page.locator("html").getAttribute("data-design");
  const visual=await page.locator(".sp-hero").evaluate(el=>{
   const s=getComputedStyle(el);
   return [s.display,s.gridTemplateColumns,s.borderRadius,s.backgroundImage,s.minHeight].join("|");
  });
  styles.push([mode,visual]);
  await page.goto("en/?design="+["editorial","casebook","systems","atelier","chromatic","pocket","studio"][(i+1)%7]);
 }
 expect(new Set(styles.map(x=>x[0])).size).toBe(7);
 expect(new Set(styles.map(x=>x[1])).size).toBeGreaterThanOrEqual(4);
});
