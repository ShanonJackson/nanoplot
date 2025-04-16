"use client";
import { Sandpack as SandpackLibrary } from "@codesandbox/sandpack-react";
import { ComponentProps } from "react";
import { useMounted } from "../../../hooks/use-mounted";

export const Sandpack = (props: ComponentProps<typeof SandpackLibrary>) => {
	/* No SSR / Hydration issues */
	const mounted = useMounted();
	if (!mounted) return null;
	const isLight = document.cookie.includes("theme=light");
	return (
		<SandpackLibrary
			{...props}
			theme={isLight ? "light" : "dark"}
			options={{
				...props.options,
				externalResources: ["https://unpkg.com/@tailwindcss/browser@4.0.12"],
			}}
		/>
	);
};
