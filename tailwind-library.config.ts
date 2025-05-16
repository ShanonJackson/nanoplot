const container = require("./tailwind-container-queries");
const plugin = require("tailwindcss/plugin");

export default {
	content: [
		"./src/components/Legend/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/Heatmap/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/Pie/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/Worldmap/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/Area/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/Lines/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/Tooltip/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/Bars/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/XAxis/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/YAxis/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/Graph/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/Overlay/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/Radar/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/Scatter/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/Sunburst/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/LinearGradient/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/GridLines/**/*.{js,ts,jsx,tsx,mdx}",
	],
	corePlugins: {
		preflight: true,
	},
	theme: {
		fontFamily: {
			sans: ["Figtree", "sans-serif"],
		},
		extend: {
			colors: {
				"dark-priority-100": "rgb(45, 45, 45)",
			},
			animation: {
				rotate: "rotate 3s linear infinite",
				borderWidth: "borderWidth 8s ease-in-out infinite",
			},
			keyframes: {
				rotate: {
					"0%": { transform: "rotate(0deg)" },
					"100%": { transform: "rotate(360deg)" },
				},
				borderWidth: {
					"0%, 100%": { inset: "-50%" },
					"50%": { inset: "-51%" },
				},
			},
		},
	},
	plugins: [
		container,
		plugin(function ({ addComponents }: any) {
			addComponents({
				".pseudo-bg-inherit": {
					"&::before, &::after": {
						background: "inherit",
					},
				},
			});
		}),
	],
	darkMode: "selector",
};
