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
import data from "./data.json";
import { format } from "../../../utils/date/date-format";

const dataset = data.slice(1, 4).map((d, i) => ({
	name: (() => {
		if (i === 1) return "CPU";
		if (i === 2) return "RAM";
		return "TCP Out";
	})(),
	data: data[0]
		.map((xy, ii) => ({
			x: new Date(xy * 1000),
			y: d[ii],
		}))
		.slice(0, 55_000),
}));

export default function Page() {
	const [line, setLine] = useState<ComponentProps<typeof Lines>>({ curve: "linear", joints: false });
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
					{
						name: "Line graph with gradient mask with 'ticks' and gradient",
						code: LinesGradientMaskExampleCode,
						component: LinesGradientMaskExample,
					},
					{
						name: "Line Graph Date Gradient + Prediction Line",
						code: LinesPredictionExampleCode,
						component: LinesPredictionExample,
					},
				]}
			>
				<Graph gap={{ right: 35, left: 10, top: 20, bottom: 10 }} data={dataset}>
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
					<Lines.Tooltip tooltip={{ title: (v) => format(new Date(+v), "yyyy-mm-dd hh:mm"), display: (v) => v.y.toString() }} />
					{legend.position === "right" && <Legend {...legend} />}
					<XAxis
						{...xaxis}
						ticks={{ jumps: "every 2 days" }}
						display={(x) => {
							if (typeof x === "number" || typeof x === "string") return null;
							return format(x, "mm/dd");
						}}
					/>
					{legend.position === "bottom" && <Legend {...legend} />}
				</Graph>
			</GraphPanel>
		</>
	);
}
