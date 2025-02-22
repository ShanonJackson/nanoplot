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

export default function Page() {
	const [line, setLine] = useState<ComponentProps<typeof Lines>>({ curve: "natural" });
	const [gridline, setGridline] = useState<ComponentProps<typeof GridLines>>({ border: true, horizontal: false, vertical: false });
	const [xaxis, setXAxis] = useState<ComponentProps<typeof XAxis>>({});
	const [yaxis, setYAxis] = useState<ComponentProps<typeof YAxis>>({});
	const [legend, setLegend] = useState<ComponentProps<typeof Legend>>({ position: "top", alignment: "end" });

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
			<GraphPanel
				examples={[
					{
						name: "Timeseries with 'Registered Users' interactions: 'hovered'",
						code: LinesSiteTrafficCode,
						component: LinesSiteTraffic,
					},
					{
						name: "Timeseries with 'New Users' interactions: 'pinned'",
						code: LinesSiteTrafficPinnedCode,
						component: LinesSiteTrafficPinned,
					},
					{
						name: "Timeseries with timeslot",
						code: LinesTimeslotExampleCode,
						component: LinesTimeslotExample,
					},
					{
						name: "Time Series with Custom Tooltip",
						code: TimeSeriesCustomTooltipExampleCode,
						component: TimeSeriesCustomTooltipExample,
					},
				]}
			>
				<Graph
					gap={{ right: 35, left: 10, top: 20, bottom: 10 }}
					data={[
						{
							name: "New Users",
							stroke: "#FF4B4B",
							data: [
								{ x: new Date(2024, 0, 1, 0, 0, 0, 0), y: 20 },
								{ x: new Date(2024, 1, 1, 0, 0, 0, 0), y: 25 },
								{ x: new Date(2024, 2, 1, 0, 0, 0, 0), y: 50 },
								{ x: new Date(2024, 3, 1, 0, 0, 0, 0), y: 45 },
								{ x: new Date(2024, 4, 1, 0, 0, 0, 0), y: 35 },
								{ x: new Date(2024, 5, 1, 0, 0, 0, 0), y: 55 },
								{ x: new Date(2024, 6, 1, 0, 0, 0, 0), y: 55 },
								{ x: new Date(2024, 7, 1, 0, 0, 0, 0), y: 100 },
								{ x: new Date(2024, 8, 1, 0, 0, 0, 0), y: 85 },
								{ x: new Date(2024, 9, 1, 0, 0, 0, 0), y: 70 },
								{ x: new Date(2024, 10, 1, 0, 0, 0, 0), y: 72 },
								{ x: new Date(2024, 11, 1, 0, 0, 0, 0), y: 75 },
							],
						},
						{
							name: "Registered Users",
							stroke: "#33D4FF",
							data: [
								{ x: new Date(2024, 0, 1, 0, 0, 0, 0), y: 45 },
								{ x: new Date(2024, 1, 1, 0, 0, 0, 0), y: 60 },
								{ x: new Date(2024, 2, 1, 0, 0, 0, 0), y: 55 },
								{ x: new Date(2024, 3, 1, 0, 0, 0, 0), y: 70 },
								{ x: new Date(2024, 4, 1, 0, 0, 0, 0), y: 70 },
								{ x: new Date(2024, 5, 1, 0, 0, 0, 0), y: 75 },
								{ x: new Date(2024, 6, 1, 0, 0, 0, 0), y: 60 },
								{ x: new Date(2024, 7, 1, 0, 0, 0, 0), y: 55 },
								{ x: new Date(2024, 8, 1, 0, 0, 0, 0), y: 80 },
								{ x: new Date(2024, 9, 1, 0, 0, 0, 0), y: 85 },
								{ x: new Date(2024, 10, 1, 0, 0, 0, 0), y: 80 },
								{ x: new Date(2024, 11, 1, 0, 0, 0, 0), y: 82 },
							],
						},
					]}
				>
					{legend.position === "top" && <Legend {...legend} />}
					{legend.position === "left" && <Legend {...legend} />}
					<YAxis
						{...yaxis}
						title={yaxis.title?.toString() && <div dangerouslySetInnerHTML={{ __html: yaxis.title?.toString() ?? "" }} />}
						description={
							yaxis.description?.toString() && (
								<div dangerouslySetInnerHTML={{ __html: yaxis.description?.toString() ?? "" }} />
							)
						}
					/>
					<GridLines {...gridline} />
					<Lines {...line} />
					<Lines.Tooltip />
					{legend.position === "right" && <Legend {...legend} />}
					<XAxis
						{...xaxis}
						ticks={{ jumps: "every 1 months" }}
						display={(x) => {
							const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
							if (typeof x === "number" || typeof x === "string") return null;
							return months[x.getMonth()];
						}}
					/>

					{legend.position === "bottom" && <Legend {...legend} />}
				</Graph>
			</GraphPanel>
		</>
	);
}
