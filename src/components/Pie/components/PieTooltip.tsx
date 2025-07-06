import { HydrateContext } from "../../HydrateContext/HydrateContext";
import { useMouseCoordinates } from "../../../hooks/use-mouse-coordinates";
import { ComponentProps, ReactNode, useRef } from "react";
import { SegmentDatasetDefaulted, useGraph } from "../../../hooks/use-graph/use-graph";
import { scale } from "../../../utils/math/math";
import { cx } from "../../../utils/cx/cx";
import { useGraphRef } from "../../../hooks/use-graph/use-graph-ref";
import { GraphUtils } from "../../../utils/graph/graph";

type Props = Omit<ComponentProps<"div">, "children"> & {
	children: (segment: SegmentDatasetDefaulted[number]) => ReactNode;
};

export const PieTooltip = HydrateContext((props: Props) => {
	const ref = useRef<SVGSVGElement>(null);
	const mouse = useMouseCoordinates(ref);
	const context = useGraph();
	const graphRef = useGraphRef();
	const { viewbox, data, colors } = context;

	if (!graphRef.current || !GraphUtils.isSegmentData(data)) return null;
	const id = (() => {
		if (!mouse) return null;
		return (
			document.elementFromPoint(mouse.px.clientX, mouse.px.clientY)?.closest?.("[data-pie-id]")?.getAttribute("data-pie-id") ?? null
		);
	})();
	const segment = data.find((d) => d.id === id);

	return (
		<>
			<svg className={"[grid-area:graph] h-full w-full"} viewBox={`0 0 ${context.viewbox.x} ${context.viewbox.y}`} ref={ref} />
			{mouse && segment && (
				<div
					{...props}
					className={cx("[grid-area:graph] absolute z-[2] pointer-events-none", props.className)}
					style={{
						left: scale(mouse.coordinates.x, viewbox.x, 100) + "%",
						top: scale(mouse.coordinates.y, viewbox.y, 100) + "%",
					}}
				>
					{props.children({ ...segment, fill: segment.fill ?? colors[data.indexOf(segment)] ?? colors.at(-1) })}
				</div>
			)}
		</>
	);
});
