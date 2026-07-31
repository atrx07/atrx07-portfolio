import { expect, test } from "@playwright/test";

test("technical SEO signals agree on the canonical profile", async ({ page, request }) => {
  await page.goto("/");

  await expect(page).toHaveTitle("Arppith Andrews | AI, Automation & Software Developer");
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    /engineering student, AI and automation builder, software developer, and web developer/i,
  );
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /max-image-preview:large/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://atrx07.pages.dev/");
  await expect(page.locator('meta[property="og:type"]')).toHaveAttribute("content", "profile");

  const structuredData = await page.locator('script[type="application/ld+json"]').textContent();
  expect(structuredData).not.toBeNull();
  const graph = JSON.parse(structuredData ?? "{}") as {
    "@graph"?: Array<{ "@type"?: string; name?: string; url?: string }>;
  };
  expect(graph["@graph"]?.some((item) => item["@type"] === "Person" && item.name === "Arppith Andrews")).toBe(
    true,
  );
  expect(graph["@graph"]?.some((item) => item["@type"] === "ProfilePage")).toBe(true);
  expect(graph["@graph"]?.filter((item) => item["@type"] === "SoftwareSourceCode")).toHaveLength(3);

  const sitemapResponse = await request.get("/sitemap.xml");
  expect(sitemapResponse.ok()).toBe(true);
  const sitemap = await sitemapResponse.text();
  expect(sitemap).toContain("<loc>https://atrx07.pages.dev/</loc>");
  expect(sitemap).toContain("<lastmod>2026-07-22</lastmod>");
  expect(sitemap).not.toContain("<changefreq>");
  expect(sitemap).not.toContain("<priority>");

  const robotsResponse = await request.get("/robots.txt");
  expect(robotsResponse.ok()).toBe(true);
  const robots = await robotsResponse.text();
  expect(robots).toContain("User-agent: *");
  expect(robots).toContain("Allow: /");
  expect(robots).toContain("Sitemap: https://atrx07.pages.dev/sitemap.xml");
});

