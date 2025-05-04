"use client";
import { Sandpack as SandpackLibrary } from "@codesandbox/sandpack-react";
import { ComponentProps } from "react";
import { useMounted } from "../../../hooks/use-mounted";

export const Sandpack = (props: ComponentProps<typeof SandpackLibrary>) => {
	/* No SSR / Hydration issues */
	const mounted = useMounted();
	if (!mounted) return null;
	const isLight = document.cookie.includes("theme=light");
	const domain = window.location.hostname;
	const test = props.files;
	return (
		<SandpackLibrary
			{...props}
			template={"react"}
			key={isLight.toString()}
			theme={isLight ? "light" : "dark"}
			customSetup={{
				dependencies: { ...props.customSetup?.dependencies, nanoplot: "latest" },
			}}
			files={{
				...(typeof props.files === "object" ? props.files : {}),
				"theme.js": `document.body.classList.add("${isLight ? "light" : "dark"}");`,
			}}
			options={{
				editorHeight: 500,
				...props.options,
				externalResources: [
					"https://unpkg.com/@tailwindcss/browser@4.0.12",
					`${window.location.origin}/sandpack-${isLight ? "light" : "dark"}-global.css`,
				],
			}}
		/>
	);
};
