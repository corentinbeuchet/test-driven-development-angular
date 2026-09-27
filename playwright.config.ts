import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

const CI = !!process.env['CI'];

// playwright-bdd transforme les scénarios .feature en tests Playwright (dossier .features-gen).
// Les scénarios tagués @wip sont ignorés : retirez le tag pour activer un scénario.
const testDir = defineBddConfig({
  features: 'e2e/features/*.feature',
  steps: 'e2e/steps/*.ts',
  tags: 'not @wip',
});

export default defineConfig({
  testDir,
  forbidOnly: CI,
  retries: CI ? 1 : 0,
  reporter: CI ? [['list'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: 'http://localhost:4200',
    trace: 'on-first-retry',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'npm start',
    url: 'http://localhost:4200',
    reuseExistingServer: !CI,
    timeout: 120_000,
  },
});
