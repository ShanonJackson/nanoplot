"use client";
import { Lines } from "@/components/Lines/Lines";
import { Legend } from "@/components/Legend/Legend";
import { ControlGroup } from "@/components/ControlGroup/ControlGroup";
import { GridLines } from "@/components/GridLines/GridLines";
import { Control } from "@/components/Docs/Control/Control";
import { HTMLControl } from "@/components/Docs/Control/components/HTMLControl/HTMLControl";
import { LinesTooltip } from "@/components/Lines/components/LinesTooltip";
import { LegendControlGroup } from "@/components/ControlGroup/LegendControlGroup/LegendControlGroup";
import { GridLinesControlGroup } from "@/components/ControlGroup/GridLinesControlGroup/GridLinesControlGroup";
import { ComponentProps, useState } from "react";
import { XAxis } from "@/components/XAxis/XAxis";
import { YAxis } from "@/components/YAxis/YAxis";
import { Graph } from "@/components/Graph/Graph";
import { ControlPanel } from "@/components/Panels/ControlPanel";
import { GraphPanel } from "@/components/Panels/GraphPanel";
import { ExamplesPanel } from "@/components/Panels/ExamplesPanel";
import { XAxisControlGroup } from "@/components/ControlGroup/XAxisControlGroup/XAxisControlGroup";
import { YAxisControlGroup } from "@/components/ControlGroup/YAxisControGroup/YAxisControlGroup";

export default function Page() {
	const [line, setLine] = useState<ComponentProps<typeof Lines>>({});
	const [gridline, setGridline] = useState<ComponentProps<typeof GridLines>>({});
	const [xaxis, setXAxis] = useState<ComponentProps<typeof XAxis>>({});
	const [yaxis, setYAxis] = useState<ComponentProps<typeof YAxis>>({});
	const [legend, setLegend] = useState<ComponentProps<typeof Legend>>({});

	return (
		<div className={"h-full max-h-screen grid grid-cols-[40%_1fr] grid-rows-2 gap-4"}>
			<ControlPanel>
				<h1 className={"text-2xl pb-2"}>Line Graph</h1>
				<LegendControlGroup state={legend} onChange={setLegend} />
				<GridLinesControlGroup state={gridline} onChange={setGridline} />
				<XAxisControlGroup state={xaxis} onChange={setXAxis} />
				<YAxisControlGroup state={yaxis} onChange={setYAxis} />
			</ControlPanel>
			<GraphPanel>
				<Graph
					data={[
						{
							name: "Josh - Hours gamed",
							data: [
								{ x: 1, y: 20 },
								{ x: 2, y: 40 },
								{ x: 3, y: 30 },
								{ x: 4, y: 50 },
								{ x: 5, y: 36 },
								{ x: 6, y: 60 },
							],
						},
						{
							name: "Sally - Hours gamed",
							data: [
								{ x: 1, y: 5.25 },
								{ x: 2, y: 10 },
								{ x: 3, y: 25.4 },
								{ x: 4, y: 36 },
								{ x: 5, y: 40 },
								{ x: 6, y: 35 },
							],
						},
					]}
					gap={{ top: 15, left: 15, right: 36, bottom: 15 }}
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
					<Lines />
					<Lines.Tooltip tooltip={(_, x) => `${x}`} />
					{legend.position === "right" && <Legend {...legend} />}
					<XAxis
						{...xaxis}
						title={xaxis.title?.toString() && <div dangerouslySetInnerHTML={{ __html: xaxis.title?.toString() ?? "" }} />}
						description={
							xaxis.description?.toString() && (
								<div dangerouslySetInnerHTML={{ __html: xaxis.description?.toString() ?? "" }} />
							)
						}
					/>
					{legend.position === "bottom" && <Legend {...legend} />}
				</Graph>
			</GraphPanel>
			<ExamplesPanel>EXAMPLES</ExamplesPanel>
		</div>
	);
}

const data = [
	{
		name: "Josh - Hours gamed",
		data: [
			{ x: 1, y: 20 },
			{ x: 2, y: 40 },
			{ x: 3, y: 30 },
			{ x: 4, y: 50 },
			{ x: 5, y: 36 },
			{ x: 6, y: 60 },
		],
	},
	{
		name: "Sally - Hours gamed",
		data: [
			{ x: 1, y: 5.25 },
			{ x: 2, y: 10 },
			{ x: 3, y: 25.4 },
			{ x: 4, y: 36 },
			{ x: 5, y: 40 },
			{ x: 6, y: 35 },
		],
	},
];
