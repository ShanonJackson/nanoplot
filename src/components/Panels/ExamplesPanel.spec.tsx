import { describe, expect, it } from "bun:test";
import { render, screen } from "@testing-library/react";
import { ExamplesPanel } from "./ExamplesPanel";

describe("Examples Panel", () => {
	it("Should render children and styling.", () => {
		const { container } = render(
			<ExamplesPanel>
				<div>Examples Panel Children</div>
			</ExamplesPanel>,
		);

		expect(container.firstChild).toHaveClass("border-[1px] border-dotted border-black dark:border-white");
		expect(screen.getByText("Examples Panel Children")).toBeInTheDocument();
	});
});
