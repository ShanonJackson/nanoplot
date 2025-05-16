import { Graph } from "nanoplot/Graph";
import { Lines } from "nanoplot/Lines";
import { YAxis } from "nanoplot/YAxis";
import { XAxis } from "nanoplot/XAxis";
import { GridLines } from "nanoplot/GridLines";
import "nanoplot/styles.css";
import { Legend } from "nanoplot/Legend";

export const LinesSiteTraffic = () => {
	return (
		<Graph
			gap={{ right: 35, left: 10, top: 20, bottom: 10 }}
			interactions={{ hovered: ["Registered Users"] }}
			data={[
				{
					name: "New Users",
					stroke: "#FF4B4B",
					data: [
						{ x: new Date(2024, 0, 1, 0, 0, 0, 0), y: 20 },
						{ x: new Date(2024, 1, 1, 0, 0, 0, 0), y: 25 },
						{ x: new Date(2024, 2, 1, 0, 0, 0, 0), y: 50 },
						{ x: new Date(2024, 3, 1, 0, 0, 0, 0), y: 45 },
						{ x: new Date(2024, 4, 1, 0, 0, 0, 0), y: 35 },
						{ x: new Date(2024, 5, 1, 0, 0, 0, 0), y: 55 },
						{ x: new Date(2024, 6, 1, 0, 0, 0, 0), y: 55 },
						{ x: new Date(2024, 7, 1, 0, 0, 0, 0), y: 100 },
						{ x: new Date(2024, 8, 1, 0, 0, 0, 0), y: 85 },
						{ x: new Date(2024, 9, 1, 0, 0, 0, 0), y: 70 },
						{ x: new Date(2024, 10, 1, 0, 0, 0, 0), y: 72 },
						{ x: new Date(2024, 11, 1, 0, 0, 0, 0), y: 75 },
					],
				},
				{
					name: "Registered Users",
					stroke: "#33D4FF",
					data: [
						{ x: new Date(2024, 0, 1, 0, 0, 0, 0), y: 45 },
						{ x: new Date(2024, 1, 1, 0, 0, 0, 0), y: 60 },
						{ x: new Date(2024, 2, 1, 0, 0, 0, 0), y: 55 },
						{ x: new Date(2024, 3, 1, 0, 0, 0, 0), y: 70 },
						{ x: new Date(2024, 4, 1, 0, 0, 0, 0), y: 70 },
						{ x: new Date(2024, 5, 1, 0, 0, 0, 0), y: 75 },
						{ x: new Date(2024, 6, 1, 0, 0, 0, 0), y: 60 },
						{ x: new Date(2024, 7, 1, 0, 0, 0, 0), y: 55 },
						{ x: new Date(2024, 8, 1, 0, 0, 0, 0), y: 80 },
						{ x: new Date(2024, 9, 1, 0, 0, 0, 0), y: 85 },
						{ x: new Date(2024, 10, 1, 0, 0, 0, 0), y: 80 },
						{ x: new Date(2024, 11, 1, 0, 0, 0, 0), y: 82 },
					],
				},
			]}
		>
			<Legend alignment={"end"} position={"top"} />
			<YAxis />
			<GridLines />
			<Lines curve={"natural"} />
			<Lines.Tooltip />
			<XAxis
				ticks={{ jumps: "P1M" }}
				display={(x) => {
					const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
					if (typeof x === "number" || typeof x === "string") return null;
					return months[x.getMonth()];
				}}
			/>
		</Graph>
	);
};

export const LinesSiteTrafficCode = `
import { Graph } from "nanoplot/Graph";
import { Lines } from "nanoplot/Lines";
import { YAxis } from "nanoplot/YAxis";
import { XAxis } from "nanoplot/XAxis";
import { GridLines } from "nanoplot/GridLines";
import "nanoplot/styles.css";
import { Legend } from "nanoplot/Legend";

export const LinesSiteTraffic = () => {
	return (
		<Graph
			gap={{ right: 35, left: 10, top: 20, bottom: 10 }}
			interactions={{ hovered: ["New Users", "Registered Users"] }}
			data={[
				{
					name: "New Users",
					stroke: "#FF4B4B",
					data: [
						{ x: new Date(2024, 0, 1, 0, 0, 0, 0), y: 20 },
						{ x: new Date(2024, 1, 1, 0, 0, 0, 0), y: 25 },
						{ x: new Date(2024, 2, 1, 0, 0, 0, 0), y: 50 },
						{ x: new Date(2024, 3, 1, 0, 0, 0, 0), y: 45 },
						{ x: new Date(2024, 4, 1, 0, 0, 0, 0), y: 35 },
						{ x: new Date(2024, 5, 1, 0, 0, 0, 0), y: 55 },
						{ x: new Date(2024, 6, 1, 0, 0, 0, 0), y: 55 },
						{ x: new Date(2024, 7, 1, 0, 0, 0, 0), y: 100 },
						{ x: new Date(2024, 8, 1, 0, 0, 0, 0), y: 85 },
						{ x: new Date(2024, 9, 1, 0, 0, 0, 0), y: 70 },
						{ x: new Date(2024, 10, 1, 0, 0, 0, 0), y: 72 },
						{ x: new Date(2024, 11, 1, 0, 0, 0, 0), y: 75 },
					],
				},
				{
					name: "Registered Users",
					stroke: "#33D4FF",
					data: [
						{ x: new Date(2024, 0, 1, 0, 0, 0, 0), y: 45 },
						{ x: new Date(2024, 1, 1, 0, 0, 0, 0), y: 60 },
						{ x: new Date(2024, 2, 1, 0, 0, 0, 0), y: 55 },
						{ x: new Date(2024, 3, 1, 0, 0, 0, 0), y: 70 },
						{ x: new Date(2024, 4, 1, 0, 0, 0, 0), y: 70 },
						{ x: new Date(2024, 5, 1, 0, 0, 0, 0), y: 75 },
						{ x: new Date(2024, 6, 1, 0, 0, 0, 0), y: 60 },
						{ x: new Date(2024, 7, 1, 0, 0, 0, 0), y: 55 },
						{ x: new Date(2024, 8, 1, 0, 0, 0, 0), y: 80 },
						{ x: new Date(2024, 9, 1, 0, 0, 0, 0), y: 85 },
						{ x: new Date(2024, 10, 1, 0, 0, 0, 0), y: 80 },
						{ x: new Date(2024, 11, 1, 0, 0, 0, 0), y: 82 },
					],
				},
			]}
		>
			<Legend alignment={"end"} position={"top"} />
			<YAxis />
			<GridLines border horizontal vertical />
			<Lines curve={"natural"} />
			<Lines.Tooltip/>
			<XAxis
				ticks={{ from: "min - P1M", jumps: "P1M" }}
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
