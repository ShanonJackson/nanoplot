"use client";

import { useState, useEffect, ComponentProps } from "react";
import { Graph } from "../../../../../components/Graph/Graph";
import { Area } from "../../../../../components/Area/Area";
import { GridLines } from "../../../../../components/GridLines/GridLines";
import { XAxis } from "../../../../../components/XAxis/XAxis";
import { YAxis } from "../../../../../components/YAxis/YAxis";
import { Legend } from "../../../../../components/Legend/Legend";
import { ControlSection, Toggle, Chips, TextInput, PlaygroundLayout } from "../../../components/Playground";
import "nanoplot/styles.css";

/* ─────────────────────────── DATA ─────────────────────────── */

function generateTemporalData() {
	const startDate = new Date();
	return new Array(12).fill(null).map((_, i) => {
		const date = new Date(startDate);

		date.setMonth(date.getMonth() + i);
		return {
			date: Temporal.Now.zonedDateTimeISO().add({ months: i + 1 }),
			new_users: Math.floor(Math.random() * 100) + 50,
			registered_users: Math.floor(Math.random() * 150) + 100,
		};
	});
}

/* ─────────────────────────── CODE GENERATION ─────────────────────────── */

function generateCode(opts: {
	area: ComponentProps<typeof Area>;
	gridline: ComponentProps<typeof GridLines>;
	xaxis: ComponentProps<typeof XAxis>;
	yaxis: ComponentProps<typeof YAxis>;
	legend: ComponentProps<typeof Legend>;
}) {
	const lines: string[] = [
		`import { Graph } from "nanoplot/Graph";`,
		`import { Area } from "nanoplot/Area";`,
		`import { GridLines } from "nanoplot/GridLines";`,
		`import { XAxis } from "nanoplot/XAxis";`,
		`import { YAxis } from "nanoplot/YAxis";`,
		`import { Legend } from "nanoplot/Legend";`,
		`import "nanoplot/styles.css";`,
		``,
		`export default function MyArea() {`,
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

	const ap = [opts.area.curve && `curve="${opts.area.curve}"`, opts.area.loading && "loading"].filter(Boolean).join(" ");
	lines.push(`      <Area${ap ? " " + ap : ""} />`);
	lines.push(`      <Area.Tooltip className={"bg-white dark:!bg-black"} />`);

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
	area: { curve: "linear" } as ComponentProps<typeof Area>,
	gridline: { border: true, horizontal: true, vertical: true } as ComponentProps<typeof GridLines>,
	xaxis: {} as ComponentProps<typeof XAxis>,
	yaxis: {} as ComponentProps<typeof YAxis>,
	legend: { position: "top", alignment: "end" } as ComponentProps<typeof Legend>,
};

export default function PlaygroundPage() {
	const [mounted, setMounted] = useState(false);
	useEffect(() => setMounted(true), []);

	const [area, setArea] = useState(DEFAULTS.area);
	const [gridline, setGridline] = useState(DEFAULTS.gridline);
	const [xaxis, setXAxis] = useState(DEFAULTS.xaxis);
	const [yaxis, setYAxis] = useState(DEFAULTS.yaxis);
	const [legend, setLegend] = useState(DEFAULTS.legend);
	const [data] = useState(() => generateTemporalData());

	const code = generateCode({ area, gridline, xaxis, yaxis, legend });

	const handleReset = () => {
		setArea(DEFAULTS.area);
		setGridline(DEFAULTS.gridline);
		setXAxis(DEFAULTS.xaxis);
		setYAxis(DEFAULTS.yaxis);
		setLegend(DEFAULTS.legend);
	};

	if (!mounted) return null;

	const graphArea = (
		<div className="flex-1 p-5 min-h-0">
			<Graph
				data={[
					{
						name: "Registered Users",
						stroke: "rgb(239, 68, 68)",
						data: data.map((dp) => ({
							x: dp.date,
							y: dp.registered_users,
						})),
					},
					{
						name: "New Users",
						stroke: "rgb(59, 130, 246)",
						data: data.map((dp) => ({
							x: dp.date,
							y: dp.new_users,
						})),
					},
				]}
				gap={{ top: 15, left: 15, right: 36, bottom: 15 }}
			>
				{(legend.position === "top" || legend.position === "left") && <Legend {...legend} />}
				<YAxis {...yaxis} />
				<GridLines {...gridline} />
				<Area {...area} />
				<Area.Tooltip className={"bg-white dark:!bg-black"} />
				{legend.position === "right" && <Legend {...legend} />}
				<XAxis {...xaxis} ticks={{ jumps: "P1M" }} />
				{legend.position === "bottom" && <Legend {...legend} />}
			</Graph>
		</div>
	);

	const controls = (
		<>
			<ControlSection title="Area">
				<Chips
					label="curve"
					options={["linear", "natural", "monotoneX", "stepBefore", "stepAfter"] as const}
					value={area.curve}
					onChange={(v) => setArea((s) => ({ ...s, curve: v }))}
				/>
				<Toggle label="loading" checked={!!area.loading} onChange={(v) => setArea((s) => ({ ...s, loading: v }))} />
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
				<Toggle label="border" checked={!!gridline.border} onChange={(v) => setGridline((s) => ({ ...s, border: v }))} />
				<Toggle
					label="horizontal"
					checked={!!gridline.horizontal}
					onChange={(v) => setGridline((s) => ({ ...s, horizontal: v }))}
				/>
				<Toggle label="vertical" checked={!!gridline.vertical} onChange={(v) => setGridline((s) => ({ ...s, vertical: v }))} />
			</ControlSection>

			<ControlSection title="X Axis" defaultOpen={false}>
				<TextInput
					label="title"
					value={xaxis.title?.toString() ?? ""}
					onChange={(v) => setXAxis((s) => ({ ...s, title: v || undefined }))}
					placeholder="e.g. Months"
				/>
				<TextInput
					label="description"
					value={xaxis.description?.toString() ?? ""}
					onChange={(v) => setXAxis((s) => ({ ...s, description: v || undefined }))}
					placeholder="e.g. Timeline"
				/>
			</ControlSection>

			<ControlSection title="Y Axis" defaultOpen={false}>
				<TextInput
					label="title"
					value={yaxis.title?.toString() ?? ""}
					onChange={(v) => setYAxis((s) => ({ ...s, title: v || undefined }))}
					placeholder="e.g. Count"
				/>
				<TextInput
					label="description"
					value={yaxis.description?.toString() ?? ""}
					onChange={(v) => setYAxis((s) => ({ ...s, description: v || undefined }))}
					placeholder="e.g. Total per period"
				/>
			</ControlSection>
		</>
	);

	return <PlaygroundLayout title="Area Playground" code={code} onReset={handleReset} graphArea={graphArea} controls={controls} />;
}
