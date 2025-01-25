"use client";

import { useMounted } from "@/hooks/use-mounted";
import { useRouter } from "next/navigation";

export function ThemeToggle() {
	const mounted = useMounted();
	const router = useRouter();

	if (!mounted) return null; /* Hydration issue. */

	const theme =
		document.cookie
			.split(";")
			.find((c) => c.includes("theme"))
			?.split("=")[1] ?? "dark";

	return (
		<button
			onClick={() => {
				document.cookie = `theme=${theme === "dark" ? "light" : "dark"}; path=/;`;
				router.refresh();
			}}
			className="flex items-center p-2 rounded-md bg-secondary hover:bg-secondary/80 text-secondary-foreground"
			aria-label="Toggle theme"
		>
			<span className="sr-only">Toggle theme</span>
			{theme === "light" ? "☀️" : "🌙"}
			<span className="ml-2 text-xs">{theme[0].toUpperCase() + theme.slice(1)} Mode</span>
		</button>
	);
}
