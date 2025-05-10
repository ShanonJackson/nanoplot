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
import { PopupNew } from "../../../components/PopupNew/PopupNew";

export default function Page() {
	const mounted = useMounted();
	const [scatter, setScatter] = useState<ComponentProps<typeof Scatter>>({});
	const [gridline, setGridline] = useState<ComponentProps<typeof GridLines>>({ border: true, horizontal: false, vertical: false });
	const [xaxis, setXAxis] = useState<ComponentProps<typeof XAxis>>({ title: "Hours Studied" });
	const [yaxis, setYAxis] = useState<ComponentProps<typeof YAxis>>({ title: "Test Grades" });
	const [legend, setLegend] = useState<ComponentProps<typeof Legend>>({ position: "top", alignment: "end" });
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
					gap={{ top: 15, left: 15, right: 36, bottom: 15 }}
				>
					{legend.position === "top" && <Legend {...legend} />}
					{legend.position === "left" && <Legend {...legend} />}
					<YAxis {...yaxis} />
					<GridLines {...gridline} />
					<Scatter {...scatter} trendline={true} />
					<Scatter.Tooltip tooltip={(point) => `${point.data.x} ${point.data.y}`} />
					<Scatter.Labels />
					{legend.position === "right" && <Legend {...legend} />}
					<XAxis {...xaxis} />
					{legend.position === "bottom" && <Legend {...legend} />}
				</Graph>
			</GraphPanel>
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
