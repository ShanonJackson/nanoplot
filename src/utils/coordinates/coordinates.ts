import { GraphContext } from "../../hooks/use-graph/use-graph";
import { MathUtils } from "../math/math";

export const CoordinatesUtils = {
	xCoordinateFor: ({ domain, viewbox }: { viewbox: GraphContext["viewbox"]; domain: { x: GraphContext["domain"]["x"] } }) => {
		const xTicks = domain.x.map(({ tick }) => +tick);
		const ticks = new Map(domain.x.map(({ tick, coordinate }) => [+tick, coordinate]));
		const min = xTicks[0];
		const max = xTicks[xTicks.length - 1];
		return (value: number | string | Date) => {
			const isInstantMatch = ticks.get(typeof value === "number" ? value : +value);
			if (isInstantMatch) return isInstantMatch;
			if (typeof value === "string") return ticks.get(+value) ?? viewbox.x;
			const val = +value;
			if (val <= min) return 0;
			if (val >= max) return viewbox.x;
			/* btree search */
			let left = 0;
			let right = xTicks.length - 1;
			while (left <= right) {
				const mid = (left + right) >> 1;
				if (xTicks[mid] === val) return ticks.get(xTicks[mid])!;
				if (xTicks[mid] < val) left = mid + 1;
				else right = mid - 1;
			}
			const lowTick = xTicks[Math.max(right, 0)];
			const highTick = xTicks[Math.min(left, xTicks.length - 1)];
			const lowCoord = ticks.get(lowTick)!;
			const highCoord = ticks.get(highTick)!;
			return ((val - lowTick) / (highTick - lowTick)) * (highCoord - lowCoord) + lowCoord;
		};
	},
	yCoordinateFor: ({ domain, viewbox }: { viewbox: GraphContext["viewbox"]; domain: { y: GraphContext["domain"]["y"] } }) => {
		const yTicks = domain.y.map(({ tick }) => +tick);
		const coordinatesMap = new Map(domain.y.map(({ tick, coordinate }) => [+tick, coordinate]));
		const min = yTicks[0];
		const max = yTicks[yTicks.length - 1];

		if (max === min) return () => domain.y[0]?.coordinate ?? viewbox.y;

		return (value: number | string | Date) => {
			const isInstantMatch = coordinatesMap.get(typeof value === "number" ? value : +value);
			if (isInstantMatch) return isInstantMatch;
			if (typeof value === "string") return coordinatesMap.get(+value) ?? viewbox.y;
			const val = +value;
			if (val >= max) return 0;
			if (val <= min) return viewbox.y;
			// Btree search
			let left = 0,
				right = yTicks.length - 1;
			while (left <= right) {
				const mid = (left + right) >> 1;
				if (yTicks[mid] === val) return coordinatesMap.get(yTicks[mid])!;
				if (yTicks[mid] < val) left = mid + 1;
				else right = mid - 1;
			}
			// Interpolation: left is now the upper bound index
			const lowTick = yTicks[Math.max(right, 0)];
			const highTick = yTicks[Math.min(left, yTicks.length - 1)];
			const lowCoord = coordinatesMap.get(lowTick)!;
			const highCoord = coordinatesMap.get(highTick)!;
			return ((val - lowTick) / (highTick - lowTick)) * (highCoord - lowCoord) + lowCoord;
		};
	},
};
