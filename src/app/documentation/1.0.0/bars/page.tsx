"use client";
import * as React from "react";
import { DocumentationNote } from "../../../../components/Documentation/DocumentationNote/DocumentationNote";
import { DocumentationTable } from "../../../../components/Documentation/DocumentationTable/DocumentationTable";
import { DocumentationHeading } from "../../../../components/Documentation/DocumentationHeading/DocumentationHeading";
import { DocumentationParagraph } from "../../../../components/Documentation/DocumentationParagraph/DocumentationParagraph";
import { Sandpack } from "../../../../components/Documentation/Sandpack/Sandpack";
import { DocumentationCode as Code } from "../../../../components/Documentation/DocumentationCode/DocumentationCode";
import { JSX } from "react";

export default function Page() {
	return (
		<>
			<div className={"p-8"}>
				<DocumentationHeading level={1}>Bar Chart</DocumentationHeading>
				<DocumentationParagraph>Bar charts are used to compare discrete values across categories.</DocumentationParagraph>
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
import { Bars } from "nanoplot/Bars";
import { Graph } from "nanoplot/Graph";
import { Legend } from "nanoplot/Legend";
import { GridLines } from "nanoplot/GridLines";
import { XAxis } from "nanoplot/XAxis";
import { YAxis } from "nanoplot/YAxis";
import "nanoplot/styles.css";

export default () => {
	return (
		<div className={"h-[350px] w-[100%] m-auto dark:bg-black"}>
			<Graph
				data={[
					{
						name: "Male",
						fill: "linear-gradient(to bottom, #e93157 0%, #fbad26 100%)",
						data: [
							{ x: "Jan", y: 5_000 },
							{ x: "Feb", y: 20_000 },
							{ x: "Mar", y: 45_000 },
							{ x: "Apr", y: 20_000 },
						],
					},
					{
						name: "Female",
						fill: "linear-gradient(to bottom, #1c8cdc 0%, #4cc7b0 100%)",
						data: [
							{ x: "Jan", y: 45_000 },
							{ x: "Feb", y: 10_000 },
							{ x: "Mar", y: 15_000 },
							{ x: "Apr", y: 30_000 },
						],
					},
				]}
			>
					<Legend position={"top"} />
					<YAxis/>
					<GridLines />
					<Bars
						horizontal={false}
						labels={{
							position: "above",
							collision: true,
							display: (v) => {
								return new Intl.NumberFormat("en", {
									notation: "compact",
									compactDisplay: "short",
									maximumFractionDigits: 2,
								}).format(Number(v));
							},
						}}
					/>
					<XAxis/>
			</Graph>
		</div>
	);
};
`,
					}}
				/>

				<DocumentationNote>
					Bar charts are versatile and can support stacked bars for cumulative totals, 100% stacked bars to compare relative
					proportions, and differential bars showing positive and negative changes relative to an anchor value.
				</DocumentationNote>
				<DocumentationHeading>Props</DocumentationHeading>
				<DocumentationTable
					columns={["Name", "Description", "Type", "Required", "Default"]}
					data={[
						{
							Name: { value: "labels", tag: "code" },
							Description: "Adds chart labels and defines their position",
							Type: (
								<>
									<Code>boolean</Code>
									<br />| <Code>(value: string | number | Date) ={">"} string</Code>
									<br />|
									<Code>{`{position: "above" | "center"; collision?: boolean; display: (value: string | number | Date) => string;}`}</Code>
								</>
							),
							Required: "No",
							Default: "-",
						},
						{
							Name: { value: "horizontal", tag: "code" },
							Description: "Horizontal bar chart",
							Type: "boolean",
							Required: "No",
							Default: "false",
						},
						{
							Name: { value: "anchor", tag: "code" },
							Description: "Used to set the baseline for a diverging bar chart (positive/negative bars)",
							Type: "number",
							Required: "No",
							Default: "0",
						},
						{
							Name: { value: "size", tag: "code" },
							Description: "Width of the bars as a percent (0-100)",
							Type: "number",
							Required: "No",
							Default: "50",
						},
						{
							Name: { value: "radius", tag: "code" },
							Description: "Radius of the bars as an angle (0-360)",
							Type: "number",
							Required: "No",
							Default: "0",
						},
						{
							Name: { value: "glow", tag: "code" },
							Description: "Adds a glow effect around the bars",
							Type: "boolean",
							Required: "No",
							Default: "false",
						},
						{
							Name: { value: "children", tag: "code" },
							Description: "Custom element rendered within the chart",
							Type: "ReactNode",
							Required: "No",
							Default: "-",
						},
						{
							Name: { value: "loading", href: "/", tag: "code" },
							Description: "Displays a loading skeleton",
							Type: "boolean",
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
						Type: (v) => v,
						Default: (val) => <Code>{val}</Code>,
					}}
				/>

				<DocumentationHeading>Styling</DocumentationHeading>
				<DocumentationParagraph>
					Custom styling can be applied to the bars and corresponding labels, by targeting the class names below.
				</DocumentationParagraph>
				<DocumentationTable
					columns={["Class Name", "Element"]}
					data={[
						{
							"Class Name": "bars__bar",
							Element: (
								<>
									The <Code>rect</Code> element representing each bar
								</>
							),
						},
						{
							"Class Name": "bars__label",
							Element: "Container for each data label",
						},
						{
							"Class Name": "bars__label-text",
							Element: "Span containing the label text",
						},
					]}
					renderers={{ "Class Name": (val) => <Code>{val}</Code>, Element: (v: JSX.Element | string) => v }}
				/>
			</div>
		</>
	);
}
