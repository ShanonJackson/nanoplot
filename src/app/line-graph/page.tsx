import { LineGraph } from "@/components/LineGraph/LineGraph";
import { overlay } from "@/components/Overlay/Overlay";

export default function Page() {
	return (
		<div style={{ display: "flex", justifyContent: "center", marginTop: "10rem" }}>
			<div style={{ width: 500, height: 550, resize: "both", overflow: "hidden", border: "1px dotted black" }}>
				<LineGraph>
					<overlay.div>hello world</overlay.div>
				</LineGraph>
			</div>
		</div>
	);
}

// Line.Monotone
// Line.StepAfter
// Line.StepBefore
// Line.Linear

/*
	const { styles } = useLayoutFrom(children)
	<LinesGraph>
		<LinesGraph.Legend position={"top"}/>
		<LinesGraph.Tooltip/>
		<Axis.Numerical/>
		<Axis.Categorical/>
		<Axis.Time />
	</LineGraph>


	<Graph>
		<Legend layout={"row"}/>
		<YAxis/>
		<LineGraph/>
		<XAxis/>
		<Legend layout={"row"}/>
	</Graph>
 */
