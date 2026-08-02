import mdx from "@mdx-js/rollup";
import react from "@vitejs/plugin-react";
import remarkGfm from "remark-gfm";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [
    { ...mdx({ remarkPlugins: [remarkGfm] }), enforce: "pre" },
    react({ include: /\.(js|jsx|md|mdx|ts|tsx)$/ }),
  ],
  server: {
    host: "127.0.0.1",
    port: 4173,
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/tests/setup.ts",
    css: true,
    include: ["src/**/*.test.{ts,tsx}"],
    exclude: ["e2e/**", "node_modules/**", "dist/**", ".pnpm-store/**"],
  },
});
