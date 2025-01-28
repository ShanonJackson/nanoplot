import { isolateInsideOfContainer, scopedPreflightStyles } from "tailwindcss-scoped-preflight";

export default {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/assets/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {},
	plugins: [
		require("@tailwindcss/container-queries"),
		scopedPreflightStyles({
			isolationStrategy: isolateInsideOfContainer(".nanoplot"),
		}),
	],
	darkMode: "selector",
};
