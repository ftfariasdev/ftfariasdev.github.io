import { defineConfig, devices } from "@playwright/test";

const PORT = 4173;

/**
 * Browser tests run against the production build (`vite preview`), so they check what ships.
 * Locally only the installed browsers run; CI installs and runs all three.
 */
const all = [
  { name: "chromium", use: { ...devices["Desktop Chrome"] } },
  { name: "firefox", use: { ...devices["Desktop Firefox"] } },
  { name: "webkit", use: { ...devices["Desktop Safari"] } },
  { name: "mobile-chrome", use: { ...devices["Pixel 7"] } },
  { name: "mobile-safari", use: { ...devices["iPhone 14"] } },
];
const only = process.env.PW_PROJECTS?.split(",");

export default defineConfig({
  testDir: "tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: only ? all.filter((p) => only.includes(p.name)) : all,
  webServer: {
    command: `npx vite preview --port ${PORT} --strictPort`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
  },
});
