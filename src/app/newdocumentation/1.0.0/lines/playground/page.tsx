"use client";

import { useState, useEffect, ComponentProps } from "react";
import { Graph } from "../../../../../components/Graph/Graph";
import { Lines } from "../../../../../components/Lines/Lines";
import { GridLines } from "../../../../../components/GridLines/GridLines";
import { XAxis } from "../../../../../components/XAxis/XAxis";
import { YAxis } from "../../../../../components/YAxis/YAxis";
import { Legend } from "../../../../../components/Legend/Legend";
import { ControlSection, Toggle, Chips, TextInput, PlaygroundLayout } from "../../../components/Playground";
import "nanoplot/styles.css";

/* ─────────────────────────── DATA ─────────────────────────── */

function generateData() {
	return [
		{
			name: "New Users",
			stroke: "#FF4B4B",
			data: [
				{ x: Temporal.Instant.from("2024-01-01T00:00:00Z"), y: 20 },
				{ x: Temporal.Instant.from("2024-02-01T00:00:00Z"), y: 25 },
				{ x: Temporal.Instant.from("2024-03-01T00:00:00Z"), y: 50 },
				{ x: Temporal.Instant.from("2024-04-01T00:00:00Z"), y: 45 },
				{ x: Temporal.Instant.from("2024-05-01T00:00:00Z"), y: 35 },
				{ x: Temporal.Instant.from("2024-06-01T00:00:00Z"), y: 55 },
				{ x: Temporal.Instant.from("2024-07-01T00:00:00Z"), y: 65 },
				{ x: Temporal.Instant.from("2024-08-01T00:00:00Z"), y: 75 },
				{ x: Temporal.Instant.from("2024-09-01T00:00:00Z"), y: 70 },
				{ x: Temporal.Instant.from("2024-10-01T00:00:00Z"), y: 80 },
				{ x: Temporal.Instant.from("2024-11-01T00:00:00Z"), y: 85 },
				{ x: Temporal.Instant.from("2024-12-01T00:00:00Z"), y: 90 },
			],
		},
		{
			name: "Registered Users",
			stroke: "#33D4FF",
			data: [
				{ x: Temporal.Instant.from("2024-01-01T00:00:00Z"), y: 45 },
				{ x: Temporal.Instant.from("2024-02-01T00:00:00Z"), y: 60 },
				{ x: Temporal.Instant.from("2024-03-01T00:00:00Z"), y: 55 },
				{ x: Temporal.Instant.from("2024-04-01T00:00:00Z"), y: 70 },
				{ x: Temporal.Instant.from("2024-05-01T00:00:00Z"), y: 70 },
				{ x: Temporal.Instant.from("2024-06-01T00:00:00Z"), y: 75 },
				{ x: Temporal.Instant.from("2024-07-01T00:00:00Z"), y: 85 },
				{ x: Temporal.Instant.from("2024-08-01T00:00:00Z"), y: 95 },
				{ x: Temporal.Instant.from("2024-09-01T00:00:00Z"), y: 92 },
				{ x: Temporal.Instant.from("2024-10-01T00:00:00Z"), y: 105 },
				{ x: Temporal.Instant.from("2024-11-01T00:00:00Z"), y: 110 },
				{ x: Temporal.Instant.from("2024-12-01T00:00:00Z"), y: 120 },
			],
		},
	];
}

/* ─────────────────────────── CODE GENERATION ─────────────────────────── */

function generateCode(opts: {
	lines: ComponentProps<typeof Lines>;
	gridline: ComponentProps<typeof GridLines>;
	xaxis: ComponentProps<typeof XAxis>;
	yaxis: ComponentProps<typeof YAxis>;
	legend: ComponentProps<typeof Legend>;
}) {
	const lines_lines: string[] = [
		`import { Graph } from "nanoplot/Graph";`,
		`import { Lines } from "nanoplot/Lines";`,
		`import { GridLines } from "nanoplot/GridLines";`,
		`import { XAxis } from "nanoplot/XAxis";`,
		`import { YAxis } from "nanoplot/YAxis";`,
		`import { Legend } from "nanoplot/Legend";`,
		`import "nanoplot/styles.css";`,
		``,
		`export default function MyLines() {`,
		`  return (`,
		`    <Graph data={DATA}>`,
	];

	if (opts.legend.position === "top" || opts.legend.position === "left") {
		const p = [`position="${opts.legend.position}"`, opts.legend.alignment && `alignment="${opts.legend.alignment}"`]
			.filter(Boolean)
			.join(" ");
		lines_lines.push(`      <Legend ${p} />`);
	}

	const yp = [opts.yaxis.title && `title="${opts.yaxis.title}"`, opts.yaxis.description && `description="${opts.yaxis.description}"`]
		.filter(Boolean)
		.join(" ");
	lines_lines.push(`      <YAxis${yp ? " " + yp : ""} />`);

	const gp = [opts.gridline.border && "border", opts.gridline.horizontal && "horizontal", opts.gridline.vertical && "vertical"]
		.filter(Boolean)
		.join(" ");
	lines_lines.push(`      <GridLines${gp ? " " + gp : ""} />`);

	const lp = [opts.lines.curve && `curve="${opts.lines.curve}"`, opts.lines.joints && "joints", opts.lines.loading && "loading"]
		.filter(Boolean)
		.join(" ");
	lines_lines.push(`      <Lines${lp ? " " + lp : ""} />`);
	lines_lines.push(`      <Lines.Tooltip />`);

	if (opts.legend.position === "right" || opts.legend.position === "bottom") {
		const p = [`position="${opts.legend.position}"`, opts.legend.alignment && `alignment="${opts.legend.alignment}"`]
			.filter(Boolean)
			.join(" ");
		lines_lines.push(`      <Legend ${p} />`);
	}

	const xp = [opts.xaxis.title && `title="${opts.xaxis.title}"`, opts.xaxis.description && `description="${opts.xaxis.description}"`]
		.filter(Boolean)
		.join(" ");
	lines_lines.push(`      <XAxis${xp ? " " + xp : ""} />`);

	lines_lines.push(`    </Graph>`, `  );`, `}`);
	return lines_lines.join("\n");
}

