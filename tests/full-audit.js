const { chromium } = require("@playwright/test");

const BASE_URL = "https://rigpel-web.onrender.com";

const routes = [
  { path: "/", name: "Landing Page" },
  { path: "/login", name: "Login" },
  { path: "/register/role", name: "Register - Role Selection" },
  { path: "/register/details", name: "Register - Details" },
  { path: "/verify-otp", name: "Verify OTP" },
];

const workerRoutes = [
  { path: "/worker/dashboard", name: "Worker Dashboard" },
  { path: "/worker/gigs/browse", name: "Worker Browse Gigs" },
  { path: "/worker/gigs/1", name: "Worker Gig Detail" },
  { path: "/worker/my-jobs", name: "Worker My Jobs" },
  { path: "/worker/profile", name: "Worker Profile" },
];

const clientRoutes = [
  { path: "/client/dashboard", name: "Client Dashboard" },
  { path: "/client/jobs/new", name: "Client Post Job" },
  { path: "/client/jobs/manage", name: "Client Manage Jobs" },
  { path: "/client/jobs/1/applicants", name: "Client Applicants" },
];

const adminRoutes = [
  { path: "/admin/dashboard", name: "Admin Dashboard" },
  { path: "/admin/moderation", name: "Admin Moderation" },
  { path: "/admin/users", name: "Admin Users" },
  { path: "/admin/payments", name: "Admin Payments" },
];

async function runAudit() {
  const browser = await chromium.launch({ headless: true });
  const results = { passed: [], failed: [], errors: [] };

  async function testPage(page, url, name, setupFn) {
    const consoleErrors = [];
    const pageErrors = [];

    page.on("console", (msg) => {
      if (msg.type() === "error") consoleErrors.push(msg.text());
    });
    page.on("pageerror", (err) => pageErrors.push(err.message));

    try {
      if (setupFn) await setupFn(page);
      const resp = await page.goto(`${BASE_URL}${url}`, {
        waitUntil: "networkidle",
        timeout: 60000,
      });

      // Collect results
      const status = resp.status();
      const title = await page.title();

      await page.screenshot({
        path: `tests/screenshots/${name.replace(/\s+/g, "-").toLowerCase()}.png`,
        fullPage: true,
      });

      results[status >= 400 ? "failed" : "passed"].push({
        name,
        url,
        status,
        title,
        consoleErrors: [...consoleErrors],
        pageErrors: [...pageErrors],
      });

      if (status >= 400) {
        results.errors.push(`${name} (${url}): HTTP ${status}`);
      }
      if (consoleErrors.length) {
        results.errors.push(`${name} (${url}): ${consoleErrors.length} console error(s) - ${consoleErrors.join("; ")}`);
      }
      if (pageErrors.length) {
        results.errors.push(`${name} (${url}): ${pageErrors.length} page error(s) - ${pageErrors.join("; ")}`);
      }
    } catch (err) {
      results.failed.push({ name, url, error: err.message });
      results.errors.push(`${name} (${url}): ${err.message}`);
    }
  }

  // Public pages
  {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();
    for (const r of routes) await testPage(page, r.path, r.name);
    await context.close();
  }

  // Worker pages (need localStorage setup)
  {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();
    const workerSetup = async (p) => {
      await p.goto(`${BASE_URL}/register/details`, { waitUntil: "domcontentloaded", timeout: 60000 });
      await p.evaluate(() => {
        localStorage.setItem("rigpel_role", "worker");
        localStorage.setItem("rigpel_user", JSON.stringify({
          full_name: "Tashi Dorji", phone: "+975-77-123456",
          cid_number: "11501000123", role: "worker",
          verification_status: "pending", rating: 4.5, jobs_completed: 15,
          created_at: new Date().toISOString(),
        }));
      });
    };
    for (const r of workerRoutes) await testPage(page, r.path, r.name, workerSetup);
    await context.close();
  }

  // Client pages
  {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();
    const clientSetup = async (p) => {
      await p.goto(`${BASE_URL}/register/details`, { waitUntil: "domcontentloaded", timeout: 60000 });
      await p.evaluate(() => {
        localStorage.setItem("rigpel_role", "client");
        localStorage.setItem("rigpel_user", JSON.stringify({
          full_name: "Karma Wangmo", phone: "+975-77-654321",
          cid_number: "11501000456", role: "client",
          verification_status: "verified", rating: 4.8, jobs_completed: 8,
          created_at: new Date().toISOString(),
        }));
      });
    };
    for (const r of clientRoutes) await testPage(page, r.path, r.name, clientSetup);
    await context.close();
  }

  // Admin pages
  {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();
    const adminSetup = async (p) => {
      await p.goto(`${BASE_URL}/register/details`, { waitUntil: "domcontentloaded", timeout: 60000 });
      await p.evaluate(() => {
        localStorage.setItem("rigpel_role", "admin");
        localStorage.setItem("rigpel_user", JSON.stringify({
          full_name: "Admin", phone: "+975-77-000000",
          cid_number: "11501000999", role: "admin",
          verification_status: "verified", rating: 5, jobs_completed: 0,
          created_at: new Date().toISOString(),
        }));
      });
    };
    for (const r of adminRoutes) await testPage(page, r.path, r.name, adminSetup);
    await context.close();
  }

  await browser.close();
  return results;
}

// Run and output
runAudit().then((results) => {
  console.log("=== AUDIT RESULTS ===");
  console.log(`\nPASSED (${results.passed.length}):`);
  for (const p of results.passed) {
    const ce = p.consoleErrors.length ? ` [${p.consoleErrors.length} console errors]` : "";
    const pe = p.pageErrors.length ? ` [${p.pageErrors.length} page errors]` : "";
    console.log(`  ✓ ${p.name} — ${p.status} — "${p.title}"${ce}${pe}`);
  }

  if (results.failed.length) {
    console.log(`\nFAILED (${results.failed.length}):`);
    for (const f of results.failed) {
      console.log(`  ✗ ${f.name} — ${f.error || f.status}`);
    }
  }

  if (results.errors.length) {
    console.log(`\nERRORS/ISSUES (${results.errors.length}):`);
    for (const e of results.errors) {
      console.log(`  ! ${e}`);
    }
  } else {
    console.log("\n✓ No errors or issues found!");
  }

  console.log(`\nScreenshots saved to tests/screenshots/`);
});
