import { chromium } from "playwright";

const BASE = "https://rigpel-web.onrender.com";

const ALL_PAGES = [
  { path: "/", label: "Landing Page" },
  { path: "/login", label: "Login" },
  { path: "/register/role", label: "Register Role" },
  { path: "/register/details", label: "Register Details" },
  { path: "/verify-otp", label: "Verify OTP" },
  { path: "/worker/dashboard", label: "Worker Dashboard", role: "worker" },
  { path: "/worker/gigs/browse", label: "Worker Browse Gigs", role: "worker" },
  { path: "/worker/gigs/1", label: "Worker Gig Detail", role: "worker" },
  { path: "/worker/my-jobs", label: "Worker My Jobs", role: "worker" },
  { path: "/worker/profile", label: "Worker Profile", role: "worker" },
  { path: "/client/dashboard", label: "Client Dashboard", role: "client" },
  { path: "/client/jobs/new", label: "Client Post Job", role: "client" },
  { path: "/client/jobs/manage", label: "Client Manage Jobs", role: "client" },
  { path: "/client/jobs/1/applicants", label: "Client Applicants", role: "client" },
  { path: "/admin/dashboard", label: "Admin Dashboard", role: "admin" },
  { path: "/admin/moderation", label: "Admin Moderation", role: "admin" },
  { path: "/admin/users", label: "Admin Users", role: "admin" },
  { path: "/admin/payments", label: "Admin Payments", role: "admin" },
];

async function main() {
  const browser = await chromium.launch({ headless: true });
  const results = { passed: [], failed: [], warnings: [] };

  for (const { path, label, role } of ALL_PAGES) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    const errors = [];

    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    try {
      // Seed localStorage if role page
      if (role) {
        await page.goto(BASE, { timeout: 30000, waitUntil: "domcontentloaded" });
        await page.evaluate((r) => {
          localStorage.setItem("rigpel_user", JSON.stringify({ full_name: "Test User", phone: "+975-77-123456" }));
          localStorage.setItem("rigpel_role", r);
        }, role);
      }

      const resp = await page.goto(BASE + path, { timeout: 90000, waitUntil: "networkidle" });
      await page.waitForTimeout(1000);

      const status = resp ? resp.status() : "no response";
      const title = await page.title();
      const hasContent = (await page.textContent("body") || "").trim().length > 20;

      if (status >= 400) {
        results.failed.push({ label, issue: `HTTP ${status}` });
      } else if (!hasContent) {
        results.failed.push({ label, issue: "No visible content" });
      } else if (errors.length > 0) {
        results.warnings.push({ label, errors: errors.slice(0, 3) });
      } else {
        results.passed.push(label);
      }

      console.log(`${status >= 400 ? "✗" : errors.length > 0 ? "⚠" : "✓"} ${label} — ${status} "${title}"${errors.length > 0 ? ` [${errors.length} errors]` : ""}`);
    } catch (e) {
      results.failed.push({ label, issue: e.message.split("\n")[0] });
      console.log(`✗ ${label} — ${e.message.split("\n")[0]}`);
    }

    await ctx.close();
  }

  // 404 test
  const errCtx = await browser.newContext();
  const errPage = await errCtx.newPage();
  try {
    const resp = await errPage.goto(BASE + "/nonexistent", { timeout: 30000 });
    const status = resp ? resp.status() : "no response";
    if (status === 404) {
      results.passed.push("404 page");
      console.log(`✓ 404 page — ${status}`);
    } else {
      results.failed.push({ label: "404 page", issue: `Expected 404, got ${status}` });
      console.log(`✗ 404 page — Expected 404, got ${status}`);
    }
  } catch (e) {
    results.failed.push({ label: "404 page", issue: e.message.split("\n")[0] });
  }
  await errCtx.close();
  await browser.close();

  console.log(`\n=== RESULTS ===`);
  console.log(`Passed: ${results.passed.length} | Warnings: ${results.warnings.length} | Failed: ${results.failed.length}`);
  for (const w of results.warnings) console.log(`  ⚠ ${w.label}: ${w.errors.join("; ")}`);
  for (const f of results.failed) console.log(`  ✗ ${f.label}: ${f.issue}`);
  process.exit(results.failed.length === 0 ? 0 : 1);
}

main();
