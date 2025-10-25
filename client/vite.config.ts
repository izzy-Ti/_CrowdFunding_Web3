import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  define: { global: 'globalThis' },
  resolve: { alias: { buffer: 'buffer' } },
  optimizeDeps: { include: ['buffer'], force: true },
  server: { hmr: { overlay: false } },
  build: {
    target: 'esnext',       // add this
    rollupOptions: { external: [] },
  },
});
