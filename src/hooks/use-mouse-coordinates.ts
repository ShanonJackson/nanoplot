import { RefObject, useEffect, useMemo, useState } from "react";
import { scale } from "../utils/math/math";
import { useGraph } from "./use-graph/use-graph";
import { GraphUtils } from "../utils/graph/graph";
import { useGraphRef } from "./use-graph/use-graph-ref";

export function useMouseCoordinates(
	ref: RefObject<SVGSVGElement | null>,
	closest?: { x: boolean; y: boolean; lazy?: boolean },
): null | {
	coordinates: SVGPoint;
	px: { x: number; y: number; clientX: number; clientY: number };
	closest: {
		datapoint: { x: Date | string | number; y: Date | string | number };
		tick: { x: string | number | Date; y: string | number | Date };
	};
};

export function useMouseCoordinates(
	ref: RefObject<SVGSVGElement | null>,
	closest?: { x: false; y: true; lazy?: boolean },
): null | {
	coordinates: SVGPoint;
	px: { x: number; y: number; clientX: number; clientY: number };
	closest: {
		datapoint: { x: Date | string | number; y: Date | string | number };
		tick: { x: string | number | Date; y: string | number | Date };
	};
};
export function useMouseCoordinates(
	ref: RefObject<SVGSVGElement | null>,
	closest?: { x: true; y: false; lazy?: boolean },
): null | {
	coordinates: SVGPoint;
	px: { x: number; y: number; clientX: number; clientY: number };
	closest: {
		datapoint: { x: Date | string | number; y: Date | string | number };
		tick: { x: string | number | Date; y: string | number | Date };
	};
};
export function useMouseCoordinates(
	ref: RefObject<SVGSVGElement | null>,
	closest?: { x: boolean; y: boolean; lazy?: boolean },
): null | { coordinates: SVGPoint; px: { x: number; y: number }; closest: unknown } {
	const graphRef = useGraphRef();
	const [inside, setInside] = useState(false);
	const [point, setPoint] = useState<SVGPoint>();
	const [xy, setXY] = useState<{ x: number; y: number }>();
	const [clientXY, setClientXY] = useState<{ clientX: number; clientY: number }>();
	const [closestX, setClosestX] = useState<number | string | Date>();
	const [closestY, setClosestY] = useState<number | string | Date>();
	const [closestXTick, setClosestXTick] = useState<string | number | Date>(0);
	const [closestYTick, setClosestYTick] = useState<string | number | Date>(0);
	const { data, viewbox, domain } = useGraph();

	const isLazyCalculate = closest?.x || closest?.y ? (closest?.lazy ? inside : true) : false;

	useEffect(() => {
		const svg = ref.current;
		const graph = graphRef.current;
		if (!svg || !graph) return;
		const controller = new AbortController();

		const xTicks = domain.x.map(({ tick, coordinate }) => ({
			tick: tick instanceof Date ? tick.getTime() : (tick as number),
			coordinate,
		}));
		const yTicks = domain.y.map(({ tick, coordinate }) => ({
			tick: tick instanceof Date ? tick.getTime() : (tick as number),
			coordinate: coordinate,
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
					if (!ref.current || !domain?.x?.length || xValues.length === 0 || !isLazyCalculate) return;
					const mouseX = e.clientX - rect.left;
					const svgX = (mouseX / rect.width) * viewbox.x;
					let i = 0;
					while (i < xTicks.length - 1 && svgX > xTicks[i + 1].coordinate) i++;
					const t0 = xTicks[i];
					const t1 = xTicks[i + 1] ?? t0; // clamp to end
					const proportion = t0.coordinate === t1.coordinate ? 0 : (svgX - t0.coordinate) / (t1.coordinate - t0.coordinate);
					setClosestXTick(proportion > 0.5 ? t1.tick : t0.tick);
					const interpolatedX = t0.tick + proportion * (t1.tick - t0.tick);
					const isDateTimeAxis = domain.x[0]?.tick instanceof Date;
					return isDateTimeAxis ? new Date(findClosestValue(interpolatedX, xValues)) : interpolatedX;
				})();

				const yClosest = (() => {
					if (!ref.current || !domain?.y?.length || yValues.length === 0 || !isLazyCalculate) return;
					const mouseY = e.clientY - rect.top;
					const svgY = (mouseY / rect.height) * viewbox.y;
					let i = 0;
					while (i < yTicks.length - 1 && svgY < yTicks[i + 1].coordinate) i++;
					const t0 = yTicks[i];
					const t1 = yTicks[i + 1] ?? t0; // clamp to end
					const proportion = t0.coordinate === t1.coordinate ? 0 : (svgY - t0.coordinate) / (t1.coordinate - t0.coordinate);
					const closestTick = proportion > 0.5 ? t1.tick : t0.tick;
					setClosestYTick(closestTick);
					const interpolatedY = t0.tick + proportion * (t1.tick - t0.tick);
					const isDateTimeAxis = domain.y[0]?.tick instanceof Date;
					return isDateTimeAxis ? new Date(findClosestValue(interpolatedY, yValues)) : interpolatedY;
				})();

				setClientXY({ clientX: e.clientX, clientY: e.clientY });
				setXY({ x, y });
				setPoint(point);
				setClosestX(xClosest);
				setClosestY(yClosest);
			},
			{ signal: controller.signal },
		);
		graph.addEventListener("mouseenter", () => setInside(true), { signal: controller.signal });
		graph.addEventListener("mouseleave", () => setPoint(undefined), { signal: controller.signal });
		return () => controller.abort();
	}, [graphRef.current, ref.current, closest?.x ? domain.x : undefined, isLazyCalculate]);

	const xValues = useMemo(() => {
		if (!GraphUtils.isXYData(data) || !isLazyCalculate || !closest?.x) return [];
		return data
			.flatMap(({ data: series }) => series.map(({ x }) => (x instanceof Date ? x.getTime() : (x as number))))
			.sort((a, b) => a - b);
	}, [closest?.x ? data : undefined, isLazyCalculate]);

	const yValues = useMemo(() => {
		if (!GraphUtils.isXYData(data) || !isLazyCalculate || !closest?.y) return [];
		return data
			.flatMap(({ data: series }) => series.map(({ y }) => (y instanceof Date ? y.getTime() : (y as number))))
			.sort((a, b) => a - b);
	}, [closest?.y ? data : undefined, isLazyCalculate]);

	const findClosestValue = (target: number, values: number[]) => {
		/* binary - search */
		let low = 0;
		let high = values.length - 1;
		while (low <= high) {
			const mid = Math.floor((low + high) / 2);
			const val = values[mid];
			if (val === target) return val;
			if (val < target) low = mid + 1;
			else high = mid - 1;
		}
		if (low === 0) return values[0];
		if (low >= values.length) return values[values.length - 1];
		const before = values[low - 1];
		const after = values[low];
		return Math.abs(before - target) < Math.abs(after - target) ? before : after;
	};

	if (!point || !xy) return null;
	return {
		coordinates: point,
		px: { ...xy, ...clientXY },
		closest: { datapoint: { x: closestX, y: closestY }, tick: { x: new Date(closestXTick), y: new Date(closestYTick) } },
	};
}
