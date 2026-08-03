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
  await expect(page.getByText(/No filler posts/)).toBeVisible();

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
    if (/\/atrx-(?:wide|portrait)\.jpg$/.test(request.url())) artworkRequests.push(request.url());
  });

  await page.goto("/blog");
  expect(artworkRequests).toEqual([]);
  await expect(page.locator('link[data-home-artwork-preload]')).toHaveCount(0);

  await page.goto("/missing-system");
  expect(artworkRequests).toEqual([]);
  await expect(page.locator('link[data-home-artwork-preload]')).toHaveCount(0);

  await page.goto("/");
  const expectedArtwork = (page.viewportSize()?.width ?? 1280) <= 640 ? "atrx-wide.jpg" : "atrx-portrait.jpg";
  await expect(page.locator('link[data-home-artwork-preload]')).toHaveAttribute("href", `/${expectedArtwork}`);
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
