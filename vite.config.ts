import react from '@vitejs/plugin-react';

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
});
