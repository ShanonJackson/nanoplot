"use client";
import { ComponentProps, useState } from "react";
import { GridLines } from "../../../components/GridLines/GridLines";
import { XAxis } from "../../../components/XAxis/XAxis";
import { YAxis } from "../../../components/YAxis/YAxis";
import { Legend } from "../../../components/Legend/Legend";
import { ControlPanel } from "../../../components/Panels/ControlPanel";
import { LegendControlGroup } from "../../../components/ControlGroup/LegendControlGroup/LegendControlGroup";
import { GridLinesControlGroup } from "../../../components/ControlGroup/GridLinesControlGroup/GridLinesControlGroup";
import { XAxisControlGroup } from "../../../components/ControlGroup/XAxisControlGroup/XAxisControlGroup";
import { YAxisControlGroup } from "../../../components/ControlGroup/YAxisControGroup/YAxisControlGroup";
import { GraphPanel } from "../../../components/Panels/GraphPanel";
import { Graph } from "../../../components/Graph/Graph";
import { Area } from "../../../components/Area/Area";
import { AreaControlGroup } from "../../../components/ControlGroup/AreaControlGroup/AreaControlGroup";
import { toRgb } from "../../../utils/color/to-rgb";

export default function Page() {
	const [area, setArea] = useState<ComponentProps<typeof Area>>({ curve: "natural" });
	const [gridline, setGridline] = useState<ComponentProps<typeof GridLines>>({ border: true, horizontal: false, vertical: false });
	const [xaxis, setXAxis] = useState<ComponentProps<typeof XAxis>>({});
	const [yaxis, setYAxis] = useState<ComponentProps<typeof YAxis>>({});
	const [legend, setLegend] = useState<ComponentProps<typeof Legend>>({ position: "top", alignment: "end" });

	return (
		<>
			<ControlPanel>
				<h1 className={"text-2xl pb-2"}>Area Graph</h1>
				<AreaControlGroup state={area} onChange={setArea} />
				<LegendControlGroup state={legend} onChange={setLegend} />
				<GridLinesControlGroup state={gridline} onChange={setGridline} />
				<XAxisControlGroup state={xaxis} onChange={setXAxis} />
				<YAxisControlGroup state={yaxis} onChange={setYAxis} />
			</ControlPanel>
			<GraphPanel>
				<Graph
					data={[
						{
							name: "Downtown",
							data: [
								{ x: Temporal.Instant.from("2025-01-01T00:00:00Z"), y: 40 },
								{ x: Temporal.Instant.from("2025-01-03T00:00:00Z"), y: 52 },
								{ x: Temporal.Instant.from("2025-01-05T00:00:00Z"), y: 36 },
								{ x: Temporal.Instant.from("2025-01-07T00:00:00Z"), y: 22 },
								{ x: Temporal.Instant.from("2025-01-09T00:00:00Z"), y: 63 },
								{ x: Temporal.Instant.from("2025-01-11T00:00:00Z"), y: 40 },
								{ x: Temporal.Instant.from("2025-01-13T00:00:00Z"), y: 37 },
								{ x: Temporal.Instant.from("2025-01-15T00:00:00Z"), y: 37 },
								{ x: Temporal.Instant.from("2025-01-17T00:00:00Z"), y: 43 },
								{ x: Temporal.Instant.from("2025-01-19T00:00:00Z"), y: 54 },
								{ x: Temporal.Instant.from("2025-01-21T00:00:00Z"), y: 35 },
								{ x: Temporal.Instant.from("2025-01-23T00:00:00Z"), y: 25 },
							],
							fill: "rgba(227, 178, 209, 1)",
						},
					]}
				>
					<Legend position={"top"} alignment={"start"} />
					<Area />
					<Area.Tooltip className={"bg-white dark:!bg-black"} />
					<XAxis
						ticks={{ jumps: "P2D" }}
						display={(x) => {
							if (typeof x === "number" || typeof x === "string") return null;
							return x.toLocaleString("en-US", { day: "numeric", timeZone: "UTC" });
						}}
					/>
				</Graph>
			</GraphPanel>
		</>
	);
}
