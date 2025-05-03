"use client";

import { ControlPanel } from "../../../../../components/Panels/ControlPanel";
import { LinesControlGroup } from "../../../../../components/ControlGroup/LinesControlGroup/LinesControlGroup";
import { LegendControlGroup } from "../../../../../components/ControlGroup/LegendControlGroup/LegendControlGroup";
import { GridLinesControlGroup } from "../../../../../components/ControlGroup/GridLinesControlGroup/GridLinesControlGroup";
import { XAxisControlGroup } from "../../../../../components/ControlGroup/XAxisControlGroup/XAxisControlGroup";
import { YAxisControlGroup } from "../../../../../components/ControlGroup/YAxisControGroup/YAxisControlGroup";
import { ComponentProps, useState } from "react";
import { Lines } from "../../../../../components/Lines/Lines";
import { GridLines } from "../../../../../components/GridLines/GridLines";
import { XAxis } from "../../../../../components/XAxis/XAxis";
import { YAxis } from "../../../../../components/YAxis/YAxis";
import { Legend } from "../../../../../components/Legend/Legend";
import { GraphPanel } from "../../../../../components/Panels/GraphPanel";
import { Graph } from "../../../../../components/Graph/Graph";
import { Scatter } from "../../../../../components/Scatter/Scatter";
import { useMounted } from "../../../../../hooks/use-mounted";

const random = (min: number, max: number) => Math.random() * (max - min) + min;
const MOCK_DATA = new Array(1000).fill(null).map(() => {
	return {
		hours_studied: random(0, 50),
		test_score: random(0, 100),
	};
});

export default function Page() {
	const mounted = useMounted();
	const [scatter, setScatter] = useState<ComponentProps<typeof Scatter>>({});
	const [gridline, setGridline] = useState<ComponentProps<typeof GridLines>>({ border: true, horizontal: true, vertical: true });
	const [xaxis, setXAxis] = useState<ComponentProps<typeof XAxis>>({});
	const [yaxis, setYAxis] = useState<ComponentProps<typeof YAxis>>({});
	const [legend, setLegend] = useState<ComponentProps<typeof Legend>>({ position: "top", alignment: "end" });
	if (!mounted) return null; /* prevents hydration errors, because of random values */
	return (
		<div className={"h-[calc(100vh-80px)] grid md:grid-rows-2 gap-4 md:grid-cols-[40%_1fr] p-8"}>
			<ControlPanel>
				<h1 className={"text-2xl pb-2"}>Line Graph</h1>
				<LegendControlGroup state={legend} onChange={setLegend} />
				<GridLinesControlGroup state={gridline} onChange={setGridline} />
				<XAxisControlGroup state={xaxis} onChange={setXAxis} />
				<YAxisControlGroup state={yaxis} onChange={setYAxis} />
			</ControlPanel>
			<GraphPanel className={"h-[400px]"}>
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
					<Scatter {...scatter} />
					<Scatter.Tooltip tooltip={(point) => `${point.data.x} ${point.data.y}`} />
					<Scatter.Labels />
					{legend.position === "right" && <Legend {...legend} />}
					<XAxis {...xaxis} />
					{legend.position === "bottom" && <Legend {...legend} />}
				</Graph>
			</GraphPanel>
		</div>
	);
}
