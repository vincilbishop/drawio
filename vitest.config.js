import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['src/main/webapp/js/test/**/*.test.js'],
    setupFiles: ['src/main/webapp/js/test/setup.js'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/main/webapp/js/api/**/*.js'],
      exclude: ['src/main/webapp/js/api/index.js']
    }
  }
});
