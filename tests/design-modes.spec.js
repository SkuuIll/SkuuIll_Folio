const { test, expect } = require("@playwright/test");
const modes = ["editorial","casebook","systems","atelier","chromatic","pocket","studio","skull-os","xray","museum","terminal","canvas","brutalist","story"];
test("default edition is stable and explicit links remain shareable",async({page})=>{
 await page.goto("./");
 await expect(page.locator("html")).toHaveAttribute("data-design","editorial");
 await page.reload();
 await expect(page.locator("html")).toHaveAttribute("data-design","editorial");
 await page.goto("./?design=xray");
 await expect(page.locator("html")).toHaveAttribute("data-design","xray");
 await expect(page.locator('[data-edition-scene="xray"]')).toBeVisible();
});
test("one Search opens all fourteen editions without a second toolbar",async({page})=>{
 await page.goto("./");
 await expect(page.locator("[data-design-ribbon]")).toBeHidden();
 await page.locator("[data-command-trigger]").click();
 await page.locator("[data-command-editions]").click();
 await expect(page.locator("[data-command-result]")).toHaveCount(14);
 for(const mode of modes)await expect(page.locator("[data-command-results]")).toContainText(mode.toUpperCase());
 await page.locator("[data-command-results]").getByRole("option",{name:/XRAY/i}).click();
 await expect(page.locator("html")).toHaveAttribute("data-design","xray");
});
test("English search retains editions on a constrained mobile viewport",async({page})=>{
 await page.setViewportSize({width:390,height:844});
 await page.goto("en/");
 await expect(page.locator("[data-design-ribbon]")).toBeHidden();
 await page.locator("[data-command-trigger]").click();
 await page.locator("[data-command-editions]").click();
 await expect(page.locator("[data-command-result]")).toHaveCount(14);
 await expect(page.locator("[data-command-results]")).toContainText("STORY");
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2)).toBe(true);
});
