import { describe, expect, it } from "bun:test";
import { render, screen } from "@testing-library/react";
import { PieControlsPanel } from "./PieControlsPanel";
import { jest } from "bun:test";

const fn = jest.fn();

describe("PiePanels", () => {
	it("Should render Pie Control Group", () => {
		render(
			<PieControlsPanel
				state={{
					loading: false,
					donut: false,
					labels: true,
					children: "",
				}}
				onChange={fn}
			/>,
		);
		expect(screen.getByText("Pie Graph")).toBeInTheDocument();
        expect(screen.getByText("loading")).toBeInTheDocument();
        expect(screen.getByText("Renders loading skeleton placeholder")).toBeInTheDocument();
        expect(screen.getByText("Renders labels on the pie chart")).toBeInTheDocument()
        expect(screen.getByText("children")).toBeInTheDocument();
	});
});
