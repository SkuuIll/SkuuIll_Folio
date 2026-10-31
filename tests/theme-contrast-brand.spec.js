const {test,expect}=require("@playwright/test");
const editions=["editorial","casebook","systems","atelier","chromatic","pocket","studio","skull-os","xray","museum","terminal","canvas","brutalist","story"];
const cssState=async(page)=>page.evaluate(()=>{
 const root=document.documentElement, hero=document.querySelector(".sp-hero");
 const vars=getComputedStyle(root), heading=hero&&hero.querySelector("h1");
 const h=heading?getComputedStyle(heading):null;
 return {theme:root.dataset.theme,design:root.dataset.design,
  paper:vars.getPropertyValue("--paper").trim(),ink:vars.getPropertyValue("--ink").trim(),
  surface:vars.getPropertyValue("--surface").trim(),
  heroBackground:hero?getComputedStyle(hero).backgroundImage:"",
  headingTransform:h?.transform,headingShadow:h?.textShadow
 };
});
test("each of fourteen visual editions has distinct light and dark palettes",async({page})=>{
 await page.goto("./");
 const button=page.locator("#theme-toggle");
 await expect(button).toBeVisible();
 const observations=[];
 for(let i=0;i<14;i++){
  await page.goto("./?design="+editions[i]);
  const current=await page.locator("html").getAttribute("data-design");
  expect(editions).toContain(current);
  if((await page.locator("html").getAttribute("data-theme"))!=="dark")await button.click();
  const dark=await cssState(page);
  await button.click();
  const light=await cssState(page);
  expect(dark.theme).toBe("dark");expect(light.theme).toBe("light");
  expect(dark.paper).not.toBe(light.paper);
  expect(dark.ink).not.toBe(light.ink);
  expect(dark.surface).not.toBe(light.surface);
  const rgb=(hex)=>{
   const s=hex.replace("#","");if(s.length!==6)return null;
   return [0,2,4].map(i=>parseInt(s.slice(i,i+2),16));
  };
  const luminance=(a)=>{
   const channels=a.map(c=>{let v=c/255;return v<=.04045?v/12.92:Math.pow((v+.055)/1.055,2.4)});
   return channels[0]*.2126+channels[1]*.7152+channels[2]*.0722;
  };
  const d0=rgb(dark.paper),d1=rgb(light.paper);
  const darkInk=rgb(dark.ink),lightInk=rgb(light.ink);
  expect(d0&&d1&&darkInk&&lightInk).toBeTruthy();
  const ratio=(a,b)=>{const l1=luminance(a),l2=luminance(b);return (Math.max(l1,l2)+.05)/(Math.min(l1,l2)+.05)};
  expect(ratio(d0,darkInk)).toBeGreaterThan(4.4);
  expect(ratio(d1,lightInk)).toBeGreaterThan(4.4);
  observations.push(current);
 }
 expect(new Set(observations).size).toBe(14);
});
test("editorial and studio do not lock to one theme; systems changes backgrounds",async({page})=>{
 await page.goto("./");
 const button=page.locator("#theme-toggle");
 for(const target of ["editorial","systems","studio"]){
  await page.goto("./?design="+target);
  await expect(page.locator("html")).toHaveAttribute("data-design",target);
  if((await page.locator("html").getAttribute("data-theme"))!=="dark")await button.click();
  const dark=await cssState(page);await button.click();const light=await cssState(page);
  expect(dark.paper).not.toBe(light.paper);
  if(target==="systems"||target==="studio")expect(dark.heroBackground).not.toBe(light.heroBackground);
 }
});
test("chromatic text is no longer rotated, shadowed or visually doubled",async({page})=>{
 await page.goto("./");
 await page.goto("./?design=chromatic");
 await expect(page.locator("html")).toHaveAttribute("data-design","chromatic");
 for(let mode=0;mode<2;mode++){
  const h=await cssState(page);
  expect(h.headingTransform).toBe("none");
  expect(h.headingShadow).toBe("none");
  if(mode===0)await page.locator("#theme-toggle").click();
 }
});
test("new emblem is not a single-letter S and remains vector-based",async({page})=>{
 await page.goto("./");
 const svg=page.locator("a.brand svg");
 await expect(svg).toHaveAttribute("viewBox","0 0 64 64");
 expect(await svg.locator("path").count()).toBeGreaterThanOrEqual(4);
 const logo=await page.request.get("favicon.svg");
 expect(logo.ok()).toBeTruthy();
 const body=await logo.text();
 expect(body).toContain("Skull — emblema geométrico");
 expect(body).toContain("M18 25 27 28");
});
