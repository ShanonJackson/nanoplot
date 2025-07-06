import { CartesianDataset, InternalGraphContext } from "../../hooks/use-graph/use-graph";

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
		const xTicks = domain.x.map((d) => +d.tick);
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
		const xIsDateTime = domain.x[0]?.tick instanceof Date;
		const xIsNumericalScale = typeof domain.x[0]?.tick === "number";
		const xIsCategoricalScale = typeof domain.x[0]?.tick === "string";

		const yLength = domain.y.length;
		const yTicks = domain.y.map((d) => +d.tick);
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
		const yIsDateTimeScale = domain.y[0]?.tick instanceof Date;
		const yIsCategoricalScale = typeof domain.y[0]?.tick === "string";

		const isXLinearOptimized = xIsLinearScale && (xIsDateTime || xIsNumericalScale);
		const isYLinearOptimized = yIsLinearScale && (yIsNumericalScale || yIsDateTimeScale);
		if (isXLinearOptimized && isYLinearOptimized) {
			const xMinCoordinate = xCoordinates[0];
			const yMinCoordinate = yCoordinates[0];

			const xScale = xRrange * xCrange;
			const yScale = yRrange * yCrange;
			const xOffset = xMinCoordinate - xMin * xScale;
			const yOffset = yMinCoordinate - yMin * yScale;

			return (data: CartesianDataset[number]["data"]) => {
				if (cache.get(data)) return cache.get(data)!;
				const len = data.length;
				let output: Array<{ x: number; y: number }> = new Array(len);
				for (let i = 0; i < len; i++) {
					const xy = data[i];
					const vx = (
						xy.x instanceof Date ? xy.x.getTime() : xy.x
					) as number; /* .getTime() on date's required; Performance improvement */
					const vy = (
						xy.y instanceof Date ? xy.y.getTime() : xy.y
					) as number; /* .getTime() on date's required; Performance improvement */

					output[i] = {
						x: vx * xScale + xOffset,
						y: vy * yScale + yOffset,
					};
				}
				cache.set(data, output);
				return output;
			};
		}

		return (data: CartesianDataset[number]["data"]) => {
			return data.map((xy) => {
				let x1;
				if (xIsLinearScale && (xIsDateTime || xIsNumericalScale)) {
					const v = (
						xy.x instanceof Date ? xy.x.getTime() : xy.x
					) as number; /* .getTime() on date's required; Performance improvement */
					x1 = xCoordinates[0] + (v - xMin) * xRrange * xCrange;
				} else if (xIsCategoricalScale) {
					x1 = domain.x.find((d) => d.tick === xy.x)?.coordinate ?? 0;
				} else {
					const numValue = +xy.x;
					if (numValue <= xMin) return { x: 0, y: 0 };
					if (numValue >= xMax) return { x: viewbox.x, y: 0 };
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

				if (yIsLinearScale && (yIsNumericalScale || yIsDateTimeScale)) {
					const v = (
						xy.y instanceof Date ? xy.y.getTime() : xy.y
					) as number; /* .getTime() on date's required; Performance improvement */
					y1 = yCoordinates[0] + (v - yMin) * yRrange * yCrange;
				} else if (yIsCategoricalScale) {
					y1 = domain.y.find((d) => d.tick === xy.y)?.coordinate ?? 0;
				} else {
					const numValue = +xy.y;
					if (numValue >= yMax) return { x: 0, y: 0 };
					if (numValue <= yMin) return { x: 0, y: viewbox.y };
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
		const xTicks = domain.x.map((d) => +d.tick);
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
		const isDateTime = domain.x[0]?.tick instanceof Date;
		const isNumericalScale = typeof domain.x[0]?.tick === "number";
		const isCategoricalScale = typeof domain.x[0]?.tick === "string";
		if (isLinearScale && (isDateTime || isNumericalScale)) {
			return (value: number | string | Date) => {
				const v = (
					value instanceof Date ? value.getTime() : value
				) as number; /* .getTime() on date's required; Performance improvement */
				return coordinates[0] + (v - min) * rrange * crange;
			};
		}
		if (isCategoricalScale) {
			return (value: number | string | Date) => {
				return domain.x.find((d) => d.tick === value)?.coordinate ?? 0;
			};
		}
		return (value: number | string | Date) => {
			const numValue = +value;
			if (numValue <= min) return 0;
			if (numValue >= max) return viewbox.x;
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
		const yTicks = domain.y.map((d) => +d.tick);
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
		const isDateTimeScale = domain.y[0]?.tick instanceof Date;
		const isCategoricalScale = typeof domain.y[0]?.tick === "string";
		if (isLinearScale && (isNumericalScale || isDateTimeScale)) {
			return (value: number | string | Date) => {
				const v = (
					value instanceof Date ? value.getTime() : value
				) as number; /* .getTime() on date's required; Performance improvement */
				return coordinates[0] + (v - min) * rrange * crange;
			};
		}
		if (isCategoricalScale) {
			return (value: number | string | Date) => {
				return domain.y.find((d) => d.tick === value)?.coordinate ?? 0;
			};
		}
		return (value: number | string | Date) => {
			const numValue = +value;
			if (numValue >= max) return 0;
			if (numValue <= min) return viewbox.y;
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

export const xCoordinateFor = ({
	domain,
	viewbox,
}: {
	viewbox: InternalGraphContext["viewbox"];
	domain: { x: InternalGraphContext["domain"]["x"] };
}) => {
	const length = domain.x.length;
	const xTicks = domain.x.map((d) => +d.tick);
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
	const isDateTime = domain.x[0]?.tick instanceof Date;
	const isNumericalScale = typeof domain.x[0]?.tick === "number";
	const isCategoricalScale = typeof domain.x[0]?.tick === "string";
	if (isLinearScale && (isDateTime || isNumericalScale)) {
		return (value: number | string | Date) => {
			const v = (
				value instanceof Date ? value.getTime() : value
			) as number; /* .getTime() on date's required; Performance improvement */
			return coordinates[0] + (v - min) * rrange * crange;
		};
	}
	if (isCategoricalScale) {
		return (value: number | string | Date) => {
			return domain.x.find((d) => d.tick === value)?.coordinate ?? 0;
		};
	}
	return (value: number | string | Date) => {
		const numValue = +value;
		if (numValue <= min) return 0;
		if (numValue >= max) return viewbox.x;
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
};

export const yCoordinateFor = ({
	domain,
	viewbox,
}: {
	viewbox: InternalGraphContext["viewbox"];
	domain: { y: InternalGraphContext["domain"]["y"] };
}) => {
	const length = domain.y.length;
	const yTicks = domain.y.map((d) => +d.tick);
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
	const isDateTimeScale = domain.y[0]?.tick instanceof Date;
	const isCategoricalScale = typeof domain.y[0]?.tick === "string";
	if (isLinearScale && (isNumericalScale || isDateTimeScale)) {
		return (value: number | string | Date) => {
			const v = (
				value instanceof Date ? value.getTime() : value
			) as number; /* .getTime() on date's required; Performance improvement */
			return coordinates[0] + (v - min) * rrange * crange;
		};
	}
	if (isCategoricalScale) {
		return (value: number | string | Date) => {
			return domain.y.find((d) => d.tick === value)?.coordinate ?? 0;
		};
	}
	return (value: number | string | Date) => {
		const numValue = +value;
		if (numValue >= max) return 0;
		if (numValue <= min) return viewbox.y;
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
};
