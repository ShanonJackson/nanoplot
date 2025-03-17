import { RefObject, useEffect, useState, useTransition } from "react";
import { MathUtils } from "../utils/math/math";

export const useMouseCoordinates = (
	ref: RefObject<SVGSVGElement | null>,
): null | { coordinates: SVGPoint; px: { x: number; y: number } } => {
	const [point, setPoint] = useState<SVGPoint>();
	const [xy, setXY] = useState<{ x: number; y: number }>();
	useEffect(() => {
		const svg = ref.current;
		if (!svg) return;
		const controller = new AbortController();
		svg.addEventListener(
			"mousemove",
			(e: MouseEvent) => {
				if (!e.currentTarget || !(e.currentTarget instanceof Element)) return null;
				const rect = svg.getBoundingClientRect();
				const point = svg.createSVGPoint();
				/* Immutably not possible on SVGPoint, Ignore the Typescript types they're wrong. */
				point.x = MathUtils.scale(e.clientX - rect.left, rect.width, svg.viewBox.baseVal.width);
				point.y = MathUtils.scale(e.clientY - rect.top, rect.height, svg.viewBox.baseVal.height);
				const x = e.clientX - e.currentTarget?.getBoundingClientRect().left;
				const y = e.clientY - e.currentTarget?.getBoundingClientRect().top;

				// check if it's inside the svg, if it isn't setXY to undefined
				if (point.x < 0 || point.y < 0 || point.x > svg.viewBox.baseVal.width || point.y > svg.viewBox.baseVal.height) {
					setPoint(undefined);
					return setXY(undefined);
				}
				setXY({ x, y });
				setPoint(point);
			},
			{ signal: controller.signal },
		);
		svg.addEventListener("mouseleave", () => setPoint(undefined), { signal: controller.signal });
		return () => controller.abort();
	}, [ref.current]);

	if (!point || !xy) return null;
	return {
		coordinates: point,
		px: xy,
	};
};
