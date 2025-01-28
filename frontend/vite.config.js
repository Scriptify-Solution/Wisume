import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      crypto: "crypto-browserify",
      stream: "stream-browserify",
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    global: {}, // Add a global object polyfill if needed
  },
  plugins: [react()],
});
