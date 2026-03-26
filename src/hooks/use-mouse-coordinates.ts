import { RefObject, useEffect, useMemo, useState } from "react";
import { scale } from "../utils/math/math";
import { TemporalDate, useGraph } from "./use-graph/use-graph";
import { GraphUtils } from "../utils/graph/graph";
import { useGraphRef } from "./use-graph/use-graph-ref";
import { isTemporal, toEpochMs, getTemporalKind, getTimeZone, fromEpochMs } from "../utils/domain/utils/temporal";

export function useMouseCoordinates(
	ref: RefObject<SVGSVGElement | null>,
	closest?: { x: boolean; y: boolean; lazy?: boolean },
): null | {
	coordinates: SVGPoint;
	px: { x: number; y: number; clientX: number; clientY: number };
	closest: {
		datapoint: { x: number | string | TemporalDate; y: number | string | TemporalDate };
		tick: { x: number | string | TemporalDate; y: number | string | TemporalDate };
	};
};

export function useMouseCoordinates(
	ref: RefObject<SVGSVGElement | null>,
	closest?: { x: false; y: true; lazy?: boolean },
): null | {
	coordinates: SVGPoint;
	px: { x: number; y: number; clientX: number; clientY: number };
	closest: {
		datapoint: { x: number | string | TemporalDate; y: number | string | TemporalDate };
		tick: { x: number | string | TemporalDate; y: number | string | TemporalDate };
	};
};
export function useMouseCoordinates(
	ref: RefObject<SVGSVGElement | null>,
	closest?: { x: true; y: false; lazy?: boolean },
): null | {
	coordinates: SVGPoint;
	px: { x: number; y: number; clientX: number; clientY: number };
	closest: {
		datapoint: { x: number | string | TemporalDate; y: number | string | TemporalDate };
		tick: { x: number | string | TemporalDate; y: number | string | TemporalDate };
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
	const [closestX, setClosestX] = useState<number | string | TemporalDate>();
	const [closestY, setClosestY] = useState<number | string | TemporalDate>();
	const [closestXTick, setClosestXTick] = useState<number | string | TemporalDate>();
	const [closestYTick, setClosestYTick] = useState<number | string | TemporalDate>();
	const { data, viewbox, domain } = useGraph();

	const isLazyCalculate = closest?.x || closest?.y ? (closest?.lazy ? inside : true) : false;

	useEffect(() => {
		const svg = ref.current;
		const graph = graphRef.current;
		if (!svg || !graph) return;
		const controller = new AbortController();

		const xTick0 = domain.x[0]?.tick;
		const xIsTemp = isTemporal(xTick0);
		const xTicks = domain.x.map(({ tick, coordinate }) => ({
			tick: typeof tick === "number" || typeof tick === "string" ? (tick as number) : toEpochMs(tick),
			coordinate,
		}));
		const xFromNum: (v: number) => number | TemporalDate = xIsTemp
			? (
					(kind, tz) => (v: number) =>
						fromEpochMs(v, kind, tz)
				)(getTemporalKind(xTick0!), getTimeZone(xTick0!))
			: (v) => v;

		const yTick0 = domain.y[0]?.tick;
		const yIsTemp = isTemporal(yTick0);
		const yTicks = domain.y.map(({ tick, coordinate }) => ({
			tick: typeof tick === "number" || typeof tick === "string" ? (tick as number) : toEpochMs(tick),
			coordinate,
		}));
		const yFromNum: (v: number) => number | TemporalDate = yIsTemp
			? (
					(kind, tz) => (v: number) =>
						fromEpochMs(v, kind, tz)
				)(getTemporalKind(yTick0!), getTimeZone(yTick0!))
			: (v) => v;

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
					const closest = proportion > 0.5 ? t1.tick : t0.tick;
					const interpolatedX = t0.tick + proportion * (t1.tick - t0.tick);
					/* resolve back to original Temporal type (or number) */
					return {
						tick: xFromNum(closest),
						datapoint: xFromNum(findClosestValue(interpolatedX, xValues)),
					};
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
					const closest = proportion > 0.5 ? t1.tick : t0.tick;
					const interpolatedY = t0.tick + proportion * (t1.tick - t0.tick);
					/* resolve back to original Temporal type (or number) */
					return {
						tick: yFromNum(closest),
						datapoint: yFromNum(findClosestValue(interpolatedY, yValues)),
					};
				})();

				setClientXY({ clientX: e.clientX, clientY: e.clientY });
				setXY({ x, y });
				setPoint(point);
				setClosestXTick(xClosest?.tick);
				setClosestYTick(yClosest?.tick);
				setClosestX(xClosest?.datapoint);
				setClosestY(yClosest?.datapoint);
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
			.flatMap(({ data: series }) => series.map(({ x }) => (isTemporal(x) ? toEpochMs(x) : (x as number))))
			.sort((a, b) => a - b);
	}, [closest?.x ? data : undefined, isLazyCalculate]);

	const yValues = useMemo(() => {
		if (!GraphUtils.isXYData(data) || !isLazyCalculate || !closest?.y) return [];
		return data
			.flatMap(({ data: series }) => series.map(({ y }) => (isTemporal(y) ? toEpochMs(y) : (y as number))))
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
		closest: { datapoint: { x: closestX, y: closestY }, tick: { x: closestXTick, y: closestYTick } },
	};
}
