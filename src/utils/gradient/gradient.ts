import { toRgb } from "../color/to-rgb";
import { CartesianDataset, GraphContext } from "../../hooks/use-graph/use-graph";
import { MathUtils } from "../math/math";
import { CoordinatesUtils } from "../coordinates/coordinates";

const parseRgbString = (rgb: string): { r: number; g: number; b: number; a: number } => {
	const m = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
	if (!m) return { r: 0, g: 0, b: 0, a: 1 };
	return { r: +m[1], g: +m[2], b: +m[3], a: m[4] !== undefined ? +m[4] : 1 };
};

const regex =
	/(?:linear-gradient\([^,]*,\s*)?((?:rgb\([^\)]+\)|rgba\([^\)]+\)|hsl\([^\)]+\)|hsla\([^\)]+\)|#[0-9a-fA-F]{3,6}|[a-zA-Z]+))(\s*(\d*\.?\d+%?)?)?(\s*opacity\s*[:=]\s*(\d*\.?\d+))?/g;

export const GradientUtils = {
	gradientColorFromValue: ({
		gradient,
		point,
		dataset,
		viewbox,
		domain,
	}: {
		gradient: string;
		point: { x: number | string | Date; y: number | string | Date };
		dataset: CartesianDataset[number]["data"];
		viewbox: GraphContext["viewbox"];
		domain: GraphContext["domain"];
	}) => {
		/*
			Finds a value's coordinate.
			Finds the gradients color at that coordinate.
		 */
		const xForValue = CoordinatesUtils.xCoordinateFor({ domain, viewbox });
		const yForValue = CoordinatesUtils.yCoordinateFor({ domain, viewbox });

		const direction = GradientUtils.direction(gradient);
		if (direction === "to bottom" || direction === "to top") {
			const yMax = yForValue(Math.max(...dataset.map(({ y }) => +y)));
			const yMin = yForValue(Math.min(...dataset.map(({ y }) => +y)));
			const percent = MathUtils.scale(yForValue(point.y), gradient.includes("mask:") ? viewbox.y : [yMax, yMin], 100);
			return GradientUtils.colorFrom({
				gradient,
				percent: direction === "to top" ? 100 - percent : percent,
				domain,
				viewbox,
			});
		}
		const xMin = xForValue(Math.min(...dataset.map(({ x }) => +x)));
		const xMax = xForValue(Math.max(...dataset.map(({ x }) => +x)));
		const percent = MathUtils.scale(xForValue(point.x), gradient.includes("mask:") ? viewbox.x : [xMin, xMax], 100);
		return GradientUtils.colorFrom({ gradient, percent: direction == "to left" ? 100 - percent : percent, domain, viewbox });
	},
	direction: (gradient: string): string => {
		const [, direction] = /linear-gradient\((?:(to\s[a-zA-Z\s]+|\d+deg|\d+rad|\d+turn)\s*,\s*)?/.exec(gradient) ?? [
			undefined,
			undefined,
		];
		return direction ?? "to bottom";
	},
	deserialize: ({
		gradient,
		viewbox,
		domain,
	}: {
		gradient: string;
		viewbox: GraphContext["viewbox"];
		domain: GraphContext["domain"];
	}) => {
		const direction = GradientUtils.direction(gradient);
		const { stops } = GradientUtils.parse({ gradient, viewbox, domain });
		const colors = stops
			.map(({ color, offset, opacity }) => {
				return `${color} ${(offset ?? 0) * 100}%`;
			})
			.join(", ");
		return `linear-gradient(${direction}, ${colors})`;
	},
	parse: ({
		gradient,
		viewbox,
		domain,
	}: {
		gradient: string;
		viewbox: GraphContext["viewbox"];
		domain: GraphContext["domain"];
	}): { stops: Array<{ color: string; offset: number | null; opacity?: number }>; direction: string } => {
		try {
			const [, direction] = /linear-gradient\((?:(to\s[a-zA-Z\s]+|\d+deg|\d+rad|\d+turn)\s*,\s*)?/.exec(gradient) ?? [
				undefined,
				undefined,
			];
			const linear = direction
				? gradient.replace("mask:", "")
				: gradient.replace("linear-gradient(", "linear-gradient(to bottom, ").replace("mask:", "");
			const xForValue = CoordinatesUtils.xCoordinateFor({ domain, viewbox });
			const yForValue = CoordinatesUtils.yCoordinateFor({ domain, viewbox });
			const stops = Array.from(linear.matchAll(regex))
				.map((match) => {
					const offset = match[3];
					const computed = (() => {
						if (offset === undefined) return null;
						const isPercent = Boolean(offset?.endsWith("%"));
						if (isPercent) return parseFloat(offset) / 100;
						// it's a value in the domain.
						if (direction === "to right" || direction === "to left") {
							return MathUtils.scale(xForValue(parseFloat(offset)), viewbox.x, 1);
						}
						if (direction === "to top") return 1 - MathUtils.scale(yForValue(parseFloat(offset)), viewbox.y, 1);
						return MathUtils.scale(yForValue(parseFloat(offset)), viewbox.y, 1);
					})();
					return {
						color: toRgb(match[1]),
						offset: computed,
						opacity: match[5] ? parseFloat(match[5]) : undefined,
					};
				})
				.map((item, index, arr) => ({
					...item,
					offset: item.offset === null ? index / (arr.length - 1) : item.offset,
				}));

			const patched = [
				...(stops[0].offset && stops[0].offset !== 0 ? [{ ...stops[0], offset: 0 }] : []),
				...stops,
				...(stops[stops.length - 1] && stops[stops.length - 1].offset !== 1 ? [{ ...stops[stops.length - 1], offset: 1 }] : []),
			];
			return { stops: patched, direction: direction ?? "to bottom" };
		} catch (e) {
			return { stops: [], direction: "to bottom" };
		}
	},
	colorFrom: ({
		gradient,
		percent,
		viewbox,
		domain,
	}: {
		gradient: string;
		percent: number;
		viewbox: GraphContext["viewbox"];
		domain: GraphContext["domain"];
	}): string => {
		const { stops } = GradientUtils.parse({ gradient, viewbox, domain });

		// Ensure first and last stops have defined positions.
		stops[0].offset = stops[0].offset ?? 0;
		stops[stops.length - 1].offset = stops[stops.length - 1].offset ?? 1;

		// Fill in any missing positions by linear interpolation.
		for (let i = 1; i < stops.length; i++) {
			if (stops[i].offset == null) {
				let j = i;
				while (j < stops.length && stops[j].offset == null) j++;
				const startPos = stops[i - 1].offset!;
				const endPos = stops[j].offset!;
				const gap = (endPos - startPos) / (j - i + 1);
				for (let k = i; k < j; k++) {
					stops[k].offset = startPos + gap * (k - i + 1);
				}
				i = j - 1;
			}
		}

		// Normalize input percent to 0–1 and find the correct segment.
		const p = percent / 100;
		let startStop,
			endStop,
			t = 0;
		for (let i = 0; i < stops.length - 1; i++) {
			if (p >= stops[i].offset! && p <= stops[i + 1].offset!) {
				startStop = stops[i];
				endStop = stops[i + 1];
				t = (p - stops[i].offset!) / (stops[i + 1].offset! - stops[i].offset!);
				break;
			}
		}
		// If no segment is found, return the last stop's color.
		if (!startStop || !endStop) return stops[stops.length - 1].color;

		// Interpolate between the two stops.
		const c1 = parseRgbString(startStop.color);
		const c2 = parseRgbString(endStop.color);
		return interpolateColors(c1, c2, t);
	},
};

const interpolateColors = (
	c1: { r: number; g: number; b: number; a: number },
	c2: { r: number; g: number; b: number; a: number },
	t: number,
): string => {
	const r = Math.round(c1.r + (c2.r - c1.r) * t);
	const g = Math.round(c1.g + (c2.g - c1.g) * t);
	const b = Math.round(c1.b + (c2.b - c1.b) * t);
	const a = c1.a + (c2.a - c1.a) * t;
	// Format alpha to two decimals to match expected output.
	return `rgba(${r}, ${g}, ${b}, ${a.toFixed(2)})`;
};
