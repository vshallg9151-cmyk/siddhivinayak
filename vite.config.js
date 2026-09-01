import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { otpBackendPlugin } from './server/viteOtpPlugin.js';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), otpBackendPlugin()],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['lucide-react', 'framer-motion']
        }
      }
    }
  }
});
