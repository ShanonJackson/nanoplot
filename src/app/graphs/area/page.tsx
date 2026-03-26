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
					gap={{ right: 35, left: 10, top: 20, bottom: 10 }}
					data={[
						{
							name: "New Users",
							stroke: "#FF4B4B",
							fill: `linear-gradient(rgba(255, 75, 75, 0.5) 5%, rgba(255, 75, 75, 0) 95%)`,
							group: "users",
							data: [
								{ x: Temporal.Instant.from("2024-01-01T00:00:00Z"), y: 90 },
								{ x: Temporal.Instant.from("2024-02-01T00:00:00Z"), y: 25 },
								{ x: Temporal.Instant.from("2024-03-01T00:00:00Z"), y: 50 },
								{ x: Temporal.Instant.from("2024-04-01T00:00:00Z"), y: 45 },
								{ x: Temporal.Instant.from("2024-05-01T00:00:00Z"), y: 35 },
								{ x: Temporal.Instant.from("2024-06-01T00:00:00Z"), y: 55 },
								{ x: Temporal.Instant.from("2024-07-01T00:00:00Z"), y: 55 },
								{ x: Temporal.Instant.from("2024-08-01T00:00:00Z"), y: 100 },
								{ x: Temporal.Instant.from("2024-09-01T00:00:00Z"), y: 85 },
								{ x: Temporal.Instant.from("2024-10-01T00:00:00Z"), y: 70 },
								{ x: Temporal.Instant.from("2024-11-01T00:00:00Z"), y: 72 },
								{ x: Temporal.Instant.from("2024-12-01T00:00:00Z"), y: 75 },
							],
						},
						{
							name: "Registered Users",
							stroke: "#33D4FF",
							fill: `linear-gradient(${toRgb("#33D4FF", 0.5)} 5%, ${toRgb("#33D4FF", 0)} 95%)`,
							group: "users",
							data: [
								{ x: Temporal.Instant.from("2024-01-01T00:00:00Z"), y: 45 },
								{ x: Temporal.Instant.from("2024-02-01T00:00:00Z"), y: 60 },
								{ x: Temporal.Instant.from("2024-03-01T00:00:00Z"), y: 55 },
								{ x: Temporal.Instant.from("2024-04-01T00:00:00Z"), y: 70 },
								{ x: Temporal.Instant.from("2024-05-01T00:00:00Z"), y: 70 },
								{ x: Temporal.Instant.from("2024-06-01T00:00:00Z"), y: 75 },
								{ x: Temporal.Instant.from("2024-07-01T00:00:00Z"), y: 60 },
								{ x: Temporal.Instant.from("2024-08-01T00:00:00Z"), y: 55 },
								{ x: Temporal.Instant.from("2024-09-01T00:00:00Z"), y: 80 },
								{ x: Temporal.Instant.from("2024-10-01T00:00:00Z"), y: 85 },
								{ x: Temporal.Instant.from("2024-11-01T00:00:00Z"), y: 80 },
								{ x: Temporal.Instant.from("2024-12-01T00:00:00Z"), y: 82 },
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
					<Area {...area} />
					<Area.Tooltip />
					{legend.position === "right" && <Legend {...legend} />}
					<XAxis
						{...xaxis}
						ticks={{ jumps: "P1M" }}
						display={(x) => {
							if (typeof x === "number" || typeof x === "string") return null;
							return x.toLocaleString("en-US", { month: "short", timeZone: "UTC" });
						}}
					/>

					{legend.position === "bottom" && <Legend {...legend} />}
				</Graph>
			</GraphPanel>
		</>
	);
}
