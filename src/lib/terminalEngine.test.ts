import { completeTerminalCommand, executeTerminalCommand } from "./terminalEngine";

describe("terminalEngine", () => {
  it("parses a known project command without evaluating input", () => {
    const result = executeTerminalCommand("project neuraloc");

    expect(result.lines[0]).toContain("NeuraLoc-Core");
    expect(result.lines.join(" ")).toContain("Verified pinned llama.cpp");
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
