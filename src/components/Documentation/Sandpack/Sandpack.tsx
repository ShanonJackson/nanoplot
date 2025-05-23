"use client";
import { Sandpack as SandpackLibrary } from "@codesandbox/sandpack-react";
import { ComponentProps } from "react";
import { useMounted } from "../../../hooks/use-mounted";
import pkg from "../../../../package.json";

export const Sandpack = (props: ComponentProps<typeof SandpackLibrary>) => {
	/* No SSR / Hydration issues */
	const mounted = useMounted();
	if (!mounted) return null;
	const isLight = document.cookie.includes("theme=light");
	return (
		<SandpackLibrary
			{...props}
			template={"react"}
			key={isLight.toString()}
			theme={isLight ? "light" : "dark"}
			customSetup={{
				dependencies: { ...props.customSetup?.dependencies, nanoplot: pkg.version, "@number-flow/react": "latest" },
			}}
			options={{
				editorHeight: 500,
				...props.options,
				externalResources: [
					"https://unpkg.com/@tailwindcss/browser@4.0.12",
					`${window.location.origin}/sandpack-${isLight ? "light" : "dark"}.js`,
					`${window.location.origin}/sandpack-${isLight ? "light" : "dark"}-global.css`,
				],
			}}
		/>
	);
};
