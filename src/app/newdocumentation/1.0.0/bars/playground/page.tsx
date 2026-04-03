"use client";

import { useState, useEffect, ComponentProps } from "react";
import { Graph } from "../../../../../components/Graph/Graph";
import { Bars } from "../../../../../components/Bars/Bars";
import { GridLines } from "../../../../../components/GridLines/GridLines";
import { XAxis } from "../../../../../components/XAxis/XAxis";
import { YAxis } from "../../../../../components/YAxis/YAxis";
import { Legend } from "../../../../../components/Legend/Legend";
import { ControlSection, Toggle, Chips, Slider, PlaygroundLayout } from "../../../components/Playground";
import "nanoplot/styles.css";

/* ─────────────────────────── DATA ─────────────────────────── */

const categoryData = [
	{
		name: "Male",
		data: [
			{ x: "18-24", y: 42000 },
			{ x: "25-34", y: 58000 },
			{ x: "35-44", y: 72000 },
			{ x: "45-54", y: 65000 },
			{ x: "55-64", y: 48000 },
			{ x: "65+", y: 32000 },
		],
		fill: "rgba(59, 130, 246, 0.8)",
	},
	{
		name: "Female",
		data: [
			{ x: "18-24", y: 38000 },
			{ x: "25-34", y: 55000 },
			{ x: "35-44", y: 69000 },
			{ x: "45-54", y: 63000 },
			{ x: "55-64", y: 45000 },
			{ x: "65+", y: 30000 },
		],
		fill: "rgba(236, 72, 153, 0.8)",
	},
];

/* ─────────────────────────── CODE GENERATION ─────────────────────────── */

function generateCode(opts: {
	bars: ComponentProps<typeof Bars>;
	gridline: ComponentProps<typeof GridLines>;
	xaxis: ComponentProps<typeof XAxis>;
	yaxis: ComponentProps<typeof YAxis>;
	legend: ComponentProps<typeof Legend>;
}) {
	const lines: string[] = [
		`import { Graph } from "nanoplot/Graph";`,
		`import { Bars } from "nanoplot/Bars";`,
		`import { GridLines } from "nanoplot/GridLines";`,
		`import { XAxis } from "nanoplot/XAxis";`,
		`import { YAxis } from "nanoplot/YAxis";`,
		`import { Legend } from "nanoplot/Legend";`,
		`import "nanoplot/styles.css";`,
		``,
		`export default function MyBars() {`,
		`  return (`,
		`    <Graph data={DATA}>`,
	];

	if (opts.legend.position === "top" || opts.legend.position === "left") {
		const p = [`position="${opts.legend.position}"`, opts.legend.alignment && `alignment="${opts.legend.alignment}"`]
			.filter(Boolean)
			.join(" ");
		lines.push(`      <Legend ${p} />`);
	}

	const yp = [opts.yaxis.title && `title="${opts.yaxis.title}"`, opts.yaxis.description && `description="${opts.yaxis.description}"`]
		.filter(Boolean)
		.join(" ");
	lines.push(`      <YAxis${yp ? " " + yp : ""} />`);

	const gp = [opts.gridline.border && "border", opts.gridline.horizontal && "horizontal", opts.gridline.vertical && "vertical"]
		.filter(Boolean)
		.join(" ");
	lines.push(`      <GridLines${gp ? " " + gp : ""} />`);

	const sp = [opts.bars.loading && "loading", opts.bars.labels && "labels", opts.bars.horizontal && "horizontal"]
		.filter(Boolean)
		.join(" ");
	lines.push(`      <Bars${sp ? " " + sp : ""} />`);

	if (opts.legend.position === "right" || opts.legend.position === "bottom") {
		const p = [`position="${opts.legend.position}"`, opts.legend.alignment && `alignment="${opts.legend.alignment}"`]
			.filter(Boolean)
			.join(" ");
		lines.push(`      <Legend ${p} />`);
	}

	const xp = [opts.xaxis.title && `title="${opts.xaxis.title}"`, opts.xaxis.description && `description="${opts.xaxis.description}"`]
		.filter(Boolean)
		.join(" ");
	lines.push(`      <XAxis${xp ? " " + xp : ""} />`);

	lines.push(`    </Graph>`, `  );`, `}`);
	return lines.join("\n");
}

/* ─────────────────────────── PAGE ─────────────────────────── */

