import { toRgb } from "../color/to-rgb";

const parseRgbString = (rgb: string): { r: number; g: number; b: number; a: number } => {
	const m = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
	if (!m) return { r: 0, g: 0, b: 0, a: 1 };
	return { r: +m[1], g: +m[2], b: +m[3], a: m[4] !== undefined ? +m[4] : 1 };
};

const regex =
	/(?:linear-gradient\([^,]*,\s*)?((?:rgb\([^\)]+\)|rgba\([^\)]+\)|hsl\([^\)]+\)|hsla\([^\)]+\)|#[0-9a-fA-F]{3,6}|[a-zA-Z]+))(\s*(\d+%)?)?(\s*opacity\s*[:=]\s*(\d*\.?\d+))?/g;

export const GradientUtils = {
	parse: (gradient: string): { stops: Array<{ color: string; offset: number | null; opacity?: number }>; direction: string } => {
		const [, direction] = /linear-gradient\((?:(to\s[a-zA-Z\s]+|\d+deg|\d+rad|\d+turn)\s*,\s*)?/.exec(gradient) ?? [
			undefined,
			undefined,
		];
		const linear = direction ? gradient : gradient.replace("linear-gradient(", "linear-gradient(to bottom, ");
		const stops = Array.from(linear.matchAll(regex))
			.map((match) => ({
				color: toRgb(match[1]),
				// If an offset is provided (e.g. "0%"), divide by 100 to normalize.
				offset: match[3] ? parseFloat(match[3]) / 100 : null,
				opacity: match[5] ? parseFloat(match[5]) : undefined,
			}))
			.map((item, index, arr) => ({
				...item,
				// Auto-assign missing offsets evenly between 0 and 1.
				offset: item.offset === null ? index / (arr.length - 1) : item.offset,
			}));
		return { stops, direction: direction ?? "to bottom" };
	},
	colorFrom: (gradient: string, percent: number): string => {
		const { stops } = GradientUtils.parse(gradient);

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
