import { afterEach, expect, it } from "bun:test";
import { render, screen } from "@testing-library/react";
import { Pie } from "./Pie";
import { cleanup } from "@testing-library/react";
import { Graph } from "@/components/Graph/Graph";

afterEach(cleanup);

it("Should render without throwing error", () => {
	render(
		<Graph
			data={[
				{ name: "male", value: 50 },
				{ name: "female", value: 50 },
			]}
		>
			<Pie />
		</Graph>,
	);
});

it("Should show a loading state when loading is true", () => {
	render(
		<Graph
			data={[
				{ name: "male", value: 50 },
				{ name: "female", value: 50 },
			]}
		>
			<Pie loading={true} />
		</Graph>,
	);
	expect(screen.getByRole("status")).toBeDefined();
});

it("Should have the same number of slices as the data", () => {
	const data = [
		{ name: "male", value: 50 },
		{ name: "female", value: 50 },
	];
	render(
		<Graph
			data={[
				{ name: "male", value: 50 },
				{ name: "female", value: 50 },
			]}
		>
			<Pie />
		</Graph>,
	);
	expect(document.querySelectorAll("[data-degrees]").length).toBe(data.length);
});

it("Should render children in pieGraph", () => {
	const ChildrenElement = () => <div>ChildrenElement</div>;
	render(
		<Graph
			data={[
				{ name: "male", value: 50 },
				{ name: "female", value: 50 },
			]}
		>
			<Pie donut={true}>
				<ChildrenElement />
			</Pie>
		</Graph>,
	);
	screen.getByText("ChildrenElement");
});
