import { defineConfig } from "@playwright/test";

export default defineConfig({
	testDir: "./tests",
	use: {
		baseURL: "http://localhost:3001",
		trace: "on-first-retry",
	},
	webServer: {
		command: "pnpm --filter web dev",
		url: "http://localhost:3001",
		timeout: 120000,
		reuseExistingServer: true,
	},
});
