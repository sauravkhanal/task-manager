import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import VitePrettierPlugin from "vite-plugin-prettier";

export default defineConfig({
  plugins: [react(), VitePrettierPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
