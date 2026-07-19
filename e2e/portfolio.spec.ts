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

test("project, architecture, principles, and contact interaction tour", async ({ page }) => {
  await page.goto("/#projects");

  await page.getByRole("button", { name: "Music tech", exact: true }).click();
  await expect(page.getByRole("button", { name: "Open StyleForge Lite project details" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Open NeuraLoc-Core project details" })).toHaveCount(0);

  await page.goto("/#architecture");
  await page.getByRole("tab", { name: "void.chat", exact: true }).click();

  const browserNode = page.getByRole("button", { name: "Browser + Firebase", exact: true });
  const workerNode = page.getByRole("button", { name: "Cloudflare Worker", exact: true });
  await browserNode.focus();
  await browserNode.press("ArrowRight");
  await expect(workerNode).toBeFocused();
  await expect(
    page.locator(".architecture-detail").getByRole("heading", { name: "Cloudflare Worker", level: 3 }),
  ).toBeVisible();

  await page.getByRole("button", { name: "Next principle" }).click();
  await expect(page.getByRole("heading", { name: "REAL TARGETS BEAT PERFECT MOCKUPS.", level: 2 })).toBeVisible();

  await page.getByRole("button", { name: "Copy email" }).click();
  await expect(page.getByRole("button", { name: "Email copied" })).toBeVisible();
});

test("critical mobile copy stays inside its layout", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto("/");

  const containment = await page.evaluate(() => {
    const selectors = [
      "#architecture .section-heading",
      "#now .proof-main",
      "#architecture .architecture-detail",
      "#contact .contact-inner",
    ];

    return selectors.map((selector) => {
      const element = document.querySelector<HTMLElement>(selector);
      if (!element) return { selector, inside: false };
      const rect = element.getBoundingClientRect();
      return {
        selector,
        inside: rect.left >= 0 && rect.right <= window.innerWidth,
      };
    });
  });

  expect(containment).toEqual(
    containment.map(({ selector }) => ({
      selector,
      inside: true,
    })),
  );
});
