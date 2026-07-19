import { act, renderHook } from "@testing-library/react";
import { useVisitorMode } from "./useVisitorMode";

describe("useVisitorMode", () => {
  beforeEach(() => window.localStorage.clear());

  it("defaults to recruiter and persists updates", () => {
    const { result } = renderHook(() => useVisitorMode());

    expect(result.current[0]).toBe("recruiter");
    act(() => result.current[1]("developer"));

    expect(result.current[0]).toBe("developer");
    expect(window.localStorage.getItem("atrx-visitor-mode")).toBe('"developer"');
  });
});
