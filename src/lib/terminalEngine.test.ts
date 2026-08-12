import { completeTerminalCommand, executeTerminalCommand } from "./terminalEngine";

describe("terminalEngine", () => {
  it("parses a known project command without evaluating input", () => {
    const result = executeTerminalCommand("project neuraloc");

    expect(result.lines[0]).toContain("NeuraLoc-Core");
    expect(result.lines.join(" ")).toContain("Verified pinned llama.cpp");
  });

  it("reports Traelyx as the current project at its verified M2.7 boundary", () => {
    const project = executeTerminalCommand("project traelyx");
    const now = executeTerminalCommand("now");

    expect(project.lines.join(" ")).toContain("M0 and M1 are complete");
    expect(now.lines[0]).toContain("Traelyx");
    expect(now.lines.join(" ")).toContain("M2.7 validated");
    expect(now.lines.join(" ")).toContain("30–60 minute locked-screen drive");
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
