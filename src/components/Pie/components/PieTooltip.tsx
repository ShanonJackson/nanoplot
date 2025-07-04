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
	const { viewbox, data } = context;

	if (!graphRef.current || !GraphUtils.isSegmentData(data)) return null;

	const segment = Array.from(graphRef.current.querySelectorAll("[data-pie-id]"))
		.find((element) => {
			if (!mouse || !ref.current) return false;
			
			// Create a rotation matrix for 180 degrees
			const rotate180 = ref.current.createSVGMatrix();
			rotate180.rotate(180);
			
			if (!(element instanceof SVGGeometryElement)) return false;
			
			const svgWidth = 3000;
			const svgHeight = 300;
			const cx = svgWidth / 2;
			const cy = svgHeight / 2;
			
			// Convert mouse coordinates to SVGPoint (if not already in this format)
			const mousePoint = mouse.coordinates;
			const rotatedPoint = ref.current.createSVGPoint();
			rotatedPoint.x = 2 * cx - mousePoint.x;  // Rotate 180 degrees around the center
			rotatedPoint.y = 2 * cy + mousePoint.y;  // Rotate 180 degrees around the center
			console.log(rotatedPoint.x, rotatedPoint.y)
			return element.isPointInFill(rotatedPoint);
		})
		?.getAttribute("data-pie-id");

	const selectedSegment = data.find((d) => d.id === segment);

	return (
		<>
			<svg className={"[grid-area:graph] h-full w-full"} viewBox={`0 0 ${context.viewbox.x} ${context.viewbox.y}`} ref={ref} />
			{mouse && selectedSegment && (
				<div
					{...props}
					className={cx("absolute [grid-area:graph] z-[1] pointer-events-none", props.className)}
					style={{
						left: scale(mouse.coordinates.x, viewbox.x, 100) + "%",
						top: scale(mouse.coordinates.y, viewbox.y, 100) + "%",
					}}
				>
					{props.children(selectedSegment)}
				</div>
			)}
		</>
	);
});