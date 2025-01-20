import { cx } from "@/utils/cx/cx";
import { useGraph } from "@/hooks/use-graph/use-graph";
import { CoordinatesUtils } from "@/utils/coordinates/coordinates";
import { GraphUtils } from "@/utils/graph/graph";
import { ColorUtils } from "@/export";
import { PathUtils } from "@/utils/path/path";
import { useId } from "react";

type ComponentProps = {
	size?: number;
};

export const BarLoading = ({ size = 0 }: ComponentProps) => {
	const maskId = useId();
	const { viewbox } = useGraph();
	const CX = viewbox.x / 2;
	const CY = viewbox.y / 2;

	const BAR_GAP = 100;
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
					M${CX - BAR_WIDTH - BAR_GAP - BAR_WIDTH / 2} ${viewbox.y} L${CX - BAR_WIDTH - BAR_GAP - BAR_WIDTH / 2} 2000 L${CX - BAR_WIDTH - BAR_GAP + BAR_WIDTH + size - BAR_WIDTH / 2} 2000 L${CX - BAR_WIDTH - BAR_GAP + BAR_WIDTH + size - BAR_WIDTH / 2} 3000
					M ${CX + size - BAR_WIDTH / 2} ${viewbox.y} L${CX + size - BAR_WIDTH / 2} 1000 L${CX + BAR_WIDTH + 2 * size - BAR_WIDTH / 2} 1000 L${CX + BAR_WIDTH + 2 * size - BAR_WIDTH / 2} ${viewbox.y}
						M${BAR_GAP + CX + BAR_WIDTH + 2 * size - BAR_WIDTH / 2} ${viewbox.y} L${BAR_GAP + CX + BAR_WIDTH + 2 * size - BAR_WIDTH / 2} 1600 L${BAR_GAP + CX + 2 * BAR_WIDTH + 3 * size - BAR_WIDTH / 2} 1600 L${BAR_GAP + CX + 2 * BAR_WIDTH + 3 * size - BAR_WIDTH / 2} 3000`}
				className={"[filter:brightness(300%)] dark:[filter:brightness(100%)]"}
				mask={`url(#${maskId})`}
			>
				<animate attributeName="fill" values="#2d2d2d; #3c3c3c; #2d2d2d; #2d2d2d; " dur="2s" repeatCount="indefinite" />
			</path>
		</svg>
	);
};
