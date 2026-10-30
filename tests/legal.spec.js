const { test, expect } = require("@playwright/test");
const kinds = ["legal", "privacidad", "terminos", "aviso-legal", "creditos"];
test("Spanish and English legal pages exist with correct language, canonical and alternate", async ({page}) => {
  for (const lang of ["es","en"]) for(const kind of kinds){
    const path=(lang==="en"?"en/":"")+kind+"/";
    await page.goto(path);
    await expect(page.locator("html")).toHaveAttribute("lang",lang==="en"?"en":"es-AR");
    await expect(page.locator("main h1")).toBeVisible();
    await expect(page.locator(".legal-section")).toHaveCount(kind==="creditos"?4:kind==="legal"?4:kind==="privacidad"?6:4);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href",new RegExp("/"+path.replace(/\//g,"\\/")+"$"));
    await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute("href",new RegExp("/en/"+kind+"/$"));
    await expect(page.locator('link[rel="alternate"][hreflang="es-AR"]')).toHaveAttribute("href",new RegExp("/"+kind+"/$"));
    await expect(page.locator(".footer-legal a")).toHaveCount(5);
    await expect(page.locator(".legal-menu a")).toHaveCount(5);
  }
});
test("footer legal links are accessible in English and Spanish",async({page})=>{
 for(const [path,expected] of [["./","Información legal"],["en/","Legal information"]]){
   await page.goto(path);
   const footer=page.locator("footer");
   await expect(footer.getByRole("navigation",{name:/legal|privacidad|privacy/i})).toBeVisible();
   await expect(footer.getByRole("link",{name:expected,exact:true})).toBeVisible();
 }
});
test("privacy policy accurately explains local preferences, mail draft and hosting",async({page})=>{
 await page.goto("privacidad/");
 const main=page.locator("main");
 await expect(main).toContainText("localStorage");
 await expect(main).toContainText("sessionStorage");
 await expect(main).toContainText("Cloudflare Pages");
 await expect(main).toContainText("moreappmix@gmail.com");
 await expect(main).toContainText("Ley 25.326");
});
test("credits link to real license files",async({page})=>{
 await page.goto("creditos/");
 const links=page.locator(".legal-source-links a");
 for(const file of ["Manrope-OFL.txt","Geist-Mono-OFL.txt","Three-MIT.txt"]){
  const link=links.filter({hasText:file.includes("Manrope")?"Manrope":file.includes("Geist")?"Geist":"Three.js"}).first();
  const href=await link.getAttribute("href");
  expect(href).toContain(file);
  const response=await page.request.get(href);
  expect(response.ok()).toBeTruthy();
 }
});
test("mobile footer never overflows horizontally",async({page})=>{
 await page.setViewportSize({width:390,height:844});
 for(const path of ["./","privacidad/","en/terminos/"]){
  await page.goto(path);
  await page.locator(".footer-legal").scrollIntoViewIfNeeded();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2)).toBe(true);
 }
});
