import { isolateInsideOfContainer, scopedPreflightStyles } from "tailwindcss-scoped-preflight";
const container = require("./tailwind-container-queries");
export default {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/assets/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {},
	plugins: [
		container,
		scopedPreflightStyles({
			isolationStrategy: isolateInsideOfContainer(".nanoplot"),
		}),
	],
	darkMode: "selector",
};
