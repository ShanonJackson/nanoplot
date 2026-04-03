"use client";

import { useState, useEffect, ComponentProps } from "react";
import { Graph } from "../../../../../components/Graph/Graph";
import { Heatmap } from "../../../../../components/Heatmap/Heatmap";
import { GradientLegend } from "../../../../../components/GradientLegend/GradientLegend";
import { XAxis } from "../../../../../components/XAxis/XAxis";
import { YAxis } from "../../../../../components/YAxis/YAxis";
import { ControlSection, Chips, PlaygroundLayout } from "../../../components/Playground";
import "nanoplot/styles.css";

/* ─────────────────────────── DATA ─────────────────────────── */

const HEATMAP_DATA = [
	{
		name: "Vehicle Transport",
		data: [
			{ x: "Japan", y: "Train", z: -67613 },
			{ x: "Japan", y: "Bus", z: -77184 },
			{ x: "Japan", y: "Car", z: -15588 },
			{ x: "Japan", y: "Boat", z: -34487 },
			{ x: "Japan", y: "Bicycle", z: 90945 },
			{ x: "France", y: "Train", z: -16369 },
			{ x: "France", y: "Bus", z: 95371 },
			{ x: "France", y: "Car", z: 82969 },
			{ x: "France", y: "Boat", z: -44779 },
			{ x: "France", y: "Bicycle", z: -57656 },
			{ x: "US", y: "Train", z: 24639 },
			{ x: "US", y: "Bus", z: 24317 },
			{ x: "US", y: "Car", z: -98275 },
			{ x: "US", y: "Boat", z: -46282 },
			{ x: "US", y: "Bicycle", z: 84150 },
			{ x: "Germany", y: "Train", z: 96190 },
			{ x: "Germany", y: "Bus", z: 25321 },
			{ x: "Germany", y: "Car", z: 77322 },
			{ x: "Germany", y: "Boat", z: -84111 },
			{ x: "Germany", y: "Bicycle", z: 38642 },
			{ x: "Norway", y: "Train", z: 8900 },
			{ x: "Norway", y: "Bus", z: 59144 },
			{ x: "Norway", y: "Car", z: 9986 },
			{ x: "Norway", y: "Boat", z: -4214 },
			{ x: "Norway", y: "Bicycle", z: -1138 },
		],
	},
];

/* ─────────────────────────── CODE GENERATION ─────────────────────────── */

function generateCode(opts: {
	gradient: string;
	legend: ComponentProps<typeof GradientLegend>;
}) {
	const lines: string[] = [
		`import { Graph } from "nanoplot/Graph";`,
		`import { Heatmap } from "nanoplot/Heatmap";`,
		`import { GradientLegend } from "nanoplot/GradientLegend";`,
		`import { YAxis } from "nanoplot/YAxis";`,
		`import { XAxis } from "nanoplot/XAxis";`,
		`import "nanoplot/styles.css";`,
		``,
		`const GRADIENT = "${opts.gradient}";`,
		`const SCALARS = [-100000, -50000, 0, 50000, 100000];`,
		``,
		`export default function MyHeatmap() {`,
		`  return (`,
		`    <Graph data={DATA}>`,
		`      <YAxis />`,
		`      <Heatmap gradient={GRADIENT} scalars={SCALARS} />`,
	];

	const gp = [opts.legend.position && `position="${opts.legend.position}"`, opts.legend.alignment && `alignment="${opts.legend.alignment}"`]
		.filter(Boolean)
		.join(" ");
	lines.push(`      <GradientLegend${gp ? " " + gp : ""} gradient={GRADIENT} scalars={SCALARS} />`);

	lines.push(`      <XAxis />`);
	lines.push(`    </Graph>`, `  );`, `}`);
	return lines.join("\n");
}

/* ─────────────────────────── PAGE ─────────────────────────── */

const DEFAULTS = {
	gradient: "linear-gradient(to right, rgb(165, 0, 38) 0%, rgb(215, 48, 39) 10%, rgb(244, 109, 67) 20%, rgb(253, 174, 97) 30%, rgb(254, 224, 144) 40%, rgb(250, 248, 193) 50%, rgb(224, 243, 248) 60%, rgb(171, 217, 233) 70%, rgb(116, 173, 209) 80%, rgb(69, 117, 180) 90%, rgb(49, 54, 149) 100%)",
	legend: { position: "bottom", alignment: "center" } as ComponentProps<typeof GradientLegend>,
};

const SCALARS = [-100000, -50000, 0, 50000, 100000];

export default function PlaygroundPage() {
	const [mounted, setMounted] = useState(false);
	useEffect(() => setMounted(true), []);

	const [gradient, setGradient] = useState(DEFAULTS.gradient);
	const [legend, setLegend] = useState(DEFAULTS.legend);

	const code = generateCode({ gradient, legend });

	const handleReset = () => {
		setGradient(DEFAULTS.gradient);
		setLegend(DEFAULTS.legend);
	};

	if (!mounted) return null;

	const graphArea = (
		<div className="flex-1 p-5 min-h-0">
			<Graph
				data={HEATMAP_DATA}
				gap={{ top: 10, bottom: 10 }}
			>
				<YAxis />
				<Heatmap gradient={gradient} scalars={SCALARS} />
				<GradientLegend {...legend} gradient={gradient} scalars={SCALARS} />
				<XAxis />
			</Graph>
		</div>
	);

	const controls = (
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
	);

	return (
		<PlaygroundLayout
			title="Heatmap Playground"
			code={code}
			onReset={handleReset}
			graphArea={graphArea}
			controls={controls}
		/>
	);
}
