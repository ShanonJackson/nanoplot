import { GridLines } from "../../components/GridLines/GridLines";
import { XAxis } from "../../components/XAxis/XAxis";
import { Graph } from "../../components/Graph/Graph";
import { YAxis } from "../../components/YAxis/YAxis";
import { Bars } from "../../components/Bars/Bars";

export default function Page() {
	return (
		<div>
			<Graph
				data={[
					{
						name: "Male",
						data: [
							{ y: "Jan", x: 5_000 },
							{ y: "Feb", x: 20_000 },
							{ y: "Mar", x: 45_000 },
							{ y: "Apr", x: 20_000 },
						],
					},
					{
						name: "Female",
						data: [
							{ y: "Jan", x: 45_000 },
							{ y: "Feb", x: 10_000 },
							{ y: "Mar", x: 15_000 },
							{ y: "Apr", x: 30_000 },
						],
					},
				]}
				gap={{ top: 20, left: 15, right: 36, bottom: 15 }}
			>
				<YAxis />
				<GridLines border horizontal />
				<Bars horizontal labels={{ position: "center", display: (v) => v.toString() }} />
				<XAxis />
			</Graph>
		</div>
	);
}
