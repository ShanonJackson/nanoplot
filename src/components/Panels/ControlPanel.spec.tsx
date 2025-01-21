import { describe, expect, it } from "bun:test";
import { render, screen } from "@testing-library/react";
import { ControlPanel } from "./ControlPanel";

describe("Control Panel", () => {
	it("Should render children and styling.", () => {
		const { container } = render(
			<ControlPanel>
				<div>Control Panel Children</div>
			</ControlPanel>,
		);

		expect(container.firstChild).toHaveClass(
			"row-span-2 h-full border-[1px] border-dotted border-black dark:border-white p-4 bg-gray-100 dark:bg-gray-800",
		);
		expect(screen.getByText("Control Panel Children")).toBeInTheDocument();
	});
});