/* ─────────────────────────── PAGE ─────────────────────────── */

const DEFAULTS = {
	lines: { curve: "natural" as const } as ComponentProps<typeof Lines>,
	gridline: { border: true, horizontal: true, vertical: true } as ComponentProps<typeof GridLines>,
	xaxis: {} as ComponentProps<typeof XAxis>,
	yaxis: {} as ComponentProps<typeof YAxis>,
	legend: { position: "top", alignment: "end" } as ComponentProps<typeof Legend>,
};

export default function PlaygroundPage() {
	const [mounted, setMounted] = useState(false);
	useEffect(() => setMounted(true), []);

	const [lines, setLines] = useState(DEFAULTS.lines);
	const [gridline, setGridline] = useState(DEFAULTS.gridline);
	const [xaxis, setXAxis] = useState(DEFAULTS.xaxis);
	const [yaxis, setYAxis] = useState(DEFAULTS.yaxis);
	const [legend, setLegend] = useState(DEFAULTS.legend);
	const [data] = useState(() => generateData());

	const code = generateCode({ lines, gridline, xaxis, yaxis, legend });

	const handleReset = () => {
		setLines(DEFAULTS.lines);
		setGridline(DEFAULTS.gridline);
		setXAxis(DEFAULTS.xaxis);
		setYAxis(DEFAULTS.yaxis);
		setLegend(DEFAULTS.legend);
	};

	if (!mounted) return null;

	const graphArea = (
		<div className="flex-1 p-5 min-h-0">
			<Graph
				data={data}
				gap={{ top: 15, left: 15, right: 36, bottom: 15 }}
			>
				{(legend.position === "top" || legend.position === "left") && <Legend {...legend} />}
				<YAxis {...yaxis} />
				<GridLines {...gridline} />
				<Lines {...lines} />
				<Lines.Tooltip />
				{legend.position === "right" && <Legend {...legend} />}
				<XAxis {...xaxis} ticks={{ jumps: "P1M" }} display={(x) => { if (typeof x === "number" || typeof x === "string") return null; return x.toLocaleString("en-US", { month: "short", timeZone: "UTC" }); }} />
				{legend.position === "bottom" && <Legend {...legend} />}
			</Graph>
		</div>
	);

	const controls = (
		<>
			<ControlSection title="Lines">
				<Chips
					label="curve"
					options={["linear", "natural", "monotoneX", "stepBefore", "stepAfter"] as const}
					value={lines.curve}
					onChange={(v) => setLines((s) => ({ ...s, curve: v }))}
				/>
				<Toggle
					label="joints"
					checked={!!lines.joints}
					onChange={(v) => setLines((s) => ({ ...s, joints: v }))}
				/>
				<Toggle
					label="loading"
					checked={!!lines.loading}
					onChange={(v) => setLines((s) => ({ ...s, loading: v }))}
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
				<TextInput
					label="title"
					value={xaxis.title?.toString() ?? ""}
					onChange={(v) => setXAxis((s) => ({ ...s, title: v || undefined }))}
					placeholder="e.g. Month"
				/>
				<TextInput
					label="description"
					value={xaxis.description?.toString() ?? ""}
					onChange={(v) => setXAxis((s) => ({ ...s, description: v || undefined }))}
					placeholder="e.g. Time period"
				/>
			</ControlSection>

			<ControlSection title="Y Axis" defaultOpen={false}>
				<TextInput
					label="title"
					value={yaxis.title?.toString() ?? ""}
					onChange={(v) => setYAxis((s) => ({ ...s, title: v || undefined }))}
					placeholder="e.g. User Count"
				/>
				<TextInput
					label="description"
					value={yaxis.description?.toString() ?? ""}
					onChange={(v) => setYAxis((s) => ({ ...s, description: v || undefined }))}
					placeholder="e.g. Total users"
				/>
			</ControlSection>
		</>
	);

	return (
		<PlaygroundLayout
			title="Lines Playground"
			code={code}
			onReset={handleReset}
			graphArea={graphArea}
			controls={controls}
		/>
	);
}
