import { chromium } from "playwright";

const BASE = "http://localhost:3000";
const VIEWPORTS = [
  { name: "mobile", width: 375, height: 812 },
  { name: "tablet",  width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 900 },
];

const PAGES = [
  { path: "/", label: "landing" },
  { path: "/login", label: "login" },
  { path: "/register/role", label: "register-role" },
  { path: "/register/details", label: "register-details" },
  { path: "/verify-otp", label: "verify-otp" },
  { path: "/worker/dashboard", label: "worker-dashboard", role: "worker" },
  { path: "/worker/gigs/browse", label: "worker-gigs-browse", role: "worker" },
  { path: "/worker/gigs/1", label: "worker-gig-detail", role: "worker" },
  { path: "/worker/my-jobs", label: "worker-my-jobs", role: "worker" },
  { path: "/worker/profile", label: "worker-profile", role: "worker" },
  { path: "/client/dashboard", label: "client-dashboard", role: "client" },
  { path: "/client/jobs/new", label: "client-jobs-new", role: "client" },
  { path: "/client/jobs/manage", label: "client-jobs-manage", role: "client" },
  { path: "/admin/dashboard", label: "admin-dashboard", role: "admin" },
  { path: "/admin/moderation", label: "admin-moderation", role: "admin" },
  { path: "/admin/users", label: "admin-users", role: "admin" },
  { path: "/admin/payments", label: "admin-payments", role: "admin" },
];

async function main() {
  const browser = await chromium.launch({ headless: true });
  const outputDir = "tests/screenshots/visual";

  for (const { path, label, role } of PAGES) {
    for (const vp of VIEWPORTS) {
      const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
      const page = await ctx.newPage();

      await page.goto(BASE, { waitUntil: "domcontentloaded" }).catch(() => {});

      if (role) {
        await page.evaluate((r) => {
          localStorage.setItem("rigpel_user", JSON.stringify({ full_name: "Test User", phone: "+975-77-123456" }));
          localStorage.setItem("rigpel_role", r);
        }, role);
      }

      await page.goto(BASE + path, { waitUntil: "networkidle", timeout: 15000 }).catch(() => {});
      await new Promise(r => setTimeout(r, 800));

      const filename = `${outputDir}/${label}_${vp.name}.png`;
      await page.screenshot({ path: filename, fullPage: true });
      console.log(`  ✓ ${filename}`);

      await ctx.close();
    }
  }

  await browser.close();
  console.log("\nDone — all screenshots saved to", outputDir);
}

main().catch(console.error);
