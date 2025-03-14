import { describe, expect, it } from "bun:test";
import { render, screen } from "@testing-library/react";
import { ControlPanel } from "./ControlPanel";

describe("Control Panel", () => {
	it("Should render children.", () => {
		const { container } = render(
			<ControlPanel>
				<div>Control Panel Children</div>
			</ControlPanel>,
		);
		expect(screen.getByText("Control Panel Children")).toBeInTheDocument();
	});
});
