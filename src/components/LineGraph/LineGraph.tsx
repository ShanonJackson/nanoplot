import { ReactNode } from "react";
import styles from "./LineGraph.module.scss";
import { cx } from "@/utils/cx/cx";
import { XYDataset } from "@/hooks/use-graph";

type Props = {
	data?: XYDataset;
	children?: ReactNode;
};

export const LineGraph = ({ children }: Props) => {
	// const context: GraphContext = {
	// 	ref,
	// 	layout: { rows: "", columns: "" },
	// 	domain: { x: [], y: [] },
	// 	dataset: [],
	// };
	return (
		<div className={cx("relative", "w-full", "h-full", "flex", "flex-col", "text-[white]", styles.base)}>
			<div className={"flex-shrink-0 height-[80px] border-solid border-[red] border-[1px]"}>PLACEHOLDER LEGEND</div>
			<div className={"flex flex-grow-1 min-h-0 width-[auto]"}>
				<div>PLACEHOLDER LEGEND</div>
				<div>PLACEHOLDER YAXIS</div>
				<svg viewBox={"0 0 3000 3000"} height={"100%"} width={"100%"} preserveAspectRatio={"none"}>
					<path d={"M 0 1500 L 3000 1500"} stroke={"red"} vectorEffect={"non-scaling-stroke"} />
				</svg>
				<div>PLACEHOLDER YAXIS</div>
				<div>PLACEHOLDER LEGEND</div>
			</div>
			<div className={"flex-shrink-0 h-20 border-solid border-[red] border-[1px]"}>XAXIS</div>
			<div className={"flex-shrink-0 h-20 border-solid border-[red] border-[1px]"}>PLACEHOLDER LEGEND</div>
			{children}
		</div>
	);
};
/*
// graphs render top/bottom left/right


// legned above.
<Graph>
	<Legend layout="row"/> // renders 1row.
	<YAxis/> // adds/renders 1 column
	<LineGraph/>
	<XAxis/>
</Graph>


// legend right.
<Graph>
	<YAxis/>
	<LineGraph/>
	<Legend layout="column"/>
	<XAxis/>
 */

LineGraph.layout = "row";
