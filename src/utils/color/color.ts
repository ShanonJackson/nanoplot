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
	colorFor: (index: number, length?: number) => {
		if (length) {
			/* When length is provided, the goal is to pick colors that contrast well with each other for that many data points.*/
			switch (length) {
				case 1:
					return [COLORS[6].fill][index];
				case 2:
					return [COLORS[6].fill, COLORS[4].fill][index];
				case 3:
					return [COLORS[0].fill, COLORS[5].fill, COLORS[7].fill][index];
				case 4:
					return [COLORS[0].fill, COLORS[3].fill, COLORS[6].fill, COLORS[8].fill][index];
				case 5:
					return [COLORS[0].fill, COLORS[3].fill, COLORS[5].fill, COLORS[6].fill, COLORS[8].fill][index];
				case 6:
					return [COLORS[0].fill, COLORS[3].fill, COLORS[5].fill, COLORS[6].fill, COLORS[7].fill, COLORS[8].fill][index];
				case 7:
					return [COLORS[0].fill, COLORS[2].fill, COLORS[3].fill, COLORS[5].fill, COLORS[6].fill, COLORS[7].fill, COLORS[8].fill][
						index
					];
				case 8:
					return [
						COLORS[0].fill,
						COLORS[2].fill,
						COLORS[3].fill,
						COLORS[4].fill,
						COLORS[5].fill,
						COLORS[6].fill,
						COLORS[7].fill,
						COLORS[8].fill,
					][index];
				case 9:
					return [
						COLORS[0].fill,
						COLORS[1].fill,
						COLORS[2].fill,
						COLORS[3].fill,
						COLORS[4].fill,
						COLORS[5].fill,
						COLORS[6].fill,
						COLORS[7].fill,
						COLORS[8].fill,
					][index];
				case 10:
					return [
						COLORS[0].fill,
						COLORS[1].fill,
						COLORS[2].fill,
						COLORS[3].fill,
						COLORS[4].fill,
						COLORS[5].fill,
						COLORS[6].fill,
						COLORS[7].fill,
						COLORS[8].fill,
						COLORS[9].fill,
					][index];
				default:
					return "#9844fc";
			}
		}
		return COLORS.map(({ fill }) => fill)[index] || "#9844fc";
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
};
