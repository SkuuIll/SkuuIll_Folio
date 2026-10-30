const {test,expect}=require("@playwright/test");
const modes=["editorial","casebook","systems","atelier","chromatic","pocket","studio","skull-os","xray","museum","terminal","canvas","brutalist","story"];
test("all 14 designs stay inside small phone viewport and have a compact edition bar",async({page})=>{
 await page.addInitScript(()=>{
   Object.defineProperty(navigator,"deviceMemory",{configurable:true,value:2});
   Object.defineProperty(navigator,"connection",{configurable:true,value:{saveData:true}});
 });
 await page.setViewportSize({width:390,height:844});
 await page.goto("./");
 const problems=[];
 for(const mode of modes){
   await page.locator("[data-design-select]").selectOption(mode);
   const status=await page.evaluate(()=>{
     const over=document.documentElement.scrollWidth-innerWidth;
     const candidates=[...document.querySelectorAll("body *")].filter(el=>{
       const s=getComputedStyle(el);
       if(s.display==="none"||s.visibility==="hidden"||s.position==="fixed")return false;
       const b=el.getBoundingClientRect();
       return b.width>0&&(b.right>innerWidth+3||b.left< -3)&&!el.closest(".canvas-viewport, .xray-model, .depth-stage, .spatial-photo, .os-window");
     }).slice(0,12).map(el=>({tag:el.tagName,cls:typeof el.className==="string"?el.className.slice(0,75):"",width:Math.round(el.getBoundingClientRect().width),left:Math.round(el.getBoundingClientRect().left),right:Math.round(el.getBoundingClientRect().right)}));
     const ribbon=document.querySelector("[data-design-ribbon]").getBoundingClientRect();
     return {over,offenders:candidates,ribbonHeight:Math.round(ribbon.height)};
   });
   if(status.over>2||status.ribbonHeight>72)problems.push({mode,...status});
 }
 expect(problems).toEqual([]);
});
test("visible edition label is compact, but all 14 names remain directly accessible",async({page})=>{
 await page.goto("./");
 await expect(page.locator("[data-design-select] option")).toHaveCount(14);
 await page.locator("[data-design-select]").selectOption("terminal");
 await expect(page.locator("[data-design-name]")).toContainText("Terminal");
 await page.locator("[data-design-next]").click();
 await expect(page.locator("[data-design-select]")).toHaveValue("canvas");
});
