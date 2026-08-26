import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",
  resolve: {
    alias: {
      // Coincide con el alias "@/*" declarado en tsconfig.json.
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
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
