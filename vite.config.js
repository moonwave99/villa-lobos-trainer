import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import markdown, { Mode } from "vite-plugin-markdown";

export default defineConfig({
  base: '/villa-lobos-trainer/',
  plugins: [
    react(),
    markdown({
      mode: Mode.HTML,
    }),
  ],
});

