export const toRgb = (color: string, opacity?: number): string => {
	if (/^rgba?\(/i.test(color)) {
		return color;
	}
	if (/^#/i.test(color)) {
		return parseHex(color, opacity);
	}
	if (/^hsla?\(/i.test(color)) {
		return parseHsl(color, opacity);
	}
	if (opacity !== undefined) return `rgba(0, 0, 0, ${opacity})`;
	return `rgb(0, 0, 0)`;
};

const parseHex = (color: string, opacity?: number): string => {
	let hex = color.replace(/^#/, "");
	if (hex.length === 3)
		hex = hex
			.split("")
			.map((c) => c + c)
			.join("");
	const r = parseInt(hex.slice(0, 2), 16);
	const g = parseInt(hex.slice(2, 4), 16);
	const b = parseInt(hex.slice(4, 6), 16);
	if (opacity !== undefined) return `rgba(${r}, ${g}, ${b}, ${opacity})`;
	return `rgb(${r}, ${g}, ${b})`;
};

const parseHsl = (color: string, opacity?: number): string => {
	const match = color.match(/hsla?\(([^)]+)\)/);
	if (!match) return "rgba(0, 0, 0)";
	const [h, s, l] = match[1]
		.split(",")
		.map((x) => x.trim())
		.map((x, i) => (i === 0 ? parseFloat(x) : parseFloat(x.replace("%", ""))));
	const [r, g, b] = hslToRgb(h / 360, s / 100, l / 100);
	if (opacity !== undefined) return `rgba(${r}, ${g}, ${b}, ${opacity})`;
	return `rgb(${r}, ${g}, ${b})`;
};

const hslToRgb = (h: number, s: number, l: number): [number, number, number] => {
	if (s === 0) {
		const v = Math.round(l * 255);
		return [v, v, v];
	}
	const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
	const p = 2 * l - q;
	return [Math.round(hue2rgb(p, q, h + 1 / 3) * 255), Math.round(hue2rgb(p, q, h) * 255), Math.round(hue2rgb(p, q, h - 1 / 3) * 255)];
};

const hue2rgb = (p: number, q: number, t: number): number => {
	if (t < 0) t += 1;
	if (t > 1) t -= 1;
	if (t < 1 / 6) return p + (q - p) * 6 * t;
	if (t < 1 / 2) return q;
	if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
	return p;
};
