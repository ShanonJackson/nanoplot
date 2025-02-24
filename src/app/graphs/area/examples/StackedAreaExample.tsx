import { Graph } from "nanoplot/Graph";
import { Area } from "nanoplot/Area";
import { YAxis } from "nanoplot/YAxis";
import { XAxis } from "nanoplot/XAxis";
import { GridLines } from "nanoplot/GridLines";
import "nanoplot/styles.css";

export const StackedAreaExample = () => {
	return (
		<Graph
			gap={{ right: 35, left: 10, top: 20, bottom: 10 }}
			data={[
				{
					name: "Email",
					group: "Site Traffic",
					data: [
						{ x: new Date(2024, 0, 1, 0, 0, 0, 0), y: 4 },
						{ x: new Date(2024, 1, 1, 0, 0, 0, 0), y: 2 },
						{ x: new Date(2024, 2, 1, 0, 0, 0, 0), y: 3 },
						{ x: new Date(2024, 3, 1, 0, 0, 0, 0), y: 4 },
						{ x: new Date(2024, 4, 1, 0, 0, 0, 0), y: 5 },
						{ x: new Date(2024, 5, 1, 0, 0, 0, 0), y: 3 },
						{ x: new Date(2024, 6, 1, 0, 0, 0, 0), y: 5 },
						{ x: new Date(2024, 7, 1, 0, 0, 0, 0), y: 2 },
						{ x: new Date(2024, 8, 1, 0, 0, 0, 0), y: 4 },
						{ x: new Date(2024, 9, 1, 0, 0, 0, 0), y: 4 },
						{ x: new Date(2024, 10, 1, 0, 0, 0, 0), y: 3 },
						{ x: new Date(2024, 11, 1, 0, 0, 0, 0), y: 4 },
					],
				},
				{
					name: "Social",
					group: "Site Traffic",
					data: [
						{ x: new Date(2024, 0, 1, 0, 0, 0, 0), y: 7 },
						{ x: new Date(2024, 1, 1, 0, 0, 0, 0), y: 9 },
						{ x: new Date(2024, 2, 1, 0, 0, 0, 0), y: 8 },
						{ x: new Date(2024, 3, 1, 0, 0, 0, 0), y: 8 },
						{ x: new Date(2024, 4, 1, 0, 0, 0, 0), y: 7 },
						{ x: new Date(2024, 5, 1, 0, 0, 0, 0), y: 10 },
						{ x: new Date(2024, 6, 1, 0, 0, 0, 0), y: 8 },
						{ x: new Date(2024, 7, 1, 0, 0, 0, 0), y: 9 },
						{ x: new Date(2024, 8, 1, 0, 0, 0, 0), y: 7 },
						{ x: new Date(2024, 9, 1, 0, 0, 0, 0), y: 9 },
						{ x: new Date(2024, 10, 1, 0, 0, 0, 0), y: 7 },
						{ x: new Date(2024, 11, 1, 0, 0, 0, 0), y: 8 },
					],
				},
				{
					name: "Direct",
					group: "Site Traffic",
					data: [
						{ x: new Date(2024, 0, 1, 0, 0, 0, 0), y: 12 },
						{ x: new Date(2024, 1, 1, 0, 0, 0, 0), y: 14 },
						{ x: new Date(2024, 2, 1, 0, 0, 0, 0), y: 12 },
						{ x: new Date(2024, 3, 1, 0, 0, 0, 0), y: 11 },
						{ x: new Date(2024, 4, 1, 0, 0, 0, 0), y: 11 },
						{ x: new Date(2024, 5, 1, 0, 0, 0, 0), y: 13 },
						{ x: new Date(2024, 6, 1, 0, 0, 0, 0), y: 14 },
						{ x: new Date(2024, 7, 1, 0, 0, 0, 0), y: 12 },
						{ x: new Date(2024, 8, 1, 0, 0, 0, 0), y: 11 },
						{ x: new Date(2024, 9, 1, 0, 0, 0, 0), y: 12 },
						{ x: new Date(2024, 10, 1, 0, 0, 0, 0), y: 12 },
						{ x: new Date(2024, 11, 1, 0, 0, 0, 0), y: 12 },
					],
				},
				{
					name: "Referral",
					group: "Site Traffic",
					data: [
						{ x: new Date(2024, 0, 1, 0, 0, 0, 0), y: 14 },
						{ x: new Date(2024, 1, 1, 0, 0, 0, 0), y: 14 },
						{ x: new Date(2024, 2, 1, 0, 0, 0, 0), y: 12 },
						{ x: new Date(2024, 3, 1, 0, 0, 0, 0), y: 13 },
						{ x: new Date(2024, 4, 1, 0, 0, 0, 0), y: 14 },
						{ x: new Date(2024, 5, 1, 0, 0, 0, 0), y: 16 },
						{ x: new Date(2024, 6, 1, 0, 0, 0, 0), y: 15 },
						{ x: new Date(2024, 7, 1, 0, 0, 0, 0), y: 15 },
						{ x: new Date(2024, 8, 1, 0, 0, 0, 0), y: 14 },
						{ x: new Date(2024, 9, 1, 0, 0, 0, 0), y: 14 },
						{ x: new Date(2024, 10, 1, 0, 0, 0, 0), y: 15 },
						{ x: new Date(2024, 11, 1, 0, 0, 0, 0), y: 16 },
					],
				},
				{
					name: "Paid Search",
					group: "Site Traffic",
					data: [
						{ x: new Date(2024, 0, 1, 0, 0, 0, 0), y: 26 },
						{ x: new Date(2024, 1, 1, 0, 0, 0, 0), y: 25 },
						{ x: new Date(2024, 2, 1, 0, 0, 0, 0), y: 23 },
						{ x: new Date(2024, 3, 1, 0, 0, 0, 0), y: 28 },
						{ x: new Date(2024, 4, 1, 0, 0, 0, 0), y: 26 },
						{ x: new Date(2024, 5, 1, 0, 0, 0, 0), y: 25 },
						{ x: new Date(2024, 6, 1, 0, 0, 0, 0), y: 25 },
						{ x: new Date(2024, 7, 1, 0, 0, 0, 0), y: 26 },
						{ x: new Date(2024, 8, 1, 0, 0, 0, 0), y: 28 },
						{ x: new Date(2024, 9, 1, 0, 0, 0, 0), y: 26 },
						{ x: new Date(2024, 10, 1, 0, 0, 0, 0), y: 26 },
						{ x: new Date(2024, 11, 1, 0, 0, 0, 0), y: 27 },
					],
				},
				{
					name: "Organic",
					group: "Site Traffic",
					data: [
						{ x: new Date(2024, 0, 1, 0, 0, 0, 0), y: 37 },
						{ x: new Date(2024, 1, 1, 0, 0, 0, 0), y: 36 },
						{ x: new Date(2024, 2, 1, 0, 0, 0, 0), y: 42 },
						{ x: new Date(2024, 3, 1, 0, 0, 0, 0), y: 36 },
						{ x: new Date(2024, 4, 1, 0, 0, 0, 0), y: 37 },
						{ x: new Date(2024, 5, 1, 0, 0, 0, 0), y: 33 },
						{ x: new Date(2024, 6, 1, 0, 0, 0, 0), y: 33 },
						{ x: new Date(2024, 7, 1, 0, 0, 0, 0), y: 36 },
						{ x: new Date(2024, 8, 1, 0, 0, 0, 0), y: 36 },
						{ x: new Date(2024, 9, 1, 0, 0, 0, 0), y: 35 },
						{ x: new Date(2024, 10, 1, 0, 0, 0, 0), y: 37 },
						{ x: new Date(2024, 11, 1, 0, 0, 0, 0), y: 33 },
					],
				},
			]}
		>
			<YAxis ticks={{ to: 100 }} display={(y) => y.toString() + "%"} />
			<GridLines border horizontal vertical />
			<Area />
			<Area.Tooltip className={"bg-white dark:!bg-black"} />
			<XAxis
				ticks={{ jumps: "every 1 months" }}
				display={(x) => {
					const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
					if (typeof x === "number" || typeof x === "string") return null;
					return months[x.getMonth()];
				}}
			/>
		</Graph>
	);
};

