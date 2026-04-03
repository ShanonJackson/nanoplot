"use client";

import { useState, useEffect, ComponentProps } from "react";
import { Graph } from "../../../../../components/Graph/Graph";
import { Radar } from "../../../../../components/Radar/Radar";
import { PlaygroundLayout, ControlSection, Toggle } from "../../../components/Playground";
import "nanoplot/styles.css";

/* ─────────────────────────── CODE GENERATION ─────────────────────────── */

function generateCode(opts: { radar: ComponentProps<typeof Radar> }) {
	const lines: string[] = [
		`import { Graph } from "nanoplot/Graph";`,
		`import { Radar } from "nanoplot/Radar";`,
		`import "nanoplot/styles.css";`,
		``,
		`export default function MyRadar() {`,
		`  return (`,
		`    <Graph data={DATA}>`,
	];

	const rp = [opts.radar.loading && "loading", opts.radar.labels !== undefined && `labels={${opts.radar.labels}}`]
		.filter(Boolean)
		.join(" ");
	lines.push(`      <Radar${rp ? " " + rp : ""} />`);

	lines.push(`    </Graph>`, `  );`, `}`);
	return lines.join("\n");
}

/* ─────────────────────────── PAGE ─────────────────────────── */

const DEFAULTS = {
	radar: { labels: true, loading: false } as ComponentProps<typeof Radar>,
};

export default function PlaygroundPage() {
	const [mounted, setMounted] = useState(false);
	useEffect(() => setMounted(true), []);

	const [radar, setRadar] = useState(DEFAULTS.radar);

	const code = generateCode({ radar });

	const handleReset = () => {
		setRadar(DEFAULTS.radar);
	};

	if (!mounted) return null;

	return (
		<PlaygroundLayout
			title="Radar Playground"
			code={code}
			onReset={handleReset}
			graphArea={
				<div className="flex-1 p-5 min-h-0 flex items-center justify-center">
					<div className={"w-[100%] h-[500px]"}>
						<Graph
							data={[
								{
									name: "Jason's Progress",
									stroke: "#11ACAE",
									data: [
										{ x: "Fighting", y: 70 },
										{ x: "Farming", y: 8 },
										{ x: "Supporting", y: 300 },
										{ x: "Pushing", y: 90 },
										{ x: "Versatility", y: 60 },
									],
								},
							]}
						>
							<Radar {...radar} />
						</Graph>
					</div>
				</div>
			}
			controls={
				<ControlSection title="Radar">
					<Toggle label="loading" checked={!!radar.loading} onChange={(v) => setRadar((r) => ({ ...r, loading: v }))} />
					<Toggle
						label="labels"
						checked={radar.labels !== false}
						onChange={(v) => setRadar((r) => ({ ...r, labels: v }))}
					/>
				</ControlSection>
			}
		/>
	);
}
