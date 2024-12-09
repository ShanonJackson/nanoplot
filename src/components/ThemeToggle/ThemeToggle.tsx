"use client";

import { useLayoutEffect, useState } from "react";

export function ThemeToggle() {
	// get current theme from local storage
	const [theme, setTheme] = useState<string>(localStorage.getItem("nano-theme") || "light");

	const toggleTheme = () => {
		const newTheme = theme === "light" ? "dark" : "light";
		setTheme(newTheme);
		localStorage.setItem("nano-theme", newTheme);
		document.documentElement.setAttribute("data-theme", newTheme);
	};

	useLayoutEffect(() => {
		document.documentElement.setAttribute("data-theme", theme);
	}, [theme]);

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
