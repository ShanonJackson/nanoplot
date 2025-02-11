import { isolateInsideOfContainer, scopedPreflightStyles } from "tailwindcss-scoped-preflight";
const container = require("./tailwind-container-queries");

export default {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/assets/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		fontFamily: {
			sans: ["Figtree", "sans0-serif"],
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
		scopedPreflightStyles({
			isolationStrategy: isolateInsideOfContainer(".nanoplot"),
		}),
	],
	darkMode: "selector",
};
