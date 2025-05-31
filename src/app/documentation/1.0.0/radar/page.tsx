"use client";
import * as React from "react";
import { DocumentationNote } from "../../../../components/Documentation/DocumentationNote/DocumentationNote";
import { DocumentationTable } from "../../../../components/Documentation/DocumentationTable/DocumentationTable";
import { DocumentationHeading } from "../../../../components/Documentation/DocumentationHeading/DocumentationHeading";
import { DocumentationParagraph } from "../../../../components/Documentation/DocumentationParagraph/DocumentationParagraph";
import { Sandpack } from "../../../../components/Documentation/Sandpack/Sandpack";
import { DocumentationCode as Code } from "../../../../components/Documentation/DocumentationCode/DocumentationCode";
import { DocumentationLayout } from "../../../../components/Documentation/DocumentationLayout/DocumentationLayout";

export default function Page() {
	return (
		<DocumentationLayout>
			<DocumentationHeading level={1}>Radar Chart</DocumentationHeading>
			<DocumentationParagraph>
				Radar charts are ideal for comparing multivariate data across shared categories. This chart helps clearly highlight patterns
				and gaps between datasets at a glance.
			</DocumentationParagraph>
			<Sandpack
				files={{
					"App.js": `import { Radar } from "nanoplot/Radar";
import { Graph } from "nanoplot/Graph";

export default function App() {
	return (
		<div className={"h-[350px] w-[100%] m-auto dark:bg-black"}>
			<Graph
				data={[
					{
						name: "Jason's Progress",
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
				]}
			>
				<Radar />
			</Graph>
		</div>
	);
};

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
						Name: { value: "scalars", href: "", tag: "code" },
						Description: "Specifies the values for chart rings",
						Type: "number[]",
						Required: "No",
						Default: "[0, 20, 40, 60, 80, 100]",
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
			<DocumentationNote>All values are expected to be on a shared scale for meaningful comparison across axes.</DocumentationNote>
			<DocumentationHeading>Styling</DocumentationHeading>
			<DocumentationParagraph>
				Custom styling can be applied by targeting the class names below. Each class corresponds to a specific element for precise
				theming and overrides.
			</DocumentationParagraph>
			<DocumentationTable
				columns={["Class Name", "Element"]}
				data={[
					{
						"Class Name": "radar__data-fill",
						Element: "Filled polygon showing the dataset",
					},
					{
						"Class Name": "radar__data-point",
						Element: "Each visible point of the data shape",
					},
					{
						"Class Name": "radar__data-point-glow",
						Element: "Drop shadow behind each data point",
					},
					{
						"Class Name": "radar__axis-label",
						Element: "Labels for each axis/category around the outer ring",
					},
					{
						"Class Name": "radar__axis-dot",
						Element: "Small dot next to each axis label on the outer ring",
					},
					{
						"Class Name": "radar__tick-label",
						Element: "Numeric scale values shown at each ring level",
					},
					{
						"Class Name": "radar__ring-odd",
						Element: "Background rings",
					},
					{
						"Class Name": "radar__ring-even",
						Element: "Alternate background rings",
					},
					{
						"Class Name": "radar__wedge",
						Element: "Hoverable wedge-shaped segment between axes",
					},
				]}
				renderers={{ "Class Name": (val) => <Code>{val}</Code> }}
			/>
		</DocumentationLayout>
	);
}
