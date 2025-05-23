"use client";
import * as React from "react";
import { DocumentationTable } from "../../../../components/Documentation/DocumentationTable/DocumentationTable";
import { DocumentationHeading } from "../../../../components/Documentation/DocumentationHeading/DocumentationHeading";
import { DocumentationParagraph } from "../../../../components/Documentation/DocumentationParagraph/DocumentationParagraph";
import { Sandpack } from "../../../../components/Documentation/Sandpack/Sandpack";
import { DocumentationCode as Code } from "../../../../components/Documentation/DocumentationCode/DocumentationCode";
import { JSX } from "react";

export default function Page() {
	return (
		<div className={"p-8"}>
			<DocumentationHeading level={1}>Line Graph</DocumentationHeading>
			<DocumentationParagraph>
				Line graphs are used to visualise continuous datasets, showing patterns, trends, and changes over time.
			</DocumentationParagraph>
			<Sandpack
				files={{
					"App.js": `
import { Graph } from "nanoplot/Graph";
import { Lines } from "nanoplot/Lines";
import { YAxis } from "nanoplot/YAxis";
import { XAxis } from "nanoplot/XAxis";
import { GridLines } from "nanoplot/GridLines";
import { Legend } from "nanoplot/Legend";
import "nanoplot/styles.css";

export default function App() {
	return (
		<div className={"h-[70vh] w-[100%] p-4 px-10"}>
			<Graph
				data={[
				{
					name: "New Users",
					stroke: "#FF4B4B",
					data: [
						{ x: new Date(2024, 0, 1, 0, 0, 0, 0), y: 20 },
						{ x: new Date(2024, 1, 1, 0, 0, 0, 0), y: 25 },
						{ x: new Date(2024, 2, 1, 0, 0, 0, 0), y: 50 },
						{ x: new Date(2024, 3, 1, 0, 0, 0, 0), y: 45 },
						{ x: new Date(2024, 4, 1, 0, 0, 0, 0), y: 35 },
						{ x: new Date(2024, 5, 1, 0, 0, 0, 0), y: 55 },
						{ x: new Date(2024, 6, 1, 0, 0, 0, 0), y: 55 },
						{ x: new Date(2024, 7, 1, 0, 0, 0, 0), y: 99.5 },
						{ x: new Date(2024, 8, 1, 0, 0, 0, 0), y: 85 },
						{ x: new Date(2024, 9, 1, 0, 0, 0, 0), y: 70 },
						{ x: new Date(2024, 10, 1, 0, 0, 0, 0), y: 72 },
						{ x: new Date(2024, 11, 1, 0, 0, 0, 0), y: 75 },
					],
				},
				{
					name: "Registered Users",
					stroke: "#33D4FF",
					data: [
						{ x: new Date(2024, 0, 1, 0, 0, 0, 0), y: 45 },
						{ x: new Date(2024, 1, 1, 0, 0, 0, 0), y: 60 },
						{ x: new Date(2024, 2, 1, 0, 0, 0, 0), y: 55 },
						{ x: new Date(2024, 3, 1, 0, 0, 0, 0), y: 70 },
						{ x: new Date(2024, 4, 1, 0, 0, 0, 0), y: 70 },
						{ x: new Date(2024, 5, 1, 0, 0, 0, 0), y: 75 },
						{ x: new Date(2024, 6, 1, 0, 0, 0, 0), y: 60 },
						{ x: new Date(2024, 7, 1, 0, 0, 0, 0), y: 55 },
						{ x: new Date(2024, 8, 1, 0, 0, 0, 0), y: 80 },
						{ x: new Date(2024, 9, 1, 0, 0, 0, 0), y: 85 },
						{ x: new Date(2024, 10, 1, 0, 0, 0, 0), y: 80 },
						{ x: new Date(2024, 11, 1, 0, 0, 0, 0), y: 82 },
					],
				},
				]}
			>
				<Legend alignment={"end"} position={"top"} />
				<YAxis />
				<GridLines border />
				<Lines curve={"natural"} />
				<Lines.Tooltip/>
				<XAxis
					ticks={{ jumps: "P1M" }}
					display={(x) => {
						const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
						if (typeof x === "number" || typeof x === "string") return null;
						return months[x.getMonth()];
					}}
				/>
			</Graph>
		</div>
	)
}
`,
				}}
			/>
			<DocumentationHeading>Props</DocumentationHeading>
			<DocumentationTable
				columns={["Name", "Description", "Type", "Required", "Default"]}
				data={[
					{
						Name: { value: "children", href: "", tag: "code" },
						Description: "Custom SVG element rendered inside the graph",
						Type: <Code>ReactNode</Code>,
						Required: "No",
						Default: "-",
					},
					{
						Name: { value: "curve", href: "", tag: "code" },
						Description: "Sets the curve type used to render the line path between data points",
						Type: (
							<>
								<Code>'linear'</Code> | <Code>'natural'</Code> | <Code>'monotoneX'</Code> | <Code>'stepBefore'</Code> |{" "}
								<Code>'stepAfter'</Code>
							</>
						),
						Required: "No",
						Default: "'linear'",
					},
					{
						Name: { value: "joints", href: "", tag: "code" },
						Description: "Displays a point at every data coordinate along the line",
						Type: <Code>boolean</Code>,
						Required: "No",
						Default: "false",
					},
					{
						Name: { value: "loading", href: "", tag: "code" },
						Description: "Displays a loading skeleton",
						Type: <Code>boolean</Code>,
						Required: "No",
						Default: "false",
					},
					{
						Name: { value: "dataset", href: "", tag: "code" },
						Description: (
							<>
								Key matching a property in the <Code>datasets</Code> prop in <Code>{"<Graph />"}</Code>
							</>
						),
						Type: <Code>string</Code>,
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
					Description: (v: JSX.Element | string) => v,
					Type: (v: JSX.Element | string) => v,
					Default: (val) => <Code>{val}</Code>,
				}}
			/>

			<DocumentationHeading>Styling</DocumentationHeading>
			<DocumentationParagraph>
				Custom styling can be applied by targeting the class names below. Each class corresponds to a specific element for precise
				theming and overrides.
			</DocumentationParagraph>
			<DocumentationTable
				columns={["Class Name", "Element"]}
				data={[
					{
						"Class Name": "lines__stroke",
						Element: "The line path",
					},
					{
						"Class Name": "lines__fill",
						Element: "Filled area beneath the line",
					},
					{
						"Class Name": "lines__joints",
						Element: "Point markers along the line",
					},
				]}
				renderers={{ "Class Name": (val) => <Code>{val}</Code> }}
			/>
		</div>
	);
}
