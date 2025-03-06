"use client";
import { ComponentProps, useState } from "react";
import { Bars } from "../../../components/Bars/Bars";
import { GridLines } from "../../../components/GridLines/GridLines";
import { XAxis } from "../../../components/XAxis/XAxis";
import { YAxis } from "../../../components/YAxis/YAxis";
import { Legend } from "../../../components/Legend/Legend";
import { ControlPanel } from "../../../components/Panels/ControlPanel";
import { BarControls, BarsControlGroup } from "../../../components/ControlGroup/BarsControlGroup/BarsControlGroup";
import { LegendControlGroup } from "../../../components/ControlGroup/LegendControlGroup/LegendControlGroup";
import { GridLinesControlGroup } from "../../../components/ControlGroup/GridLinesControlGroup/GridLinesControlGroup";
import { XAxisControlGroup } from "../../../components/ControlGroup/XAxisControlGroup/XAxisControlGroup";
import { YAxisControlGroup } from "../../../components/ControlGroup/YAxisControGroup/YAxisControlGroup";
import { GraphPanel } from "../../../components/Panels/GraphPanel";
import { Graph } from "../../../components/Graph/Graph";
import { StackedBarsExample, StackedBarsExampleCode } from "./examples/StackedBarsExample";
import { HorizontalBarsExample, HorizontalBarsExampleCode } from "./examples/HorizontalBarsExample";
import { BarsPercentExample, BarsPercentExampleCode } from "./examples/BarsPercentExample";

export default function Page() {
	const [bars, setBars] = useState<BarControls>({});
	const [gridline, setGridline] = useState<ComponentProps<typeof GridLines>>({ border: true, horizontal: true });
	const [xaxis, setXAxis] = useState<ComponentProps<typeof XAxis>>({ title: "Months" });
	const [yaxis, setYAxis] = useState<ComponentProps<typeof YAxis>>({ title: "Cookies Sold" });
	const [legend, setLegend] = useState<ComponentProps<typeof Legend>>({ position: "top" });

	return (
		<>
			<ControlPanel>
				<h1 className={"text-2xl pb-2"}>Bars</h1>
				<BarsControlGroup state={bars} onChange={setBars} />
				<LegendControlGroup state={legend} onChange={setLegend} />
				<GridLinesControlGroup state={gridline} onChange={setGridline} />
				<XAxisControlGroup state={xaxis} onChange={setXAxis} />
				<YAxisControlGroup state={yaxis} onChange={setYAxis} />
			</ControlPanel>
			<GraphPanel
				examples={[
					{ name: "Stacked Bars", code: StackedBarsExampleCode, component: StackedBarsExample },
					{ name: "Horizontal Bars", code: HorizontalBarsExampleCode, component: HorizontalBarsExample },
					{ name: "Bars percent / 100", code: BarsPercentExampleCode, component: BarsPercentExample },
				]}
				code={`<Graph
	data={[
		{
			name: "Male",
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
			fill: "linear-gradient(to bottom, #1c8cdc 0%, #4cc7b0 100%)",
			data: [
				{ x: "Jan", y: 45_000 },
				{ x: "Feb", y: 10_000 },
				{ x: "Mar", y: 15_000 },
				{ x: "Apr", y: 30_000 },
			],
		},
	]}
>
	<Bars${bars.example?.props ? bars.example.props : ""}/>
</Graph>
`}
			>
				<Graph
					data={[
						{
							name: "Male",
							data: [
								{ y: "Jan", x: -5_000 },
								{ y: "Feb", x: 20_000 },
								{ y: "Mar", x: 45_000 },
								{ y: "Apr", x: 20_000 },
							],
						},
						{
							name: "Female",
							data: [
								{ y: "Jan", x: 45_000 },
								{ y: "Feb", x: 10_000 },
								{ y: "Mar", x: 15_000 },
								{ y: "Apr", x: 30_000 },
							],
						},
					]}
					gap={{ top: 20, left: 15, right: 36, bottom: 15 }}
				>
					<YAxis />
					<GridLines border horizontal />
					<Bars horizontal labels={{ position: "center", display: (v) => v.toString() }} />
					<XAxis />
				</Graph>
			</GraphPanel>
		</>
	);
}
