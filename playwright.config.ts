import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env'), quiet: true });

export default defineConfig({
  testDir: './tests-playwright',
  retries: process.env.CI ? 1 : 0,
  workers: 1,

  use: {
    baseURL: 'https://sauce-demo.myshopify.com',
    headless: true,
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'ui',
      use: {
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