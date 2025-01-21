import { cx } from "@/utils/cx/cx";
import { useGraph } from "@/hooks/use-graph/use-graph";
import { useId } from "react";

export const BarsVerticalLoading = () => {
	const maskId = useId();
	const { viewbox } = useGraph();
	const CX = viewbox.x / 2;
	const CY = viewbox.y / 2;

	const BAR_GAP = 20;
	const BAR_WIDTH = viewbox.x * 0.08;
	return (
		<svg
			id="loading"
			role="status"
			aria-busy={true}
			viewBox={`0 0 ${viewbox.x} ${viewbox.y}`}
			className={cx("[grid-area:graph] h-full w-full")}
			preserveAspectRatio={"none"}
		>
			<path
				vectorEffect={"non-scaling-stroke"}
				d={`
					M${CX - BAR_WIDTH - BAR_GAP - BAR_WIDTH / 2} ${viewbox.y} L${CX - BAR_WIDTH - BAR_GAP - BAR_WIDTH / 2} ${(viewbox.y / 30) * 20} L${CX - BAR_WIDTH - BAR_GAP + BAR_WIDTH - BAR_WIDTH / 2} ${(viewbox.y / 30) * 20} L${CX - BAR_WIDTH - BAR_GAP + BAR_WIDTH - BAR_WIDTH / 2} ${viewbox.y}
					M ${CX - BAR_WIDTH / 2} ${viewbox.y} L${CX - BAR_WIDTH / 2} ${(viewbox.y / 30) * 10} L${CX + BAR_WIDTH - BAR_WIDTH / 2} ${(viewbox.y / 30) * 10} L${CX + BAR_WIDTH - BAR_WIDTH / 2} ${viewbox.y}
						M${BAR_GAP + CX + BAR_WIDTH - BAR_WIDTH / 2} ${viewbox.y} L${BAR_GAP + CX + BAR_WIDTH - BAR_WIDTH / 2} ${(viewbox.y / 30) * 16} L${BAR_GAP + CX + 2 * BAR_WIDTH - BAR_WIDTH / 2} ${(viewbox.y / 30) * 16} L${BAR_GAP + CX + 2 * BAR_WIDTH - BAR_WIDTH / 2} ${viewbox.y}`}
				className={"[filter:brightness(300%)] dark:[filter:brightness(100%)]"}
				mask={`url(#${maskId})`}
			>
				<animate attributeName="fill" values="#2d2d2d; #3c3c3c; #2d2d2d; #2d2d2d; " dur="2s" repeatCount="indefinite" />
			</path>
		</svg>
	);
};
