import { expect, test } from "@playwright/test";

test("Sable is discoverable through the project list, palette, and safe terminal without replacing Traelyx", async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".current-build")).toContainText("Traelyx");
  await expect(page.locator("#now")).toContainText("Traelyx");
  await expect(page.locator("[data-project-slug]")).toHaveCount(8);

  if ((page.viewportSize()?.width ?? 0) > 900) {
    const unfiltered = page.locator('[data-project-slug="sable"]');
    await page.locator(".project-accordions").evaluate((rack) => window.scrollTo(0, rack.getBoundingClientRect().top + window.scrollY - 90));
    await page.mouse.move(0, 0);
    await unfiltered.locator(".project-slice-hit").focus();
    await expect(unfiltered).toHaveClass(/is-expanded/);
    await expect(unfiltered.locator(".project-slice-hit")).toHaveAttribute("aria-expanded", "true");
    await expect.poll(() => unfiltered.locator(".sable-paper").evaluate((paper) => {
      const card = paper.closest("article")!.getBoundingClientRect();
      const receipt = paper.getBoundingClientRect();
      return receipt.left >= card.left && receipt.right <= card.right;
    })).toBe(true);
    expect(await unfiltered.locator(".sable-visual").evaluate((visual) => {
      const bounds = visual.getBoundingClientRect();
      const identity = visual.querySelector(".sable-identity")!.getBoundingClientRect();
      const caption = visual.querySelector(".sable-caption")!.getBoundingClientRect();
      return identity.top >= bounds.top && caption.bottom <= bounds.bottom;
    })).toBe(true);
    await page.screenshot({ path: testInfo.outputPath("sable-unfiltered-rack.png") });
    await expect(unfiltered).toHaveClass(/is-expanded/);
    expect(await unfiltered.locator(".project-slice-body").evaluate((element) => element.scrollWidth <= element.clientWidth + 1)).toBe(true);
  }

  await page.getByRole("button", { name: "Developer tools", exact: true }).click();
  await expect(page.locator("[data-project-slug]")).toHaveCount(1);
  const card = page.locator('[data-project-slug="sable"]');
  const mobile = (page.viewportSize()?.width ?? 0) <= 900;
  if (mobile) await card.getByRole("button", { name: "Expand Sable-AI project card" }).click();
  await expect(card).toContainText("completed");
  await expect(card.locator('[data-visual="sable-change-receipt"]')).toBeVisible();
  await expect(card.locator(".project-slice-body")).toHaveCSS("opacity", "1");
  await card.screenshot({ path: testInfo.outputPath("sable-card.png") });
  await card.getByRole("button", { name: "Inspect system" }).click();
  const dialog = page.getByRole("dialog", { name: "Sable-AI", exact: true });
  const explorer = dialog.getByRole("region", { name: "Sable verification and undo explorer" });
  await expect(explorer).toBeVisible();
  await dialog.getByRole("button", { name: "Tool missing" }).click();
  await expect(explorer).toContainText("INCOMPLETE");
  await dialog.getByRole("button", { name: /Later user edit/ }).click();
  await expect(explorer).toContainText("LATER EDIT PRESERVED");
  await dialog.getByRole("button", { name: "Checks pass" }).click();
  await expect(explorer).toContainText("VERIFIED");
  await expect(explorer).toContainText("LATER EDIT PRESERVED");
  await expect(dialog.getByRole("link", { name: "Open repository" })).toHaveAttribute("href", "https://github.com/atrx07/Sable-AI");
  await dialog.screenshot({ path: testInfo.outputPath("sable-dialog.png") });
  expect(await dialog.evaluate((element) => element.scrollWidth <= element.clientWidth + 1)).toBe(true);
  await page.getByRole("button", { name: "Close project details" }).click();
  await expect(card.getByRole("button", { name: "Inspect system" })).toBeFocused();

  await page.getByRole("button", { name: "Open command palette" }).click();
  await page.getByRole("textbox", { name: "Search commands" }).fill("Sable");
  await page.getByRole("button", { name: "Open Sable-AI Projects" }).click();
  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText("RESTORE AVAILABLE");
  await page.keyboard.press("Escape");
  await page.getByRole("tab", { name: "Sable-AI", exact: true }).click();
  await page.getByRole("button", { name: "Recoverable edits", exact: true }).click();
  await expect(page.locator(".architecture-detail")).toContainText("later user edits");

  await page.getByLabel("Portfolio terminal command").fill("project sable");
  await page.getByLabel("Portfolio terminal command").press("Enter");
  await expect(page.getByRole("log")).toContainText("Sable-AI // COMPLETED");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  expect(errors).toEqual([]);
});

test("Sable receipt remains keyboard usable at 360, 768, and 200-percent-equivalent reflow", async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [360, 768, 640]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await page.getByRole("button", { name: "Open command palette" }).click();
    await page.getByRole("textbox", { name: "Search commands" }).fill("Sable");
    await page.getByRole("button", { name: "Open Sable-AI Projects" }).click();
    const dialog = page.getByRole("dialog", { name: "Sable-AI", exact: true });
    const block = dialog.getByRole("button", { name: "Policy blocks" });
    await block.focus();
    await page.keyboard.press("Enter");
    await expect(dialog).toContainText("BLOCKED");
    const edit = dialog.getByRole("button", { name: /Later user edit/ });
    await edit.focus();
    await page.keyboard.press("Space");
    await expect(dialog).toContainText("LATER EDIT PRESERVED");
    await dialog.screenshot({ path: testInfo.outputPath(`sable-reflow-${width}.png`) });
    expect(await dialog.evaluate((element) => element.scrollWidth <= element.clientWidth + 1)).toBe(true);
    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
  }
});
