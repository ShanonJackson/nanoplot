"use client";

import { useState, useEffect, ComponentProps } from "react";
import { Graph } from "../../../../../components/Graph/Graph";
import { Pie } from "../../../../../components/Pie/Pie";
import { PlaygroundLayout, ControlSection, Toggle } from "../../../components/Playground";
import "nanoplot/styles.css";

/* ─────────────────────────── CODE GENERATION ─────────────────────────── */

function generateCode(opts: {
	pie: ComponentProps<typeof Pie>;
}) {
	const lines: string[] = [
		`import { Graph } from "nanoplot/Graph";`,
		`import { Pie } from "nanoplot/Pie";`,
		`import "nanoplot/styles.css";`,
		``,
		`const DATA = [`,
		`  { name: "Elixir", value: 333 },`,
		`  { name: "Stylus", value: 257 },`,
		`  { name: "CSS", value: 30 },`,
		`  { name: "Haskell", value: 192 },`,
		`  { name: "Python", value: 283 },`,
		`];`,
		``,
		`export default function MyPie() {`,
		`  return (`,
		`    <div style={{ width: 400, height: 400 }}>`,
		`      <Graph data={DATA}>`,
	];

	const attrs: string[] = [];
	if (opts.pie.loading) attrs.push("loading");
	if (opts.pie.donut) attrs.push(`donut${typeof opts.pie.donut === "number" ? `={${opts.pie.donut}}` : ""}`);
	if (opts.pie.labels) attrs.push("labels");
	if (opts.pie.glow) attrs.push("glow");

	const attrsStr = attrs.length > 0 ? " " + attrs.join(" ") : "";
	lines.push(`        <Pie${attrsStr} />`);
	lines.push(`      </Graph>`);
	lines.push(`    </div>`);
	lines.push(`  );`, `}`);
	return lines.join("\n");
}

/* ─────────────────────────── PAGE ─────────────────────────── */

const DEFAULTS = {
	pie: {} as ComponentProps<typeof Pie>,
};

const DATA = [
	{ name: "Elixir", value: 333 },
	{ name: "Stylus", value: 257 },
	{ name: "CSS", value: 30 },
	{ name: "Haskell", value: 192 },
	{ name: "Python", value: 283 },
];

export default function PlaygroundPage() {
	const [mounted, setMounted] = useState(false);
	useEffect(() => setMounted(true), []);

	const [pie, setPie] = useState(DEFAULTS.pie);

	const code = generateCode({ pie });

	const handleReset = () => {
		setPie(DEFAULTS.pie);
	};

	if (!mounted) return null;

	return (
		<PlaygroundLayout
			title="Pie Playground"
			code={code}
			onReset={handleReset}
			graphArea={
				<div className="flex-1 p-5 min-h-0 flex items-center justify-center">
					<div style={{ width: 400, height: 400 }}>
						<Graph data={DATA}>
							<Pie {...pie} />
						</Graph>
					</div>
				</div>
			}
			controls={
				<ControlSection title="Pie">
					<Toggle
						label="loading"
						checked={!!pie.loading}
						onChange={(v) => setPie((p) => ({ ...p, loading: v }))}
					/>
					<Toggle
						label="donut"
						checked={!!pie.donut}
						onChange={(v) => setPie((p) => ({ ...p, donut: v }))}
					/>
					<Toggle
						label="labels"
						checked={!!pie.labels}
						onChange={(v) => setPie((p) => ({ ...p, labels: v }))}
					/>
					<Toggle
						label="glow"
						checked={!!pie.glow}
						onChange={(v) => setPie((p) => ({ ...p, glow: v }))}
					/>
				</ControlSection>
			}
		/>
	);
}
