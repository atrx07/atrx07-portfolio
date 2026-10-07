import { completeTerminalCommand, executeTerminalCommand } from "./terminalEngine";

describe("terminalEngine", () => {
  it("parses a known project command without evaluating input", () => {
    const result = executeTerminalCommand("project neuraloc");

    expect(result.lines[0]).toContain("NeuraLoc-Core");
    expect(result.lines.join(" ")).toContain("Verified pinned llama.cpp");
  });

  it("reports Traelyx's connected checkpoint without promoting partial alerts or scoring", () => {
    const project = executeTerminalCommand("project traelyx");
    const now = executeTerminalCommand("now");

    expect(project.lines.join(" ")).toContain("M0–M5 and M6.1–M6.7 are complete");
    expect(now.lines[0]).toContain("Traelyx");
    expect(now.lines.join(" ")).toContain("M6.8 Guardian alerts in progress");
    expect(now.lines.join(" ")).toContain("experimental synthetic baseline");
    expect(now.lines.join(" ")).toContain("two-phone validation gates");
    expect(now.lines.join(" ")).toContain("M7 ML and M8 public-release hardening remain future work");
  });

  it("returns a useful response for an unknown command", () => {
    const result = executeTerminalCommand("rm -rf /");

    expect(result.lines[0]).toBe("command not found: rm -rf /");
    expect(result.action).toBeUndefined();
  });

  it("changes only allowlisted visitor modes", () => {
    expect(executeTerminalCommand("mode developer")).toMatchObject({
      action: "mode",
      mode: "developer",
    });
    expect(executeTerminalCommand("mode admin").action).toBeUndefined();
  });

  it("completes only a unique known command", () => {
    expect(completeTerminalCommand("project neur")).toBe("project neuraloc");
    expect(completeTerminalCommand("project ")).toBe("project ");
  });
});
