"use client";
import { DocumentationHeading } from "../../../../components/Documentation/DocumentationHeading/DocumentationHeading";
import { DocumentationParagraph } from "../../../../components/Documentation/DocumentationParagraph/DocumentationParagraph";
import * as React from "react";
import { Sandpack } from "../../../../components/Documentation/Sandpack/Sandpack";
import { DocumentationTable } from "../../../../components/Documentation/DocumentationTable/DocumentationTable";
import { DocumentationCode as Code } from "../../../../components/Documentation/DocumentationCode/DocumentationCode";
import { JSX } from "react";
import { DocumentationLayout } from "../../../../components/Documentation/DocumentationLayout/DocumentationLayout";

export default function Page() {
	return (
		<DocumentationLayout>
			<DocumentationHeading level={1}>Worldmap</DocumentationHeading>
			<DocumentationParagraph>
				Worldmap heatmaps show data by coloring each region on a map, making it easy to see where values are high or low at a
				glance. They help you quickly spot geographic trends and differences.
			</DocumentationParagraph>
			<Sandpack
				files={{
					"App.js": `
import { Graph } from "nanoplot/Graph";
import { Worldmap } from "nanoplot/Worldmap";
import { GradientLegend } from "nanoplot/GradientLegend";
import "nanoplot/styles.css";

export default function App() {
	const DATA = [
		{ name: "AR", value: 3287 },
		{ name: "AT", value: 2100 },
		{ name: "AU", value: 6098 },
		{ name: "BE", value: 2460 },
		{ name: "BR", value: 9550 },
		{ name: "CA", value: 8421 },
		{ name: "CH", value: 4378 },
		{ name: "CN", value: 11500 },
		{ name: "DE", value: 10500 },
		{ name: "DK", value: 1987 },
		{ name: "ES", value: 5478 },
		{ name: "FI", value: 1760 },
		{ name: "FR", value: 10200 },
		{ name: "GB", value: 10000 },
		{ name: "GR", value: 1590 },
		{ name: "IE", value: 1683 },
		{ name: "IN", value: 11200 },
		{ name: "IT", value: 6512 },
		{ name: "JP", value: 10700 },
		{ name: "KR", value: 7053 },
		{ name: "MX", value: 7850 },
		{ name: "NL", value: 4320 },
		{ name: "NO", value: 2150 },
		{ name: "NZ", value: 3950 },
		{ name: "PL", value: 3890 },
		{ name: "PT", value: 2950 },
		{ name: "RU", value: 11000 },
		{ name: "SE", value: 3050 },
		{ name: "TR", value: 3245 },
		{ name: "US", value: 12000 },
		{ name: "ZA", value: 2765 },
	];
	return (
		<div className={"h-[70vh] w-[650px] p-4 px-10"}>
			<Graph data={DATA}>
				<GradientLegend
					position={"top"}
					gradient={"linear-gradient(90deg, #e1efff 0%, #a3c5ff 50%, #4285f4 100%)"}
					scalars={[Math.min(...DATA.map((d) => d.value)), Math.max(...DATA.map((d) => d.value))]}
				/>
				<Worldmap gradient={"linear-gradient(90deg, #e1efff 0%, #a3c5ff 50%, #4285f4 100%)"} />
				<Worldmap.Tooltip
					tooltip={(dp) => {
						return (
							<div>
								<div className={"flex items-center"}>
									<img
										src={\`https://flagcdn.com/w40/\${dp.name.toLowerCase()}.png\`}
										alt={""}
										width={30}
										height={20}
										className={"shrink-0 block"}
										unoptimized
									/>
									<div className={"mx-[4px] text-sm font-bold"}>{dp.name}</div>
									<div className={"mx-[4px] text-sm font-bold"}>{dp.value.toString()}</div>
								</div>
								<div className={"h-[3px] w-[64px] mt-[4px]"} style={{ background: dp.fill }} />
							</div>
						)
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
						Name: { value: "translate", href: "", tag: "code" },
						Description: "Sets the translation and scale of the worldmap",
						Type: <Code>{`{ x: number; y: number; scale: number }`}</Code>,
						Required: "No",
						Default: "{ x: 0, y: 0, scale: 0 }",
					},
					{
						Name: { value: "gradient", href: "", tag: "code" },
						Description: "Sets the gradient color of the worldmap as heatmap",
						Type: <Code>{`linear-gradient(\${string})`}</Code>,
						Required: "No",
						Default: "-",
					},
					{
						Name: { value: "className", href: "", tag: "code" },
						Description: "Custom class name for the SVG element",
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
						"Class Name": "worldmap",
						Element: "The base SVG element that wraps all countries.",
					},
					{
						"Class Name": "worldmap__country",
						Element: "The path element representing individual country shapes.",
					},
				]}
				renderers={{ "Class Name": (val) => <Code>{val}</Code> }}
			/>
		</DocumentationLayout>
	);
}
