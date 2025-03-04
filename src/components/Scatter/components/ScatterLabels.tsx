"use client";

import { MathUtils } from "../../../utils/math/math";
import { useGraph } from "../../../hooks/use-graph/use-graph";
import { overlay } from "../../Overlay/Overlay";
import { GraphUtils } from "../../../utils/graph/graph";
import { useRef } from "react";
import { CoordinatesUtils } from "../../../utils/coordinates/coordinates";
import { useMounted } from "../../../hooks/use-mounted";
import { HydrateContext } from "../../HydrateContext/HydrateContext";

type Props = {};

const LABEL_X_MARGIN = 8; /* 8px */
const ScatterLabelsComponent = () => {
	const ref = useRef<SVGSVGElement>(null);
	const { id, data, viewbox, domain } = useGraph();
	const mounted = useMounted();
	const { height: graphHeight, width: graphWidth } = ref.current?.getBoundingClientRect() ?? {
		height: 0,
		width: 0,
	};
	if (!mounted) return null;
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
				ref={ref}
				viewBox={`0 0 ${viewbox.x} ${viewbox.y}`}
				className={"[grid-area:graph] h-full w-full -z-10"}
				preserveAspectRatio={"none"}
			/>
			{data
				.flatMap((d) => d.data.map(({ x, y }) => ({ x: xForValue(x), y: yForValue(y), name: d.name, color: d.stroke })))
				.sort((a, b) => +a.x - +b.x)
				.map(({ x: x1, y: y1, name, color }, i, points) => {
					const labelWidth = ctx.measureText(String(name)).width;
					const collides = (() => {
						const xCoordinate = +x1 + MathUtils.scale(labelWidth, graphWidth, viewbox.x) + LABEL_X_MARGIN;
						if (xCoordinate > viewbox.x) return true;
						return points.slice(i + 1).some((point) => {
							if (xCoordinate > point.x) {
								const yHeight = MathUtils.scale(12, graphHeight, viewbox.y);
								if (y1 + yHeight > point.y && y1 - yHeight < point.y) return true;
							}
							return false;
						});
					})();
					if (collides) return null;
					const left = MathUtils.scale(x1, viewbox.x, 100);
					const top = MathUtils.scale(y1, viewbox.y, 100);
					if (left > 100 || left < 0 || top < 0 || top > 97) return null;
					return (
						<overlay.div
							className={"absolute"}
							style={{
								left: `calc(${left}% + ${LABEL_X_MARGIN}px)`,
								top: top + "%",
								color,
								transform: `translate(0, -50%)`,
							}}
						>
							{name}
						</overlay.div>
					);
				})}
		</>
	);
};

export const ScatterLabels = HydrateContext(ScatterLabelsComponent);