export const StackedAreaExampleCode = `
import { Graph } from "nanoplot/Graph";
import { Area } from "nanoplot/Area";
import { YAxis } from "nanoplot/YAxis";
import { XAxis } from "nanoplot/XAxis";
import { GridLines } from "nanoplot/GridLines";
import "nanoplot/styles.css";

export const StackedAreaExample = () => {
	return (
		<Graph
			gap={{ right: 35, left: 10, top: 20, bottom: 10 }}
			data={[
				{
					name: "Email",
					group: "Site Traffic",
					data: [
						{ x: new Date(2024, 0, 1, 0, 0, 0, 0), y: 4 },
						{ x: new Date(2024, 1, 1, 0, 0, 0, 0), y: 2 },
						{ x: new Date(2024, 2, 1, 0, 0, 0, 0), y: 3 },
						{ x: new Date(2024, 3, 1, 0, 0, 0, 0), y: 4 },
						{ x: new Date(2024, 4, 1, 0, 0, 0, 0), y: 5 },
						{ x: new Date(2024, 5, 1, 0, 0, 0, 0), y: 3 },
						{ x: new Date(2024, 6, 1, 0, 0, 0, 0), y: 5 },
						{ x: new Date(2024, 7, 1, 0, 0, 0, 0), y: 2 },
						{ x: new Date(2024, 8, 1, 0, 0, 0, 0), y: 4 },
						{ x: new Date(2024, 9, 1, 0, 0, 0, 0), y: 4 },
						{ x: new Date(2024, 10, 1, 0, 0, 0, 0), y: 3 },
						{ x: new Date(2024, 11, 1, 0, 0, 0, 0), y: 4 },
					],
				},
				{
					name: "Social",
					group: "Site Traffic",
					data: [
						{ x: new Date(2024, 0, 1, 0, 0, 0, 0), y: 7 },
						{ x: new Date(2024, 1, 1, 0, 0, 0, 0), y: 9 },
						{ x: new Date(2024, 2, 1, 0, 0, 0, 0), y: 8 },
						{ x: new Date(2024, 3, 1, 0, 0, 0, 0), y: 8 },
						{ x: new Date(2024, 4, 1, 0, 0, 0, 0), y: 7 },
						{ x: new Date(2024, 5, 1, 0, 0, 0, 0), y: 10 },
						{ x: new Date(2024, 6, 1, 0, 0, 0, 0), y: 8 },
						{ x: new Date(2024, 7, 1, 0, 0, 0, 0), y: 9 },
						{ x: new Date(2024, 8, 1, 0, 0, 0, 0), y: 7 },
						{ x: new Date(2024, 9, 1, 0, 0, 0, 0), y: 9 },
						{ x: new Date(2024, 10, 1, 0, 0, 0, 0), y: 7 },
						{ x: new Date(2024, 11, 1, 0, 0, 0, 0), y: 8 },
					],
				},
				{
					name: "Direct",
					group: "Site Traffic",
					data: [
						{ x: new Date(2024, 0, 1, 0, 0, 0, 0), y: 12 },
						{ x: new Date(2024, 1, 1, 0, 0, 0, 0), y: 14 },
						{ x: new Date(2024, 2, 1, 0, 0, 0, 0), y: 12 },
						{ x: new Date(2024, 3, 1, 0, 0, 0, 0), y: 11 },
						{ x: new Date(2024, 4, 1, 0, 0, 0, 0), y: 11 },
						{ x: new Date(2024, 5, 1, 0, 0, 0, 0), y: 13 },
						{ x: new Date(2024, 6, 1, 0, 0, 0, 0), y: 14 },
						{ x: new Date(2024, 7, 1, 0, 0, 0, 0), y: 12 },
						{ x: new Date(2024, 8, 1, 0, 0, 0, 0), y: 11 },
						{ x: new Date(2024, 9, 1, 0, 0, 0, 0), y: 12 },
						{ x: new Date(2024, 10, 1, 0, 0, 0, 0), y: 12 },
						{ x: new Date(2024, 11, 1, 0, 0, 0, 0), y: 12 },
					],
				},
				{
					name: "Referral",
					group: "Site Traffic",
					data: [
						{ x: new Date(2024, 0, 1, 0, 0, 0, 0), y: 14 },
						{ x: new Date(2024, 1, 1, 0, 0, 0, 0), y: 14 },
						{ x: new Date(2024, 2, 1, 0, 0, 0, 0), y: 12 },
						{ x: new Date(2024, 3, 1, 0, 0, 0, 0), y: 13 },
						{ x: new Date(2024, 4, 1, 0, 0, 0, 0), y: 14 },
						{ x: new Date(2024, 5, 1, 0, 0, 0, 0), y: 16 },
						{ x: new Date(2024, 6, 1, 0, 0, 0, 0), y: 15 },
						{ x: new Date(2024, 7, 1, 0, 0, 0, 0), y: 15 },
						{ x: new Date(2024, 8, 1, 0, 0, 0, 0), y: 14 },
						{ x: new Date(2024, 9, 1, 0, 0, 0, 0), y: 14 },
						{ x: new Date(2024, 10, 1, 0, 0, 0, 0), y: 15 },
						{ x: new Date(2024, 11, 1, 0, 0, 0, 0), y: 16 },
					],
				},
				{
					name: "Paid Search",
					group: "Site Traffic",
					data: [
						{ x: new Date(2024, 0, 1, 0, 0, 0, 0), y: 26 },
						{ x: new Date(2024, 1, 1, 0, 0, 0, 0), y: 25 },
						{ x: new Date(2024, 2, 1, 0, 0, 0, 0), y: 23 },
						{ x: new Date(2024, 3, 1, 0, 0, 0, 0), y: 28 },
						{ x: new Date(2024, 4, 1, 0, 0, 0, 0), y: 26 },
						{ x: new Date(2024, 5, 1, 0, 0, 0, 0), y: 25 },
						{ x: new Date(2024, 6, 1, 0, 0, 0, 0), y: 25 },
						{ x: new Date(2024, 7, 1, 0, 0, 0, 0), y: 26 },
						{ x: new Date(2024, 8, 1, 0, 0, 0, 0), y: 28 },
						{ x: new Date(2024, 9, 1, 0, 0, 0, 0), y: 26 },
						{ x: new Date(2024, 10, 1, 0, 0, 0, 0), y: 26 },
						{ x: new Date(2024, 11, 1, 0, 0, 0, 0), y: 27 },
					],
				},
				{
					name: "Organic",
					group: "Site Traffic",
					data: [
						{ x: new Date(2024, 0, 1, 0, 0, 0, 0), y: 37 },
						{ x: new Date(2024, 1, 1, 0, 0, 0, 0), y: 36 },
						{ x: new Date(2024, 2, 1, 0, 0, 0, 0), y: 42 },
						{ x: new Date(2024, 3, 1, 0, 0, 0, 0), y: 36 },
						{ x: new Date(2024, 4, 1, 0, 0, 0, 0), y: 37 },
						{ x: new Date(2024, 5, 1, 0, 0, 0, 0), y: 33 },
						{ x: new Date(2024, 6, 1, 0, 0, 0, 0), y: 33 },
						{ x: new Date(2024, 7, 1, 0, 0, 0, 0), y: 36 },
						{ x: new Date(2024, 8, 1, 0, 0, 0, 0), y: 36 },
						{ x: new Date(2024, 9, 1, 0, 0, 0, 0), y: 35 },
						{ x: new Date(2024, 10, 1, 0, 0, 0, 0), y: 37 },
						{ x: new Date(2024, 11, 1, 0, 0, 0, 0), y: 33 },
					],
				},
			]}
		>
			<YAxis ticks={{ to: 100 }} display={(y) => y.toString() + "%"} />
			<GridLines border horizontal vertical />
			<Area />
			<Area.Tooltip className={"bg-white dark:!bg-black"} />
			<XAxis
				ticks={{ jumps: "every 1 months" }}
				display={(x) => {
					const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
					if (typeof x === "number" || typeof x === "string") return null;
					return months[x.getMonth()];
				}}
			/>
		</Graph>
	);
};
`;
