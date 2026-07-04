import { test, expect } from "@playwright/test";

/**
 * Verifies that:
 *  1. The current route is preserved on a full page reload (SPA deep-link works).
 *  2. The mobile navigation sidebar's open/closed state is reset to closed
 *     after reload (which is the intentional, accessible default — a persisted
 *     open menu would trap focus without user intent).
 */

const BASE_URL = process.env.E2E_BASE_URL ?? "http://localhost:8080";
const MOBILE_VIEWPORT = { width: 390, height: 844 };

test.describe("Route + mobile sidebar persistence on reload", () => {
  test("preserves the current route after a full reload", async ({ browser }) => {
    const context = await browser.newContext({ viewport: MOBILE_VIEWPORT });
    const page = await context.newPage();

    await page.goto(`${BASE_URL}/about`, { waitUntil: "domcontentloaded" });
    await expect(page).toHaveURL(/\/about$/);

    await page.reload({ waitUntil: "domcontentloaded" });
    await expect(page).toHaveURL(/\/about$/);
    // Ensure we did not fall through to a 404 page.
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    await context.close();
  });

  test("mobile sidebar closes after reload", async ({ browser }) => {
    const context = await browser.newContext({ viewport: MOBILE_VIEWPORT });
    const page = await context.newPage();

    await page.goto(`${BASE_URL}/`, { waitUntil: "domcontentloaded" });

    // Open the mobile menu.
    const menuToggle = page.getByRole("button", { name: /open menu|menu/i }).first();
    await menuToggle.click();
    const dialog = page.getByRole("dialog").first();
    await expect(dialog).toBeVisible();

    // Reload the page — sidebar must not remain open across sessions.
    await page.reload({ waitUntil: "domcontentloaded" });
    await expect(page.getByRole("dialog")).toHaveCount(0);

    // Body scroll should not be locked after reload.
    const overflow = await page.evaluate(() => document.body.style.overflow);
    expect(overflow === "" || overflow === "auto" || overflow === "visible").toBe(true);

    await context.close();
  });
});
