"use client";
import { ComponentProps, useState } from "react";
import { Scatter } from "../../../components/Scatter/Scatter";
import { GridLines } from "../../../components/GridLines/GridLines";
import { ControlPanel } from "../../../components/Panels/ControlPanel";
import { GraphPanel } from "../../../components/Panels/GraphPanel";
import { YAxis } from "../../../components/YAxis/YAxis";
import { Graph } from "../../../components/Graph/Graph";
import { XAxis } from "../../../components/XAxis/XAxis";
import { LegendControlGroup } from "../../../components/ControlGroup/LegendControlGroup/LegendControlGroup";
import { GridLinesControlGroup } from "../../../components/ControlGroup/GridLinesControlGroup/GridLinesControlGroup";
import { XAxisControlGroup } from "../../../components/ControlGroup/XAxisControlGroup/XAxisControlGroup";
import { YAxisControlGroup } from "../../../components/ControlGroup/YAxisControGroup/YAxisControlGroup";
import { Legend } from "../../../components/Legend/Legend";
import { useMounted } from "../../../hooks/use-mounted";
import { Tooltip } from "../../../components/Tooltip/Tooltip";

export default function Page() {
	const mounted = useMounted();
	const [scatter, setScatter] = useState<ComponentProps<typeof Scatter>>({});
	const [gridline, setGridline] = useState<ComponentProps<typeof GridLines>>({ border: true, horizontal: false, vertical: false });
	const [xaxis, setXAxis] = useState<ComponentProps<typeof XAxis>>({ title: "Hours Studied" });
	const [yaxis, setYAxis] = useState<ComponentProps<typeof YAxis>>({ title: "Test Grades" });
	const [legend, setLegend] = useState<ComponentProps<typeof Legend>>({ position: "top", alignment: "end" });
	const [targetSide, setTargetSide] = useState<"top" | "bottom" | "left" | "right">("right");
	const [tooltipSide, setTooltipSide] = useState<"top" | "bottom" | "left" | "right">("left");
	if (!mounted) return null; /* random() can produce hydration diff error, simplest fix as this needs to be use client anyway */
	return (
		<>
			<ControlPanel>
				<h1 className={"text-2xl pb-2"}>Scatter Graph</h1>
				<LegendControlGroup state={legend} onChange={setLegend} />
				<GridLinesControlGroup state={gridline} onChange={setGridline} />
				<XAxisControlGroup state={xaxis} onChange={setXAxis} />
				<YAxisControlGroup state={yaxis} onChange={setYAxis} />
			</ControlPanel>
			<GraphPanel>
				<Graph
					data={[
						{
							name: "Hours studed vs Grades",
							data: MOCK_DATA.map((dp) => ({ y: dp.test_score, x: dp.hours_studied })),
						},
					]}
				>
					<Legend position={"top"} alignment={"end"} />
					<YAxis />
					<GridLines />
					<Scatter />
					<Scatter.Tooltip tooltip={(point) => `${point.data.x} ${point.data.y}`} />
					<XAxis />
				</Graph>
			</GraphPanel>
			<div>
				<div>target side</div>
				{(["top", "bottom", "left", "right"] as const).map((side, i) => (
					<button onClick={() => setTargetSide(side)} key={i}>
						{side}
					</button>
				))}
				<div>tooltip side</div>
				{(["top", "bottom", "left", "right"] as const).map((side, i) => (
					<button onClick={() => setTooltipSide(side)} key={i}>
						{side}
					</button>
				))}
				<Tooltip
					active={true}
					position={{
						target: { side: targetSide, alignment: "center" },
						tooltip: { side: tooltipSide, alignment: "center" },
					}}
					collision={false}
					trigger={(ref) => <div style={{ height: 50, width: 50, background: "red" }} ref={ref} />}
				>
					HELLO WORLD
				</Tooltip>
			</div>
		</>
	);
}

const random = (min: number, max: number) => Math.random() * (max - min) + min;
const MOCK_DATA = new Array(1000).fill(null).map(() => {
	return {
		hours_studied: random(0, 50),
		test_score: random(0, 100),
	};
});
