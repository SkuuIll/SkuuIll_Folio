const {test,expect}=require("@playwright/test");
const editions=[
 ["editorial","matrix"],["casebook","copper"],["systems","ice"],
 ["atelier","violet"],["chromatic","neon"],["pocket","forest"],
 ["studio","amber"],["skull-os","blue"],["xray","ice"],
 ["museum","copper"],["terminal","matrix"],["canvas","cobalt"],
 ["brutalist","amber"],["story","violet"]
];
const colorState=page=>page.evaluate(()=>{
 const root=document.documentElement,style=getComputedStyle(root);
 const token=name=>style.getPropertyValue(name).trim();
 return {design:root.dataset.design,palette:root.dataset.palette,theme:root.dataset.theme,
  paper:token("--paper"),ink:token("--ink"),accent:token("--accent"),
  surface:token("--surface"),intro:token("--intro-glow"),
  background:getComputedStyle(document.body).backgroundColor,
  foreground:getComputedStyle(document.body).color};
});
test("all fourteen editions resolve their own color system in light and dark",async({page})=>{
 for(const [design,palette] of editions){
  for(const theme of ["dark","light"]){
   await page.goto("./?design="+design);
   await page.evaluate(t=>localStorage.setItem("skull-theme",t),theme);
   await page.reload();
   const colors=await colorState(page);
   expect(colors.design).toBe(design);
   expect(colors.palette).toBe(palette);
   expect(colors.theme).toBe(theme);
   for(const token of ["paper","ink","accent","surface","intro"])expect(colors[token],design+" "+theme+" "+token).toMatch(/^#[a-f0-9]{6}$/i);
   expect(colors.paper).not.toBe(colors.ink);
   expect(colors.accent).not.toBe(colors.paper);
   expect(colors.background).not.toBe(colors.foreground);
  }
 }
});
test("Matrix/Terminal edition and theme survive ES, EN, archive, and project navigation",async({page})=>{
 await page.goto("./?design=terminal");
 const dark=await colorState(page);
 for(const url of ["proyectos/vigia/","en/projects/vigia/","en/","proyectos/","./"]){
  await page.goto(url);
  const current=await colorState(page);
  expect(current.design).toBe("terminal");
  expect(current.palette).toBe("matrix");
  expect(current.accent).toBe(dark.accent);
  expect(current.paper).toBe(dark.paper);
 }
 await page.locator("#theme-toggle").click();
 const light=await colorState(page);
 expect(light.theme).not.toBe(dark.theme);
 await page.goto("en/projects/cpaul/");
 const current=await colorState(page);
 expect(current.design).toBe("terminal");
 expect(current.theme).toBe(light.theme);
 expect(current.paper).toBe(light.paper);
});
test("the opening cinematic branding carries the active palette instead of fixed teal",async({page})=>{
 for(const design of ["casebook","terminal","atelier","skull-os","story"]){
  await page.goto("./?design="+design+"&intro=1");
  const value=await page.evaluate(()=>{
   const glow=getComputedStyle(document.documentElement).getPropertyValue("--intro-glow").trim();
   const mark=getComputedStyle(document.querySelector(".sk-intro-mark")).color;
   return {glow,mark};
  });
  expect(value.glow).toMatch(/^#[a-f0-9]{6}$/i);
  const rgb=[1,3,5].map(i=>parseInt(value.glow.slice(i,i+2),16));
  expect(value.mark).toBe(`rgb(${rgb.join(", ")})`);
 }
});
test("initial theme follows system preference and saved override before first paint",async({page})=>{
 await page.emulateMedia({colorScheme:"light"});
 await page.goto("./");
 await expect(page.locator("html")).toHaveAttribute("data-theme","light");
 await page.locator("#theme-toggle").click();
 await expect(page.locator("html")).toHaveAttribute("data-theme","dark");
 await page.reload();
 await expect(page.locator("html")).toHaveAttribute("data-theme","dark");
});

test("Matrix loads phosphor green on black by default, but an explicit light preference wins",async({page})=>{
 await page.emulateMedia({colorScheme:"light"});
 await page.goto("./?design=terminal");
 let state=await colorState(page);
 expect(state.theme).toBe("dark");
 expect(state.palette).toBe("matrix");
 expect(state.paper).toBe("#030d0a");
 expect(state.accent).toBe("#80ffac");
 await page.locator("#theme-toggle").click();
 state=await colorState(page);
 expect(state.theme).toBe("light");
 await page.goto("en/projects/vigia/");
 state=await colorState(page);
 expect(state.design).toBe("terminal");
 expect(state.theme).toBe("light");
 await page.goto("./?design=museum");
 state=await colorState(page);
 expect(state.theme).toBe("light");
});
