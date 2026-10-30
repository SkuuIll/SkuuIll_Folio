const {test,expect}=require("@playwright/test");
const modes=["editorial","casebook","systems","atelier","chromatic","pocket","studio","skull-os","xray","museum","terminal","canvas","brutalist","story"];
async function gotoClean(page,path="./"){
 await page.addInitScript(()=>{try{sessionStorage.setItem("skull-intro-seen","1")}catch{}});
 await page.goto(path);
}
async function select(page,mode){
 await page.locator("[data-design-select]").selectOption(mode);
 await expect(page.locator("html")).toHaveAttribute("data-design",mode);
}
test("all 14 editions now change the actual project/capability/about compositions",async({page})=>{
 await gotoClean(page);
 await page.setViewportSize({width:1440,height:900});
 const signatures=[];
 for(const mode of modes){
  await select(page,mode);
  await expect(page.locator("[data-work-edition-name]")).toBeVisible();
  const current=await page.locator("[data-work-edition-name]").innerText();
  expect(current.length).toBeGreaterThan(4);
  const signature=await page.evaluate(()=>{
   const value=(selector,prop)=>getComputedStyle(document.querySelector(selector))[prop];
   const rect=(selector)=>Math.round(document.querySelector(selector).getBoundingClientRect().width);
   return {
    projectColumns:value(".portfolio-work-grid","gridTemplateColumns"),
    cardColumns:value(".portfolio-work-card .portfolio-work-link","gridTemplateColumns"),
    cardDisplay:value(".portfolio-work-card .portfolio-work-link","display"),
    cardAspect:value(".portfolio-work-card .portfolio-work-media","aspectRatio"),
    capabilityColumns:value(".portfolio-capabilities-grid","gridTemplateColumns"),
    capabilityRadius:value(".portfolio-capability","borderRadius"),
    aboutColumns:value(".design-about","gridTemplateColumns"),
    contactBorder:value(".contact-section","borderTopWidth"),
    cardWidth:rect(".portfolio-work-card")
   };
  });
  signatures.push({mode,signature:JSON.stringify(signature)});
 }
 expect(new Set(signatures.map(x=>x.signature)).size).toBe(14);
});
test("project edition label follows the selector in both languages",async({page})=>{
 for(const path of ["./","en/"]){
  await gotoClean(page,path);
  await select(page,"museum");
  const label=page.locator("[data-work-edition-name]");
  await expect(label).toContainText("Digital Museum");
  await select(page,"terminal");
  await expect(label).toContainText("Terminal");
  await expect(page.locator("[data-work-edition-note]")).not.toBeEmpty();
 }
});
test("14 different project layouts remain inside the viewport on small phones",async({page})=>{
 await page.setViewportSize({width:390,height:844});
 await gotoClean(page);
 for(const mode of modes){
  await select(page,mode);
  const result=await page.evaluate(()=>{
    const grid=document.querySelector(".portfolio-work-grid");
    const cards=[...grid.querySelectorAll(".portfolio-work-card")];
    const visibleCards=cards.filter(el=>getComputedStyle(el).display!=="none");
    const main=document.querySelector("main").getBoundingClientRect();
    return {
      overflow:document.documentElement.scrollWidth-innerWidth,
      gridWidth:Math.round(grid.getBoundingClientRect().width),
      cardWidths:visibleCards.map(el=>Math.round(el.getBoundingClientRect().width)),
      mainWidth:Math.round(main.width),
      selectorWidth:Math.round(document.querySelector("[data-design-ribbon]").getBoundingClientRect().width)
    };
  });
  expect(result.overflow,JSON.stringify({mode,result})).toBeLessThanOrEqual(2);
  expect(result.cardWidths.length).toBe(6);
  expect(Math.max(...result.cardWidths),JSON.stringify({mode,result})).toBeLessThanOrEqual(result.gridWidth+2);
  expect(result.selectorWidth).toBeLessThanOrEqual(465);
 }
});
test("all editions preserve project links and accessible focus targets",async({page})=>{
 await gotoClean(page);
 for(const mode of modes){
  await select(page,mode);
  await expect(page.locator('.portfolio-work-card a[href*="proyectos/"]')).toHaveCount(6);
  await expect(page.locator('#contacto .email-link')).toBeVisible();
  await expect(page.locator('#capacidades .portfolio-capability')).toHaveCount(4);
  await expect(page.locator('#perfil')).toBeVisible();
 }
});
