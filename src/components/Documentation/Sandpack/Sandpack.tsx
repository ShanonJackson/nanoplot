"use client";
import { Sandpack as SandpackLibrary } from "@codesandbox/sandpack-react";
import { ComponentProps } from "react";
import { useMounted } from "../../../hooks/use-mounted";

export const Sandpack = (props: ComponentProps<typeof SandpackLibrary>) => {
	/* No SSR / Hydration issues */
	const mounted = useMounted();
	if (!mounted) return null;
	const isDarkMode = document.cookie.includes("theme=dark");
	return (
		<SandpackLibrary
			{...props}
			theme={isDarkMode ? "dark" : "light"}
			options={{
				...props.options,
				externalResources: ["https://unpkg.com/@tailwindcss/browser@4.0.12"],
			}}
		/>
	);
};
