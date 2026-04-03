import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './playwright-tests',
  retries: process.env.CI ? 1 : 0,
  workers: 1,

  use: {
    baseURL: 'https://sauce-demo.myshopify.com',
    headless: true,
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
      testMatch: 'ui/**/*.spec.ts',
    },
    {
      name: 'api',
      use: {
        baseURL: 'https://restful-booker.herokuapp.com',
      },
      testMatch: 'api/**/*.spec.ts',
    },
  ],
});