import { Graph } from "nanoplot/Graph";
import { Lines } from "nanoplot/Lines";
import { YAxis } from "nanoplot/YAxis";
import { XAxis } from "nanoplot/XAxis";
import { GridLines } from "nanoplot/GridLines";
import { Legend } from "nanoplot/Legend";
import "nanoplot/styles.css";

export const LinesGradientMaskExample = () => {
	return (
		<Graph
			gap={{ right: 35, left: 10, top: 20, bottom: 10 }}
			data={[
				{
					name: "Money Made",
					stroke: "mask:linear-gradient(to top, #d93025 40, rgb(52, 168, 83) 40.001, rgb(52, 168, 83))",
					data: [
						{ x: Temporal.Instant.from("2024-01-01T00:00:00Z"), y: 20 },
						{ x: Temporal.Instant.from("2024-02-01T00:00:00Z"), y: 25 },
						{ x: Temporal.Instant.from("2024-03-01T00:00:00Z"), y: 50 },
						{ x: Temporal.Instant.from("2024-04-01T00:00:00Z"), y: 45 },
						{ x: Temporal.Instant.from("2024-05-01T00:00:00Z"), y: 35 },
						{ x: Temporal.Instant.from("2024-06-01T00:00:00Z"), y: 55 },
						{ x: Temporal.Instant.from("2024-07-01T00:00:00Z"), y: 55 },
						{ x: Temporal.Instant.from("2024-08-01T00:00:00Z"), y: 100 },
						{ x: Temporal.Instant.from("2024-09-01T00:00:00Z"), y: 85 },
						{ x: Temporal.Instant.from("2024-10-01T00:00:00Z"), y: 70 },
						{ x: Temporal.Instant.from("2024-11-01T00:00:00Z"), y: 72 },
						{ x: Temporal.Instant.from("2024-12-01T00:00:00Z"), y: 75 },
					],
				},
			]}
		>
			<Legend alignment={"end"} position={"top"} />
			<YAxis />
			<GridLines horizontal vertical border />
			<Lines curve={"natural"} joints={true} />
			<Lines.Tooltip />
			<XAxis
				ticks={{ jumps: "P1M" }}
				display={(x) => {
					if (typeof x === "number" || typeof x === "string") return null;
					return x.toLocaleString("en-US", { month: "short", timeZone: "UTC" });
				}}
			/>
		</Graph>
	);
};

export const LinesGradientMaskExampleCode = `
import { Graph } from "nanoplot/Graph";
import { Lines } from "nanoplot/Lines";
import { YAxis } from "nanoplot/YAxis";
import { XAxis } from "nanoplot/XAxis";
import { GridLines } from "nanoplot/GridLines";
import { Legend } from "nanoplot/Legend";
import "nanoplot/styles.css";

export const LinesGradientMaskExample = () => {
	return (
		<Graph
			gap={{ right: 35, left: 10, top: 20, bottom: 10 }}
			data={[
				{
					name: "Money Made",
					stroke: "mask:linear-gradient(to top, #d93025 40, rgb(52, 168, 83) 40.001, rgb(52, 168, 83))",
					data: [
						{ x: Temporal.Instant.from("2024-01-01T00:00:00Z"), y: 20 },
						{ x: Temporal.Instant.from("2024-02-01T00:00:00Z"), y: 25 },
						{ x: Temporal.Instant.from("2024-03-01T00:00:00Z"), y: 50 },
						{ x: Temporal.Instant.from("2024-04-01T00:00:00Z"), y: 45 },
						{ x: Temporal.Instant.from("2024-05-01T00:00:00Z"), y: 35 },
						{ x: Temporal.Instant.from("2024-06-01T00:00:00Z"), y: 55 },
						{ x: Temporal.Instant.from("2024-07-01T00:00:00Z"), y: 55 },
						{ x: Temporal.Instant.from("2024-08-01T00:00:00Z"), y: 100 },
						{ x: Temporal.Instant.from("2024-09-01T00:00:00Z"), y: 85 },
						{ x: Temporal.Instant.from("2024-10-01T00:00:00Z"), y: 70 },
						{ x: Temporal.Instant.from("2024-11-01T00:00:00Z"), y: 72 },
						{ x: Temporal.Instant.from("2024-12-01T00:00:00Z"), y: 75 },
					],
				},
			]}
		>
			<Legend alignment={"end"} position={"top"} />
			<YAxis />
			<GridLines horizontal vertical border />
			<Lines curve={"natural"} joints={true} />
			<Lines.Tooltip />
			<XAxis
				ticks={{ jumps: "P1M" }}
				display={(x) => {
					if (typeof x === "number" || typeof x === "string") return null;
					return x.toLocaleString("en-US", { month: "short", timeZone: "UTC" });
				}}
			/>
		</Graph>
	);
};
`;
