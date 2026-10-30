const {test,expect}=require("@playwright/test");
test("marketing gallery uses documented images, direct project links, and honest labeling",async({page})=>{
 await page.goto("./?design=studio");
 await expect(page.locator(".proof-gallery")).toBeVisible();
 await expect(page.locator(".proof-frame")).toHaveCount(3);
 for(const [id,asset] of [["vigia","vigia-modules.webp"],["cpaul","atelier-colors.webp"],["pubg-map","tactical-map.webp"]]){
  const article=page.locator(".proof-frame").filter({has:page.locator('a[href*="/proyectos/'+id+'/"]')});
  await expect(article.locator("img")).toHaveAttribute("src",new RegExp(asset.replace(".","\\.")+"$"));
  await expect(article.locator("img")).toHaveAttribute("alt",/.+/);
 }
 await expect(page.locator(".proof-gallery-foot")).toContainText("NO SON PUBLICACIONES");
});
test("gallery English labels and links remain localized",async({page})=>{
 await page.goto("en/?design=studio");
 await expect(page.locator(".proof-gallery-foot")).toContainText("NOT APP STORE LISTINGS");
 await expect(page.locator(".proof-frame a[href*='/en/projects/']")).toHaveCount(3);
});
test("marketing gallery stays inside small viewports and accessible in reduced motion",async({page})=>{
 await page.setViewportSize({width:360,height:780});
 await page.emulateMedia({reducedMotion:"reduce"});
 await page.goto("./?design=pocket");
 await expect(page.locator(".proof-frame")).toHaveCount(3);
 const results=await page.evaluate(()=>{
  const frames=[...document.querySelectorAll(".proof-frame")].map(el=>el.getBoundingClientRect());
  const grid=document.querySelector(".proof-gallery-track").getBoundingClientRect();
  return {overflow:document.documentElement.scrollWidth-innerWidth,inside:frames.every(r=>r.left>=grid.left-2&&r.right<=grid.right+2)};
 });
 expect(results.overflow).toBeLessThanOrEqual(2);
 expect(results.inside).toBe(true);
});
