export const PositiveNegativeBars = `
import { Legend } from "nanoplot/Legend";
import { YAxis } from "nanoplot/YAxis";
import { GridLines } from "nanoplot/GridLines";
import { Bars } from "nanoplot/Bars";
import { XAxis } from "nanoplot/XAxis";
import { Graph } from "nanoplot/Graph";
import "nanoplot/styles.css";

export default function App() {
	return (
		<div className={"h-[350px] w-[100%] m-auto dark:bg-black p-10"}>
			<Graph
				data={[
					{
						name: "Churn",
						fill: "#f43f5e",
						group: "financials",
						data: [
							{ x: Temporal.Instant.from("2025-01-01T00:00:00Z"), y: -100_000 },
							{ x: Temporal.Instant.from("2025-02-01T00:00:00Z"), y: -120_000 },
							{ x: Temporal.Instant.from("2025-03-01T00:00:00Z"), y: -110_000 },
							{ x: Temporal.Instant.from("2025-04-01T00:00:00Z"), y: -130_000 },
							{ x: Temporal.Instant.from("2025-05-01T00:00:00Z"), y: -90_000 },
							{ x: Temporal.Instant.from("2025-06-01T00:00:00Z"), y: -140_000 },
							{ x: Temporal.Instant.from("2025-07-01T00:00:00Z"), y: -80_000 },
							{ x: Temporal.Instant.from("2025-08-01T00:00:00Z"), y: -110_000 },
							{ x: Temporal.Instant.from("2025-09-01T00:00:00Z"), y: -150_000 },
							{ x: Temporal.Instant.from("2025-10-01T00:00:00Z"), y: -120_000 },
							{ x: Temporal.Instant.from("2025-11-01T00:00:00Z"), y: -100_000 },
							{ x: Temporal.Instant.from("2025-12-01T00:00:00Z"), y: -110_000 },
						].map(({ x, y }) => ({ x: x.toLocaleString("en-US", { month: "short", timeZone: "UTC" }), y })),
					},
					{
						name: "Revenue",
						fill: "#8249f0",
						group: "financials",
						data: [
							{ x: Temporal.Instant.from("2025-01-01T00:00:00Z"), y: 1_200_000 },
							{ x: Temporal.Instant.from("2025-02-01T00:00:00Z"), y: 1_300_000 },
							{ x: Temporal.Instant.from("2025-03-01T00:00:00Z"), y: 1_350_000 },
							{ x: Temporal.Instant.from("2025-04-01T00:00:00Z"), y: 1_250_000 },
							{ x: Temporal.Instant.from("2025-05-01T00:00:00Z"), y: 1_450_000 },
							{ x: Temporal.Instant.from("2025-06-01T00:00:00Z"), y: 1_500_000 },
							{ x: Temporal.Instant.from("2025-07-01T00:00:00Z"), y: 1_150_000 },
							{ x: Temporal.Instant.from("2025-08-01T00:00:00Z"), y: 1_400_000 },
							{ x: Temporal.Instant.from("2025-09-01T00:00:00Z"), y: 1_550_000 },
							{ x: Temporal.Instant.from("2025-10-01T00:00:00Z"), y: 1_480_000 },
							{ x: Temporal.Instant.from("2025-11-01T00:00:00Z"), y: 1_380_000 },
							{ x: Temporal.Instant.from("2025-12-01T00:00:00Z"), y: 1_280_000 },
						].map(({ x, y }) => ({ x: x.toLocaleString("en-US", { month: "short", timeZone: "UTC" }), y })),
					},
				]}
			>
				<Legend position={"top"} alignment={"end"} />
				<YAxis
					display={(v) => {
						return (
							"$" +
							new Intl.NumberFormat("en", {
								notation: "compact",
								compactDisplay: "short",
								maximumFractionDigits: 2,
							}).format(Number(v.data.y))
						);
					}}
				/>
				<GridLines vertical={false} />
				<Bars
					labels={(v) => {
						return (
							"$" +
							new Intl.NumberFormat("en", {
								notation: "compact",
								compactDisplay: "short",
								maximumFractionDigits: 2,
							}).format(Number(v.data.y))
						);
					}}
				/>
				<XAxis />
			</Graph>
		</div>
	);
};
`;
