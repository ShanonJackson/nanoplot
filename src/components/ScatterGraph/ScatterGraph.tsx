import { GraphContext } from "@/hooks/use-graph";
import { GraphUtils } from "@/utils/graph/graph";
import { ColorUtils } from "@/utils/color/color";
import { CoordinatesUtils } from "@/utils/coordinates/coordinates";
import { PathUtils } from "@/utils/path/path";

type Props = {
	context?: GraphContext;
	trendline?: boolean;
	border?: boolean;
	horizontal?: boolean;
	vertical?: boolean;
	strokeWidth?: number;
};

export const ScatterGraph = ({ trendline, border, horizontal, vertical, strokeWidth = 100, context }: Props) => {
	if (!context) return null;
	const { x, y } = context.viewbox;
	const { domain } = context;
	console.log("domain", domain);

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
		<svg viewBox={`0 0 ${x} ${y}`} className={"h-full w-full"} preserveAspectRatio={"none"}>
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
			{border && (
				<path
					d={`M 0 0 L ${x} 0 M 0 0 L 0 ${y} M ${x} 0 L ${x} ${y} M ${x} ${y} L ${0} ${y}`}
					strokeWidth={2}
					vectorEffect={"non-scaling-stroke"}
					className="stroke-foreground"
				/>
			)}
			{horizontal && (
				<path
					d={domain.y.map(({ coordinate }) => `M 0 ${coordinate} L ${x} ${coordinate}`).join(" ")}
					strokeWidth={(2 * strokeWidth) / 100}
					vectorEffect={"non-scaling-stroke"}
					strokeDasharray="4, 7"
					className="stroke-foreground"
				/>
			)}
			{vertical && (
				<path
					d={domain.x.map(({ coordinate }) => `M ${coordinate} 0 L ${coordinate} ${y}`).join(" ")}
					strokeWidth={(2 * strokeWidth) / 100}
					vectorEffect={"non-scaling-stroke"}
					strokeDasharray="4, 10"
					className="stroke-foreground"
				/>
			)}
		</svg>
	);
};
