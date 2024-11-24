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