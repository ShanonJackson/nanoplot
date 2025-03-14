import { Graph } from "nanoplot/Graph";
import { Bars } from "nanoplot/Bars";
import { YAxis } from "nanoplot/YAxis";
import { XAxis } from "nanoplot/XAxis";
import { GridLines } from "nanoplot/GridLines";
import "nanoplot/styles.css";

export const HorizontalBarsExample = () => {
	return (
		<Graph
			data={[
				{
					name: "Male",
					data: [
						{ y: "Jan", x: 5_000 },
						{ y: "Feb", x: 20_000 },
						{ y: "Mar", x: 45_000 },
						{ y: "Apr", x: 20_000 },
					],
				},
				{
					name: "Female",
					data: [
						{ y: "Jan", x: 45_000 },
						{ y: "Feb", x: 10_000 },
						{ y: "Mar", x: 15_000 },
						{ y: "Apr", x: 30_000 },
					],
				},
			]}
			gap={{ top: 20, left: 15, right: 36, bottom: 15 }}
		>
			<YAxis />
			<GridLines border horizontal />
			<Bars horizontal labels={{ position: "center", display: (v) => v.toString() }} />
			<XAxis />
		</Graph>
	);
};

export const HorizontalBarsExampleCode = `
import { Graph } from "nanoplot/Graph";
import { Bars } from "nanoplot/Bars";
import { YAxis } from "nanoplot/YAxis";
import { XAxis } from "nanoplot/XAxis";
import { GridLines } from "nanoplot/GridLines";
import "nanoplot/styles.css";

export const HorizontalBarsExample = () => {
	return (
		<Graph
			data={[
				{
					name: "Male",
					data: [
						{ y: "Jan", x: 5_000 },
						{ y: "Feb", x: 20_000 },
						{ y: "Mar", x: 45_000 },
						{ y: "Apr", x: 20_000 },
					],
				},
				{
					name: "Female",
					data: [
						{ y: "Jan", x: 45_000 },
						{ y: "Feb", x: 10_000 },
						{ y: "Mar", x: 15_000 },
						{ y: "Apr", x: 30_000 },
					],
				},
			]}
		>
			<YAxis />
			<GridLines border horizontal />
			<Bars horizontal labels={{ position: "center", display: (v) => v.toString() }} />
			<XAxis />
		</Graph>
	);
};
`;
