import { GridLines } from "../../components/GridLines/GridLines";
import { Lines } from "../../components/Lines/Lines";
import { XAxis } from "../../components/XAxis/XAxis";
import { Graph } from "../../components/Graph/Graph";

export default function Page() {
	return (
		<div>
			<Graph data={[]}>
				<GridLines />
				<Lines curve={"natural"} />
				<Lines.Tooltip />
				<XAxis
					ticks={{ jumps: "every 1 months" }}
					display={(x) => {
						const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
						if (typeof x === "number" || typeof x === "string") return null;
						return months[x.getMonth()];
					}}
				/>
			</Graph>
		</div>
	);
}
