"use client";
import * as React from "react";
import { DocumentationNote } from "../../../../components/Documentation/DocumentationNote/DocumentationNote";
import { DocumentationTable } from "../../../../components/Documentation/DocumentationTable/DocumentationTable";
import { DocumentationHeading } from "../../../../components/Documentation/DocumentationHeading/DocumentationHeading";
import { Sandpack } from "../../../../components/Documentation/Sandpack/Sandpack";
import { useTheme } from "../../../../hooks/use-theme";

export default function Page() {
	const theme = useTheme();
	return (
		<div className={"p-8"}>
			<DocumentationHeading level={1}>Radar Chart</DocumentationHeading>
			<Sandpack
				template="react"
				options={{
					editorHeight: 500,
				}}
				// Set the dependencies; for example, this is a private package from GitHub packages
				customSetup={{
					dependencies: { nanoplot: "latest" },
				}}
				// Consume dependencies as usual
				files={{
					"App.js": `
import { Radar } from "nanoplot/Radar";
import { Graph } from "nanoplot/Graph";

export default () => {
	return (
		<div className={"h-[350px] w-[100%] m-auto dark:bg-black"}>
			<Graph gap={{ top: 30 }} data={MOCK_DATA}>
				<Radar />
			</Graph>
		</div>
	);
};

const MOCK_DATA = [
	{
		name: "Jasons Progress",
		stroke: "#11ACAE",
		data: [
			{ x: "Fighting", y: 70 },
			{ x: "Farming", y: 8 },
			{ x: "Supporting", y: 300 },
			{ x: "Pushing", y: 90 },
			{ x: "Versatility", y: 60 },
		],
	},
	{
		name: "Alex's Progress",
		stroke: "#E63946",
		data: [
			{ x: "Fighting", y: 50 },
			{ x: "Farming", y: 95 },
			{ x: "Supporting", y: 60 },
			{ x: "Pushing", y: 50 },
			{ x: "Versatility", y: 90 },
		],
	},
];
`,
				}}
			/>
			<DocumentationNote>
				Radar graphs are best used for comparing multiple variables across categories with a shared scale, i.e. performance metrics
				or feature comparisons.
			</DocumentationNote>
			<DocumentationHeading>Props</DocumentationHeading>
			<DocumentationTable
				columns={["Name", "Description", "Type", "Required"]}
				data={data}
				renderers={{
					Name: (val) => (
						<a href={val.href} className={"cursor-pointer text-blue-600 dark:text-blue-400 hover:underline"}>
							{val.tag === "code" ? <code>{val.value}</code> : val.value}
						</a>
					),
					Type: (val) => (val.tag === "code" ? <code>{val.value}</code> : val.value),
				}}
			/>
		</div>
	);
}
const data = [
	{
		Name: { value: "loading", href: "/graphs/radar", tag: "code" },
		Description: "Displays a loading skeleton",
		Type: { value: "boolean", tag: "code" },
		Required: "No",
	},
	{
		Name: { value: "scalars", href: "/graphs/radar", tag: "code" },
		Description: "Specifies the values for chart rings",
		Type: { value: "boolean", tag: "code" },
		Required: "No",
	},
	{
		Name: { value: "className", href: "/graphs/radar", tag: "code" },
		Description: "Applies a custom class",
		Type: { value: "boolean", tag: "code" },
		Required: "No",
	},
	{
		Name: { value: "labels", href: "/graphs/radar", tag: "code" },
		Description: "Displays axis labels",
		Type: { value: "boolean", tag: "code" },
		Required: "No",
	},
];
