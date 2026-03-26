import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Button } from "./button";

describe("Button", () => {
	beforeEach(() => {
		vi.stubGlobal("alert", vi.fn());
	});

	it("calls alert with app name on click", () => {
		render(<Button appName="web">Click me</Button>);

		fireEvent.click(screen.getByRole("button", { name: /Click me/i }));

		expect(globalThis.alert).toHaveBeenCalledWith(
			"Hello from your web app!",
		);
	});
});
