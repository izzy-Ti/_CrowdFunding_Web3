import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: 'globalThis',
  },
  resolve: {
    alias: {
      buffer: 'buffer',
    },
  },
  optimizeDeps: {
    include: ['buffer'],
    force: true, // Force re-optimization
  },
  server: {
    hmr: {
      overlay: false, // Disable error overlay for cleaner console
    },
  },
  build: {
    rollupOptions: {
      external: [],
    },
  },
});
