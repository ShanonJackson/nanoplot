export const AreaGraphExample = `
import { Graph } from "nanoplot/Graph";
import { Legend } from "nanoplot/Legend";
import { Area } from "nanoplot/Area";
import { XAxis } from "nanoplot/XAxis";
import "nanoplot/styles.css";

export default () => {
	return (
		<div className={"h-[70vh] w-[100%] p-4 px-10"}>
			<Graph
				data={[
					{
						name: "Downtown",
						data: [
							{ x: Temporal.Instant.from("2025-01-01T00:00:00Z"), y: 40 },
							{ x: Temporal.Instant.from("2025-01-03T00:00:00Z"), y: 52 },
							{ x: Temporal.Instant.from("2025-01-05T00:00:00Z"), y: 36 },
							{ x: Temporal.Instant.from("2025-01-07T00:00:00Z"), y: 22 },
							{ x: Temporal.Instant.from("2025-01-09T00:00:00Z"), y: 63 },
							{ x: Temporal.Instant.from("2025-01-11T00:00:00Z"), y: 40 },
							{ x: Temporal.Instant.from("2025-01-13T00:00:00Z"), y: 37 },
							{ x: Temporal.Instant.from("2025-01-15T00:00:00Z"), y: 37 },
							{ x: Temporal.Instant.from("2025-01-17T00:00:00Z"), y: 43 },
							{ x: Temporal.Instant.from("2025-01-19T00:00:00Z"), y: 54 },
							{ x: Temporal.Instant.from("2025-01-21T00:00:00Z"), y: 35 },
							{ x: Temporal.Instant.from("2025-01-23T00:00:00Z"), y: 25 },
							{ x: Temporal.Instant.from("2025-01-25T00:00:00Z"), y: 52 },
							{ x: Temporal.Instant.from("2025-01-27T00:00:00Z"), y: 40 },
							{ x: Temporal.Instant.from("2025-01-29T00:00:00Z"), y: 52 },
							{ x: Temporal.Instant.from("2025-01-31T00:00:00Z"), y: 46 },
						],
						fill: 'rgba(227, 178, 209, 1)',
					},
					{
						name: "North Region",
						data: [
							{ x: Temporal.Instant.from("2025-01-01T00:00:00Z"), y: 30 },
							{ x: Temporal.Instant.from("2025-01-03T00:00:00Z"), y: 21 },
							{ x: Temporal.Instant.from("2025-01-05T00:00:00Z"), y: 22 },
							{ x: Temporal.Instant.from("2025-01-07T00:00:00Z"), y: 14 },
							{ x: Temporal.Instant.from("2025-01-09T00:00:00Z"), y: 36 },
							{ x: Temporal.Instant.from("2025-01-11T00:00:00Z"), y: 47 },
							{ x: Temporal.Instant.from("2025-01-13T00:00:00Z"), y: 14 },
							{ x: Temporal.Instant.from("2025-01-15T00:00:00Z"), y: 32 },
							{ x: Temporal.Instant.from("2025-01-17T00:00:00Z"), y: 25 },
							{ x: Temporal.Instant.from("2025-01-19T00:00:00Z"), y: 34 },
							{ x: Temporal.Instant.from("2025-01-21T00:00:00Z"), y: 31 },
							{ x: Temporal.Instant.from("2025-01-23T00:00:00Z"), y: 14 },
							{ x: Temporal.Instant.from("2025-01-25T00:00:00Z"), y: 36 },
							{ x: Temporal.Instant.from("2025-01-27T00:00:00Z"), y: 40 },
							{ x: Temporal.Instant.from("2025-01-29T00:00:00Z"), y: 52 },
							{ x: Temporal.Instant.from("2025-01-31T00:00:00Z"), y: 30 },
						],
						fill: 'rgba(181, 81, 157, 0.75)',
					},
					{
						name: "Central City",
						data: [
							{ x: Temporal.Instant.from("2025-01-01T00:00:00Z"), y: 24 },
							{ x: Temporal.Instant.from("2025-01-05T00:00:00Z"), y: 50 },
							{ x: Temporal.Instant.from("2025-01-09T00:00:00Z"), y: 22 },
							{ x: Temporal.Instant.from("2025-01-11T00:00:00Z"), y: 54 },
							{ x: Temporal.Instant.from("2025-01-13T00:00:00Z"), y: 20 },
							{ x: Temporal.Instant.from("2025-01-15T00:00:00Z"), y: 37 },
							{ x: Temporal.Instant.from("2025-01-17T00:00:00Z"), y: 16 },
							{ x: Temporal.Instant.from("2025-01-19T00:00:00Z"), y: 34 },
							{ x: Temporal.Instant.from("2025-01-21T00:00:00Z"), y: 35 },
							{ x: Temporal.Instant.from("2025-01-23T00:00:00Z"), y: 14 },
							{ x: Temporal.Instant.from("2025-01-25T00:00:00Z"), y: 15 },
							{ x: Temporal.Instant.from("2025-01-27T00:00:00Z"), y: 20 },
							{ x: Temporal.Instant.from("2025-01-29T00:00:00Z"), y: 21 },
							{ x: Temporal.Instant.from("2025-01-31T00:00:00Z"), y: 34 },
						],
						fill: 'rgba(83, 29, 204, 0.6)',
					},
				]}
			>
				<Legend position={"top"} alignment="{start}" />
				<Area />
				<Area.Tooltip className={"bg-white dark:!bg-black"} />
				<XAxis
					ticks={{ jumps: "P2D" }}
					display={(x) => {
						if (typeof x === "number" || typeof x === "string") return null;
						return x.toLocaleString("en-US", { day: "numeric", timeZone: "UTC" });
					}}
				/>
			</Graph>
		</div>
	);
};
`;
