const {test,expect}=require("@playwright/test");
test("global command palette finds projects and navigates in Spanish",async({page})=>{
 await page.goto("?design=editorial");
 await page.keyboard.press("Control+k");
 const dialog=page.locator("#skull-command");
 await expect(dialog).toBeVisible();
 await page.locator("#command-query").fill("Vigía");
 await expect(dialog.locator("[data-command-result]")).toHaveCount(1);
 await page.keyboard.press("Enter");
 await expect(page).toHaveURL(/\/proyectos\/vigia\//);
});
test("command palette searches tech and editions in English",async({page})=>{
 await page.goto("en/?design=studio");
 await page.locator("[data-command-trigger]").click();
 await page.locator("#command-query").fill("skull-os");
 await expect(page.locator("[data-command-result]").first()).toContainText("SKULL-OS");
 await page.keyboard.press("Escape");
 await expect(page.locator("#skull-command")).not.toBeVisible();
});
