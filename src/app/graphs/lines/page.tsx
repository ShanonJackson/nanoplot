"use client";
import { ComponentProps, useState } from "react";
import { Lines } from "../../../components/Lines/Lines";
import { GridLines } from "../../../components/GridLines/GridLines";
import { XAxis } from "../../../components/XAxis/XAxis";
import { YAxis } from "../../../components/YAxis/YAxis";
import { Legend } from "../../../components/Legend/Legend";
import { ControlPanel } from "../../../components/Panels/ControlPanel";
import { LinesControlGroup } from "../../../components/ControlGroup/LinesControlGroup/LinesControlGroup";
import { LegendControlGroup } from "../../../components/ControlGroup/LegendControlGroup/LegendControlGroup";
import { GridLinesControlGroup } from "../../../components/ControlGroup/GridLinesControlGroup/GridLinesControlGroup";
import { XAxisControlGroup } from "../../../components/ControlGroup/XAxisControlGroup/XAxisControlGroup";
import { YAxisControlGroup } from "../../../components/ControlGroup/YAxisControGroup/YAxisControlGroup";
import { GraphPanel } from "../../../components/Panels/GraphPanel";
import { LinesTimeslotExample, LinesTimeslotExampleCode } from "./components/LinesTimeslotExample";
import { Graph } from "../../../components/Graph/Graph";
import { LinesSiteTraffic, LinesSiteTrafficCode } from "./components/LinesSiteTraffic";
import { LinesSiteTrafficPinned, LinesSiteTrafficPinnedCode } from "./components/LinesSiteTrafficPinned";
import { TimeSeriesCustomTooltipExample, TimeSeriesCustomTooltipExampleCode } from "./components/TimeSeriesCustomTooltipExample";
import { LinesGradientMaskExample, LinesGradientMaskExampleCode } from "./components/LinesGradientMaskExample";
import { LinesPredictionExample, LinesPredictionExampleCode } from "./components/LinesPredictionExample";
import { ZoomSlider } from "../../../components/ZoomSlider/ZoomSlider";
import { Area } from "../../../components/Area/Area";
import { overlay } from "../../../components/Overlay/Overlay";
import NumberFlow from "@number-flow/react";
import { cx } from "../../../utils/cx/cx";

const roundDownToNearest = (num: number, nearest: number) => {
	return nearest > 0 ? Math.floor(num / nearest) * nearest : Math.ceil(num / nearest) * nearest;
};
export default function Page() {
	const [line, setLine] = useState<ComponentProps<typeof Lines>>({ curve: "linear", joints: true });
	const [gridline, setGridline] = useState<ComponentProps<typeof GridLines>>({ border: true, horizontal: false, vertical: false });
	const [xaxis, setXAxis] = useState<ComponentProps<typeof XAxis>>({});
	const [yaxis, setYAxis] = useState<ComponentProps<typeof YAxis>>({});
	const [legend, setLegend] = useState<ComponentProps<typeof Legend>>({ position: "top", alignment: "end" });

	const [hovered, setHovered] = useState<string[]>([]);
	const [pinned, setPinned] = useState<string[]>([]);
	const [zoom, setZoom] = useState<{ x: [number, number]; y: [number, number] }>({ x: [0, 100], y: [0, 100] });
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
		<>
			<ControlPanel>
				<h1 className={"text-2xl pb-2"}>Line Graph</h1>
				<LinesControlGroup state={line} onChange={setLine} />
				<LegendControlGroup state={legend} onChange={setLegend} />
				<GridLinesControlGroup state={gridline} onChange={setGridline} />
				<XAxisControlGroup state={xaxis} onChange={setXAxis} />
				<YAxisControlGroup state={yaxis} onChange={setYAxis} />
			</ControlPanel>
			<GraphPanel className={"bg-[#191937] p-4"}>
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
							return `${x.getFullYear()}-${x.getMonth() + 1}-${x.getDate()}`;
						}}
					/>
				</Graph>
			</GraphPanel>
		</>
	);
}
