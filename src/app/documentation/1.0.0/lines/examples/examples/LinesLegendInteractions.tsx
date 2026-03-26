export const LinesLegendInteractions = `
import { Graph } from "nanoplot/Graph";
import { Lines } from "nanoplot/Lines";
import { YAxis } from "nanoplot/YAxis";
import { XAxis } from "nanoplot/XAxis";
import { GridLines } from "nanoplot/GridLines";
import { Legend } from "nanoplot/Legend";
import { useState } from "react";
import "nanoplot/styles.css";

export default function App() {
	const [ hovered, setHovered ] = useState([]);
	const [ pinned, setPinned ] = useState([]);
	return (
		<div className={"h-[350px] w-[100%] m-auto p-10"}>
			<Graph
				interactions={{ hovered, pinned }}
				data={[
					{
						name: "New Users",
						stroke: "#FF4B4B",
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
					{
						name: "Registered Users",
						stroke: "#33D4FF",
						data: [
							{ x: Temporal.Instant.from("2024-01-01T00:00:00Z"), y: 45 },
							{ x: Temporal.Instant.from("2024-02-01T00:00:00Z"), y: 60 },
							{ x: Temporal.Instant.from("2024-03-01T00:00:00Z"), y: 55 },
							{ x: Temporal.Instant.from("2024-04-01T00:00:00Z"), y: 70 },
							{ x: Temporal.Instant.from("2024-05-01T00:00:00Z"), y: 70 },
							{ x: Temporal.Instant.from("2024-06-01T00:00:00Z"), y: 75 },
							{ x: Temporal.Instant.from("2024-07-01T00:00:00Z"), y: 60 },
							{ x: Temporal.Instant.from("2024-08-01T00:00:00Z"), y: 55 },
							{ x: Temporal.Instant.from("2024-09-01T00:00:00Z"), y: 80 },
							{ x: Temporal.Instant.from("2024-10-01T00:00:00Z"), y: 85 },
							{ x: Temporal.Instant.from("2024-11-01T00:00:00Z"), y: 80 },
							{ x: Temporal.Instant.from("2024-12-01T00:00:00Z"), y: 82 },
						],
					},
				]}
			>
				<Legend
					alignment={"end"}
					position={"top"}
					onClick={(dp) => {
						setPinned((p) => {
							if (p.includes(dp.id)) return p.filter((pin) => pin !== dp.id);
							return [...p, dp.id];
						});
					}}
					onMouseEnter={(dp) => {
						setHovered((h) => {
							if (h.includes(dp.id)) return h.filter((hov) => hov !== dp.id);
							return [...h, dp.id];
						});
					}}
					onMouseLeave={(dp) => {
						setHovered((h) => h.filter((hov) => hov !== dp.id));
					}}
				/>
				<YAxis />
				<GridLines />
				<Lines curve={"natural"} />
				<Lines.Tooltip />
				<XAxis
					ticks={{ jumps: "P1M" }}
					display={(x) => {
						if (typeof x === "number" || typeof x === "string") return null;
						return x.toLocaleString("en-US", { month: "short", timeZone: "UTC" });
					}}
				/>
			</Graph>
		</div>
	)
}
`;
