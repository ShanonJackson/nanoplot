"use client";
import * as React from "react";
import { JSX } from "react";
import { DocumentationNote } from "../../../../components/Documentation/DocumentationNote/DocumentationNote";
import { DocumentationTable } from "../../../../components/Documentation/DocumentationTable/DocumentationTable";
import { DocumentationHeading } from "../../../../components/Documentation/DocumentationHeading/DocumentationHeading";
import { DocumentationParagraph } from "../../../../components/Documentation/DocumentationParagraph/DocumentationParagraph";
import { Sandpack } from "../../../../components/Documentation/Sandpack/Sandpack";
import { DocumentationCode as Code } from "../../../../components/Documentation/DocumentationCode/DocumentationCode";

export default function Page() {
	return (
		<div className={"p-8"}>
			<DocumentationHeading level={1}>Area Chart</DocumentationHeading>
			<DocumentationParagraph>
				An area chart displays trends over time. In stacked versions, each series is layered to highlight cumulative trends and
				combined totals.
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
					"App.js": `import { Graph } from "nanoplot/Graph";
import { Area } from "nanoplot/Area";
import { YAxis } from "nanoplot/YAxis";
import { XAxis } from "nanoplot/XAxis";
import { GridLines } from "nanoplot/GridLines";
import "nanoplot/styles.css";

export default () => {
	return (
		<div className={"h-[70vh] w-[100%] p-4 px-10"}>
			<Graph
				data={[
					{
						name: "Email",
						group: "Site Traffic",
						data: [
							{ x: new Date(2024, 0, 1, 0, 0, 0, 0), y: 4 },
							{ x: new Date(2024, 1, 1, 0, 0, 0, 0), y: 2 },
							{ x: new Date(2024, 2, 1, 0, 0, 0, 0), y: 3 },
							{ x: new Date(2024, 3, 1, 0, 0, 0, 0), y: 4 },
							{ x: new Date(2024, 4, 1, 0, 0, 0, 0), y: 5 },
							{ x: new Date(2024, 5, 1, 0, 0, 0, 0), y: 3 },
							{ x: new Date(2024, 6, 1, 0, 0, 0, 0), y: 5 },
							{ x: new Date(2024, 7, 1, 0, 0, 0, 0), y: 2 },
							{ x: new Date(2024, 8, 1, 0, 0, 0, 0), y: 4 },
							{ x: new Date(2024, 9, 1, 0, 0, 0, 0), y: 4 },
							{ x: new Date(2024, 10, 1, 0, 0, 0, 0), y: 3 },
							{ x: new Date(2024, 11, 1, 0, 0, 0, 0), y: 4 },
						],
					},
					{
						name: "Social",
						group: "Site Traffic",
						data: [
							{ x: new Date(2024, 0, 1, 0, 0, 0, 0), y: 7 },
							{ x: new Date(2024, 1, 1, 0, 0, 0, 0), y: 9 },
							{ x: new Date(2024, 2, 1, 0, 0, 0, 0), y: 8 },
							{ x: new Date(2024, 3, 1, 0, 0, 0, 0), y: 8 },
							{ x: new Date(2024, 4, 1, 0, 0, 0, 0), y: 7 },
							{ x: new Date(2024, 5, 1, 0, 0, 0, 0), y: 10 },
							{ x: new Date(2024, 6, 1, 0, 0, 0, 0), y: 8 },
							{ x: new Date(2024, 7, 1, 0, 0, 0, 0), y: 9 },
							{ x: new Date(2024, 8, 1, 0, 0, 0, 0), y: 7 },
							{ x: new Date(2024, 9, 1, 0, 0, 0, 0), y: 9 },
							{ x: new Date(2024, 10, 1, 0, 0, 0, 0), y: 7 },
							{ x: new Date(2024, 11, 1, 0, 0, 0, 0), y: 8 },
						],
					},
					{
						name: "Direct",
						group: "Site Traffic",
						data: [
							{ x: new Date(2024, 0, 1, 0, 0, 0, 0), y: 12 },
							{ x: new Date(2024, 1, 1, 0, 0, 0, 0), y: 14 },
							{ x: new Date(2024, 2, 1, 0, 0, 0, 0), y: 12 },
							{ x: new Date(2024, 3, 1, 0, 0, 0, 0), y: 11 },
							{ x: new Date(2024, 4, 1, 0, 0, 0, 0), y: 11 },
							{ x: new Date(2024, 5, 1, 0, 0, 0, 0), y: 13 },
							{ x: new Date(2024, 6, 1, 0, 0, 0, 0), y: 14 },
							{ x: new Date(2024, 7, 1, 0, 0, 0, 0), y: 12 },
							{ x: new Date(2024, 8, 1, 0, 0, 0, 0), y: 11 },
							{ x: new Date(2024, 9, 1, 0, 0, 0, 0), y: 12 },
							{ x: new Date(2024, 10, 1, 0, 0, 0, 0), y: 12 },
							{ x: new Date(2024, 11, 1, 0, 0, 0, 0), y: 12 },
						],
					},
					{
						name: "Referral",
						group: "Site Traffic",
						data: [
							{ x: new Date(2024, 0, 1, 0, 0, 0, 0), y: 14 },
							{ x: new Date(2024, 1, 1, 0, 0, 0, 0), y: 14 },
							{ x: new Date(2024, 2, 1, 0, 0, 0, 0), y: 12 },
							{ x: new Date(2024, 3, 1, 0, 0, 0, 0), y: 13 },
							{ x: new Date(2024, 4, 1, 0, 0, 0, 0), y: 14 },
							{ x: new Date(2024, 5, 1, 0, 0, 0, 0), y: 16 },
							{ x: new Date(2024, 6, 1, 0, 0, 0, 0), y: 15 },
							{ x: new Date(2024, 7, 1, 0, 0, 0, 0), y: 15 },
							{ x: new Date(2024, 8, 1, 0, 0, 0, 0), y: 14 },
							{ x: new Date(2024, 9, 1, 0, 0, 0, 0), y: 14 },
							{ x: new Date(2024, 10, 1, 0, 0, 0, 0), y: 15 },
							{ x: new Date(2024, 11, 1, 0, 0, 0, 0), y: 16 },
						],
					},
					{
						name: "Paid Search",
						group: "Site Traffic",
						data: [
							{ x: new Date(2024, 0, 1, 0, 0, 0, 0), y: 26 },
							{ x: new Date(2024, 1, 1, 0, 0, 0, 0), y: 25 },
							{ x: new Date(2024, 2, 1, 0, 0, 0, 0), y: 23 },
							{ x: new Date(2024, 3, 1, 0, 0, 0, 0), y: 28 },
							{ x: new Date(2024, 4, 1, 0, 0, 0, 0), y: 26 },
							{ x: new Date(2024, 5, 1, 0, 0, 0, 0), y: 25 },
							{ x: new Date(2024, 6, 1, 0, 0, 0, 0), y: 25 },
							{ x: new Date(2024, 7, 1, 0, 0, 0, 0), y: 26 },
							{ x: new Date(2024, 8, 1, 0, 0, 0, 0), y: 28 },
							{ x: new Date(2024, 9, 1, 0, 0, 0, 0), y: 26 },
							{ x: new Date(2024, 10, 1, 0, 0, 0, 0), y: 26 },
							{ x: new Date(2024, 11, 1, 0, 0, 0, 0), y: 27 },
						],
					},
					{
						name: "Organic",
						group: "Site Traffic",
						data: [
							{ x: new Date(2024, 0, 1, 0, 0, 0, 0), y: 37 },
							{ x: new Date(2024, 1, 1, 0, 0, 0, 0), y: 36 },
							{ x: new Date(2024, 2, 1, 0, 0, 0, 0), y: 42 },
							{ x: new Date(2024, 3, 1, 0, 0, 0, 0), y: 36 },
							{ x: new Date(2024, 4, 1, 0, 0, 0, 0), y: 37 },
							{ x: new Date(2024, 5, 1, 0, 0, 0, 0), y: 33 },
							{ x: new Date(2024, 6, 1, 0, 0, 0, 0), y: 33 },
							{ x: new Date(2024, 7, 1, 0, 0, 0, 0), y: 36 },
							{ x: new Date(2024, 8, 1, 0, 0, 0, 0), y: 36 },
							{ x: new Date(2024, 9, 1, 0, 0, 0, 0), y: 35 },
							{ x: new Date(2024, 10, 1, 0, 0, 0, 0), y: 37 },
							{ x: new Date(2024, 11, 1, 0, 0, 0, 0), y: 33 },
						],
					},
				]}
			>
				<YAxis ticks={{ to: 100 }} display={(y) => y.toString() + "%"} />
				<GridLines border horizontal vertical />
				<Area />
				<Area.Tooltip className={"bg-white dark:!bg-black"} />
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
	);
};
`,
				}}
			/>

			<DocumentationNote>
				Stacked area charts are a common use case, as shown in the example above, used to visualise cumulative trends over time.
			</DocumentationNote>

			<DocumentationHeading>Props</DocumentationHeading>
			<DocumentationTable
				columns={["Name", "Description", "Type", "Required", "Default"]}
				data={[
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
						Name: { value: "children", href: "", tag: "code" },
						Description: "Custom SVG element rendered inside the graph",
						Type: <Code>ReactNode</Code>,
						Required: "No",
						Default: "-",
					},
					{
						Name: { value: "loading", href: "", tag: "code" },
						Description: "Displays a loading skeleton",
						Type: <Code>boolean</Code>,
						Required: "No",
						Default: "false",
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
					Type: (v: JSX.Element | string) => v,
					Default: (val) => <Code>{val}</Code>,
				}}
			/>

			<DocumentationHeading>Styling</DocumentationHeading>
			<DocumentationParagraph>
				Custom styling can be applied to the area chart by targeting the class names below.
			</DocumentationParagraph>
			<DocumentationTable
				columns={["Class Name", "Element"]}
				data={[
					{
						"Class Name": "area__stroke",
						Element: "The line path",
					},
					{
						"Class Name": "area__fill",
						Element: "Filled area beneath the line",
					},
				]}
				renderers={{ "Class Name": (val) => <Code>{val}</Code> }}
			/>
		</div>
	);
}
