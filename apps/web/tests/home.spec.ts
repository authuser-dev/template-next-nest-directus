import { expect, test } from "@playwright/test";

test("home page loads contract text", async ({ page }) => {
	await page.goto("/");
	await expect(
		page.getByText(/Shared API contract example: Hello World!/i),
	).toBeVisible();
});
