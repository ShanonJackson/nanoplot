"use client";
import { Graph } from "@/components/Graph/Graph";
import { ComponentProps, useState } from "react";
import { XAxis } from "@/components/XAxis/XAxis";
import { YAxis } from "@/components/YAxis/YAxis";
import { Legend } from "@/components/Legend/Legend";
import { GridLines } from "@/components/GridLines/GridLines";
import { LegendControlGroup } from "@/components/ControlGroup/LegendControlGroup/LegendControlGroup";
import { GridLinesControlGroup } from "@/components/ControlGroup/GridLinesControlGroup/GridLinesControlGroup";
import { ControlPanel } from "@/components/Panels/ControlPanel";
import { GraphPanel } from "@/components/Panels/GraphPanel";
import { XAxisControlGroup } from "@/components/ControlGroup/XAxisControlGroup/XAxisControlGroup";
import { YAxisControlGroup } from "@/components/ControlGroup/YAxisControGroup/YAxisControlGroup";
import { Bars } from "@/components/Bars/Bars";
import { BarsControlGroup } from "@/components/ControlGroup/BarsControlGroup/BarsControlGroup";

export default function Page() {
	const [bars, setBars] = useState<ComponentProps<typeof Bars>>({});
	const [gridline, setGridline] = useState<ComponentProps<typeof GridLines>>({ border: true, horizontal: true });
	const [xaxis, setXAxis] = useState<ComponentProps<typeof XAxis>>({});
	const [yaxis, setYAxis] = useState<ComponentProps<typeof YAxis>>({});
	const [legend, setLegend] = useState<ComponentProps<typeof Legend>>({});

	return (
		<div className={"h-full max-h-screen grid grid-cols-1 grid-rows-2 gap-4 sm:grid-cols-[40%_1fr]"}>
			<ControlPanel>
				<h1 className={"text-2xl pb-2"}>Bars</h1>
				<BarsControlGroup state={bars} onChange={setBars} />
				<LegendControlGroup state={legend} onChange={setLegend} />
				<GridLinesControlGroup state={gridline} onChange={setGridline} />
				<XAxisControlGroup state={xaxis} onChange={setXAxis} />
				<YAxisControlGroup state={yaxis} onChange={setYAxis} />
			</ControlPanel>
			<GraphPanel>
				<Graph
					data={MOCK_DATA.map((bar) => {
						return bar;
					})}
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
					<Bars {...bars} />
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
		</div>
	);
}
const MOCK_DATA = [
	{
		name: "Male",
		stroke: "transparent",
		fill: "linear-gradient(to bottom, #e93157 0%, #fbad26 100%)",
		data: [
			{ x: "Jan", y: 5_000 },
			{ x: "Feb", y: 20_000 },
			{ x: "Mar", y: 45_000 },
			{ x: "Apr", y: 20_000 },
		],
	},
	{
		name: "Female",
		stroke: "transparent",
		fill: "linear-gradient(to bottom, #1c8cdc 0%, #4cc7b0 100%)",
		data: [
			{ x: "Jan", y: 45_000 },
			{ x: "Feb", y: 10_000 },
			{ x: "Mar", y: 15_000 },
			{ x: "Apr", y: 30_000 },
		],
	},
];
