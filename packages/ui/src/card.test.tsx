import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Card } from "./card";

describe("Card", () => {
	it("renders title and link", () => {
		render(
			<Card title="Docs" href="https://nextjs.org/docs">
				Learn more
			</Card>,
		);

		expect(
			screen.getByRole("heading", { name: /Docs/i }),
		).toBeInTheDocument();
		expect(screen.getByRole("link")).toHaveAttribute(
			"href",
			expect.stringContaining("https://nextjs.org/docs"),
		);
	});
});
