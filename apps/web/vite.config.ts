import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 4000,
    proxy: {
      '/api': {
        target: 'http://localhost:4001',
        changeOrigin: true,
      },
      '/fontawesome': {
        target: 'https://ka-p.fontawesome.com',
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/fontawesome/, ''),
      },
    },
  },
});
