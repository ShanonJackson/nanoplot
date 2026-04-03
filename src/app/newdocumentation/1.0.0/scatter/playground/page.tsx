"use client";

import { useState, useEffect, ComponentProps } from "react";
import { Graph } from "../../../../../components/Graph/Graph";
import { Scatter } from "../../../../../components/Scatter/Scatter";
import { GridLines } from "../../../../../components/GridLines/GridLines";
import { XAxis } from "../../../../../components/XAxis/XAxis";
import { YAxis } from "../../../../../components/YAxis/YAxis";
import { Legend } from "../../../../../components/Legend/Legend";
import { ControlSection, Toggle, Chips, TextInput, Slider, PlaygroundLayout } from "../../../components/Playground";
import "nanoplot/styles.css";

/* ─────────────────────────── DATA ─────────────────────────── */

const random = (min: number, max: number) => Math.random() * (max - min) + min;

function generateData(count: number) {
	return new Array(count).fill(null).map(() => ({
		hours_studied: random(0, 50),
		test_score: random(0, 100),
	}));
}

/* ─────────────────────────── CODE GENERATION ─────────────────────────── */

function generateCode(opts: {
	scatter: ComponentProps<typeof Scatter>;
	gridline: ComponentProps<typeof GridLines>;
	xaxis: ComponentProps<typeof XAxis>;
	yaxis: ComponentProps<typeof YAxis>;
	legend: ComponentProps<typeof Legend>;
}) {
	const lines: string[] = [
		`import { Graph } from "nanoplot/Graph";`,
		`import { Scatter } from "nanoplot/Scatter";`,
		`import { GridLines } from "nanoplot/GridLines";`,
		`import { XAxis } from "nanoplot/XAxis";`,
		`import { YAxis } from "nanoplot/YAxis";`,
		`import { Legend } from "nanoplot/Legend";`,
		`import "nanoplot/styles.css";`,
		``,
		`export default function MyScatter() {`,
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

	const sp = [opts.scatter.loading && "loading", opts.scatter.labels && "labels"].filter(Boolean).join(" ");
	lines.push(`      <Scatter${sp ? " " + sp : ""} />`);
	lines.push(`      <Scatter.Tooltip tooltip={(p) => \`\${p.data.x}, \${p.data.y}\`} />`);

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
	scatter: {} as ComponentProps<typeof Scatter>,
	gridline: { border: true, horizontal: true, vertical: true } as ComponentProps<typeof GridLines>,
	xaxis: {} as ComponentProps<typeof XAxis>,
	yaxis: {} as ComponentProps<typeof YAxis>,
	legend: { position: "top", alignment: "end" } as ComponentProps<typeof Legend>,
	pointCount: 500,
};

export default function PlaygroundPage() {
	const [mounted, setMounted] = useState(false);
	useEffect(() => setMounted(true), []);

	const [scatter, setScatter] = useState(DEFAULTS.scatter);
	const [gridline, setGridline] = useState(DEFAULTS.gridline);
	const [xaxis, setXAxis] = useState(DEFAULTS.xaxis);
	const [yaxis, setYAxis] = useState(DEFAULTS.yaxis);
	const [legend, setLegend] = useState(DEFAULTS.legend);
	const [pointCount, setPointCount] = useState(DEFAULTS.pointCount);
	const [data] = useState(() => generateData(30000));

	const displayData = data.slice(0, pointCount);
	const code = generateCode({ scatter, gridline, xaxis, yaxis, legend });

	const handleReset = () => {
		setScatter(DEFAULTS.scatter);
		setGridline(DEFAULTS.gridline);
		setXAxis(DEFAULTS.xaxis);
		setYAxis(DEFAULTS.yaxis);
		setLegend(DEFAULTS.legend);
		setPointCount(DEFAULTS.pointCount);
	};

	if (!mounted) return null;

	const graphArea = (
		<div className="flex-1 p-5 min-h-0">
			<Graph
				data={[
					{
						name: "Hours Studied vs Test Score",
						data: displayData.map((dp) => ({ x: dp.hours_studied, y: dp.test_score })),
					},
				]}
				gap={{ top: 15, left: 15, right: 36, bottom: 15 }}
			>
				{(legend.position === "top" || legend.position === "left") && <Legend {...legend} />}
				<YAxis {...yaxis} />
				<GridLines {...gridline} />
				<Scatter {...scatter} />
				<Scatter.Tooltip
					tooltip={(point) => `${Number(point.data.x).toFixed(1)}, ${Number(point.data.y).toFixed(1)}`}
				/>
				{legend.position === "right" && <Legend {...legend} />}
				<XAxis {...xaxis} />
				{legend.position === "bottom" && <Legend {...legend} />}
			</Graph>
		</div>
	);

	const controls = (
		<>
			<ControlSection title="Data">
				<Slider label="Points" value={pointCount} min={10} max={30000} step={10} onChange={setPointCount} />
			</ControlSection>

			<ControlSection title="Scatter">
				<Toggle
					label="loading"
					checked={!!scatter.loading}
					onChange={(v) => setScatter((s) => ({ ...s, loading: v }))}
				/>
				<Toggle label="labels" checked={!!scatter.labels} onChange={(v) => setScatter((s) => ({ ...s, labels: v }))} />
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
				<TextInput
					label="title"
					value={xaxis.title?.toString() ?? ""}
					onChange={(v) => setXAxis((s) => ({ ...s, title: v || undefined }))}
					placeholder="e.g. Hours Studied"
				/>
				<TextInput
					label="description"
					value={xaxis.description?.toString() ?? ""}
					onChange={(v) => setXAxis((s) => ({ ...s, description: v || undefined }))}
					placeholder="e.g. Total hours per week"
				/>
			</ControlSection>

			<ControlSection title="Y Axis" defaultOpen={false}>
				<TextInput
					label="title"
					value={yaxis.title?.toString() ?? ""}
					onChange={(v) => setYAxis((s) => ({ ...s, title: v || undefined }))}
					placeholder="e.g. Test Score"
				/>
				<TextInput
					label="description"
					value={yaxis.description?.toString() ?? ""}
					onChange={(v) => setYAxis((s) => ({ ...s, description: v || undefined }))}
					placeholder="e.g. Score out of 100"
				/>
			</ControlSection>
		</>
	);

	return (
		<PlaygroundLayout
			title="Scatter Playground"
			code={code}
			onReset={handleReset}
			graphArea={graphArea}
			controls={controls}
		/>
	);
}
