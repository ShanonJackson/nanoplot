import { GraphContext } from "@/hooks/use-graph";
import { GraphUtils } from "@/utils/graph/graph";
import { ColorUtils } from "@/utils/color/color";
import { CoordinatesUtils } from "@/utils/coordinates/coordinates";
import { PathUtils } from "@/utils/path/path";

type Props = {
	context?: GraphContext;
	trendline?: boolean;
};

export const ScatterGraph = ({ trendline, context }: Props) => {
	if (!context) return null;
	const { x, y } = context.viewbox;

	if (!GraphUtils.isXYData(context.data)) return null;

	const xForValue = CoordinatesUtils.xCoordinateFor(context);
	const yForValue = CoordinatesUtils.yCoordinateFor(context);

	const dataset = context.data.map((d, i, set) => {
		return {
			id: d.name ?? d.id,
			...d,
			data: d.data.map(({ x, y }) => ({
				x: xForValue(x),
				y: yForValue(y),
			})),
			stroke: d.stroke ?? ColorUtils.colorFor(i, set.length),
		};
	});

	return (
		<svg viewBox={`0 0 ${x} ${y}`} className={"[grid-area:graph] h-full w-full"} preserveAspectRatio={"none"}>
			{dataset.map((d, i) => {
				return (
					<path
						key={i}
						d={d.data.map(({ x, y }) => `M ${x} ${y} A 0 0 0 0 1 ${x} ${y}`).join(" ")}
						strokeWidth={10}
						stroke={d.stroke}
						strokeLinecap={"round"}
						strokeLinejoin={"round"}
						vectorEffect={"non-scaling-stroke"}
					/>
				);
			})}
			{trendline && (
				<path
					vectorEffect={"non-scaling-stroke"}
					strokeWidth={3}
					strokeDasharray={"4,4"}
					className={"stroke-black dark:stroke-white"}
					d={PathUtils.trend(
						dataset.flatMap(({ data }) => data),
						context.viewbox,
					)}
				/>
			)}
		</svg>
	);
};
