import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Code } from "./code";

describe("Code", () => {
	it("renders content inside code element", () => {
		render(<Code>npm run dev</Code>);
		expect(screen.getByText("npm run dev")).toBeInTheDocument();
	});
});
