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
			<Sandpack files={{ "App.js": pieExample }} options={{ editorWidthPercentage: 35 }} />
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
	const cookies = [
		{ id: "US", name: "US", value: 17226 },
		{ id: "CN", name: "China", value: 15397 },
		{ id: "JP", name: "Japan", value: 12573 },
		{ id: "AU", name: "Australia", value: 10659 },
		{ id: "NZ", name: "New Zealand", value: 8411 },
		{ id: "DE", name: "Germany", value: 8328 },
		{ id: "FR", name: "France", value: 7162 },
		{ id: "GB", name: "United Kingdom", value: 1582 },
		{ id: "IT", name: "Italy", value: 1582 },
		{ id: "ES", name: "Spain", value: 583 },
	];
	const totalCookies = cookies.reduce((sum, cookie) => sum + cookie.value, 0);
	return (
		<div className={"h-[500px] w-[60%] m-auto dark:bg-black"}>
			<Graph data={cookies}>
				<Pie labels={true}/>
				<Pie.Tooltip>
					{(segment) => {
						const fill = segment.fill;
						if (typeof segment.value !== "number" || typeof fill !== "string") return null;
						const bg = \`linear-gradient(\${lightenColor(fill, 20)}, \${fill})\`;
						return (
							<div
								style={{ border: \`2px solid \${lightenColor(fill, 50)}\`, background: bg }}
								className={"text-black rounded-[2px] opacity-[0.9] user-select-none"}
							>
								<div
									style={{
										borderBottom: \`2px solid \${lightenColor(fill, 50)}\`,
									}}
									className={"w-[200px] h-[45px] px-[4px] py-[6px] flex items-center gap-2"}
								>
									<img src={\`https://flagcdn.com/h24/\${segment.id.toLowerCase()}.png\`} width="24" height="18" />
									<div>
										<div
											className={
												"max-w-[120px] text-sm font-bold whitespace-nowrap overflow-hidden text-ellipsis"
											}
										>
											{segment.name}
										</div>
										<div
											className={
												"w-[150px] max-w-[150px] text-xs overflow-hidden text-ellipsis whitespace-nowrap capitalize"
											}
										>
											{segment.value} cookies sold
										</div>
									</div>
								</div>
								<div className={"w-[200px] h-[35px] flex items-baseline gap-[6px] pb-[10px] pl-[6px]"}>
									<div className={"text-xl font-bold"}>
										{\`\${new Intl.NumberFormat("en-US", {
											minimumFractionDigits: 0,
											maximumFractionDigits: 2,
										}).format((segment.value / totalCookies) * 100)}%\`\}
									</div>
									<div className={"text-sm font-bold"}>Cookies Sold</div>
								</div>
							</div>
						);
					}}
				</Pie.Tooltip>
			</Graph>
		</div>
	);
};

const lightenColor = (color: string, amt: number) => {
	color = color.replace(\`#\`, "");
	if (color.length === 6) {
		const decimalColor = parseInt(color, 16);
		let r = (decimalColor >> 16) + amt;
		r > 255 && (r = 255);
		r < 0 && (r = 0);
		let g = (decimalColor & 0x0000ff) + amt;
		g > 255 && (g = 255);
		g < 0 && (g = 0);
		let b = ((decimalColor >> 8) & 0x00ff) + amt;
		b > 255 && (b = 255);
		b < 0 && (b = 0);
		const newColor = \`\${(g | (b << 8) | (r << 16)).toString(16)}\`;
		if (newColor.length === 4) return \`#00\${newColor}\`;
		return \`#\${newColor}\`;
	}
	return color;
};
`;
