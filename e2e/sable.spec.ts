import { expect, test } from "@playwright/test";

test("Sable reveals steps and rails once per expansion and bypasses the sequence with reduced motion", async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await expect(page.locator(".current-build")).toContainText("Traelyx");
  const card = page.locator('[data-project-slug="sable"]');
  const visual = card.locator(".sable-visual");
  const mobile = (page.viewportSize()?.width ?? 0) <= 900;
  await card.scrollIntoViewIfNeeded();
  await page.mouse.move(0, 0);
  const expand = async () => {
    if (mobile) await card.locator(".project-slice-hit").click();
    else await card.locator(".project-slice-hit").focus();
    await expect(visual).toHaveClass(/has-timeline-reveal/);
  };
  const collapse = async () => {
    if (mobile) await card.locator(".project-slice-hit").click();
    else await page.locator('[data-project-slug="traelyx"] .project-slice-hit').focus();
    await expect(visual).not.toHaveClass(/has-timeline-reveal/);
  };
  const revealAnimations = () => visual.evaluate(root => root.getAnimations({ subtree: true })
    .filter(animation => animation instanceof CSSAnimation && animation.animationName.startsWith("sable-"))
    .map(animation => ({ name: (animation as CSSAnimation).animationName, delay: animation.effect!.getTiming().delay, iterations: animation.effect!.getTiming().iterations })));

  expect(await revealAnimations()).toEqual([]);
  await expand();
  const animations = await revealAnimations();
  expect(animations.filter(animation => animation.name === "sable-step-reveal").map(animation => Math.round(animation.delay))).toEqual([420, 580, 740, 900, 1060]);
  expect(animations.filter(animation => animation.name === "sable-rail-draw")).toHaveLength(4);
  expect(animations.filter(animation => animation.name === "sable-marker-reveal")).toHaveLength(5);
  expect(animations.every(animation => animation.iterations === 1)).toBe(true);
  await visual.evaluate(root => root.getAnimations({ subtree: true }).forEach(animation => {
    if (animation instanceof CSSAnimation && animation.animationName.startsWith("sable-")) {
      animation.pause();
      animation.currentTime = 900;
    }
  }));
  const steps = visual.locator('[data-slot="agent-step"]');
  await expect(steps.first()).toHaveCSS("opacity", "1");
  await expect(steps.last()).toHaveCSS("opacity", "0");
  const rail = steps.first().locator(":scope > div").first().locator(":scope > span").nth(1);
  const scale = await rail.evaluate(element => new DOMMatrixReadOnly(getComputedStyle(element).transform).m22);
  expect(scale).toBeGreaterThan(0);
  expect(scale).toBeLessThan(1);
  await card.screenshot({ path: testInfo.outputPath("sable-reveal-midpoint.png"), style: "header, .skip-link { visibility: hidden !important; }" });
  await visual.evaluate(root => root.getAnimations({ subtree: true }).forEach(animation => {
    if (animation instanceof CSSAnimation && animation.animationName.startsWith("sable-")) animation.play();
  }));
  await expect(steps.last()).toHaveCSS("opacity", "1");
  await expect.poll(() => rail.evaluate(element => new DOMMatrixReadOnly(getComputedStyle(element).transform).m22)).toBe(1);
  await expect(visual.locator('[data-status="running"]')).toHaveCount(0);
  await card.screenshot({ path: testInfo.outputPath("sable-reveal-complete.png"), style: "header, .skip-link { visibility: hidden !important; }" });
  await collapse();
  expect(await revealAnimations()).toEqual([]);
  await expand();
  expect(await revealAnimations()).toHaveLength(14);
  await expect(steps.last()).toHaveCSS("opacity", "0");

  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect.poll(revealAnimations).toEqual([]);
  for (const step of await steps.all()) await expect(step).toHaveCSS("opacity", "1");
  await expect(rail).toHaveCSS("transform", "none");
  await collapse();
  await expand();
  expect(await revealAnimations()).toEqual([]);
  await expect(steps.last()).toHaveCSS("opacity", "1");
  await card.getByRole("button", { name: "Inspect system" }).click();
  const dialog = page.getByRole("dialog", { name: "Sable-AI", exact: true });
  await expect(dialog.locator(".sable-visual")).not.toHaveClass(/has-timeline-reveal/);
  await dialog.getByRole("button", { name: "Policy blocks" }).click();
  await expect(dialog).toContainText("BLOCKED");
});

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
    await expect.poll(() => unfiltered.locator(".sable-dossier").evaluate((paper) => {
      const card = paper.closest("article")!.getBoundingClientRect();
      const receipt = paper.getBoundingClientRect();
      return receipt.left >= card.left && receipt.right <= card.right;
    })).toBe(true);
    await expect.poll(() => unfiltered.locator(".sable-visual").evaluate((visual) => {
      const bounds = visual.getBoundingClientRect();
      const identity = visual.querySelector(".sable-identity")!.getBoundingClientRect();
      const caption = visual.querySelector(".sable-caption")!.getBoundingClientRect();
      return identity.top >= bounds.top - 1 && caption.bottom <= bounds.bottom + 1;
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
  await expect(card).toContainText("active");
  await expect(card.locator('[data-visual="sable-agent-timeline"]')).toBeVisible();
  await expect(card.locator(".project-slice-body")).toHaveCSS("opacity", "1");
  await card.screenshot({ path: testInfo.outputPath("sable-card.png") });
  await card.getByRole("button", { name: "Inspect system" }).click();
  const dialog = page.getByRole("dialog", { name: "Sable-AI", exact: true });
  const explorer = dialog.getByRole("region", { name: "Sable verification and undo explorer" });
  await expect(explorer).toBeVisible();
  await expect(explorer.getByRole("list", { name: "Documented agent sequence" }).getByRole("listitem")).toHaveCount(5);
  const baseline = explorer.getByRole("button", { name: /Capture baseline/ });
  await baseline.click();
  await expect(baseline).toHaveAttribute("aria-expanded", "true");
  await expect(explorer).toContainText("does not cover arbitrary subprocess effects");
  await baseline.click();
  await dialog.getByRole("button", { name: "Tool missing" }).click();
  await expect(explorer).toContainText("INCOMPLETE");
  await expect(explorer.locator('[data-slot="agent-step"]').nth(3)).toHaveAttribute("data-status", "pending");
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
  await expect(page.getByRole("log")).toContainText("Sable-AI // ACTIVE");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  expect(errors).toEqual([]);
});

test("Sable timeline stays contained and keyboard usable across desktop, tablet, and reflow", async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [1280, 1024, 768, 640, 360]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await expect(page.locator(".current-build")).toContainText("Traelyx");
    const card = page.locator('[data-project-slug="sable"]');
    if (width > 900) {
      await page.locator(".project-accordions").evaluate(rack => window.scrollTo(0, rack.getBoundingClientRect().top + window.scrollY - 90));
      await page.mouse.move(0, 0);
      await card.locator(".project-slice-hit").focus();
    } else {
      await card.locator(".project-slice-hit").click();
    }
    await expect(card).toHaveClass(/is-expanded/);
    await expect(card.locator(".project-slice-body")).toHaveCSS("opacity", "1");
    await expect.poll(() => card.locator(".sable-visual").evaluate(visual => {
      const bounds = visual.getBoundingClientRect();
      return [".sable-identity", ".sable-dossier", ".sable-caption"].every(selector => {
        const rect = visual.querySelector(selector)!.getBoundingClientRect();
        return rect.top >= bounds.top - 1 && rect.bottom <= bounds.bottom + 1 &&
          rect.left >= bounds.left && rect.right <= bounds.right;
      });
    })).toBe(true);
    await card.screenshot({ path: testInfo.outputPath(`sable-rack-${width}.png`), style: "header, .skip-link { visibility: hidden !important; }" });
    await page.getByRole("button", { name: "Open command palette" }).click();
    await page.getByRole("textbox", { name: "Search commands" }).fill("Sable");
    await page.getByRole("button", { name: "Open Sable-AI Projects" }).click();
    const dialog = page.getByRole("dialog", { name: "Sable-AI", exact: true });
    const block = dialog.getByRole("button", { name: "Policy blocks" });
    await block.focus();
    await page.keyboard.press("Enter");
    await expect(dialog).toContainText("BLOCKED");
    const context = dialog.getByRole("button", { name: /Gather context/ });
    await context.focus();
    await page.keyboard.press("Enter");
    await expect(context).toHaveAttribute("aria-expanded", "true");
    await expect(dialog).toContainText("Selected context is sent to hosted Groq inference");
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
