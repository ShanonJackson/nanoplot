import { RefObject, useEffect, useState } from "react";
import { MathUtils } from "@/utils/math/math";

export const useMouseCoordinates = (ref: RefObject<SVGSVGElement>) => {
	const [point, setPoint] = useState<SVGPoint>();
	useEffect(() => {
		const svg = ref.current;
		if (!svg) return;
		const onMouseMove = (e: MouseEvent) => {
			const rect = svg.getBoundingClientRect();
			const point = svg.createSVGPoint();
			point.x = MathUtils.scale(e.clientX - rect.left, rect.width, svg.viewBox.baseVal.width);
			point.y = MathUtils.scale(e.clientY - rect.top, rect.height, svg.viewBox.baseVal.height);
			setPoint(point);
		};
		svg.addEventListener("mousemove", onMouseMove);
		return () => svg.removeEventListener("mousemove", onMouseMove);
	}, [ref.current]);
	return point;
};
