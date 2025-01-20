import { describe, expect, it } from "bun:test";
import { render, screen } from "@testing-library/react";
import { GraphPanel } from "./GraphPanel";

describe("Graph Panel", () => {
	it("Should render children and styling.", () => {
		const { container } = render(
			<GraphPanel>
				<div>Graph children</div>
			</GraphPanel>,
		);

		expect(container.firstChild).toHaveClass("h-full border-dotted border border-black dark:border-white overflow-hidden resize");
		expect(screen.getByText("Graph children")).toBeInTheDocument();
	});
});
