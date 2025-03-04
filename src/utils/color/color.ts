const COLORS = [
	{ fill: "#9844fc", color: "white" },
	{ fill: "#d63cdd", color: "white" },
	{ fill: "#ff5069", color: "white" },
	{ fill: "#f86c44", color: "white" },
	{ fill: "#fd9825", color: "white" },
	{ fill: "#e7cd33", color: "black" },
	{ fill: "#80e148", color: "black" },
	{ fill: "#00d599", color: "white" },
	{ fill: "#14ada4", color: "white" },
	{ fill: "#00a7f1", color: "white" },
	{ fill: "#696aff", color: "white" },
];

export const ColorUtils = {
	scheme: {
		sunset: ["#fecf03", "#fea81f", "#f48444", "#e4655f", "#cf4478", "#b32492", "#9224a5", "#6a22aa", "#421da0", "#0a1789"],
		contrast: COLORS.map((c) => c.fill),
	},
	between: (color1: string, color2: string, percent: number) => {
		/* Give two colors and a percent 0-1, return the color between the two colors at that % */
		if (percent === 1) return color2;
		if (percent === 0) return color1;

		const rgb1 = /rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/.exec(color2) || [255, 255, 255];
		const rgb2 = /rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/.exec(color1) || [255, 255, 255];
		const w1 = (percent * 2) / 2;
		const w2 = 1 - w1;

		const [r, g, b] = [
			Math.round(+rgb1[1] * w1 + +rgb2[1] * w2),
			Math.round(+rgb1[2] * w1 + +rgb2[2] * w2),
			Math.round(+rgb1[3] * w1 + +rgb2[3] * w2),
		];
		return `rgb(${r}, ${g}, ${b})`;
	},
	textFor: (color: string): string => {
		const isKnownColor = COLORS.find(({ fill }) => fill === color)?.color;
		if (isKnownColor) return isKnownColor;

		const hexToRgb = (hex: string) => {
			hex = hex.replace(/^#/, "");
			if (hex.length === 3)
				hex = hex
					.split("")
					.map((x) => x + x)
					.join("");
			const num = parseInt(hex, 16);
			return [num >> 16, (num >> 8) & 255, num & 255];
		};

		const hslToRgb = (h: number, s: number, l: number) => {
			s /= 100;
			l /= 100;
			const k = (n: number) => (n + h / 30) % 12;
			const a = s * Math.min(l, 1 - l);
			const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1));
			return [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];
		};

		let rgb: number[] | null = null;

		// Extract first hex color
		const hexMatch = color.match(/#([0-9a-fA-F]{3,6})/);
		if (hexMatch) rgb = hexToRgb(hexMatch[0]);

		// Extract first RGB color
		const rgbMatch = color.match(/rgb\(\s*(\d+),\s*(\d+),\s*(\d+)\s*\)/);
		if (rgbMatch) rgb = rgbMatch.slice(1, 4).map(Number);

		// Extract first HSL color and convert to RGB (supporting "deg" in hue)
		const hslMatch = color.match(/hsl\(\s*(\d+)(?:deg)?,\s*(\d+)%?,\s*(\d+)%?\s*\)/);
		if (hslMatch) rgb = hslToRgb(Number(hslMatch[1]), Number(hslMatch[2]), Number(hslMatch[3]));

		// Default to white if parsing fails
		if (!rgb) rgb = [255, 255, 255];

		// Calculate brightness
		const brightness = Math.round((rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000);

		return brightness > 125 ? "black" : "white";
	},
};
