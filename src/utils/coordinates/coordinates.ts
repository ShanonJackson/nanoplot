import { GraphContext } from "../../hooks/use-graph/use-graph";

export const CoordinatesUtils = {
	xCoordinateFor: ({ domain, viewbox }: { viewbox: GraphContext["viewbox"]; domain: { x: GraphContext["domain"]["x"] } }) => {
		/* This code is an extremely hot path for high-performance line graphs (think 100_000's of datapoints) - Modify through benchmarking */
		const length = domain.x.length;
		const xTicks = new Float64Array(length);
		const coordinates = new Float64Array(length);
		for (let i = 0; i < length; i++) {
			xTicks[i] = +domain.x[i].tick;
			coordinates[i] = domain.x[i].coordinate;
		}
		const min = xTicks[0], max = xTicks[length - 1];
		
		return (value: number | string | Date) => {
			const numValue = +value;
			if (numValue <= min) return 0;
			if (numValue >= max) return viewbox.x;
			let left = 0, right = length - 1;
			while (left < right) {
				const mid = (left + right) >> 1;
				if (xTicks[mid] < numValue) left = mid + 1;
				else right = mid;
			}
			const lowIdx = Math.max(left - 1, 0);
			const highIdx = Math.min(left, length - 1);
			const lowTick = xTicks[lowIdx], highTick = xTicks[highIdx];
			const lowCoord = coordinates[lowIdx], highCoord = coordinates[highIdx];
			return lowTick === highTick
				? lowCoord
				: lowCoord + ((numValue - lowTick) / (highTick - lowTick)) * (highCoord - lowCoord);
		};
	},
	
	yCoordinateFor: ({ domain, viewbox }: { viewbox: GraphContext["viewbox"]; domain: { y: GraphContext["domain"]["y"] } }) => {
		const length = domain.y.length;
		const yTicks = new Float64Array(length);
		const coordinates = new Float64Array(length);
		for (let i = 0; i < length; i++) {
			yTicks[i] = +domain.y[i].tick;
			coordinates[i] = domain.y[i].coordinate;
		}
		const min = yTicks[0], max = yTicks[length - 1];
		return (value: number | string | Date) => {
			const numValue = +value;
			if (numValue >= max) return 0;
			if (numValue <= min) return viewbox.y;
			
			let left = 0, right = length - 1;
			while (left < right) {
				const mid = (left + right) >> 1;
				if (yTicks[mid] < numValue) left = mid + 1;
				else right = mid;
			}
			const lowIdx = Math.max(left - 1, 0);
			const highIdx = Math.min(left, length - 1);
			const lowTick = yTicks[lowIdx], highTick = yTicks[highIdx];
			const lowCoord = coordinates[lowIdx], highCoord = coordinates[highIdx];
			return lowTick === highTick
				? lowCoord
				: lowCoord + ((numValue - lowTick) / (highTick - lowTick)) * (highCoord - lowCoord);
		};
	},
};
