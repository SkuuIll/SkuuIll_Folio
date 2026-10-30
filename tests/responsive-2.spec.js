const {test,expect}=require("@playwright/test");
const editions=["editorial","casebook","systems","atelier","chromatic","pocket","studio","skull-os","xray","museum","terminal","canvas","brutalist","story"];
for(const viewport of [{width:390,height:844},{width:768,height:1024},{width:1440,height:900}]){
 test.describe("responsive "+viewport.width,()=>{
  test.use({viewport});
  for(const edition of editions){
   test("Spanish homepage "+edition+" has no horizontal overflow",async({page})=>{
    await page.goto("?design="+edition);
    await expect(page.locator("main")).toBeVisible();
    await expect(page.locator("[data-command-trigger]")).toBeVisible();
    const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
    expect(overflow,"Unexpected horizontal overflow for "+edition+" at "+viewport.width+"px").toBeLessThanOrEqual(2);
   });
  }
  for(const route of ["en/","proyectos/vigia/","en/projects/vigia/","proyectos/","en/projects/"]){
   test("route "+route+" renders and fits",async({page})=>{
    await page.goto(route+"?design=editorial");
    await expect(page.locator("main")).toBeVisible();
    const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
    expect(overflow,"Horizontal overflow on "+route).toBeLessThanOrEqual(2);
   });
  }
 });
}
