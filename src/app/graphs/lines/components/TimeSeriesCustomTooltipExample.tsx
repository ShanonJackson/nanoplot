import { Graph } from "nanoplot/Graph";
import { Lines } from "nanoplot/Lines";
import { YAxis } from "nanoplot/YAxis";
import { XAxis } from "nanoplot/XAxis";
import { GridLines } from "nanoplot/GridLines";
import "nanoplot/styles.css";
import NumberFlow from "@number-flow/react";
import { cx } from "../../../../utils/cx/cx";
import { toEpochMs } from "../../../../utils/domain/utils/temporal";

export const TimeSeriesCustomTooltipExample = () => {
	const data = [
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
	];
	return (
		<Graph gap={{ right: 35, left: 10, top: 10, bottom: 10 }} data={data}>
			<YAxis />
			<GridLines border horizontal vertical />
			<Lines />
			<Lines.Tooltip
				tooltip={(points, x) => {
					if (typeof x === "number" || typeof x === "string") return null;
					const newData = data.map((line) => {
						return {
							...line,
							data: line.data.map((point, index) => {
								const prev = line.data[index - 1];
								return { ...point, percent: prev ? (point.y / prev.y - 1) * 100 : 0 };
							}),
						};
					});
					const percents = newData.map((line) => {
						return line.data.find((point) => {
							return point.x.epochMilliseconds === toEpochMs(x);
						})?.percent;
					});
					return percents.map((percent, i) => {
						if (!percent) return null;
						return (
							<div
								className={cx(
									"flex items-center text-lg font-bold rounded border py-1 px-3 bg-opacity-60 shadow-md backdrop-blur-sm border-gray-200 dark-border-[#454545]",
									percent >= 0 ? "text-green-500" : "text-red-500",
								)}
								key={i}
							>
								<svg
									viewBox={"0 0 25 25"}
									height={"16"}
									width={"16"}
									className={cx("mr-1 transition-transform duration-300 ease-in-out", percent >= 0 ? "rotate-180" : "")}
								>
									<path
										d={"M 12.5 2 L 12.5 23 L 4 13 M 12.5 23 L 21 13"}
										stroke={"black"}
										fill={"transparent"}
										strokeWidth={3}
										strokeLinecap={"round"}
										strokeLinejoin={"round"}
										className={cx(percent >= 0 ? "stroke-green-500" : "stroke-red-500")}
									/>
								</svg>
								<NumberFlow isolate value={Math.round(percent)} />%
							</div>
						);
					});
				}}
			/>
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

export const TimeSeriesCustomTooltipExampleCode = `
import { Graph } from "nanoplot/Graph";
import { Lines } from "nanoplot/Lines";
import { YAxis } from "nanoplot/YAxis";
import { XAxis } from "nanoplot/XAxis";
import { GridLines } from "nanoplot/GridLines";
import "nanoplot/styles.css";
import NumberFlow from "@number-flow/react";
import { cx } from "../../../../utils/cx/cx";

export const TimeSeriesCustomTooltipExample = () => {
	const data = [
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
	];
	return (
		<Graph gap={{ right: 35, left: 10, top: 10, bottom: 10 }} data={data}>
			<YAxis />
			<GridLines border horizontal vertical />
			<Lines />
			<Lines.Tooltip
				tooltip={(points, x) => {
					if (typeof x === "number" || typeof x === "string") return null;
					const newData = data.map((line) => {
						return {
							...line,
							data: line.data.map((point, index) => {
								const prev = line.data[index - 1];
								return { ...point, percent: prev ? (point.y / prev.y - 1) * 100 : 0 };
							}),
						};
					});
					const percents = newData.map((line) => {
						return line.data.find((point) => {
							return point.x.epochMilliseconds === x.epochMilliseconds;
						})?.percent;
					});
					return percents.map((percent, i) => {
						if (!percent) return null;
						return (
							<div
								className={cx(
									"flex items-center text-lg font-bold rounded border py-1 px-3 bg-opacity-60 shadow-md backdrop-blur-sm border-gray-200 dark-border-[#454545]",
									percent >= 0 ? "text-green-500" : "text-red-500",
								)}
								key={i}
							>
								<svg
									viewBox={"0 0 25 25"}
									height={"16"}
									width={"16"}
									className={cx(
										"mr-1 transition-transform duration-300 ease-in-out",
										percent >= 0 ? "rotate-180" : "",
									)}
								>
									<path
										d={"M 12.5 2 L 12.5 23 L 4 13 M 12.5 23 L 21 13"}
										stroke={"black"}
										fill={"transparent"}
										strokeWidth={3}
										strokeLinecap={"round"}
										strokeLinejoin={"round"}
										className={cx(percent >= 0 ? "stroke-green-500" : "stroke-red-500")}
									/>
								</svg>
								<NumberFlow isolate value={Math.round(percent)} />%
							</div>
						);
					});
				}}
			/>
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