test("command palette to NeuraLoc terminal flow", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: "Open command palette" }).click();
  await page.getByPlaceholder("Navigate, inspect, or switch mode...").fill("Go to Projects");
  await page.getByRole("button", { name: /Go to Projects/ }).click();

  const viewport = page.viewportSize();
  const neuralocCard = page.locator('[data-project-slug="neuraloc"]');
  if (viewport && viewport.width <= 900) {
    const neuralocToggle = neuralocCard.locator(".project-slice-hit");
    await expect(neuralocToggle).toHaveAccessibleName("Expand NeuraLoc-Core project card");
    await neuralocToggle.click();
    await expect(neuralocToggle).toHaveAttribute("aria-expanded", "true");
    await expect(neuralocToggle).toHaveAccessibleName("Collapse NeuraLoc-Core project card");
    await expect(page.getByRole("dialog", { name: /NeuraLoc-Core/ })).toHaveCount(0);
    await neuralocCard.getByRole("button", { name: "Inspect system" }).click();
  } else {
    await page.getByRole("button", { name: "Open NeuraLoc-Core project details" }).click();
  }

  await expect(page.getByRole("dialog", { name: /NeuraLoc-Core/ })).toBeVisible();
  await expect(page.getByRole("link", { name: "Open repository" })).toHaveAttribute(
    "href",
    "https://github.com/atrx07/NeuraLoc-Core",
  );
  await page.getByRole("button", { name: "Close project details" }).click();

  await page.getByRole("tab", { name: "developer", exact: true }).click();
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
  await expect(page.locator('[data-project-slug="styleforge"] .project-slice-hit')).toBeVisible();
  await expect(page.locator('[data-project-slug="neuraloc"]')).toHaveCount(0);

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
  await expect(page.getByRole("heading", { name: "REAL TARGETS BEAT PERFECT MOCKUPS.", level: 3 })).toBeVisible();

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
  await expect(headerMark.locator(".header-signal i")).toHaveCount(5);
  await expect(page.locator(".hero-scan, .hero-identity-scan")).toHaveCount(0);
  await expect(page.locator(".field-note-art")).toHaveAttribute("src", "/atrx-portrait.jpg");
  await expect(page.locator(".inline-system-image")).toHaveCSS("display", "inline-flex");

  const viewport = page.viewportSize();
  if (viewport && viewport.width > 900) {
    await page.evaluate(() => document.fonts.ready.then(() => true));
    await page.locator("#now .pin-spacer").waitFor({ state: "attached" });
    const pinProbeY = await page.evaluate(() => {
      const flagship = document.querySelector<HTMLElement>("#now");
      const title = document.querySelector<HTMLElement>(".flagship-title");
      const header = document.querySelector<HTMLElement>(".site-header");
      if (!flagship || !title || !header) return 0;

      const flagshipTop = flagship.getBoundingClientRect().top + window.scrollY;
      const paddingTop = Number.parseFloat(getComputedStyle(flagship).paddingTop) || 0;
      const centeredTop = Math.max(
        header.getBoundingClientRect().height + 4,
        (window.innerHeight - title.offsetHeight) / 2,
      );
      return flagshipTop + paddingTop - centeredTop + 60;
    });
    await page.mouse.wheel(0, pinProbeY);
    await page.waitForTimeout(250);

    const pinnedTitle = await page.locator(".flagship-title").evaluate((title) => {
      const bounds = title.getBoundingClientRect();
      return {
        centerOffset: Math.abs(bounds.top + bounds.height / 2 - window.innerHeight / 2),
        pinned: getComputedStyle(title).position === "fixed",
      };
    });
    expect(pinnedTitle.pinned).toBe(true);
    expect(pinnedTitle.centerOffset).toBeLessThanOrEqual(2);

    await page.goto("/#projects");
    await page.evaluate(() => document.fonts.ready.then(() => true));
    await page.waitForTimeout(250);
    const flagshipGeometry = await page.evaluate(() => {
      const flagship = document.querySelector<HTMLElement>("#now");
      const header = document.querySelector<HTMLElement>(".site-header");
      const title = document.querySelector<HTMLElement>(".flagship-title");
      const projects = document.querySelector<HTMLElement>("#projects");
      if (!flagship || !header || !title || !projects) {
        return {
          clears: false,
          clipped: false,
          flagshipBottom: 0,
          projectsTop: 0,
          titleHidden: false,
        };
      }
      const flagshipBottom = flagship.getBoundingClientRect().bottom;
      const headerBottom = header.getBoundingClientRect().bottom;
      const projectsTop = projects.getBoundingClientRect().top;
      const titleOpacity = Number.parseFloat(getComputedStyle(title).opacity);
      return {
        clears: flagshipBottom <= projectsTop + 1,
        clipped: getComputedStyle(flagship).overflowY === "hidden",
        flagshipBottom,
        projectsTop,
        titleHidden: projectsTop <= headerBottom + 40 || titleOpacity <= 0.01,
      };
    });
    expect(flagshipGeometry).toMatchObject({ clears: true, clipped: true, titleHidden: true });
    await page.goto("/");
  }

  const neuralocCard = page.locator('[data-project-slug="neuraloc"]');
  if (viewport && viewport.width <= 900) {
    await neuralocCard.getByRole("button", { name: "Expand NeuraLoc-Core project card" }).click();
    await page.waitForTimeout(850);
  }

  const runtimeVisual = page.locator(".project-slice.is-expanded .runtime-visual");
  const runtimeGeometry = await runtimeVisual.evaluate((visual) => {
    const frame = visual.getBoundingClientRect();
    const center = visual.querySelector<HTMLElement>(".runtime-center");
    const ring = visual.querySelector<HTMLElement>(".runtime-ring");
    const partsFit = [ring, visual.querySelector(".runtime-bars")].every((part) => {
      if (!part) return false;
      const bounds = part.getBoundingClientRect();
      return (
        bounds.left >= frame.left &&
        bounds.right <= frame.right &&
        bounds.top >= frame.top &&
        bounds.bottom <= frame.bottom
      );
    });
    if (!center || !ring) {
      return {
        horizontalOffset: Number.POSITIVE_INFINITY,
        leftOfSeparator: false,
        partsFit,
        verticalOffset: Number.POSITIVE_INFINITY,
      };
    }
    const centerBounds = center.getBoundingClientRect();
    const ringBounds = ring.getBoundingClientRect();
    const ringCenterX = ringBounds.left + ringBounds.width / 2;
    const ringCenterY = ringBounds.top + ringBounds.height / 2;
    return {
      partsFit,
      horizontalOffset: Math.abs(ringCenterX - (centerBounds.left + centerBounds.width / 4)),
      verticalOffset: Math.abs(ringCenterY - (centerBounds.top + centerBounds.height / 2)),
      leftOfSeparator: ringCenterX < frame.left + frame.width / 2,
    };
  });
  expect(runtimeGeometry.partsFit).toBe(true);
  expect(runtimeGeometry.horizontalOffset).toBeLessThanOrEqual(1);
  expect(runtimeGeometry.verticalOffset).toBeLessThanOrEqual(1);
  expect(runtimeGeometry.leftOfSeparator).toBe(true);

  await page.getByRole("button", { name: "Music tech", exact: true }).click();
  const styleForgeButton = page.locator('[data-project-slug="styleforge"] .project-slice-hit');
  if (viewport && viewport.width <= 900) {
    await expect(styleForgeButton).toHaveAttribute("aria-expanded", "false");
    await styleForgeButton.click();
  }
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
  const instaCard = page.locator('[data-project-slug="atrxinstadown"]');
  if (viewport && viewport.width <= 900) {
    await instaCard.getByRole("button", { name: "Expand AtrxInstaDown project card" }).click();
    await instaCard.getByRole("button", { name: "Inspect system" }).click();
  } else {
    await page.getByRole("button", { name: "Open AtrxInstaDown project details" }).click();
  }

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

