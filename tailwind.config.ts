import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--ink)",
        "primary-foreground": "var(--canvas)",
        secondary: "var(--card)",
        "secondary-foreground": "var(--ink)",
        muted: "var(--panel)",
        "muted-foreground": "var(--muted)",
        background: "var(--canvas)",
        foreground: "var(--ink)",
        border: "var(--line)",
        ring: "var(--ink)",
        canvas: "#000000",
        panel: "#0d0d0d",
        card: "#1a1a1a",
        line: "#3c3c3c",
        signalLight: "#36a3ff",
        signalBlue: "#1c69d4",
        signalRed: "#e22718",
      },
      fontFamily: {
        display: ["Cabinet Grotesk Variable", "Arial", "sans-serif"],
        mono: ["IBM Plex Mono", "Consolas", "monospace"],
      },
      maxWidth: {
        atrx: "1440px",
      },
    },
  },
  plugins: [],
} satisfies Config;
