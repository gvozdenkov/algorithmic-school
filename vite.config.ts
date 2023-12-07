import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

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
