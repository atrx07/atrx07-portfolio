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

test("identity, project, dialog, and terminal layout repairs hold", async ({ page }) => {
  await page.goto("/");

  const headerMark = page.getByRole("link", { name: "ATRX07 home" });
  await expect(headerMark).toContainText("ATRX07");
  await expect(headerMark.locator("img")).toHaveCount(0);
  await expect(page.locator(".hero-scan, .hero-identity-scan")).toHaveCount(0);
  await expect(page.locator(".field-note-art")).toHaveAttribute("src", "/atrx-portrait.jpg");
  await expect(page.locator(".inline-system-image")).toHaveCSS("display", "inline-flex");

  const viewport = page.viewportSize();
  if (viewport && viewport.width > 900) {
    await page.goto("/#projects");
    await page.evaluate(() => document.fonts.ready.then(() => true));
    await page.waitForTimeout(250);
    const flagshipGeometry = await page.evaluate(() => {
      const flagship = document.querySelector<HTMLElement>("#now");
      const title = document.querySelector<HTMLElement>(".flagship-title");
      const projects = document.querySelector<HTMLElement>("#projects");
      if (!flagship || !title || !projects) {
        return { clears: false, clipped: false, flagshipBottom: 0, projectsTop: 0 };
      }
      const flagshipBottom = flagship.getBoundingClientRect().bottom;
      const projectsTop = projects.getBoundingClientRect().top;
      return {
        clears: flagshipBottom <= projectsTop + 1,
        clipped: getComputedStyle(flagship).overflowY === "clip",
        flagshipBottom,
        projectsTop,
      };
    });
    expect(flagshipGeometry).toMatchObject({ clears: true, clipped: true });
    await page.goto("/");
  }

  const runtimeVisual = page.locator(".project-slice.is-expanded .runtime-visual");
  const runtimePartsFit = await runtimeVisual.evaluate((visual) => {
    const frame = visual.getBoundingClientRect();
    return [visual.querySelector(".runtime-ring"), visual.querySelector(".runtime-bars")].every((part) => {
      if (!part) return false;
      const bounds = part.getBoundingClientRect();
      return (
        bounds.left >= frame.left &&
        bounds.right <= frame.right &&
        bounds.top >= frame.top &&
        bounds.bottom <= frame.bottom
      );
    });
  });
  expect(runtimePartsFit).toBe(true);

  await page.getByRole("button", { name: "Music tech", exact: true }).click();
  const styleForgeButton = page.getByRole("button", { name: "Open StyleForge Lite project details" });
  await expect(styleForgeButton).toHaveAttribute("aria-expanded", "true");

  const filteredCardUsesRack = await page.locator(".project-accordions").evaluate((rack) => {
    const card = rack.querySelector(".project-slice");
    if (!card) return false;
    const rackBounds = rack.getBoundingClientRect();
    const cardBounds = card.getBoundingClientRect();
    return cardBounds.width >= rackBounds.width * 0.95;
  });
  expect(filteredCardUsesRack).toBe(true);

  await page.getByRole("button", { name: "Web / PWA", exact: true }).click();
  await page.getByRole("button", { name: "Open AtrxInstaDown project details" }).click();

  const dialog = page.getByRole("dialog", { name: /AtrxInstaDown/ });
  const dialogTitleFits = await dialog.evaluate((element) => {
    const title = element.querySelector("h2");
    const copy = element.querySelector(".project-dialog-copy");
    if (!title || !copy) return false;
    const titleBounds = title.getBoundingClientRect();
    const copyBounds = copy.getBoundingClientRect();
    return titleBounds.left >= copyBounds.left && titleBounds.right <= copyBounds.right + 1;
  });
  expect(dialogTitleFits).toBe(true);
  await page.getByRole("button", { name: "Close project details" }).click();

  await page.locator("#terminal").scrollIntoViewIfNeeded();
  const terminalWindow = page.locator(".terminal-window");
  const initialHeight = (await terminalWindow.boundingBox())?.height;
  const terminalInput = page.getByLabel("Portfolio terminal command");

  for (const command of ["help", "projects", "stack", "now", "about", "contact"]) {
    await terminalInput.fill(command);
    await terminalInput.press("Enter");
  }

  await expect(page.locator(".terminal-input-row > span").first()).toBeVisible();
  const terminalState = await terminalWindow.evaluate((element) => {
    const output = element.querySelector<HTMLElement>(".terminal-output");
    return {
      height: element.getBoundingClientRect().height,
      overflowY: output ? getComputedStyle(output).overflowY : "",
      scrollsInternally: Boolean(output && output.scrollHeight > output.clientHeight && output.scrollTop > 0),
    };
  });

  expect(terminalState.height).toBeCloseTo(initialHeight ?? terminalState.height, 0);
  expect(terminalState.overflowY).toBe("auto");
  expect(terminalState.scrollsInternally).toBe(true);
});

test("mobile project rack opens the card nearest the viewport", async ({ page }) => {
  const viewport = page.viewportSize();
  test.skip(!viewport || viewport.width > 900, "Mobile-only scroll behavior");

  await page.goto("/#projects");

  const heroMobileLayout = await page.locator(".hero").evaluate((hero) => {
    const identity = hero.querySelector<HTMLElement>(".hero-identity");
    const modes = hero.querySelector<HTMLElement>(".hero-bottom .mode-switch");
    if (!identity || !modes) return { centered: false, stacked: false, modesOnLeft: false };
    const heroBounds = hero.getBoundingClientRect();
    const identityBounds = identity.getBoundingClientRect();
    const modeBounds = modes.getBoundingClientRect();
    return {
      centered: Math.abs(identityBounds.left + identityBounds.width / 2 - heroBounds.width / 2) <= 2,
      stacked: getComputedStyle(modes).flexDirection === "column",
      modesOnLeft: modeBounds.left < identityBounds.left + identityBounds.width / 2,
    };
  });
  expect(heroMobileLayout).toEqual({ centered: true, stacked: true, modesOnLeft: true });

  const first = page.getByRole("button", { name: "Open NeuraLoc-Core project details" });
  const second = page.getByRole("button", { name: "Open void.chat project details" });
  await expect(first).toHaveAttribute("aria-expanded", "true");

  await second.evaluate((element) => element.scrollIntoView({ block: "center" }));

  await expect(second).toHaveAttribute("aria-expanded", "true");
  await expect(first).toHaveAttribute("aria-expanded", "false");
});
