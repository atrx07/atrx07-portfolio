import { getHashTargetId, prefersReducedMotion } from "./routeNavigation";

describe("route navigation helpers", () => {
  it("decodes valid route fragments and tolerates malformed values", () => {
    expect(getHashTargetId("#now%20building")).toBe("now building");
    expect(getHashTargetId("#%E0%A4%A")).toBe("%E0%A4%A");
    expect(getHashTargetId("")).toBeNull();
    expect(getHashTargetId("#")).toBeNull();
  });

  it("reads the user's reduced-motion preference", () => {
    const originalMatchMedia = window.matchMedia;
    window.matchMedia = vi.fn().mockReturnValue({ matches: true }) as typeof window.matchMedia;

    expect(prefersReducedMotion()).toBe(true);

    window.matchMedia = originalMatchMedia;
  });
});
