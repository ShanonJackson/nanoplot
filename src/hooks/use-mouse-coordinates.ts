import { RefObject, useEffect, useMemo, useState } from "react";
import { scale } from "../utils/math/math";
import { TemporalDate, useGraph } from "./use-graph/use-graph";
import { GraphUtils } from "../utils/graph/graph";
import { useGraphRef } from "./use-graph/use-graph-ref";
import { isTemporal, toEpochMs } from "../utils/domain/utils/temporal";

type Tagged = { num: number; original: number | string | TemporalDate };

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

		const xTicks = domain.x.map(({ tick, coordinate }) => ({
			num: typeof tick === "number" || typeof tick === "string" ? (tick as number) : toEpochMs(tick),
			coordinate,
		}));

		const yTicks = domain.y.map(({ tick, coordinate }) => ({
			num: typeof tick === "number" || typeof tick === "string" ? (tick as number) : toEpochMs(tick),
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
					const t1 = xTicks[i + 1] ?? t0;
					const proportion = t0.coordinate === t1.coordinate ? 0 : (svgX - t0.coordinate) / (t1.coordinate - t0.coordinate);
					const interpolated = t0.num + proportion * (t1.num - t0.num);
					const tk = domain.x[proportion > 0.5 && i + 1 < xTicks.length ? i + 1 : i].tick;
					if (!tk) return;
					return {
						tick: domain.x[proportion > 0.5 && i + 1 < xTicks.length ? i + 1 : i].tick,
						datapoint: findClosest(interpolated, xValues),
					};
				})();

				const yClosest = (() => {
					if (!ref.current || !domain?.y?.length || yValues.length === 0 || !isLazyCalculate) return;
					const mouseY = e.clientY - rect.top;
					const svgY = (mouseY / rect.height) * viewbox.y;
					let i = 0;
					while (i < yTicks.length - 1 && svgY < yTicks[i + 1].coordinate) i++;
					const t0 = yTicks[i];
					const t1 = yTicks[i + 1] ?? t0;
					const proportion = t0.coordinate === t1.coordinate ? 0 : (svgY - t0.coordinate) / (t1.coordinate - t0.coordinate);
					const interpolated = t0.num + proportion * (t1.num - t0.num);
					const tk = domain.y[proportion > 0.5 && i + 1 < yTicks.length ? i + 1 : i].tick;
					if (!tk) return;
					return {
						tick: domain.y[proportion > 0.5 && i + 1 < yTicks.length ? i + 1 : i].tick,
						datapoint: findClosest(interpolated, yValues),
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
		if (!GraphUtils.isXYData(data) || !isLazyCalculate || !closest?.x) return [] as Tagged[];
		return data
			.flatMap(({ data: series }) => series.map(({ x }) => ({ num: isTemporal(x) ? toEpochMs(x) : (x as number), original: x })))
			.sort((a, b) => a.num - b.num);
	}, [closest?.x ? data : undefined, isLazyCalculate]);

	const yValues = useMemo(() => {
		if (!GraphUtils.isXYData(data) || !isLazyCalculate || !closest?.y) return [] as Tagged[];
		return data
			.flatMap(({ data: series }) => series.map(({ y }) => ({ num: isTemporal(y) ? toEpochMs(y) : (y as number), original: y })))
			.sort((a, b) => a.num - b.num);
	}, [closest?.y ? data : undefined, isLazyCalculate]);

	if (!point || !xy) return null;
	return {
		coordinates: point,
		px: { ...xy, ...clientXY },
		closest: { datapoint: { x: closestX, y: closestY }, tick: { x: closestXTick, y: closestYTick } },
	};
}

function findClosest(target: number, values: Tagged[]): Tagged["original"] {
	let low = 0;
	let high = values.length - 1;
	while (low <= high) {
		const mid = Math.floor((low + high) / 2);
		if (values[mid].num === target) return values[mid].original;
		if (values[mid].num < target) low = mid + 1;
		else high = mid - 1;
	}
	if (low === 0) return values[0].original;
	if (low >= values.length) return values[values.length - 1].original;
	const before = values[low - 1];
	const after = values[low];
	return Math.abs(before.num - target) < Math.abs(after.num - target) ? before.original : after.original;
}
