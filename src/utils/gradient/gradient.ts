/*
	The following code block is GPT generated code.
	It's designed to make getting the 'fill' for "heatmap" style graphs easier ( Worldmap, Heatmap, .. more in future).
	It's designed to take a linear gradient string and a percentage and return the color at that percentage.
	It's possible that we may want to simplify the implementation by only allowing rgb(a) colors.
 */

export const colorFromGradient = (gradient: string, percent: number): string => {
	const gradientRegex = /linear-gradient\([^,]+,\s*(.*)\)/;
	const match = gradient.match(gradientRegex);
	if (!match) throw new Error("Invalid gradient format");

	const colorStops = match[1].split(/,(?![^()]*\))/).map((s) => s.trim());
	const colors = colorStops.map((stop) => {
		const parts = stop.split(/\s+/);
		return {
			color: parseColor(parts.slice(0, -1).join(" ")),
			position: parts.length > 1 ? parseFloat(parts[parts.length - 1]) / 100 : null,
		};
	});

	colors[0].position = colors[0].position ?? 0;
	colors[colors.length - 1].position = colors[colors.length - 1].position ?? 1;

	for (let i = 1; i < colors.length; i++) {
		if (colors[i].position === null) {
			let start = i - 1;
			let end = i;
			while (end < colors.length && colors[end].position === null) end++;
			const step = (colors[end].position - colors[start].position) / (end - start);
			for (let j = start + 1; j < end; j++) {
				colors[j].position = colors[j - 1].position + step;
			}
		}
	}

	percent /= 100;
	let startColor, endColor, t;
	for (let i = 0; i < colors.length - 1; i++) {
		if (percent >= colors[i].position && percent <= colors[i + 1].position) {
			startColor = colors[i].color;
			endColor = colors[i + 1].color;
			t = (percent - colors[i].position) / (colors[i + 1].position - colors[i].position);
			break;
		}
	}

	if (!startColor || !endColor) {
		const { r, g, b, a } = colors[colors.length - 1].color;
		return `rgba(${r}, ${g}, ${b}, ${a})`;
	}
	return interpolateColors(startColor, endColor, t);
};

type RGBAColor = { r: number; g: number; b: number; a: number };

const parseColor = (color: string): RGBAColor => {
	const hexMatch = color.match(/^#([a-fA-F0-9]{3,8})$/);
	if (hexMatch) {
		let hex = hexMatch[1];
		if (hex.length === 3)
			hex = hex
				.split("")
				.map((c) => c + c)
				.join("");
		if (hex.length === 6) hex += "ff";
		if (hex.length === 8) {
			return {
				r: parseInt(hex.slice(0, 2), 16),
				g: parseInt(hex.slice(2, 4), 16),
				b: parseInt(hex.slice(4, 6), 16),
				a: parseInt(hex.slice(6, 8), 16) / 255,
			};
		}
	}

	const rgbaMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
	if (rgbaMatch) {
		return {
			r: parseInt(rgbaMatch[1]),
			g: parseInt(rgbaMatch[2]),
			b: parseInt(rgbaMatch[3]),
			a: rgbaMatch[4] ? parseFloat(rgbaMatch[4]) : 1,
		};
	}

	const hslaMatch = color.match(/hsla?\(([^)]+)\)/);
	if (hslaMatch) {
		const [h, s, l, a = 1] = hslaMatch[1].split(",").map((n) => parseFloat(n.trim()));
		return hslToRgb(h, s, l, a);
	}

	throw new Error("Unsupported color format: " + color);
};

const hslToRgb = (h: number, s: number, l: number, a: number): RGBAColor => {
	s /= 100;
	l /= 100;
	const k = (n: number) => (n + h / 30) % 12;
	const f = (n: number) => l - s * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1));
	return {
		r: Math.round(f(0) * 255),
		g: Math.round(f(8) * 255),
		b: Math.round(f(4) * 255),
		a,
	};
};

const interpolateColors = (c1: RGBAColor, c2: RGBAColor, t: number): string => {
	const r = Math.round(c1.r + (c2.r - c1.r) * t);
	const g = Math.round(c1.g + (c2.g - c1.g) * t);
	const b = Math.round(c1.b + (c2.b - c1.b) * t);
	const a = c1.a + (c2.a - c1.a) * t;
	return `rgba(${r}, ${g}, ${b}, ${a.toFixed(2)})`;
};
