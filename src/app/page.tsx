"use client";
import { Tooltip } from "@/components/Tooltip/Tooltip";

export default function Home() {
	return (
		<div style={{ margin: "20rem" }}>
			<Tooltip
				trigger={(ref) => (
					<button ref={ref} style={{ border: "1px solid red" }}>
						Hover me
					</button>
				)}
				delay={0.4}
				border={"rgb(45, 45, 45)"}
				interactable={true}
				active={true}
				tetherPosition={{ side: "bottom", alignment: "center" }}
				targetPosition={{ side: "top", alignment: "center" }}
			>
				HELLO WORLD
			</Tooltip>
		</div>
	);
}
