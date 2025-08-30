const container = require("./tailwind-container-queries");
const plugin = require("tailwindcss/plugin");

export default {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/assets/**/*.{js,ts,jsx,tsx,mdx}",
	],
	corePlugins: {
		preflight: true,
	},
	theme: {
		fontFamily: {
			sans: ["Figtree", "sans-serif"],
		},
		extend: {
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
