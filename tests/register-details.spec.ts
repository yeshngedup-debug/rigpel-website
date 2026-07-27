import { test, expect } from "@playwright/test";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

test.describe("Register Details Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/register/role`);
    // Select worker role to set localStorage
    await page.getByText("I'm a Worker").click();
    await page.waitForURL("**/register/details");
  });

  test("renders all form fields", async ({ page }) => {
    await expect(page.getByPlaceholder("e.g. Tashi Dorji")).toBeVisible();
    await expect(page.getByPlaceholder("77-123456")).toBeVisible();
    await expect(page.getByPlaceholder("e.g. 11501000123")).toBeVisible();
    await expect(page.getByRole("checkbox")).toBeVisible();
  });

  test("disables submit when fields empty", async ({ page }) => {
    const submitBtn = page.getByRole("button", { name: "Create Account" });
    await expect(submitBtn).toBeDisabled();
  });

  test("submits with valid data and redirects to dashboard", async ({ page }) => {
    await page.getByPlaceholder("e.g. Tashi Dorji").fill("Tashi Dorji");
    await page.getByPlaceholder("77-123456").fill("77-123456");
    await page.getByPlaceholder("e.g. 11501000123").fill("11501000123");
    await page.getByRole("checkbox").check();
    await page.getByRole("button", { name: "Create Account" }).click();
    await page.waitForURL("**/worker/dashboard", { timeout: 5000 });
  });

  test("shows loading state on submit", async ({ page }) => {
    await page.getByPlaceholder("e.g. Tashi Dorji").fill("Tashi Dorji");
    await page.getByPlaceholder("77-123456").fill("77-123456");
    await page.getByPlaceholder("e.g. 11501000123").fill("11501000123");
    await page.getByRole("checkbox").check();
    await page.getByRole("button", { name: "Create Account" }).click();
    await expect(page.getByText("Creating account...")).toBeVisible();
  });

  test("redirects to /register/role if no role stored", async ({ page }) => {
    await page.evaluate(() => localStorage.clear());
    await page.goto(`${BASE_URL}/register/details`);
    await page.waitForURL("**/register/role");
  });
});
