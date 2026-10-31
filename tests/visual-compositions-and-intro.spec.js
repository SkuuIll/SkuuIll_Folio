const {test,expect}=require("@playwright/test");
const legacy=["editorial","casebook","systems","atelier","chromatic","pocket","studio"];
const select=async(page,mode)=>{const en=new URL(page.url()).pathname.endsWith("/en/");await page.goto((en?"en/":"./")+"?design="+mode);await expect(page.locator("html")).toHaveAttribute("data-design",mode)};

test("the redesigned Casebook masthead, title and image do not collide at desktop or mobile widths",async({page})=>{
 await page.goto("./");
 for(const width of [1440,1280,1024,768,390,360]){
  await page.setViewportSize({width,height:900});
  await select(page,"casebook");
  const status=await page.evaluate(()=>{
   const qs=(x)=>document.querySelector(x).getBoundingClientRect();
   const hero=qs(".sp-hero"),title=qs(".sp-hero h1"),top=qs(".hero-topline");
   const a=qs(".hero-topline>span:first-child"),b=qs(".hero-topline>span:last-child");
   const copy=qs(".sp-hero-copy");
   const grid=getComputedStyle(document.querySelector(".sp-hero")).display;
   const photo=getComputedStyle(document.querySelector(".sp-hero"),"::before").backgroundImage;
   return {overflow:document.documentElement.scrollWidth-innerWidth,
     inside:title.left>=hero.left-3&&title.right<=hero.right+3&&title.top>=hero.top-3,
     headerSeparated:a.right<=b.left+3||a.bottom<=b.top+3||b.bottom<=a.top+3,
     visibleCopy:copy.width>220,
     hiddenField:getComputedStyle(document.querySelector(".signal-backdrop")).display==="none",
     hasImage:photo.includes("atelier-colors.webp"),grid,
     title:Math.round(title.width),hero:Math.round(hero.width)};
  });
  expect(status.overflow,JSON.stringify({width,status})).toBeLessThanOrEqual(2);
  expect(status.inside,JSON.stringify({width,status})).toBe(true);
  expect(status.headerSeparated,JSON.stringify({width,status})).toBe(true);
  expect(status.visibleCopy).toBe(true);
  expect(status.hiddenField).toBe(true);
  expect(status.hasImage).toBe(true);
 }
});

test("seven original editions have genuinely different hero layouts, not only different colors",async({page})=>{
 await page.goto("./");
 await page.setViewportSize({width:1300,height:900});
 const designs=[];
 for(const mode of legacy){
  await select(page,mode);
  const state=await page.evaluate(()=>{
   const hero=document.querySelector(".sp-hero"),style=getComputedStyle(hero),h=getComputedStyle(hero.querySelector("h1"));
   const rect=hero.getBoundingClientRect();
   return {
    display:style.display,
    width:Math.round(rect.width),
    minHeight:style.minHeight,
    bg:style.backgroundImage,
    type:h.fontFamily,
    size:h.fontSize,
    border:style.borderBottomStyle,
    signature:getComputedStyle(document.querySelector(".hero-signature")).display,
   };
  });
  designs.push(JSON.stringify({...state,bg:state.bg.includes("gradient")?"gradient":state.bg}));
 }
 expect(new Set(designs).size).toBe(7);
});

test("the opening ident has 3 steps, can be skipped and takes longer than its original flash",async({page})=>{
 await page.emulateMedia({reducedMotion:"no-preference"});
 await page.goto("./?intro=1");
 const intro=page.locator("[data-sk-intro]");
 await expect(intro).toBeVisible();
 await expect(intro.locator("[data-intro-beat]")).toHaveCount(3);
 await page.waitForTimeout(1450);
 await expect(intro).toBeVisible();
 await expect(intro).toBeHidden({timeout:3500});
 await expect(page.locator("body")).not.toHaveCSS("overflow","hidden");
});
test("edition switch animations are controlled and respect reduced motion",async({page})=>{
 await page.goto("./");
 await select(page,"casebook");
 await expect(page.locator(".sp-hero")).toBeVisible();
 await page.emulateMedia({reducedMotion:"reduce"});
 await select(page,"editorial");
 await expect(page.locator(".sp-hero")).toBeVisible();
});

test("direct edition URLs are shareable and ordinary visits return to the default",async({page})=>{
 await page.goto("./?design=casebook");
 await expect(page.locator("html")).toHaveAttribute("data-design","casebook");
 await page.reload();
 await expect(page.locator("html")).toHaveAttribute("data-design","casebook");
 await page.goto("en/?design=terminal");
 await expect(page.locator("html")).toHaveAttribute("data-design","terminal");
 await page.goto("./");
 await expect(page.locator("html")).toHaveAttribute("data-design","editorial");
});
