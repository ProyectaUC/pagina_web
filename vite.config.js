import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          map: ["react-simple-maps"],
          animation: ["framer-motion"],
        },
      },
    },
  },
  // SPA fallback for react-router (dev only; GitHub Pages needs 404.html trick)
  server: {
    historyApiFallback: true,
  },
});
