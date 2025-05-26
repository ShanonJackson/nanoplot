"use client";
import { useRouter } from "next/navigation";
import { useMounted } from "../../hooks/use-mounted";

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
		<label className="relative inline-flex items-center cursor-pointer">
			<input
				type="checkbox"
				className="sr-only peer"
				checked={theme === "dark"}
				onChange={() => {
					document.cookie = `theme=${theme === "dark" ? "light" : "dark"}; path=/;`;
					router.refresh();
				}}
				aria-label="Toggle theme"
			/>
			<div className="w-11 h-6 rounded-full bg-gray-200 peer-checked:bg-gray-700 transition-colors duration-300 ease-in-out"></div>
			<div className="absolute left-1 top-1 w-4 h-4 rounded-full bg-gray-400 transition-transform duration-300 ease-in-out transform peer-checked:translate-x-5"></div>
		</label>
	);
}
