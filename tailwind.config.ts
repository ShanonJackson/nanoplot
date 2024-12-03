import type { Config } from "tailwindcss";

export default {
	content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		extend: {
			colors: {
				background: {
					DEFAULT: "hsl(var(--background))",
					foreground: "hsl(var(--foreground))",
				},
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				foreground: "hsl(var(--foreground))",
				border: "hsl(var(--border))",
			},
		},
	},
	plugins: [],
	darkMode: "class",
} satisfies Config;
