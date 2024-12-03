"use client";

import { useState } from "react";

export function ThemeToggle() {
	const [theme, setTheme] = useState<string>("light");
	const toggleTheme = () => {
		const newTheme = theme === "light" ? "dark" : "light";
		setTheme(newTheme);
		document.documentElement.setAttribute("data-theme", newTheme);
	};

	return (
		<button
			onClick={toggleTheme}
			className="flex items-center p-2 rounded-md bg-secondary hover:bg-secondary/80 text-secondary-foreground"
			aria-label="Toggle theme"
		>
			<span className="sr-only">Toggle theme</span>
			{theme === "light" ? "🌙" : "☀️"}
			{/* Debug display */}
			<span className="ml-2 text-xs">{theme} mode</span>
		</button>
	);
}
