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
				{ x: new Date(2024, 0, 1, 0, 0, 0, 0), y: 20 },
				{ x: new Date(2024, 1, 1, 0, 0, 0, 0), y: 25 },
				{ x: new Date(2024, 2, 1, 0, 0, 0, 0), y: 50 },
				{ x: new Date(2024, 3, 1, 0, 0, 0, 0), y: 45 },
				{ x: new Date(2024, 4, 1, 0, 0, 0, 0), y: 35 },
				{ x: new Date(2024, 5, 1, 0, 0, 0, 0), y: 55 },
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
						return line.data.find((point) => point.x === x)?.percent;
					});

					return percents.map((percent) => (
						<div
							className={cx(
								"flex items-center text-lg font-bold rounded border py-2 px-3 bg-opacity-60 shadow-md backdrop-blur-sm border-gray-200 dark-border-[#454545]",
								percent >= 0 ? "text-green-500" : "text-red-500",
							)}
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
					));
				}}
			/>
			<XAxis
				ticks={{ jumps: "every 1 months" }}
				display={(x) => {
					if (typeof x === "number" || typeof x === "string") return null;
					return `${x.getFullYear()}-${x.getMonth() + 1}-${x.getDate()}`;
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
					{ x: new Date(2024, 0, 1, 0, 0, 0, 0), y: 20 },
					{ x: new Date(2024, 1, 1, 0, 0, 0, 0), y: 25 },
					{ x: new Date(2024, 2, 1, 0, 0, 0, 0), y: 50 },
					{ x: new Date(2024, 3, 1, 0, 0, 0, 0), y: 45 },
					{ x: new Date(2024, 4, 1, 0, 0, 0, 0), y: 35 },
					{ x: new Date(2024, 5, 1, 0, 0, 0, 0), y: 55 },
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
							return line.data.find((point) => point.x === x)?.percent;
						});
	
						return percents.map((percent) => (
							<div
								className={cx(
									"flex items-center text-lg font-bold rounded border py-2 px-3 bg-opacity-60 shadow-md backdrop-blur-sm border-gray-200 dark-border-[#454545]",
									percent >= 0 ? "text-green-500" : "text-red-500",
								)}
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
						));
					}}
				/>
				<XAxis
					ticks={{ jumps: "every 1 months" }}
					display={(x) => {
						if (typeof x === "number" || typeof x === "string") return null;
						return \`\${x.getFullYear()}-\${x.getMonth() + 1}-\${x.getDate()}\`;
					}}
				/>
			</Graph>
		);
	};
`;
