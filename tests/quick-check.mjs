import { chromium } from "playwright";

const BASE = "https://rigpel-web.onrender.com";

async function main() {
  const browser = await chromium.launch({ headless: true });

  // Check auth pages for 404 resources
  console.log("=== Auth pages 404 check ===");
  for (const path of ["/login", "/register/role", "/register/details", "/verify-otp", "/"]) {
    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    const failedReqs = [];
    page.on("requestfailed", r => failedReqs.push(r.url().replace(BASE, "") + " (" + r.failure()?.errorText + ")"));
    await page.goto(BASE + path, { timeout: 30000, waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1000);
    console.log(`  ${path}: ${failedReqs.length} failed requests`);
    for (const f of failedReqs.slice(0, 3)) console.log(`    - ${f}`);
    await ctx.close();
  }

  // Check worker pages
  console.log("\n=== Worker pages 404 check ===");
  const wctx = await browser.newContext();
  const wpage = await wctx.newPage();
  await wpage.goto(BASE, { timeout: 30000 });
  await wpage.evaluate(() => {
    localStorage.setItem("rigpel_user", JSON.stringify({ full_name: "Test", phone: "+975-77-123456" }));
    localStorage.setItem("rigpel_role", "worker");
  });
  for (const path of ["/worker/dashboard", "/worker/gigs/browse", "/worker/gigs/1", "/worker/my-jobs", "/worker/profile"]) {
    const failedReqs = [];
    wpage.on("requestfailed", r => failedReqs.push(r.url().replace(BASE, "") + " (" + r.failure()?.errorText + ")"));
    await wpage.goto(BASE + path, { timeout: 30000, waitUntil: "networkidle" });
    await wpage.waitForTimeout(500);
    console.log(`  ${path}: ${failedReqs.length} failed requests`);
    for (const f of failedReqs.slice(0, 3)) console.log(`    - ${f}`);
  }
  await wctx.close();

  // Check admin pages
  console.log("\n=== Admin pages 404 check ===");
  const actx = await browser.newContext();
  const apage = await actx.newPage();
  await apage.goto(BASE, { timeout: 30000 });
  await apage.evaluate(() => {
    localStorage.setItem("rigpel_user", JSON.stringify({ full_name: "Admin", phone: "+975-77-123456" }));
    localStorage.setItem("rigpel_role", "admin");
  });
  for (const path of ["/admin/dashboard", "/admin/moderation", "/admin/users", "/admin/payments"]) {
    const failedReqs = [];
    apage.on("requestfailed", r => failedReqs.push(r.url().replace(BASE, "") + " (" + r.failure()?.errorText + ")"));
    await apage.goto(BASE + path, { timeout: 30000, waitUntil: "networkidle" });
    await apage.waitForTimeout(500);
    console.log(`  ${path}: ${failedReqs.length} failed requests`);
    for (const f of failedReqs.slice(0, 3)) console.log(`    - ${f}`);
  }
  await actx.close();

  await browser.close();
}

main();
