import { GraphContext } from "../../hooks/use-graph/use-graph";

export const CoordinatesUtils = {
	xCoordinateFor: ({ domain, viewbox }: { viewbox: GraphContext["viewbox"]; domain: { x: GraphContext["domain"]["x"] } }) => {
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
		if (isLinearScale && (isDateTime || isNumericalScale)) {
			return (value: number | string | Date) => {
				const v = (
					value instanceof Date ? value.getTime() : value
				) as number; /* .getTime() on date's required; Performance improvement */
				return coordinates[0] + (v - min) * rrange * crange;
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
	yCoordinateFor: ({ domain, viewbox }: { viewbox: GraphContext["viewbox"]; domain: { y: GraphContext["domain"]["y"] } }) => {
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

		if (isLinearScale && (isNumericalScale || isDateTimeScale)) {
			return (value: number | string | Date) => {
				const v = (
					value instanceof Date ? value.getTime() : value
				) as number; /* .getTime() on date's required; Performance improvement */
				return coordinates[0] + (v - min) * rrange * crange;
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
