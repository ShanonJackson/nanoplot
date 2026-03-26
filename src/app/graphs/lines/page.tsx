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
import { ZoomSlider } from "../../../components/ZoomSlider/ZoomSlider";
import { Area } from "../../../components/Area/Area";
import { overlay } from "../../../components/Overlay/Overlay";
import NumberFlow from "@number-flow/react";
import { cx } from "../../../utils/cx/cx";

const roundDownToNearest = (num: number, nearest: number) => {
	return nearest > 0 ? Math.floor(num / nearest) * nearest : Math.ceil(num / nearest) * nearest;
};
export default function Page() {
	const [line, setLine] = useState<ComponentProps<typeof Lines>>({ curve: "linear", joints: true });
	const [gridline, setGridline] = useState<ComponentProps<typeof GridLines>>({ border: true, horizontal: false, vertical: false });
	const [xaxis, setXAxis] = useState<ComponentProps<typeof XAxis>>({});
	const [yaxis, setYAxis] = useState<ComponentProps<typeof YAxis>>({});
	const [legend, setLegend] = useState<ComponentProps<typeof Legend>>({ position: "top", alignment: "end" });

	const [hovered, setHovered] = useState<string[]>([]);
	const [pinned, setPinned] = useState<string[]>([]);
	const [zoom, setZoom] = useState<{ x: [number, number]; y: [number, number] }>({ x: [0, 100], y: [0, 100] });

	return (
		<>
			<GraphPanel className={"bg-[#191937] p-4"}>
				<Graph
					data={[
						{
							name: "New Users",
							stroke: "#FF4B4B",
							data: [
								{ x: Temporal.Instant.from("2024-01-01T00:00:00Z"), y: 20 },
								{ x: Temporal.Instant.from("2024-02-01T00:00:00Z"), y: 25 },
								{ x: Temporal.Instant.from("2024-03-01T00:00:00Z"), y: 50 },
								{ x: Temporal.Instant.from("2024-04-01T00:00:00Z"), y: 45 },
								{ x: Temporal.Instant.from("2024-05-01T00:00:00Z"), y: 35 },
								{ x: Temporal.Instant.from("2024-06-01T00:00:00Z"), y: 55 },
								{ x: Temporal.Instant.from("2024-07-01T00:00:00Z"), y: 55 },
								{ x: Temporal.Instant.from("2024-08-01T00:00:00Z"), y: 95 },
								{ x: Temporal.Instant.from("2024-09-01T00:00:00Z"), y: 85 },
								{ x: Temporal.Instant.from("2024-10-01T00:00:00Z"), y: 70 },
								{ x: Temporal.Instant.from("2024-11-01T00:00:00Z"), y: 72 },
								{ x: Temporal.Instant.from("2024-12-01T00:00:00Z"), y: 75 },
							],
						},
						{
							name: "Registered Users",
							stroke: "#33D4FF",
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
					<Legend alignment={"end"} position={"top"} />
					<YAxis />
					<GridLines border />
					<Lines curve={"natural"} />
					<Lines.Tooltip />
					<XAxis
						display={(x) => {
							if (typeof x === "number" || typeof x === "string") return null;
							return x.toLocaleString("en-US", { month: "short", timeZone: "UTC" });
						}}
					/>
				</Graph>
			</GraphPanel>
		</>
	);
}
