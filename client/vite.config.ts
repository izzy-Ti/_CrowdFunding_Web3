import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  define: { global: 'globalThis' },
  resolve: { 
    alias: { 
      buffer: 'buffer',
      util: 'util/',
    } 
  },
  optimizeDeps: { 
    include: ['buffer', 'util'],
    esbuildOptions: {
      target: 'es2020'
    }
  },
  server: { 
    hmr: { overlay: false },
    port: 5173,
    headers: {
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Resource-Policy': 'cross-origin',
      'X-Content-Type-Options': 'nosniff'
    }
  },
  build: {
    target: 'es2020',
    rollupOptions: { 
      external: [],
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          thirdweb: ['@thirdweb-dev/react', '@thirdweb-dev/sdk']
        }
      }
    }
  }
});