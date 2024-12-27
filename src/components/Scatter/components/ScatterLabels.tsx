import * as React from "react";
import { RefObject } from "react";
import styles from "./DistributionScatterLabels.module.scss";
import { useGraph } from "@/hooks/use-graph/use-graph";
import { MathUtils } from "@/utils/math/math";
import { Graph } from "@/components/Graph/Graph";
import { GraphUtils } from "@/utils/graph/graph";
import { overlay } from "@/components/Overlay/Overlay";

type Props = {};

export const ScatterLabels = () => {
	const { data, viewbox } = useGraph();
	const LABEL_X_MARGIN = 8;
	const canvas = new OffscreenCanvas(256, 256);
	const ctx = canvas.getContext("2d") as any as CanvasRenderingContext2D;
	if (ctx) ctx.font = "12pt Axiforma";
	if (!ctx) return null;
	if (!GraphUtils.isXYData(data)) return null;
	return (
		<>
			{data
				.flatMap((d) => d.data)
				.sort((a, b) => +a.x - +b.x)
				.map(({ x: x1, y: y1, name, color }, i, points) => {
					const labelWidth = ctx.measureText(String(name)).width;
					const collides = (() => {
						const xCoordinate = x1 + MathUtils.scale(labelWidth, graphWidth, x.scale) + LABEL_X_MARGIN;
						if (xCoordinate > x.scale) return true;
						return points.slice(i + 1).some((point) => {
							if (xCoordinate > point.x) {
								const yHeight = MathUtils.scale(12, graphHeight, y.scale);
								if (y1 + yHeight > point.y && y1 - yHeight < point.y) return true;
							}
							return false;
						});
					})();
					if (collides) return null;
					const left = MathUtils.scale(+x1, viewbox.x, 100);
					const top = MathUtils.scale(+y1, viewbox.y, 100);
					if (left > 100 || left < 0 || top < 0 || top > 100) return null;
					return (
						<overlay.div
							key={i}
							className={styles.label}
							style={{
								left: left + "%",
								top: top + "%",
								color,
							}}
						>
							{name}
						</overlay.div>
					);
				})}
		</>
	);
};
