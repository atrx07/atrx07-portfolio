import { expect, test, type Page } from "@playwright/test";

async function openNavigationLink(page: Page, name: string) {
  const viewport = page.viewportSize();

  if (viewport && viewport.width <= 900) {
    await page.getByRole("button", { name: "Open navigation" }).click();
    await page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name }).click();
    return;
  }

  await page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link", { name }).click();
}

test("Field Notes archive preserves cross-route navigation and browser history", async ({ page }) => {
  await page.goto("/");
  await openNavigationLink(page, "Field Notes");

  await expect(page).toHaveURL(/\/blog$/);
  const fieldNotesHeading = page.getByRole("heading", { level: 1, name: "FIELD NOTES" });
  await expect(fieldNotesHeading).toBeVisible();
  await expect(fieldNotesHeading).toBeFocused();
  await expect(page.getByRole("link", { name: /A security tool should know when it is guessing/ }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: /Local AI is a systems problem/ }).first()).toBeVisible();

  await page.reload();
  await expect(page.getByRole("heading", { level: 1, name: "FIELD NOTES" })).toBeVisible();

  await openNavigationLink(page, "Projects");
  await expect(page).toHaveURL(/\/#projects$/);
  await expect(page.locator("#projects")).toBeFocused();
  await expect(page.locator("#projects-title")).toBeVisible();

  await page.goBack();
  await expect(page).toHaveURL(/\/blog$/);
  await expect(page.getByRole("heading", { level: 1, name: "FIELD NOTES" })).toBeVisible();

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});

test("development draft preview renders the long-form surface without page overflow", async ({ page }) => {
  await page.goto("/blog/registry-fixture?preview=draft");

  await expect(page.getByRole("heading", { level: 1, name: "Registry fixture" })).toBeVisible();
  await expect(page.getByRole("note")).toContainText("Local draft preview");
  await expect(page.getByRole("heading", { level: 2, name: "Pipeline proof" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Copy code sample" })).toBeVisible();
  await expect(page.getByRole("region", { name: "Scrollable technical table" })).toBeVisible();
  await expect(page.getByText("END OF TRANSMISSION")).toBeVisible();

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});

test("first real Field Note is public with grounded article metadata", async ({ page }) => {
  const slug = "local-ai-is-a-systems-problem";

  await page.goto(`/blog/${slug}`);
  await expect(page.getByRole("heading", { level: 1, name: "Local AI is a systems problem" })).toBeVisible();
  await expect(page.getByRole("note")).toHaveCount(0);
  await expect(
    page.getByRole("heading", { level: 2, name: "The product starts at the native boundary" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { level: 2, name: "The roadmap is a dependency graph" }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: /Repository/ })).toHaveAttribute(
    "href",
    "https://github.com/atrx07/NeuraLoc-Core",
  );
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /index, follow/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://atrx07.pages.dev/blog/local-ai-is-a-systems-problem",
  );
  await expect(page.locator('meta[property="og:type"]')).toHaveAttribute("content", "article");
  await expect(page.locator('meta[property="article:published_time"]')).toHaveAttribute(
    "content",
    "2026-08-24",
  );

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});

test("SecureScope Field Note is public with its evidence boundary intact", async ({ page }) => {
  const slug = "a-security-tool-should-know-when-it-is-guessing";

  await page.goto(`/blog/${slug}`);
  await expect(
    page.getByRole("heading", { level: 1, name: "A security tool should know when it is guessing" }),
  ).toBeVisible();
  await expect(page.getByRole("note")).toHaveCount(0);
  await expect(
    page.getByRole("heading", { level: 2, name: "Structured output is not structured evidence" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { level: 2, name: "The honesty label is a feature" }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: /Repository/ })).toHaveAttribute(
    "href",
    "https://github.com/atrx07/securescope",
  );
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /index, follow/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://atrx07.pages.dev/blog/a-security-tool-should-know-when-it-is-guessing",
  );
  await expect(page.locator('meta[property="og:type"]')).toHaveAttribute("content", "article");
  await expect(page.locator('meta[property="article:published_time"]')).toHaveAttribute(
    "content",
    "2026-08-25",
  );

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});

test("unknown routes and unpublished article slugs have deliberate recovery states", async ({ page }) => {
  await page.goto("/blog/not-published");
  await expect(page.getByRole("heading", { level: 1, name: "FIELD NOTE NOT FOUND" })).toBeVisible();
  await expect(page.getByText(/\/blog\/not-published/)).toBeVisible();

  await page.goto("/missing-system");
  await expect(page.getByRole("heading", { level: 1, name: "SIGNAL LOST / 404" })).toBeVisible();
  await expect(page.getByRole("link", { name: /Return home/ })).toHaveAttribute("href", "/");

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});

test("hero artwork preloading belongs only to the homepage route", async ({ page }) => {
  const artworkRequests: string[] = [];
  page.on("request", (request) => {
    if (/\/atrx-(?:wide|portrait)\.(?:jpe?g|webp)$/.test(request.url())) artworkRequests.push(request.url());
  });

  await page.goto("/blog");
  expect(artworkRequests).toEqual([]);
  await expect(page.locator('link[data-home-artwork-preload]')).toHaveCount(0);

  await page.goto("/missing-system");
  expect(artworkRequests).toEqual([]);
  await expect(page.locator('link[data-home-artwork-preload]')).toHaveCount(0);

  await page.goto("/");
  const expectedArtwork = (page.viewportSize()?.width ?? 1280) <= 640 ? "atrx-wide.webp" : "atrx-portrait.webp";
  await expect(page.locator('link[data-home-artwork-preload]')).toHaveAttribute("href", `/${expectedArtwork}`);
  await expect(page.locator('link[data-home-artwork-preload]')).toHaveAttribute("type", "image/webp");
  expect(artworkRequests).toHaveLength(1);
  expect(artworkRequests[0]?.endsWith(`/${expectedArtwork}`)).toBe(true);
});

test("reduced motion makes cross-route fragment movement immediate", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/blog");
  await openNavigationLink(page, "Projects");

  await expect(page).toHaveURL(/\/#projects$/);
  await expect(page.locator("#projects")).toBeFocused();
  const behavior = await page.locator("html").evaluate(() => getComputedStyle(document.documentElement).scrollBehavior);
  expect(behavior).toBe("auto");
});
