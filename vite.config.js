import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target:
          "https://backend-psi-umber-53.vercel.app" || "http://localhost:3000", // Fallback to local server if production URL is not available
        changeOrigin: true,
        secure: true,
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 3000, // Increase the chunk size warning limit
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"], // Example of manual chunking
        },
      },
    },
  },
});
