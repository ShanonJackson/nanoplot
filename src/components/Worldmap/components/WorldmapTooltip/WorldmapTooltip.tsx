"use client";
import { useWorldmap } from "@/components/Worldmap/WorldmapContext";
import { useMouseCoordinates } from "@/hooks/use-mouse-coordinates";
import { MathUtils } from "@/utils/math/math";
import { overlay } from "@/components/Overlay/Overlay";
import { ReactNode } from "react";
import { Tooltip } from "@/components/Tooltip/Tooltip";

interface Props {
	tooltip?: (country: string) => ReactNode;
}

export const WorldmapTooltip = ({ tooltip }: Props) => {
	const { ref, scale, countries } = useWorldmap();
	const point = useMouseCoordinates(ref);
	const country = countries.find((country) => country.isPointInFill(point));
	return (
		<Tooltip
			trigger={(ref) => (
				<overlay.div
					ref={ref}
					style={{
						left: MathUtils.scale(point?.x ?? 0, [0, scale.x ?? 0], [0, 100]) + "%",
						top: MathUtils.scale(point?.y ?? 0, [0, scale.y ?? 0], [0, 100]) + "%",
					}}
				/>
			)}
			delay={0.4}
			border={"rgb(45, 45, 45)"}
			interactable={true}
			active={true}
			tetherPosition={{ side: "bottom", alignment: "center" }}
			targetPosition={{ side: "top", alignment: "center" }}
		>
			{tooltip ? tooltip(country?.getAttribute("data-iso") ?? "US") : country?.getAttribute("data-iso")}
		</Tooltip>
	);
};
