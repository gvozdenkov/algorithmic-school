import { defineConfig } from 'cypress';
import vitePreprocessor from 'cypress-vite';

export default defineConfig({
  video: true,
  videoCompression: true,
  viewportWidth: 1300,
  viewportHeight: 800,

  e2e: {
    baseUrl: 'http://localhost:8080/algososh',
    setupNodeEvents(on) {
      on('file:preprocessor', vitePreprocessor());
    },
  },

  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
  },
});
