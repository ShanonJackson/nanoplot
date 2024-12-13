"use client";

import { useLayoutEffect, useState } from "react";
import { useMounted } from "@/hooks/use-mounted";

export function ThemeToggle() {
	const mounted = useMounted();
	const [theme, setTheme] = useState<string>(typeof window !== "undefined" ? (localStorage.getItem("nano-theme") ?? "light") : "light");

	const onClick = () => {
		const newTheme = theme === "light" ? "dark" : "light";
		setTheme(newTheme);
		localStorage.setItem("nano-theme", newTheme);
	};
	useLayoutEffect(() => void document.body.classList.toggle(theme), [theme]);
	if (!mounted) return null; /* fixes hydration error */
	return (
		<button
			onClick={onClick}
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
