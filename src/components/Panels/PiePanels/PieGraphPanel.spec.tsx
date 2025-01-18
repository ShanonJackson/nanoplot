import { describe, expect, it } from "bun:test";
import { render, screen } from "@testing-library/react";
import { PieGraphPanel } from "./PieGraphPanel";

describe("PieGraphPanel", () => {
	it("Should render Pie Graph.", async () => {
		render(
			<PieGraphPanel
				data={data}
				state={{
					loading: false,
					donut: false,
					labels: true,
					children: "",
				}}
			/>,
		);

		expect(screen.getAllByText("python")).toHaveLength(2);
		expect(screen.getAllByText("elixir")).toHaveLength(2);
		expect(screen.getAllByText("stylus")).toHaveLength(2);
		expect(screen.getAllByText("css")).toHaveLength(2);
		expect(screen.getAllByText("haskell")).toHaveLength(2);

		expect(screen.getByLabelText("python-label")).toBeInTheDocument();
		expect(screen.getByLabelText("elixir-label")).toBeInTheDocument();
		expect(screen.getByLabelText("stylus-label")).toBeInTheDocument();
		expect(screen.getByLabelText("css-label")).toBeInTheDocument();
		expect(screen.getByLabelText("haskell-label")).toBeInTheDocument();
	});
});

const data = [
	{
		name: "python",
		value: 283,
	},
	{
		name: "elixir",
		value: 333,
	},
	{
		name: "stylus",
		value: 257,
	},
	{
		name: "css",
		value: 30,
	},
	{
		name: "haskell",
		value: 192,
	},
];
