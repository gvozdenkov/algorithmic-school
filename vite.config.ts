import react from '@vitejs/plugin-react';

import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/algososh/',
  server: {
    host: true,
    port: 5173,
  },
  preview: {
    port: 8080,
  },
  build: {
    outDir: 'build',
  },
  resolve: {
    alias: {
      '#styles': path.resolve(__dirname, './src/shared/styles'),
    },
  },
});
