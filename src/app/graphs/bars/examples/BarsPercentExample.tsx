import { Graph } from "nanoplot/Graph";
import { Bars } from "nanoplot/Bars";
import { YAxis } from "nanoplot/YAxis";
import { XAxis } from "nanoplot/XAxis";
import { GridLines } from "nanoplot/GridLines";
import "nanoplot/styles.css";

export const BarsPercentExample = () => {
	return (
		<Graph
			data={[
				{
					name: "Male",
					group: "gender",
					data: [
						{ x: "Jan", y: 10 },
						{ x: "Feb", y: 70 },
						{ x: "Mar", y: 80 },
						{ x: "Apr", y: 50 },
					],
				},
				{
					name: "Female",
					group: "gender",
					data: [
						{ x: "Jan", y: 90 },
						{ x: "Feb", y: 30 },
						{ x: "Mar", y: 20 },
						{ x: "Apr", y: 50 },
					],
				},
				{
					name: "Younger",
					group: "generation",
					data: [
						{ x: "Jan", y: 33.33 },
						{ x: "Feb", y: 33.33 },
						{ x: "Mar", y: 33.33 },
						{ x: "Apr", y: 33.33 },
					],
				},
				{
					name: "Middle aged",
					group: "generation",
					data: [
						{ x: "Jan", y: 33.33 },
						{ x: "Feb", y: 33.33 },
						{ x: "Mar", y: 33.33 },
						{ x: "Apr", y: 33.33 },
					],
				},
				{
					name: "Older",
					group: "generation",
					data: [
						{ x: "Jan", y: 33.33 },
						{ x: "Feb", y: 33.33 },
						{ x: "Mar", y: 33.33 },
						{ x: "Apr", y: 33.33 },
					],
				},
			]}
			gap={{ top: 20, left: 15, right: 36, bottom: 15 }}
		>
			<YAxis display={(y) => `${y}%`} />
			<GridLines border horizontal />
			<Bars labels={(y) => `${y}%`} />
			<XAxis />
		</Graph>
	);
};

export const BarsPercentExampleCode = `
import { Graph } from "nanoplot/Graph";
import { Bars } from "nanoplot/Bars";
import { YAxis } from "nanoplot/YAxis";
import { XAxis } from "nanoplot/XAxis";
import { GridLines } from "nanoplot/GridLines";
import "nanoplot/styles.css";

export const BarsPercentExample = () => {
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
					name: "Younger",
					group: "generation",
					data: [
						{ x: "Jan", y: 5500 },
						{ x: "Feb", y: 10_000 },
						{ x: "Mar", y: 10_000 },
						{ x: "Apr", y: 10_000 },
					],
				},
				{
					name: "Middle aged",
					group: "generation",
					data: [
						{ x: "Jan", y: 40_000 },
						{ x: "Feb", y: 40_000 },
						{ x: "Mar", y: 40_000 },
						{ x: "Apr", y: 40_000 },
					],
				},
				{
					name: "Older",
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
			<YAxis />
			<GridLines border horizontal />
			<Bars />
			<XAxis />
		</Graph>
	);
};
`;
