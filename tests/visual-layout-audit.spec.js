const {test,expect}=require("@playwright/test");
const modes=["editorial","casebook","systems","atelier","chromatic","pocket","studio","skull-os","xray","museum","terminal","canvas","brutalist","story"];
test("all fourteen styles fit phones without a redundant edition bar",async({page})=>{
 await page.addInitScript(()=>{
  Object.defineProperty(navigator,"deviceMemory",{configurable:true,value:2});
  Object.defineProperty(navigator,"connection",{configurable:true,value:{saveData:true}});
 });
 await page.setViewportSize({width:390,height:844});
 const problems=[];
 for(const mode of modes){
  await page.goto("./?design="+mode);
  const status=await page.evaluate(()=>({over:document.documentElement.scrollWidth-innerWidth,ribbonHidden:document.querySelector("[data-design-ribbon]").hidden}));
  if(status.over>2||!status.ribbonHidden)problems.push({mode,...status});
 }
 expect(problems).toEqual([]);
});
test("all editions can be found in the single search dialog",async({page})=>{
 await page.goto("./");
 await page.locator("[data-command-trigger]").click();
 await page.locator("[data-command-editions]").click();
 await expect(page.locator("[data-command-result]")).toHaveCount(14);
 await page.locator("[data-command-results]").getByRole("button",{name:/TERMINAL/i}).click();
 await expect(page.locator("html")).toHaveAttribute("data-design","terminal");
});
