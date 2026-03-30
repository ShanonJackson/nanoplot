"use client";
import { scale } from "../../../utils/math/math";
import { InternalCartesianDataset, useGraph } from "../../../hooks/use-graph/use-graph";
import { GraphUtils } from "../../../utils/graph/graph";
import { CoordinatesUtils } from "../../../utils/coordinates/coordinates";
import { useMounted } from "../../../hooks/use-mounted";
import { HydrateContext } from "../../HydrateContext/HydrateContext";
import { useStatefulRef } from "../../../hooks/use-stateful-ref";
import { useBoundingBox } from "../../../hooks/use-bounding-box";
import { ReactNode } from "react";

type Datapoint = Omit<InternalCartesianDataset[number], "data"> & { data: InternalCartesianDataset[number]["data"][number] };
type Props = {
	display?:
		| ((dp: Datapoint) => string)
		| {
				collision: false;
				label: (dp: Datapoint) => ReactNode;
		  }
		| {
				collision: true;
				label: (dp: Datapoint) => string;
		  };
};

const LABEL_X_MARGIN = 8; /* 8px */
const LABEL_PADDING = 4; /* 4px */
const ScatterLabelsComponent = ({ display }: Props) => {
	const [ref, setRef] = useStatefulRef<SVGSVGElement>();
	const { id, data, viewbox, domain } = useGraph();
	const mounted = useMounted();
	useBoundingBox(ref);
	const { height: graphHeight, width: graphWidth } = ref.current?.getBoundingClientRect() ?? {
		height: 0,
		width: 0,
	};

	if (!mounted) return null;
	/* below here document access is safe */
	const graph = document.getElementById(id);
	if (!graph) return null;
	const ctx = new OffscreenCanvas(256, 256).getContext("2d");
	if (ctx) ctx.font = `12pt ${window.getComputedStyle(graph).fontFamily}`;
	if (!ctx || !GraphUtils.isXYData(data)) return null;

	const xForValue = CoordinatesUtils.xCoordinateFor({ viewbox, domain });
	const yForValue = CoordinatesUtils.yCoordinateFor({ viewbox, domain });

	const textFor = (dp: Datapoint) => {
		if (typeof display === "function") return display(dp);
		return display?.label(dp) ?? dp.name;
	};

	return (
		<>
			<svg
				ref={setRef}
				viewBox={`0 0 ${viewbox.x} ${viewbox.y}`}
				className={"[grid-area:graph] h-full w-full -z-10"}
				preserveAspectRatio={"none"}
			/>
			{data
				.flatMap((d) => d.data.map(({ x, y }) => ({ x: xForValue(x), y: yForValue(y), ...d, data: { x, y } })))
				.sort((a, b) => +a.x - +b.x)
				.map(({ x: x1, y: y1, ...dp }, i, points) => {
					const text = textFor(dp);
					const metrics = ctx.measureText(String(text));
					const labelWidth = metrics.width;
					const labelHeight = metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent;
					const left = scale(x1, viewbox.x, 100);
					const top = scale(y1, viewbox.y, 100);
					const halfH = scale(labelHeight / 2 + LABEL_PADDING, graphHeight, 100);
					const collides = (() => {
						if (typeof text !== "string") return false; /* collision detection on JSX not supported yet */
						if (left < 0) return true;
						if (left + scale(labelWidth + LABEL_X_MARGIN + LABEL_PADDING, graphWidth, 100) > 100) return true;
						if (top - halfH < 0 || top + halfH > 100) return true;
						const xCoordinate = +x1 + scale(labelWidth + LABEL_X_MARGIN, graphWidth, viewbox.x);
						return points.slice(i + 1).some((point) => {
							if (xCoordinate > point.x) {
								const yHeight = scale(12, graphHeight, viewbox.y);
								if (y1 + yHeight > point.y && y1 - yHeight < point.y) return true;
							}
							return false;
						});
					})();
					if (collides) return null;

					return (
						<div
							key={i}
							className={"[grid-area:graph] absolute text-nowrap [transform:translate(0,-50%)]"}
							data-scatter-label-id={dp.id}
							style={{
								left: `calc(${left}% + ${LABEL_X_MARGIN}px)`,
								top: top + "%",
								color: dp.stroke,
							}}
						>
							{dp.name}
						</div>
					);
				})}
		</>
	);
};

export const ScatterLabels = HydrateContext(ScatterLabelsComponent);
