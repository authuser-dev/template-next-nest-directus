import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Home from "./page";

vi.mock("next/image", () => ({
	default: (props: { alt: string }) => (
		<span aria-label={props.alt} data-testid="next-image" />
	),
}));

describe("Home page", () => {
	it("renders the shared contract example message", () => {
		render(<Home />);
		expect(
			screen.getByText(/Shared API contract example: Hello World!/i),
		).toBeInTheDocument();
	});
});
