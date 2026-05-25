import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  base: "./",
  build: {
    assetsDir: "assets",
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, "ads.html"),
      },
    },
  },
});
