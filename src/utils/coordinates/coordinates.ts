import { CartesianDataset, InternalGraphContext, TemporalDate } from "../../hooks/use-graph/use-graph";
import { isTemporal, toEpochMs } from "../domain/utils/temporal";

/** Convert a tick (number, string, or Temporal) to a numeric value. */
const tickNum = (tick: unknown): number => (isTemporal(tick) ? toEpochMs(tick) : +(tick as number));

/** Resolve the fastest possible value→number conversion for a given axis tick type. */
const resolveToNum = (tick: unknown): ((v: any) => number) => {
	if (!isTemporal(tick)) return (v) => v as number;
	if ("epochMilliseconds" in (tick as object)) return (v) => v.epochMilliseconds; /* Instant | ZonedDateTime */
	return (v) => {
		if (typeof v === "number") return v;
		return toEpochMs(v);
	}; /* PlainDateTime | PlainDate */
};

/* avoids doing work for same ref multiple times across multiple components, without effecting garbage collection */
const cacheFor = new WeakMap<
	Pick<InternalGraphContext, "viewbox" | "domain">,
	WeakMap<CartesianDataset[number]["data"], Array<{ x: number; y: number }>>
>();
export const CoordinatesUtils = {
	xyCoordinatesForDataset: (context: Pick<InternalGraphContext, "viewbox" | "domain">) => {
		const cache = cacheFor.get(context) ?? cacheFor.set(context, new WeakMap()).get(context)!;
		const { domain, viewbox } = context;
		/* Given a whole dataset get x/y coordinates for everything */
		const xLength = domain.x.length;
		const xTicks = domain.x.map((d) => tickNum(d.tick));
		const xCoordinates = domain.x.map((d) => d.coordinate);
		const xMin = xTicks[0];
		const xMax = xTicks[xLength - 1];
		const xIsJumpUniform = xTicks.every((tick, i, arr) => i === 0 || tick - arr[i - 1] === arr[1] - arr[0]);
		const xIsCoordinatesUniform = xCoordinates.every(
			(coord, i, arr) => i === 0 || Math.round(coord - arr[i - 1]) === Math.round(arr[1] - arr[0]),
		);
		const xIsLinearScale = xIsJumpUniform && xIsCoordinatesUniform;
		const xRrange = 1 / (xMax - xMin);
		const xCrange = xCoordinates[xLength - 1] - xCoordinates[0];
		const xIsTemporal = isTemporal(domain.x[0]?.tick);
		const xIsNumericalScale = typeof domain.x[0]?.tick === "number";
		const xIsCategoricalScale = typeof domain.x[0]?.tick === "string";

		const yLength = domain.y.length;
		const yTicks = domain.y.map((d) => tickNum(d.tick));
		const yCoordinates = domain.y.map((d) => d.coordinate);
		const yMin = yTicks[0];
		const yMax = yTicks[yLength - 1];
		const yIsJumpUniform = yTicks.every((tick, i, arr) => i === 0 || tick - arr[i - 1] === arr[1] - arr[0]);
		const yIsCoordinatesUniform = yCoordinates.every(
			(coord, i, arr) => i === 0 || Math.round(coord - arr[i - 1]) === Math.round(arr[1] - arr[0]),
		);
		const yIsLinearScale = yIsJumpUniform && yIsCoordinatesUniform;
		const yRrange = 1 / (yMax - yMin);
		const yCrange = yCoordinates[yLength - 1] - yCoordinates[0];
		const yIsNumericalScale = typeof domain.y[0]?.tick === "number";
		const yIsTemporal = isTemporal(domain.y[0]?.tick);
		const yIsCategoricalScale = typeof domain.y[0]?.tick === "string";

		const isXLinearOptimized = xIsLinearScale && (xIsTemporal || xIsNumericalScale);
		const isYLinearOptimized = yIsLinearScale && (yIsNumericalScale || yIsTemporal);
		if (isXLinearOptimized && isYLinearOptimized) {
			const xMinCoordinate = xCoordinates[0];
			const yMinCoordinate = yCoordinates[0];

			const xScale = xRrange * xCrange;
			const yScale = yRrange * yCrange;
			const xOffset = xMinCoordinate - xMin * xScale;
			const yOffset = yMinCoordinate - yMin * yScale;

			const xToNum = resolveToNum(domain.x[0]?.tick);
			const yToNum = resolveToNum(domain.y[0]?.tick);

			return (data: CartesianDataset[number]["data"]) => {
				if (cache.get(data)) return cache.get(data)!;
				const len = data.length;
				const output: Array<{ x: number; y: number }> = new Array(len);
				for (let i = 0; i < len; i++) {
					const xy = data[i];
					const vx = xIsTemporal ? xToNum(xy.x) : (xy.x as number);
					const vy = yIsTemporal ? yToNum(xy.y) : (xy.y as number);
					output[i] = {
						x: vx * xScale + xOffset,
						y: vy * yScale + yOffset,
					};
				}
				cache.set(data, output);
				return output;
			};
		}

		const xToNum = resolveToNum(domain.x[0]?.tick);
		const yToNum = resolveToNum(domain.y[0]?.tick);

		return (data: CartesianDataset[number]["data"]) => {
			return data.map((xy) => {
				let x1;
				if (xIsLinearScale && (xIsTemporal || xIsNumericalScale)) {
					const v = xIsTemporal ? xToNum(xy.x) : (xy.x as number);
					x1 = xCoordinates[0] + (v - xMin) * xRrange * xCrange;
				} else if (xIsCategoricalScale) {
					x1 = domain.x.find((d) => d.tick === xy.x)?.coordinate ?? 0;
				} else {
					const numValue = xIsTemporal ? xToNum(xy.x) : +(xy.x as number);
					if (numValue < xMin) return { x: 0, y: 0 };
					if (numValue > xMax) return { x: viewbox.x, y: 0 };
					let left = 0;
					let right = xLength - 1;
					while (left < right) {
						const mid = (left + right) >> 1;
						if (xTicks[mid] < numValue) left = mid + 1;
						else right = mid;
					}
					const lowIdx = Math.max(left - 1, 0);
					const highIdx = Math.min(left, xLength - 1);
					x1 =
						xTicks[lowIdx] === xTicks[highIdx]
							? xCoordinates[lowIdx]
							: xCoordinates[lowIdx] +
								((numValue - xTicks[lowIdx]) / (xTicks[highIdx] - xTicks[lowIdx])) *
									(xCoordinates[highIdx] - xCoordinates[lowIdx]);
				}

				let y1;

				if (yIsLinearScale && (yIsNumericalScale || yIsTemporal)) {
					const v = yIsTemporal ? yToNum(xy.y) : (xy.y as number);
					y1 = yCoordinates[0] + (v - yMin) * yRrange * yCrange;
				} else if (yIsCategoricalScale) {
					y1 = domain.y.find((d) => d.tick === xy.y)?.coordinate ?? 0;
				} else {
					const numValue = yIsTemporal ? yToNum(xy.y) : +(xy.y as number);
					if (numValue > yMax) return { x: 0, y: 0 };
					if (numValue < yMin) return { x: 0, y: viewbox.y };
					let left = 0;
					let right = yLength - 1;
					while (left < right) {
						const mid = (left + right) >> 1;
						if (yTicks[mid] < numValue) left = mid + 1;
						else right = mid;
					}
					const lowIdx = Math.max(left - 1, 0);
					const highIdx = Math.min(left, yLength - 1);
					const highTick = yTicks[highIdx];
					const lowCoord = yCoordinates[lowIdx];
					const highCoord = yCoordinates[highIdx];
					y1 =
						yTicks[lowIdx] === highTick
							? lowCoord
							: lowCoord + ((numValue - yTicks[lowIdx]) / (highTick - yTicks[lowIdx])) * (highCoord - lowCoord);
				}
				return { x: x1, y: y1 };
			});
		};
	},
	xCoordinateFor: ({
		domain,
		viewbox,
	}: {
		viewbox: InternalGraphContext["viewbox"];
		domain: { x: InternalGraphContext["domain"]["x"] };
	}) => {
		const length = domain.x.length;
		const xTicks = domain.x.map((d) => tickNum(d.tick));
		const coordinates = domain.x.map((d) => d.coordinate);
		const min = xTicks[0];
		const max = xTicks[length - 1];
		const isJumpUniform = xTicks.every((tick, i, arr) => i === 0 || tick - arr[i - 1] === arr[1] - arr[0]);
		const isCoordinatesUniform = coordinates.every(
			(coord, i, arr) => i === 0 || Math.round(coord - arr[i - 1]) === Math.round(arr[1] - arr[0]),
		);
		const isLinearScale = isJumpUniform && isCoordinatesUniform;
		const rrange = 1 / (max - min);
		const crange = coordinates[length - 1] - coordinates[0];
		const isTemp = isTemporal(domain.x[0]?.tick);
		const isNumericalScale = typeof domain.x[0]?.tick === "number";
		const isCategoricalScale = typeof domain.x[0]?.tick === "string";
		const toNum = resolveToNum(domain.x[0]?.tick);
		if (isLinearScale && (isTemp || isNumericalScale)) {
			return (value: number | string | TemporalDate) => {
				const v = isTemp ? toNum(value) : (value as number);
				return coordinates[0] + (v - min) * rrange * crange;
			};
		}
		if (isCategoricalScale) {
			return (value: number | string | TemporalDate) => {
				return domain.x.find((d) => d.tick === value)?.coordinate ?? 0;
			};
		}
		return (value: number | string | TemporalDate) => {
			const numValue = isTemp ? toNum(value) : +(value as number);
			if (numValue < min) return 0;
			if (numValue > max) return viewbox.x;
			let left = 0;
			let right = length - 1;
			while (left < right) {
				const mid = (left + right) >> 1;
				if (xTicks[mid] < numValue) left = mid + 1;
				else right = mid;
			}
			const lowIdx = Math.max(left - 1, 0);
			const highIdx = Math.min(left, length - 1);
			return xTicks[lowIdx] === xTicks[highIdx]
				? coordinates[lowIdx]
				: coordinates[lowIdx] +
						((numValue - xTicks[lowIdx]) / (xTicks[highIdx] - xTicks[lowIdx])) * (coordinates[highIdx] - coordinates[lowIdx]);
		};
	},
	yCoordinateFor: ({
		domain,
		viewbox,
	}: {
		viewbox: InternalGraphContext["viewbox"];
		domain: { y: InternalGraphContext["domain"]["y"] };
	}) => {
		const length = domain.y.length;
		const yTicks = domain.y.map((d) => tickNum(d.tick));
		const coordinates = domain.y.map((d) => d.coordinate);
		const min = yTicks[0];
		const max = yTicks[length - 1];
		const isJumpUniform = yTicks.every((tick, i, arr) => i === 0 || tick - arr[i - 1] === arr[1] - arr[0]);
		const isCoordinatesUniform = coordinates.every(
			(coord, i, arr) => i === 0 || Math.round(coord - arr[i - 1]) === Math.round(arr[1] - arr[0]),
		);
		const isLinearScale = isJumpUniform && isCoordinatesUniform;
		const rrange = 1 / (max - min);
		const crange = coordinates[length - 1] - coordinates[0];
		const isNumericalScale = typeof domain.y[0]?.tick === "number";
		const isTemp = isTemporal(domain.y[0]?.tick);
		const isCategoricalScale = typeof domain.y[0]?.tick === "string";
		const toNum = resolveToNum(domain.y[0]?.tick);
		if (isLinearScale && (isNumericalScale || isTemp)) {
			return (value: number | string | TemporalDate) => {
				const v = isTemp ? toNum(value) : (value as number);
				return coordinates[0] + (v - min) * rrange * crange;
			};
		}
		if (isCategoricalScale) {
			return (value: number | string | TemporalDate) => {
				return domain.y.find((d) => d.tick === value)?.coordinate ?? 0;
			};
		}
		return (value: number | string | TemporalDate) => {
			const numValue = isTemp ? toNum(value) : +(value as number);
			if (numValue > max) return 0;
			if (numValue < min) return viewbox.y;
			let left = 0;
			let right = length - 1;
			while (left < right) {
				const mid = (left + right) >> 1;
				if (yTicks[mid] < numValue) left = mid + 1;
				else right = mid;
			}
			const lowIdx = Math.max(left - 1, 0);
			const highIdx = Math.min(left, length - 1);
			const highTick = yTicks[highIdx];
			const lowCoord = coordinates[lowIdx];
			const highCoord = coordinates[highIdx];
			return yTicks[lowIdx] === highTick
				? lowCoord
				: lowCoord + ((numValue - yTicks[lowIdx]) / (highTick - yTicks[lowIdx])) * (highCoord - lowCoord);
		};
	},
};

export const xCoordinateFor = CoordinatesUtils.xCoordinateFor;
export const yCoordinateFor = CoordinatesUtils.yCoordinateFor;
