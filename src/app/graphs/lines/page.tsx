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

export default function Page() {
	const [line, setLine] = useState<ComponentProps<typeof Lines>>({});
	const [gridline, setGridline] = useState<ComponentProps<typeof GridLines>>({ border: true, horizontal: true, vertical: true });
	const [xaxis, setXAxis] = useState<ComponentProps<typeof XAxis>>({});
	const [yaxis, setYAxis] = useState<ComponentProps<typeof YAxis>>({});
	const [legend, setLegend] = useState<ComponentProps<typeof Legend>>({});

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
					{ name: "Timeseries with 'hovered' and curve 'natural'", code: LinesSiteTrafficCode, component: LinesSiteTraffic },
					{
						name: "Timeseries with 'pinned' and curve 'natural'",
						code: LinesSiteTrafficPinnedCode,
						component: LinesSiteTrafficPinned,
					},
					{
						name: "Timeseries with timeslot",
						code: LinesTimeslotExampleCode,
						component: LinesTimeslotExample,
					},
				]}
			>
				<Graph data={DATA} gap={{ top: 15, left: 15, right: 36, bottom: 15 }} interactions={{ pinned: ["Josh - Hours gamed"] }}>
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
						title={xaxis.title?.toString() && <div dangerouslySetInnerHTML={{ __html: xaxis.title?.toString() ?? "" }} />}
						description={
							xaxis.description?.toString() && (
								<div dangerouslySetInnerHTML={{ __html: xaxis.description?.toString() ?? "" }} />
							)
						}
						display={(x) => {
							if (typeof x === "number" || typeof x === "string") return null;
							return `${x.getFullYear()}-${x.getMonth() + 1}-${x.getDate()}`;
						}}
					/>
					{legend.position === "bottom" && <Legend {...legend} />}
				</Graph>
			</GraphPanel>
		</>
	);
}

const DATA = [
	{
		name: "Josh - Hours gamed",
		data: [
			{ x: new Date(2024, 0, 1, 0, 0, 0, 0), y: 20 },
			{ x: new Date(2024, 1, 1, 0, 0, 0, 0), y: 25 },
			{ x: new Date(2024, 2, 1, 0, 0, 0, 0), y: 50 },
			{ x: new Date(2024, 3, 1, 0, 0, 0, 0), y: 45 },
			{ x: new Date(2024, 4, 1, 0, 0, 0, 0), y: 35 },
			{ x: new Date(2024, 5, 1, 0, 0, 0, 0), y: 55 },
		],
	},
	{
		name: "Sally - Hours gamed",
		data: [
			{ x: new Date(2024, 0, 1, 0, 0, 0, 0), y: 5.25 },
			{ x: new Date(2024, 1, 1, 0, 0, 0, 0), y: 10 },
			{ x: new Date(2024, 2, 1, 0, 0, 0, 0), y: 25.4 },
			{ x: new Date(2024, 3, 1, 0, 0, 0, 0), y: 36 },
			{ x: new Date(2024, 4, 1, 0, 0, 0, 0), y: 40 },
			{ x: new Date(2024, 5, 1, 0, 0, 0, 0), y: 35 },
		],
	},
];
