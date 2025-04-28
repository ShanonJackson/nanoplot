"use client";
import * as React from "react";
import { DocumentationNote } from "../../../../components/Documentation/DocumentationNote/DocumentationNote";
import { DocumentationTable } from "../../../../components/Documentation/DocumentationTable/DocumentationTable";
import { DocumentationHeading } from "../../../../components/Documentation/DocumentationHeading/DocumentationHeading";
import { DocumentationParagraph } from "../../../../components/Documentation/DocumentationParagraph/DocumentationParagraph";
import { Sandpack } from "../../../../components/Documentation/Sandpack/Sandpack";
import { DocumentationCode as Code } from "../../../../components/Documentation/DocumentationCode/DocumentationCode";

export default function Page() {
	return (
		<div className={"p-4 md:p-8"}>
			<DocumentationHeading level={1}>Pie Chart</DocumentationHeading>
			<DocumentationParagraph>
				Pie charts provide a quick, intuitive view of proportions, making it easy to compare the relative sizes of categories at a
				glance.
			</DocumentationParagraph>
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
					"App.js": `import { Pie } from "nanoplot/Pie";
import { Graph } from "nanoplot/Graph";

export default () => {
	return (
		<div className={"h-[350px] w-[100%] m-auto dark:bg-black"}>
			<Graph data={MOCK_DATA}>
				<Pie />
			</Graph>
		</div>
	);
};

const MOCK_DATA = [
	{
		name: "elixir",
		value: 333,
	},
	{
		name: "stylus",
		value: 257,
	},
	{
		name: "css",
		value: 30,
	},
	{
		name: "haskell",
		value: 192,
	},
	{
		name: "python",
		value: 283,
	},
];
`,
				}}
			/>

			<DocumentationHeading>Props</DocumentationHeading>
			<DocumentationTable
				columns={["Name", "Description", "Type", "Required", "Default"]}
				data={[
					{
						Name: { value: "loading", href: "/", tag: "code" },
						Description: "Displays a loading skeleton",
						Type: "boolean",
						Required: "No",
						Default: "false",
					},
					{
						Name: { value: "donut", href: "", tag: "code" },
						Description: "Gives the chart a hollow centre",
						Type: "boolean | number",
						Required: "No",
						Default: "false",
					},
					{
						Name: { value: "className", href: "", tag: "code" },
						Description: "Applies a custom class",
						Type: "string",
						Required: "No",
						Default: "-",
					},
					{
						Name: { value: "labels", href: "", tag: "code" },
						Description: "Displays axis labels",
						Type: "boolean",
						Required: "No",
						Default: "true",
					},
					{
						Name: { value: "glow", href: "", tag: "code" },
						Description: "Adds a glow effect around the chart",
						Type: "boolean",
						Required: "No",
						Default: "true",
					},
					{
						Name: { value: "total", href: "", tag: "code" },
						Description: "Sets a maximum value for a progress donut chart",
						Type: "number",
						Required: "No",
						Default: "-",
					},
					{
						Name: { value: "children", href: "", tag: "code" },
						Description: "Custom content rendered within the donut centre",
						Type: "ReactNode",
						Required: "No",
						Default: "-",
					},
				]}
				renderers={{
					Name: (val) => {
						if (val.href) {
							return (
								<a href={val.href} className={"cursor-pointer text-blue-600 dark:text-blue-400 hover:underline"}>
									{val.tag === "code" ? <Code inherit>{val.value}</Code> : val.value}
								</a>
							);
						}
						return val.tag === "code" ? <Code>{val.value}</Code> : val.value;
					},
					Type: (val) => <Code>{val}</Code>,
					Default: (val) => <Code>{val}</Code>,
				}}
			/>
			<DocumentationNote>
				The <Code>total</Code> and <Code>children</Code> props are designed for use with donut charts.
			</DocumentationNote>
		</div>
	);
}
