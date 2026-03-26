import { Graph } from "nanoplot/Graph";
import { overlay } from "nanoplot/Overlay";
import { Lines } from "nanoplot/Lines";
import { YAxis } from "nanoplot/YAxis";
import { XAxis } from "nanoplot/XAxis";
import { GridLines } from "nanoplot/GridLines";
import "nanoplot/styles.css";

export const LinesTimeslotExample = () => {
	return (
		<Graph
			gap={{ right: 35, left: 10, top: 10, bottom: 10 }}
			data={[
				{
					name: "Cars",
					data: [
						{ x: Temporal.Instant.from("2024-01-01T00:00:00Z"), y: 20 },
						{ x: Temporal.Instant.from("2024-02-01T00:00:00Z"), y: 25 },
						{ x: Temporal.Instant.from("2024-03-01T00:00:00Z"), y: 50 },
						{ x: Temporal.Instant.from("2024-04-01T00:00:00Z"), y: 45 },
						{ x: Temporal.Instant.from("2024-05-01T00:00:00Z"), y: 35 },
						{ x: Temporal.Instant.from("2024-06-01T00:00:00Z"), y: 55 },
					],
				},
			]}
		>
			<YAxis />
			<GridLines border horizontal vertical />
			<Lines />
			<overlay.rect
				x1={Temporal.Instant.from("2024-04-01T00:00:00Z")}
				x2={Temporal.Instant.from("2024-05-01T00:00:00Z")}
				y1={50}
				y2={0}
				className={"bg-green-400/70 text-black text-xs py-4 rounded"}
			>
				<div className="transform -rotate-180 text-white text-xs py-4 [writing-mode:vertical-rl]">TRAFFIC BLOCKED</div>
			</overlay.rect>
			<XAxis
				ticks={{ jumps: "P1M" }}
				display={(x) => {
					if (typeof x === "number" || typeof x === "string") return null;
					return x.toLocaleString("en-CA", { year: "numeric", month: "2-digit", day: "2-digit", timeZone: "UTC" });
				}}
			/>
		</Graph>
	);
};

export const LinesTimeslotExampleCode = `
import { Graph } from "nanoplot/Graph";
import { overlay } from "nanoplot/Overlay";
import { Lines } from "nanoplot/Lines";
import { YAxis } from "nanoplot/YAxis";
import { XAxis } from "nanoplot/XAxis";
import { GridLines } from "nanoplot/GridLines";
import "nanoplot/styles.css";

export const LinesTimeslotExample = () => {
	return (
		<Graph
			gap={{ right: 35, left: 10, top: 10, bottom: 10 }}
			data={[
				{
					name: "Josh - Hours gamed",
					data: [
						{ x: Temporal.Instant.from("2024-01-01T00:00:00Z"), y: 20 },
						{ x: Temporal.Instant.from("2024-02-01T00:00:00Z"), y: 25 },
						{ x: Temporal.Instant.from("2024-03-01T00:00:00Z"), y: 50 },
						{ x: Temporal.Instant.from("2024-04-01T00:00:00Z"), y: 45 },
						{ x: Temporal.Instant.from("2024-05-01T00:00:00Z"), y: 35 },
						{ x: Temporal.Instant.from("2024-06-01T00:00:00Z"), y: 55 },
					],
				},
			]}
		>
			<YAxis />
			<GridLines border horizontal vertical />
			<Lines />
			<overlay.rect
				x1={Temporal.Instant.from("2024-04-01T00:00:00Z")}
				x2={Temporal.Instant.from("2024-05-01T00:00:00Z")}
				y1={50}
				y2={0}
				className={"bg-green-400/70 text-black text-xs py-4 rounded"}
			>
				<div className="transform -rotate-180 text-white text-xs py-4 [writing-mode:vertical-rl]">
					TRAFFIC BLOCKED
				</div>
			</overlay.rect>
			<XAxis
				ticks={{ jumps: "P1M" }}
				display={(x) => {
					if (typeof x === "number" || typeof x === "string") return null;
					return x.toLocaleString("en-CA", { year: "numeric", month: "2-digit", day: "2-digit", timeZone: "UTC" });
				}}
			/>
		</Graph>
	);
};
`;
