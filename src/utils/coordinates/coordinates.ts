import { GraphContext } from "@/hooks/use-graph/use-graph";
import { MathUtils } from "@/utils/math/math";

export const CoordinatesUtils = {
	xCoordinateFor: ({ domain, viewbox }: { viewbox: GraphContext["viewbox"]; domain: { x: GraphContext["domain"]["x"] } }) => {
		/*
			X >= MAX = return x.scale (far right of graph)
			X <= MIN = return 0 (far left of graph)
			else -> Find interval either by tick exact match OR calculate interval if i'm between two ticks.
		 */
		const max = Math.max(...domain.x.map(({ tick }) => +tick));
		const min = Math.min(...domain.x.map(({ tick }) => +tick));

		return (value: number | string | Date) => {
			if (typeof value === "string") return domain.x.find(({ tick }) => tick === value)?.coordinate ?? viewbox.x;
			if (max === min && domain.x.length === 1) return domain.x[0]?.coordinate ?? viewbox.x; /* single data point */
			const val = +value;
			if (val > max) return viewbox.x;
			if (val < min) return 0;

			return (
				domain.x.reduce<number | undefined>((coord, { tick, coordinate }, i) => {
					if (coord !== undefined) return coord;
					const next = domain.x[i + 1]; // no need to check for undefined because it can't be past max.
					const { coordinate: nextCoordinate, tick: nextTick } = next;
					if (MathUtils.isBetween(+val, +tick, +nextTick)) {
						return MathUtils.scale(val, [+tick, +nextTick], [coordinate, nextCoordinate]);
					}
					return coord;
				}, undefined) ?? 0
			);
		};
	},
	yCoordinateFor: ({ domain, viewbox }: { viewbox: GraphContext["viewbox"]; domain: { y: GraphContext["domain"]["y"] } }) => {
		/*
			Y >= MAX = return 0 (top of graph)
			Y <= MIN = return y.scale (bottom of graph)
			else -> Find interval either by tick exact match OR calculate interval if i'm between two ticks.
		 */
		const max = Math.max(...domain.y.map(({ tick }) => +tick));
		const min = Math.min(...domain.y.map(({ tick }) => +tick));

		if (max === min) return () => domain.y[0]?.coordinate ?? viewbox.y;

		return (value: number | string | Date) => {
			if (+value > max) return 0;
			if (+value < min) return viewbox.y;
			/* if value is a string, it's a categorical axis, in this case values can't be between ticks */
			if (typeof value === "string") return domain.y.find(({ tick }) => tick === value)?.coordinate ?? viewbox.y;
			return (
				domain.y.reduce<undefined | number>((coord, { tick, coordinate }, i) => {
					if (coord !== undefined || typeof tick === "string") return coord;
					const next = domain.y[i + 1]; // no need to check for undefined because it can't be past max.
					if (!next) return coord;
					const { coordinate: nextCoordinate, tick: nextTick } = next;
					if (MathUtils.isBetween(+value, +tick, +nextTick)) {
						return MathUtils.scale(+value, [+tick, +nextTick], [coordinate, nextCoordinate]);
					}
					return coord;
				}, undefined) ?? viewbox.y
			);
		};
	},
};
