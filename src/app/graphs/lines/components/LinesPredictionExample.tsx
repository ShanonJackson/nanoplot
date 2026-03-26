import { Graph } from "nanoplot/Graph";
import { Lines } from "nanoplot/Lines";
import { YAxis } from "nanoplot/YAxis";
import { XAxis } from "nanoplot/XAxis";
import { GridLines } from "nanoplot/GridLines";
import "nanoplot/styles.css";

export const LinesPredictionExample = () => {
	const data = [
		{
			name: "Website Users",
			data: [
				{ x: Temporal.Instant.from("2019-01-01T00:00:00Z"), y: 1186945 },
				{ x: Temporal.Instant.from("2020-01-01T00:00:00Z"), y: 1827148 },
				{ x: Temporal.Instant.from("2021-01-01T00:00:00Z"), y: 2591740 },
				{ x: Temporal.Instant.from("2022-01-01T00:00:00Z"), y: 3393396 },
				{ x: Temporal.Instant.from("2023-01-01T00:00:00Z"), y: 4252605 },
				{ x: Temporal.Instant.from("2024-01-01T00:00:00Z"), y: 5249076 },
				{ x: Temporal.Instant.from("2025-01-01T00:00:00Z"), y: 6029551 },
				{ x: Temporal.Instant.from("2026-01-01T00:00:00Z"), y: 7143810 },
				{ x: Temporal.Instant.from("2027-01-01T00:00:00Z"), y: 8524799 },
				{ x: Temporal.Instant.from("2028-01-01T00:00:00Z"), y: 9919216 },
				{ x: Temporal.Instant.from("2029-01-01T00:00:00Z"), y: 11196156 },
			],
			stroke: `linear-gradient(to right, rgb(51, 212, 255) 0%, rgb(51, 212, 255) ${Temporal.Instant.from("2023-01-01T00:00:00Z").epochMilliseconds}, rgb(211, 211, 211) ${Temporal.Instant.from("2023-01-01T00:00:00Z").epochMilliseconds + 1}, rgb(211, 211, 211))`,
		},
	];
	return (
		<Graph data={data} gap={{ top: 15, right: 20 }}>
			<YAxis />
			<GridLines border horizontal vertical />
			<Lines />
			<Lines.Tooltip />
			<XAxis
				ticks={{ jumps: "P1Y" }}
				display={(x) => {
					if (typeof x === "number" || typeof x === "string") return null;
					return x.toLocaleString("en-US", { year: "numeric", timeZone: "UTC" });
				}}
			/>
		</Graph>
	);
};

export const LinesPredictionExampleCode = `
import { Graph } from "nanoplot/Graph";
import { Lines } from "nanoplot/Lines";
import { YAxis } from "nanoplot/YAxis";
import { XAxis } from "nanoplot/XAxis";
import { GridLines } from "nanoplot/GridLines";
import "nanoplot/styles.css";

export const LinesPredictionExample = () => {
	const data = [
		{
			name: "Website Users",
			data: [
				{ x: Temporal.Instant.from("2019-01-01T00:00:00Z"), y: 1186945 },
				{ x: Temporal.Instant.from("2020-01-01T00:00:00Z"), y: 1827148 },
				{ x: Temporal.Instant.from("2021-01-01T00:00:00Z"), y: 2591740 },
				{ x: Temporal.Instant.from("2022-01-01T00:00:00Z"), y: 3393396 },
				{ x: Temporal.Instant.from("2023-01-01T00:00:00Z"), y: 4252605 },
				{ x: Temporal.Instant.from("2024-01-01T00:00:00Z"), y: 5249076 },
				{ x: Temporal.Instant.from("2025-01-01T00:00:00Z"), y: 6029551 },
				{ x: Temporal.Instant.from("2026-01-01T00:00:00Z"), y: 7143810 },
				{ x: Temporal.Instant.from("2027-01-01T00:00:00Z"), y: 8524799 },
				{ x: Temporal.Instant.from("2028-01-01T00:00:00Z"), y: 9919216 },
				{ x: Temporal.Instant.from("2029-01-01T00:00:00Z"), y: 11196156 },
			],
			stroke: \`linear-gradient(to right, rgb(51, 212, 255) 0%, rgb(51, 212, 255) \${Temporal.Instant.from("2023-01-01T00:00:00Z").epochMilliseconds}, rgb(211, 211, 211) \${Temporal.Instant.from("2023-01-01T00:00:00Z").epochMilliseconds + 1}, rgb(211, 211, 211))\`,
		},
	];
	return (
		<Graph data={data}>
			<YAxis />
			<GridLines border horizontal vertical />
			<Lines />
			<Lines.Tooltip />
			<XAxis
				ticks={{ jumps: "P1Y" }}
				display={(x) => {
					if (typeof x === "number" || typeof x === "string") return null;
					return x.toLocaleString("en-US", { year: "numeric", timeZone: "UTC" });
				}}
			/>
		</Graph>
	);
};
`;
