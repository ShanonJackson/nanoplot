import { describe, expect, it } from "bun:test";
import { render, screen } from "@testing-library/react";
import { GraphPanel } from "./GraphPanel";

describe("Graph Panel", () => {
	it.skip("Should render children and styling.", () => {
		/* Skipped because NextJS image is breaking test, Will return to this. */
		const { container } = render(
			<GraphPanel>
				<div>Graph children</div>
			</GraphPanel>,
		);
		expect(screen.getByText("Graph children")).toBeInTheDocument();
	});
});
