"use client";
import * as React from "react";
import { DocumentationNote } from "../../../../components/Documentation/DocumentationNote/DocumentationNote";
import { DocumentationTable } from "../../../../components/Documentation/DocumentationTable/DocumentationTable";
import { DocumentationHeading } from "../../../../components/Documentation/DocumentationHeading/DocumentationHeading";
import { DocumentationParagraph } from "../../../../components/Documentation/DocumentationParagraph/DocumentationParagraph";
import { Sandpack } from "../../../../components/Documentation/Sandpack/Sandpack";
import { DocumentationCode as Code } from "../../../../components/Documentation/DocumentationCode/DocumentationCode";
import { JSX } from "react";
import { DocumentationLayout } from "../../../../components/Documentation/DocumentationLayout/DocumentationLayout";

export default function Page() {
	return (
		<DocumentationLayout>
			<DocumentationHeading level={1}>Pie Chart</DocumentationHeading>
			<DocumentationParagraph>
				Pie charts provide a quick, intuitive view of proportions, making it easy to compare the relative sizes of categories at a
				glance.
			</DocumentationParagraph>
			<Sandpack
				// Consume dependencies as usual
				files={{
					"App.js": pieExample,
				}}
			/>

			<DocumentationHeading>Props</DocumentationHeading>
			<DocumentationTable
				columns={["Name", "Description", "Type", "Required", "Default"]}
				data={[
					{
						Name: { value: "loading", tag: "code" },
						Description: "Displays a loading skeleton",
						Type: "boolean",
						Required: "No",
						Default: "false",
					},
					{
						Name: { value: "donut", tag: "code" },
						Description: "Gives the chart a hollow centre",
						Type: "boolean | number",
						Required: "No",
						Default: "false",
					},
					{
						Name: { value: "className", tag: "code" },
						Description: "Applies a custom class",
						Type: "string",
						Required: "No",
						Default: "-",
					},
					{
						Name: { value: "labels", tag: "code" },
						Description: "Displays axis labels",
						Type: "boolean",
						Required: "No",
						Default: "true",
					},
					{
						Name: { value: "glow", tag: "code" },
						Description: "Adds a glow effect around the chart",
						Type: "boolean",
						Required: "No",
						Default: "true",
					},
					{
						Name: { value: "total", tag: "code" },
						Description: "Sets a maximum value for a progress donut chart",
						Type: "number",
						Required: "No",
						Default: "-",
					},
					{
						Name: { value: "children", tag: "code" },
						Description: "Custom content rendered within the donut centre",
						Type: "ReactNode",
						Required: "No",
						Default: "-",
					},
				]}
				renderers={{
					Name: (val) => {
						return val.tag === "code" ? <Code>{val.value}</Code> : val.value;
					},
					Type: (val) => <Code>{val}</Code>,
					Default: (val) => <Code>{val}</Code>,
				}}
			/>
			<DocumentationNote>
				The <Code>total</Code> and <Code>children</Code> props are designed for use with donut charts.
			</DocumentationNote>

			<DocumentationHeading>Styling</DocumentationHeading>
			<DocumentationParagraph>
				Custom styling can be applied by targeting the class names below. Each class corresponds to a specific element for precise
				theming and overrides.
			</DocumentationParagraph>
			<DocumentationTable
				columns={["Class Name", "Element"]}
				data={[
					{
						"Class Name": "pie__segment-group",
						Element: "Wraps each pie segment and its corresponding label",
					},
					{
						"Class Name": "pie__segment",
						Element: "Each slice of the pie",
					},
					{
						"Class Name": "pie__label",
						Element: "The label of each segment",
					},
					{
						"Class Name": "pie__label__connector",
						Element: "The line connecting each segment to its label",
					},
					{
						"Class Name": "pie__track",
						Element: "Background track under the progress ring on a progress chart",
					},
					{
						"Class Name": "pie__children",
						Element: (
							<>
								The element that can be rendered in the center of a donut chart (using the <Code>children</Code> prop),
							</>
						),
					},
				]}
				renderers={{ "Class Name": (val) => <Code>{val}</Code>, Element: (v: JSX.Element | string) => v }}
			/>
		</DocumentationLayout>
	);
}

const pieExample = `import { Pie } from "nanoplot/Pie";
import { Graph } from "nanoplot/Graph";
import "nanoplot/styles.css";

export default function App() {
	return (
		<div className={"h-[500px] w-[100%] m-auto dark:bg-black"}>
			<Graph data={[
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
			]}>
				<Pie labels={false} />
			</Graph>
		</div>
	);
};
`;
