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
			?.split("=")[1] ?? "light";

	const onClick = () => {
		// parse cookie extract theme
		document.cookie = `theme=${
			document.cookie
				.split(";")
				.find((c) => c.includes("theme"))
				?.split("=")[1] === "light"
				? "dark"
				: "light"
		}; path=/;`;
		router.refresh();
	};

	return (
		<button
			onClick={onClick}
			className="flex items-center p-2 rounded-md bg-secondary hover:bg-secondary/80 text-secondary-foreground"
			aria-label="Toggle theme"
		>
			<span className="sr-only">Toggle theme</span>
			{theme === "light" ? "☀️" : "🌙"}
			{/* Debug display */}
			<span className="ml-2 text-xs">{theme} mode</span>
		</button>
	);
}
