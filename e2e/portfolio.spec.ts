import { expect, test } from "@playwright/test";

test("command palette to NeuraLoc terminal flow", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: "Open command palette" }).click();
  await page.getByPlaceholder("Navigate, inspect, or switch mode...").fill("Go to Projects");
  await page.getByRole("button", { name: /Go to Projects/ }).click();

  await page.getByRole("button", { name: "Open NeuraLoc-Core project details" }).click();
  await expect(page.getByRole("dialog", { name: /NeuraLoc-Core/ })).toBeVisible();
  await expect(page.getByRole("link", { name: "Open repository" })).toHaveAttribute(
    "href",
    "https://github.com/atrx07/NeuraLoc-Core",
  );
  await page.getByRole("button", { name: "Close project details" }).click();

  await page.getByRole("button", { name: "developer", exact: true }).click();
  await page.keyboard.press("Control+K");
  await page.getByPlaceholder("Navigate, inspect, or switch mode...").fill("Open portfolio terminal");
  await page.getByRole("button", { name: /Open portfolio terminal/ }).click();

  const terminal = page.getByLabel("Portfolio terminal command");
  await terminal.fill("project neuraloc");
  await terminal.press("Enter");

  await expect(page.getByRole("log")).toContainText("NeuraLoc-Core");
  await expect(page.locator('a[href="https://github.com/atrx07/NeuraLoc-Core"]').first()).toBeAttached();
});

test("mobile navigation and layout smoke", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 780 });
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await page.getByRole("button", { name: "Open navigation" }).click();
  const mobileNavigation = page.getByRole("navigation", { name: "Mobile navigation" });
  await expect(mobileNavigation).toBeVisible();
  await mobileNavigation.getByRole("link", { name: "Projects" }).click();

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});