test("mobile project rack opens only on tap and reserves the dialog for inspection", async ({ page }) => {
  const viewport = page.viewportSize();
  test.skip(!viewport || viewport.width > 900, "Mobile-only tap behavior");

  await page.goto("/#projects");

  const heroMobileLayout = await page.locator(".hero").evaluate((hero) => {
    const identity = hero.querySelector<HTMLElement>(".hero-identity");
    const modes = hero.querySelector<HTMLElement>(".hero-bottom .mode-switch");
    const actions = hero.querySelector<HTMLElement>(".hero-actions");
    const wideSource = hero.querySelector<HTMLSourceElement>(
      '.hero-identity source[media="(max-width: 640px)"]',
    );
    if (!identity || !modes || !actions) {
      return {
        centered: false,
        gapCovered: false,
        fullBleed: false,
        horizontal: false,
        modesBelow: false,
        wideArt: false,
      };
    }
    const heroBounds = hero.getBoundingClientRect();
    const identityBounds = identity.getBoundingClientRect();
    const modeBounds = modes.getBoundingClientRect();
    const actionBounds = actions.getBoundingClientRect();
    const mediaGap = identityBounds.top - actionBounds.bottom;
    return {
      centered: Math.abs(identityBounds.left + identityBounds.width / 2 - heroBounds.width / 2) <= 2,
      gapCovered: mediaGap >= 0 && mediaGap <= 90,
      fullBleed: identityBounds.width >= heroBounds.width - 1,
      horizontal: getComputedStyle(modes).flexDirection === "row",
      modesBelow: modeBounds.top >= identityBounds.bottom,
      wideArt: wideSource?.getAttribute("srcset") === "/atrx-wide.jpg",
    };
  });
  expect(heroMobileLayout).toEqual({
    centered: true,
    gapCovered: true,
    fullBleed: true,
    horizontal: true,
    modesBelow: true,
    wideArt: true,
  });

  const firstCard = page.locator('[data-project-slug="neuraloc"]');
  const secondCard = page.locator('[data-project-slug="voidchat"]');
  const first = firstCard.locator(".project-slice-hit");
  const second = secondCard.locator(".project-slice-hit");
  await expect(first).toHaveAccessibleName("Expand NeuraLoc-Core project card");
  await expect(second).toHaveAccessibleName("Expand void.chat project card");
  await expect(first).toHaveAttribute("aria-expanded", "false");
  await expect(second).toHaveAttribute("aria-expanded", "false");

  await second.evaluate((element) => element.scrollIntoView({ block: "center" }));
  await page.waitForTimeout(500);
  await expect(first).toHaveAttribute("aria-expanded", "false");
  await expect(second).toHaveAttribute("aria-expanded", "false");

  await first.click();
  await expect(first).toHaveAttribute("aria-expanded", "true");
  await expect(first).toHaveAccessibleName("Collapse NeuraLoc-Core project card");
  await expect(page.getByRole("dialog", { name: /NeuraLoc-Core/ })).toHaveCount(0);

  await second.click();
  await expect(second).toHaveAttribute("aria-expanded", "true");
  await expect(second).toHaveAccessibleName("Collapse void.chat project card");
  await expect(first).toHaveAttribute("aria-expanded", "false");

  await secondCard.getByRole("button", { name: "Inspect system" }).click();
  await expect(page.getByRole("dialog", { name: /void.chat/ })).toBeVisible();
});

