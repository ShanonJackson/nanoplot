import { LineGraph } from "@/components/LineGraph/LineGraph";
import React from "react";
import { Legend } from "@/components/Legend/Legend";
import { Graph } from "@/components/Graph/Graph";
import { XAxis } from "@/components/Axis/XAxis/XAxis";
import { YAxis } from "@/components/Axis/YAxis/YAxis";

export default function Page() {
	return (
		<div style={{ display: "flex", justifyContent: "center", marginTop: "10rem" }}>
			<div style={{ width: 500, height: 550, resize: "both", overflow: "hidden", border: "1px dotted white", color: "white" }}>
				<Graph>
					<Legend position={"top"} />
					<YAxis />
					<LineGraph />
					<XAxis />
				</Graph>
			</div>
		</div>
	);
}
