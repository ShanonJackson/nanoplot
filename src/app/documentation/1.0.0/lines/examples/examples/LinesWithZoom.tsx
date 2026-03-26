export const LinesWithZoomAndPan = `
import { Graph } from "nanoplot/Graph";
import { Lines } from "nanoplot/Lines";
import { YAxis } from "nanoplot/YAxis";
import { XAxis } from "nanoplot/XAxis";
import { GridLines } from "nanoplot/GridLines";
import { Legend } from "nanoplot/Legend";
import { ZoomSlider } from "nanoplot/ZoomSlider";
import { useState } from "react";
import "nanoplot/styles.css";

export default function App() {
	const [ zoom, setZoom ] = useState({x: [0, 100], y: [0, 100]});
	return (
		<div className={"h-[350px] w-[100%] m-auto p-10"}>
			<Graph
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
				zoom={zoom}
			>
				<ZoomSlider.X onChange={setZoom}/>
				<Legend alignment={"end"} position={"top"} />
				<YAxis />
				<GridLines />
				<Lines curve={"natural"} />
				<Lines.Tooltip />
				<ZoomSlider.Y onChange={setZoom}/>
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
