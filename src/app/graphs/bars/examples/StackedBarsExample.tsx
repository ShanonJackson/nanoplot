import { Graph } from "nanoplot/Graph";
import { Bars } from "nanoplot/Bars";
import { YAxis } from "nanoplot/YAxis";
import { XAxis } from "nanoplot/XAxis";
import { GridLines } from "nanoplot/GridLines";
import { Legend } from "nanoplot/Legend";
import "nanoplot/styles.css";

export const StackedBarsExample = () => {
	return (
		<Graph
			data={[
				{
					name: "Male",
					group: "gender",
					data: [
						{ x: "Jan", y: 5_000 },
						{ x: "Feb", y: 20_000 },
						{ x: "Mar", y: 45_000 },
						{ x: "Apr", y: 20_000 },
					],
				},
				{
					name: "Female",
					group: "gender",
					data: [
						{ x: "Jan", y: 45_000 },
						{ x: "Feb", y: 10_000 },
						{ x: "Mar", y: 15_000 },
						{ x: "Apr", y: 30_000 },
					],
				},
				{
					name: "Gen Z",
					group: "generation",
					data: [
						{ x: "Jan", y: 5500 },
						{ x: "Feb", y: 10_000 },
						{ x: "Mar", y: 10_000 },
						{ x: "Apr", y: 10_000 },
					],
				},
				{
					name: "Millennials",
					group: "generation",
					data: [
						{ x: "Jan", y: 40_000 },
						{ x: "Feb", y: 40_000 },
						{ x: "Mar", y: 40_000 },
						{ x: "Apr", y: 40_000 },
					],
				},
				{
					name: "Boomers",
					group: "generation",
					data: [
						{ x: "Jan", y: 50_000 },
						{ x: "Feb", y: 50_000 },
						{ x: "Mar", y: 50_000 },
						{ x: "Apr", y: 50_000 },
					],
				},
			]}
			gap={{ top: 20, left: 15, right: 36, bottom: 15 }}
		>
			<Legend position={"top"} />
			<YAxis />
			<GridLines border horizontal />
			<Bars
				labels={(y) =>
					new Intl.NumberFormat("en", {
						notation: "compact",
						compactDisplay: "short",
					}).format(Number(y.data.y))
				}
			/>
			<XAxis />
		</Graph>
	);
};

export const StackedBarsExampleCode = `
import { Graph } from "nanoplot/Graph";
import { Bars } from "nanoplot/Bars";
import { YAxis } from "nanoplot/YAxis";
import { XAxis } from "nanoplot/XAxis";
import { GridLines } from "nanoplot/GridLines";
import { Legend } from "nanoplot/Legend";
import "nanoplot/styles.css";

export const StackedBarsExample = () => {
	return (
		<Graph
			data={[
				{
					name: "Male",
					group: "gender",
					data: [
						{ x: "Jan", y: 5_000 },
						{ x: "Feb", y: 20_000 },
						{ x: "Mar", y: 45_000 },
						{ x: "Apr", y: 20_000 },
					],
				},
				{
					name: "Female",
					group: "gender",
					data: [
						{ x: "Jan", y: 45_000 },
						{ x: "Feb", y: 10_000 },
						{ x: "Mar", y: 15_000 },
						{ x: "Apr", y: 30_000 },
					],
				},
				{
					name: "Gen Z",
					group: "generation",
					data: [
						{ x: "Jan", y: 5500 },
						{ x: "Feb", y: 10_000 },
						{ x: "Mar", y: 10_000 },
						{ x: "Apr", y: 10_000 },
					],
				},
				{
					name: "Millennials",
					group: "generation",
					data: [
						{ x: "Jan", y: 40_000 },
						{ x: "Feb", y: 40_000 },
						{ x: "Mar", y: 40_000 },
						{ x: "Apr", y: 40_000 },
					],
				},
				{
					name: "Boomers",
					group: "generation",
					data: [
						{ x: "Jan", y: 50_000 },
						{ x: "Feb", y: 50_000 },
						{ x: "Mar", y: 50_000 },
						{ x: "Apr", y: 50_000 },
					],
				},
			]}
		>
			<Legend position={"top"} />
			<YAxis />
			<GridLines border horizontal />
			<Bars labels={true} />
			<XAxis />
		</Graph>
	);
};
`;
