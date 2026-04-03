"use client";

import { useState, useEffect, ComponentProps } from "react";
import { Graph } from "../../../../../components/Graph/Graph";
import { Worldmap } from "../../../../../components/Worldmap/Worldmap";
import { GradientLegend } from "../../../../../components/GradientLegend/GradientLegend";
import { PlaygroundLayout, ControlSection, Slider, Chips } from "../../../components/Playground";
import "nanoplot/styles.css";

/* ─────────────────────────── DATA ─────────────────────────── */

const COUNTRY_DATA = [
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

/* ─────────────────────────── CODE GENERATION ─────────────────────────── */

function generateCode(opts: {
	worldmap: ComponentProps<typeof Worldmap>;
	legend: ComponentProps<typeof GradientLegend>;
}) {
	const lines: string[] = [
		`import { Graph } from "nanoplot/Graph";`,
		`import { Worldmap } from "nanoplot/Worldmap";`,
		`import { GradientLegend } from "nanoplot/GradientLegend";`,
		`import "nanoplot/styles.css";`,
		``,
		`export default function MyWorldmap() {`,
		`  const DATA = [`,
		`    { name: "US", value: 12000 },`,
		`    { name: "CN", value: 11500 },`,
		`    // ... more countries`,
		`  ];`,
		``,
		`  return (`,
		`    <Graph data={DATA}>`,
	];

	if (opts.legend.position === "top" || opts.legend.position === "left") {
		const p = [`position="${opts.legend.position}"`].filter(Boolean).join(" ");
		lines.push(`      <GradientLegend ${p} gradient={gradient} />`);
	}

	lines.push(`      <Worldmap${opts.worldmap.gradient ? ` gradient={gradient}` : ""} />`);

	if (opts.legend.position === "right" || opts.legend.position === "bottom") {
		const p = [`position="${opts.legend.position}"`].filter(Boolean).join(" ");
		lines.push(`      <GradientLegend ${p} gradient={gradient} />`);
	}

	lines.push(`      <Worldmap.Tooltip tooltip={(dp) => \`\${dp.name}: \${dp.value}\`} />`);

	lines.push(`    </Graph>`, `  );`, `}`);
	return lines.join("\n");
}

/* ─────────────────────────── PAGE ─────────────────────────── */

const DEFAULTS = {
	worldmap: {} as ComponentProps<typeof Worldmap>,
	legend: { position: "top" as const } as ComponentProps<typeof GradientLegend>,
	translateX: 0,
	translateY: 0,
	scale: 0,
};

const LEGEND_POSITIONS = ["top", "right", "bottom", "left"] as const;

export default function PlaygroundPage() {
	const [mounted, setMounted] = useState(false);
	useEffect(() => setMounted(true), []);

	const [worldmap, setWorldmap] = useState(DEFAULTS.worldmap);
	const [legend, setLegend] = useState(DEFAULTS.legend);
	const [translateX, setTranslateX] = useState(DEFAULTS.translateX);
	const [translateY, setTranslateY] = useState(DEFAULTS.translateY);
	const [scale, setScale] = useState(DEFAULTS.scale);

	const translate = { x: translateX, y: translateY, scale: scale };
	const maxValue = 12000;
	const gradient = `linear-gradient(90deg, #e1efff 0, #4285f4 ${maxValue})`;
	const code = generateCode({ worldmap, legend });

	const handleReset = () => {
		setWorldmap(DEFAULTS.worldmap);
		setLegend(DEFAULTS.legend);
		setTranslateX(DEFAULTS.translateX);
		setTranslateY(DEFAULTS.translateY);
		setScale(DEFAULTS.scale);
	};

	if (!mounted) return null;

	return (
		<PlaygroundLayout
			title="Worldmap Playground"
			code={code}
			onReset={handleReset}
			graphArea={
				<div className="flex-1 p-5 min-h-0">
					<Graph data={COUNTRY_DATA} gap={{ top: 15, left: 15, right: 36, bottom: 15 }}>
						{(legend.position === "top" || legend.position === "left") && (
							<GradientLegend {...legend} gradient={gradient} />
						)}
						<Worldmap {...worldmap} gradient={gradient} translate={translate} />
						<Worldmap.Tooltip tooltip={(point) => `${point.name}: ${point.value}`} />
						{legend.position === "right" && <GradientLegend {...legend} gradient={gradient} />}
						{legend.position === "bottom" && <GradientLegend {...legend} gradient={gradient} />}
					</Graph>
				</div>
			}
			controls={
				<>
					<ControlSection title="Worldmap">
						<Slider label="translate.x" value={translateX} min={-200} max={200} onChange={setTranslateX} />
						<Slider label="translate.y" value={translateY} min={-200} max={200} onChange={setTranslateY} />
						<Slider label="translate.scale" value={scale} min={0} max={100} onChange={setScale} />
					</ControlSection>

					<ControlSection title="Legend">
						<Chips
							label="position"
							options={LEGEND_POSITIONS}
							value={legend.position}
							onChange={(pos) => setLegend((s) => ({ ...s, position: pos }))}
						/>
					</ControlSection>
				</>
			}
		/>
	);
}
