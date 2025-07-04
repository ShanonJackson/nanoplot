import { RefObject, useEffect, useMemo, useState, useTransition } from "react";
import { MathUtils, scale } from "../utils/math/math";
import { useGraph } from "./use-graph/use-graph";
import { GraphUtils } from "../utils/graph/graph";
import { useGraphRef } from "./use-graph/use-graph-ref";

export function useMouseCoordinates(
	ref: RefObject<SVGSVGElement | null>,
	closest?: { x: true; lazy?: boolean },
): null | { coordinates: SVGPoint; px: { x: number; y: number, clientX: number, clientY: number }; closest: { x: Date | string | number } };
export function useMouseCoordinates(
	ref: RefObject<SVGSVGElement | null>,
	closest?: { x: boolean; lazy?: boolean },
): null | { coordinates: SVGPoint; px: { x: number; y: number }; closest: unknown } {
	
	const graphRef = useGraphRef();
	const [inside, setInside] = useState(false);
	const [point, setPoint] = useState<SVGPoint>();
	const [xy, setXY] = useState<{ x: number; y: number }>();
	const [clientXY, setClientXY] = useState<{ clientX: number; clientY: number }>();
	const [closestX, setClosestX] = useState<number | Date>();
	const { data, viewbox, domain } = useGraph();

	const isCalculatingClosestX = closest?.x ? (closest?.lazy ? inside : true) : false;

	useEffect(() => {
		const svg = ref.current;
		const graph = graphRef.current;
		if (!svg || !graph) return;
		const controller = new AbortController();

		const ticks = domain.x.map(({ tick, coordinate }) => ({
			tick: tick instanceof Date ? tick.getTime() : (tick as number),
			coordinate,
		}));
		
		graph.addEventListener(
			"mousemove",
			(e: MouseEvent) => {
				const rect = svg.getBoundingClientRect();
				const point = svg.createSVGPoint();
				/* Immutably not possible on SVGPoint, Ignore the Typescript types they're wrong. */
				point.x = scale(e.clientX - rect.left, rect.width, svg.viewBox.baseVal.width);
				point.y = scale(e.clientY - rect.top, rect.height, svg.viewBox.baseVal.height);
				const x = e.clientX - rect.left;
				const y = e.clientY - rect.top;

				// check if it's inside the svg, if it isn't setXY to undefined
				if (point.x < 0 || point.y < 0 || point.x > svg.viewBox.baseVal.width || point.y > svg.viewBox.baseVal.height) {
					setClientXY(undefined);
					setPoint(undefined);
					setClosestX(undefined);
					return setXY(undefined);
				}

				const xClosest = (() => {
					if (!ref.current || !domain?.x?.length || xValues.length === 0 || !isCalculatingClosestX) return;
					const mouseX = e.clientX - rect.left;
					const svgX = (mouseX / rect.width) * viewbox.x;
					let i = 0;
					while (i < ticks.length - 1 && svgX > ticks[i + 1].coordinate) i++;
					const t0 = ticks[i];
					const t1 = ticks[i + 1] ?? t0; // clamp to end
					const proportion = t0.coordinate === t1.coordinate ? 0 : (svgX - t0.coordinate) / (t1.coordinate - t0.coordinate);
					const interpolatedX = t0.tick + proportion * (t1.tick - t0.tick);
					const isDateTimeAxis = domain.x[0]?.tick instanceof Date;
					return isDateTimeAxis ? new Date(findClosestValue(interpolatedX)) : interpolatedX;
				})();
				setClientXY({ clientX: e.clientX, clientY: e.clientY });
				setXY({ x, y });
				setPoint(point);
				setClosestX(xClosest);
			},
			{ signal: controller.signal },
		);
		graph.addEventListener("mouseenter", () => setInside(true), { signal: controller.signal });
		graph.addEventListener("mouseleave", () => setPoint(undefined), { signal: controller.signal });
		return () => controller.abort();
	}, [graphRef.current, ref.current, closest?.x ? domain.x : undefined, isCalculatingClosestX]);

	const xValues = useMemo(() => {
		if (!GraphUtils.isXYData(data) || !isCalculatingClosestX) return [];
		return data
			.flatMap(({ data: series }) => series.map(({ x }) => (x instanceof Date ? x.getTime() : (x as number))))
			.sort((a, b) => a - b);
	}, [closest?.x ? data : undefined, isCalculatingClosestX]);

	const findClosestValue = (target: number) => {
		/* binary - search */
		let low = 0;
		let high = xValues.length - 1;
		while (low <= high) {
			const mid = Math.floor((low + high) / 2);
			const val = xValues[mid];
			if (val === target) return val;
			if (val < target) low = mid + 1;
			else high = mid - 1;
		}
		if (low === 0) return xValues[0];
		if (low >= xValues.length) return xValues[xValues.length - 1];
		const before = xValues[low - 1];
		const after = xValues[low];
		return Math.abs(before - target) < Math.abs(after - target) ? before : after;
	};

	if (!point || !xy) return null;
	return {
		coordinates: point,
		px: {...xy, ...clientXY},
		closest: { x: closestX },
	};
}
