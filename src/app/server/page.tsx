import { GridLines } from "../../components/GridLines/GridLines";
import { XAxis } from "../../components/XAxis/XAxis";
import { Graph } from "../../components/Graph/Graph";
import { YAxis } from "../../components/YAxis/YAxis";
import { Bars } from "../../components/Bars/Bars";

export default function Page() {
	return (
		<body>
			<Graph
				data={[
					{
						name: "Active Users",
						fill: "rgb(26, 115, 232)",
						data: [
							{ x: "30 minutes ago", y: 3 },
							{ x: "29 minutes ago", y: 3 },
							{ x: "28 minutes ago", y: 5 },
							{ x: "27 minutes ago", y: 5 },
							{ x: "26 minutes ago", y: 7 },
							{ x: "25 minutes ago", y: 7 },
							{ x: "24 minutes ago", y: 6 },
							{ x: "23 minutes ago", y: 4 },
							{ x: "22 minutes ago", y: 3 },
							{ x: "21 minutes ago", y: 8 },
							{ x: "20 minutes ago", y: 4 },
							{ x: "19 minutes ago", y: 5 },
							{ x: "18 minutes ago", y: 5 },
							{ x: "17 minutes ago", y: 3 },
							{ x: "16 minutes ago", y: 2 },
							{ x: "15 minutes ago", y: 1 },
							{ x: "14 minutes ago", y: 5 },
							{ x: "13 minutes ago", y: 2 },
							{ x: "12 minutes ago", y: 5 },
							{ x: "11 minutes ago", y: 2 },
							{ x: "10 minutes ago", y: 8 },
							{ x: "9 minutes ago", y: 8 },
							{ x: "8 minutes ago", y: 8 },
							{ x: "7 minutes ago", y: 6 },
							{ x: "6 minutes ago", y: 4 },
							{ x: "5 minutes ago", y: 3 },
							{ x: "4 minutes ago", y: 6 },
							{ x: "3 minutes ago", y: 6 },
							{ x: "2 minutes ago", y: 4 },
							{ x: "1 minute ago", y: 0 },
						],
					},
				]}
			>
				<Bars size={82} className="[&>path]:transition-all [&>path]:duration-200 [&>path]:ease-in-out" />
			</Graph>
		</body>
	);
}
