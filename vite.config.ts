import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import utools from "vite-plugin-utools";
import { vitePluginForArco } from "@arco-plugins/vite-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    utools({
      external: "uTools",
      preload: {
        path: "./src/preload.ts",
        watch: true,
        name: "window.preload",
      },
      buildUpx: false,
    }),
    vitePluginForArco(),
  ],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, "./src"),
      },
    ],
  },
});
