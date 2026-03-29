"use client";

import { scale } from "../../../utils/math/math";
import { InternalCartesianDataset, useGraph } from "../../../hooks/use-graph/use-graph";
import { GraphUtils } from "../../../utils/graph/graph";
import { useRef, useState } from "react";
import { CoordinatesUtils } from "../../../utils/coordinates/coordinates";
import { useMounted } from "../../../hooks/use-mounted";
import { HydrateContext } from "../../HydrateContext/HydrateContext";
import { useStatefulRef } from "../../../hooks/use-stateful-ref";

type Props = {
	display?:
		| boolean
		| ((dp: Omit<InternalCartesianDataset[number], "data"> & { data: InternalCartesianDataset[number]["data"][number] }) => void);
	marker?: (dp: Omit<InternalCartesianDataset[number], "data"> & { data: InternalCartesianDataset[number]["data"][number] }) => void;
};

const LABEL_X_MARGIN = 8; /* 8px */
const ScatterLabelsComponent = ({ display, marker }: Props) => {
	const [ref, setRef] = useStatefulRef<SVGSVGElement>();
	const { id, data, viewbox, domain } = useGraph();
	const mounted = useMounted();
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
					const labelWidth = ctx.measureText(String(dp.name)).width;
					const collides = (() => {
						const xCoordinate = +x1 + scale(labelWidth, graphWidth, viewbox.x) + LABEL_X_MARGIN;
						if (xCoordinate > viewbox.x) return true;
						return points.slice(i + 1).some((point) => {
							if (xCoordinate > point.x) {
								const yHeight = scale(12, graphHeight, viewbox.y);
								if (y1 + yHeight > point.y && y1 - yHeight < point.y) return true;
							}
							return false;
						});
					})();

					if (collides) return null;
					const left = scale(x1, viewbox.x, 100);
					const top = scale(y1, viewbox.y, 100);
					if (left > 100 || left < 0 || top < 0 || top > 97) return null;
					return (
						<div
							key={i}
							className={"[grid-area:graph] absolute"}
							data-scatter-label-id={dp.id}
							style={{
								left: `calc(${left}% + ${LABEL_X_MARGIN}px)`,
								top: top + "%",
								color: dp.stroke,
								transform: `translate(0, -50%)`,
								whiteSpace: "nowrap",
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
