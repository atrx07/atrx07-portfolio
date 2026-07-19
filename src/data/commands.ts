export type TerminalCommand = {
  command: string;
  description: string;
};

export const terminalCommands: TerminalCommand[] = [
  { command: "help", description: "List the safe command set" },
  { command: "about", description: "Read the short profile" },
  { command: "projects", description: "List featured projects" },
  { command: "project neuraloc", description: "Inspect NeuraLoc-Core" },
  { command: "project voidchat", description: "Inspect void.chat" },
  { command: "project aveline", description: "Inspect Aveline Bot" },
  { command: "project styleforge", description: "Inspect StyleForge Lite" },
  { command: "stack", description: "Show the working toolbox" },
  { command: "now", description: "Show what is currently building" },
  { command: "contact", description: "Show public contact details" },
  { command: "github", description: "Open the allowlisted GitHub profile" },
  { command: "clear", description: "Clear terminal output" },
  { command: "mode recruiter", description: "Switch to concise mode" },
  { command: "mode developer", description: "Switch to technical mode" },
  { command: "mode chaos", description: "Switch to playful mode" },
  { command: "whoami", description: "Identify the current visitor" },
  { command: "atrx", description: "Activate signal mode" },
  { command: "sudo hire atrx", description: "Run a harmless hiring check" },
  { command: "play signal", description: "Play the user-triggered signal" },
  { command: "coffee", description: "Check runtime fuel" },
];

export const commandStrings = terminalCommands.map(({ command }) => command);
