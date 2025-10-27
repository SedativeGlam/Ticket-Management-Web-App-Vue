import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import tailwindcss from "@tailwindcss/vite"; // <--- 1. Import Tailwind

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(), // <--- 2. Add Tailwind to the plugins array
    vueDevTools(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
