import { fileURLToPath } from 'node:url';
import { defineConfig } from '@playwright/test';

const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH;

export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.ts',
  fullyParallel: true,
  use: {
    browserName: 'chromium',
    baseURL: 'http://127.0.0.1:4174',
    launchOptions: executablePath ? { executablePath } : {},
  },
  webServer: {
    command: 'pnpm exec vite --config e2e/fixtures/vite.config.ts',
    cwd: fileURLToPath(new URL('..', import.meta.url)),
    url: 'http://127.0.0.1:4174',
    reuseExistingServer: false,
  },
});
