export const LinesWithCustomTooltip = `
import { Graph } from "nanoplot/Graph";
import { Lines } from "nanoplot/Lines";
import { YAxis } from "nanoplot/YAxis";
import { XAxis } from "nanoplot/XAxis";
import { GridLines } from "nanoplot/GridLines";
import NumberFlow from "@number-flow/react";
import "nanoplot/styles.css";

export default function App() {
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
		<div className={"h-[350px] w-[100%] m-auto p-10"}>
			<Graph data={data}>
				<YAxis />
				<GridLines border horizontal vertical />
				<Lines />
				<Lines.Tooltip
					tooltip={(points, x) => {
						if (!(x instanceof Date)) return null;
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
								return point.x.getTime() === x.getTime();
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
						return \`\${x.getFullYear()}-\${x.getMonth() + 1}-\${x.getDate()}\`;
					}}
				/>
			</Graph>
		</div>
	);
};

export const cx = (...args) => {
	return args
		.map((str) => {
			if (!str || typeof str === "string") return str;
			return Object.entries(str).map(([k, v]) => (v ? k : ""));
		})
		.flat()
		.filter(Boolean)
		.join(" ");
};
`;
