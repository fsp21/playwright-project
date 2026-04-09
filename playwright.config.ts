import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env'), quiet: true });

export default defineConfig({
  testDir: './tests-playwright',
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: 'list',
  use: {
    headless: true,
    screenshot: 'only-on-failure',
    launchOptions: {
      slowMo: process.env.SLOWMO ? parseInt(process.env.SLOWMO) : 0,
    },
  },

  projects: [
    {
      name: 'ui',
      use: {
        baseURL: 'https://sauce-demo.myshopify.com',
        ...devices['Desktop Chrome'],
      },
      testMatch: 'tests-ui/**/*.spec.ts',
    },
    {
      name: 'api',
      use: {
        baseURL: 'https://restful-booker.herokuapp.com',
      },
      testMatch: 'tests-api/**/*.spec.ts',
    },
  ],
});