const DEFAULTS = {
	bars: {} as ComponentProps<typeof Bars>,
	gridline: { border: true, horizontal: true, vertical: false } as ComponentProps<typeof GridLines>,
	xaxis: {} as ComponentProps<typeof XAxis>,
	yaxis: {} as ComponentProps<typeof YAxis>,
	legend: { position: "top", alignment: "end" } as ComponentProps<typeof Legend>,
};

export default function PlaygroundPage() {
	const [mounted, setMounted] = useState(false);
	useEffect(() => setMounted(true), []);

	const [bars, setBars] = useState(DEFAULTS.bars);
	const [gridline, setGridline] = useState(DEFAULTS.gridline);
	const [xaxis, setXAxis] = useState(DEFAULTS.xaxis);
	const [yaxis, setYAxis] = useState(DEFAULTS.yaxis);
	const [legend, setLegend] = useState(DEFAULTS.legend);

	const code = generateCode({ bars, gridline, xaxis, yaxis, legend });

	const handleReset = () => {
		setBars(DEFAULTS.bars);
		setGridline(DEFAULTS.gridline);
		setXAxis(DEFAULTS.xaxis);
		setYAxis(DEFAULTS.yaxis);
		setLegend(DEFAULTS.legend);
	};

	if (!mounted) return null;

	const graphArea = (
		<div className="flex-1 p-5 min-h-0">
			<Graph
				data={categoryData}
				gap={{ top: 15, left: 15, right: 36, bottom: 15 }}
			>
				{(legend.position === "top" || legend.position === "left") && <Legend {...legend} />}
				<YAxis {...yaxis} />
				<GridLines {...gridline} />
				<Bars {...bars} />
				{legend.position === "right" && <Legend {...legend} />}
				<XAxis {...xaxis} />
				{legend.position === "bottom" && <Legend {...legend} />}
			</Graph>
		</div>
	);

	const controls = (
		<>
			<ControlSection title="Bars">
				<Toggle
					label="horizontal"
					checked={!!bars.horizontal}
					onChange={(v) => setBars((s) => ({ ...s, horizontal: v }))}
				/>
				<Toggle
					label="loading"
					checked={!!bars.loading}
					onChange={(v) => setBars((s) => ({ ...s, loading: v }))}
				/>
				<Toggle
					label="labels"
					checked={!!bars.labels}
					onChange={(v) => setBars((s) => ({ ...s, labels: v }))}
				/>
				<Toggle
					label="glow"
					checked={!!bars.glow}
					onChange={(v) => setBars((s) => ({ ...s, glow: v }))}
				/>
				<Slider
					label="size"
					value={bars.size ?? 50}
					min={10}
					max={100}
					onChange={(v) => setBars((s) => ({ ...s, size: v }))}
				/>
				<Slider
					label="radius"
					value={bars.radius ?? 0}
					min={0}
					max={20}
					onChange={(v) => setBars((s) => ({ ...s, radius: v }))}
				/>
			</ControlSection>

			<ControlSection title="Legend">
				<Chips
					label="position"
					options={["top", "right", "bottom", "left"] as const}
					value={legend.position}
					onChange={(v) => setLegend((s) => ({ ...s, position: v === s.position ? undefined : v }))}
				/>
				<Chips
					label="alignment"
					options={["center", "start", "end"] as const}
					value={legend.alignment}
					onChange={(v) => setLegend((s) => ({ ...s, alignment: v === s.alignment ? undefined : v }))}
				/>
			</ControlSection>

			<ControlSection title="GridLines">
				<Toggle
					label="border"
					checked={!!gridline.border}
					onChange={(v) => setGridline((s) => ({ ...s, border: v }))}
				/>
				<Toggle
					label="horizontal"
					checked={!!gridline.horizontal}
					onChange={(v) => setGridline((s) => ({ ...s, horizontal: v }))}
				/>
				<Toggle
					label="vertical"
					checked={!!gridline.vertical}
					onChange={(v) => setGridline((s) => ({ ...s, vertical: v }))}
				/>
			</ControlSection>

			<ControlSection title="X Axis" defaultOpen={false}>
			</ControlSection>

			<ControlSection title="Y Axis" defaultOpen={false}>
			</ControlSection>
		</>
	);

	return (
		<PlaygroundLayout
			title="Bars Playground"
			code={code}
			onReset={handleReset}
			graphArea={graphArea}
			controls={controls}
		/>
	);
}