test("mask actions and visitor mode motion preserve their interaction contracts", async ({ page }) => {
  await page.goto("/");

  const explore = page.locator('.hero-actions .mask-action[href="#projects"]');
  const github = page.locator('.hero-actions .mask-action[href="https://github.com/atrx07"]');
  const modeSwitch = page.locator(".hero-bottom .mode-switch");
  const recruiterTab = modeSwitch.getByRole("tab", { name: "recruiter" });
  const developerTab = modeSwitch.getByRole("tab", { name: "developer" });
  const chaosTab = modeSwitch.getByRole("tab", { name: "chaos" });

  await expect(explore).toHaveAttribute("data-mask", "urban");
  await expect(explore).toHaveAttribute("data-variant", "primary");
  await expect(github).toHaveAttribute("data-mask", "forest");
  await expect(github).toHaveAttribute("data-variant", "secondary");

  await explore.dispatchEvent("pointerdown", { pointerType: "touch" });
  await expect(explore).toHaveAttribute("data-pressed", "true");
  await explore.dispatchEvent("pointerup", { pointerType: "touch" });
  await expect(explore).not.toHaveAttribute("data-pressed");

  await expect(modeSwitch).toHaveAttribute("data-rainbow", "true");
  await recruiterTab.focus();
  await recruiterTab.press("ArrowRight");
  await expect(developerTab).toBeFocused();
  await expect(recruiterTab).toHaveAttribute("aria-selected", "true");
  await developerTab.press("Enter");
  await expect(developerTab).toHaveAttribute("aria-selected", "true");

  await chaosTab.click();
  await expect(modeSwitch).toHaveAttribute("data-mode", "chaos");
  await expect(chaosTab).toHaveAttribute("data-selected", "true");
  await expect(chaosTab.locator(".magic-tab__front")).not.toHaveCSS("transform", "none");
  await expect(chaosTab.locator(".magic-tab__edge")).toHaveCSS("animation-name", "magic-rainbow");

  await page.goto("/#contact");
  const conversation = page.locator('.contact-actions .mask-action[href^="mailto:"]');
  const copy = page.getByRole("button", { name: "Copy email" });
  await expect(conversation).toHaveAttribute("data-mask", "nature");
  await expect(copy).toHaveAttribute("data-mask", "forest");

  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(conversation.locator(".mask-action__fill")).toHaveCSS("animation-name", "none");
  await page.goto("/");
  await expect(page.locator(".hero-bottom .animate-magic-rainbow").first()).toHaveCSS(
    "animation-name",
    "none",
  );
});
