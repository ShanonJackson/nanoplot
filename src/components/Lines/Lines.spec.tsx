import { describe, expect, it } from "bun:test";
import { render } from "@testing-library/react";
import data from "../../app/examples/performance/lines/uplot/data.json";
import { Graph } from "../Graph/Graph";
import { XAxis } from "../XAxis/XAxis";
import { format } from "../../utils/date/date-format";
import { YAxis } from "../YAxis/YAxis";

type XY = { x: Date; y: number };

const dataset = ((): Array<{ name: string; data: XY[]; stroke?: string; fill?: string }> => {
	const raw = data as unknown as number[][];
	return raw.slice(1, 4).map((d, i) => ({
		name: i === 1 ? "RAM" : i === 2 ? "CPU" : "TCP Out",
		data: raw[0].map((ts, ii) => ({ x: new Date(ts * 1000), y: d[ii] })),
	}));
})();

const minDate = dataset[0].data[0].x;
const maxDate = dataset[0].data[dataset[0].data.length - 1].x;

function GraphWithTwoXAxis() {
	return (
		<div className={"mx-auto w-[90%] h-[800px] resize overflow-hidden"}>
			<Graph
				gap={{ right: 35, left: 10, top: 20, bottom: 10 }}
				data={dataset.filter((d) => d.name !== "TCP Out")}
				datasets={{
					TCP: dataset.filter((d) => d.name === "TCP Out").map((c) => ({ ...c, stroke: "rgb(255, 0, 0)" })),
				}}
				zoom={{ x: [0, 100], y: [0, 100] }}
			>
				<XAxis
					ticks={{ from: minDate.getTime(), to: maxDate.getTime(), jumps: "P2D" }}
					display={(x) => {
						if (typeof x === "number" || typeof x === "string") return null as any;
						return format(x as Date, "mm/dd");
					}}
				/>
				<YAxis ticks={{ from: 0, to: 100, jumps: 10 }} />
			</Graph>
		</div>
	);
}

function GraphWithOneXAxis() {
	return (
		<div className={"mx-auto w-[90%] h-[800px] resize overflow-hidden"}>
			<Graph
				gap={{ right: 35, left: 10, top: 20, bottom: 10 }}
				data={dataset.filter((d) => d.name !== "TCP Out")}
				datasets={{
					TCP: dataset.filter((d) => d.name === "TCP Out").map((c) => ({ ...c, stroke: "rgb(255, 0, 0)" })),
				}}
				zoom={{ x: [0, 100], y: [0, 100] }}
			>
				<XAxis
					ticks={{ from: minDate.getTime(), to: maxDate.getTime(), jumps: "P2D" }}
					dataset={"TCP"}
					display={() => null}
					className={"pt-0"}
				/>
				<YAxis ticks={{ from: 0, to: 100, jumps: 10 }} />
			</Graph>
		</div>
	);
}

function GraphBaseline() {
	return (
		<div className={"mx-auto w-[90%] h-[800px] resize overflow-hidden"}>
			<Graph
				gap={{ right: 35, left: 10, top: 20, bottom: 10 }}
				data={dataset.filter((d) => d.name !== "TCP Out")}
				datasets={{
					TCP: dataset.filter((d) => d.name === "TCP Out").map((c) => ({ ...c, stroke: "rgb(255, 0, 0)" })),
				}}
				zoom={{ x: [0, 100], y: [0, 100] }}
			>
				<YAxis ticks={{ from: 0, to: 100, jumps: 10 }} />
				<XAxis
					ticks={{ from: minDate.getTime(), to: maxDate.getTime(), jumps: "P2D" }}
					dataset={"TCP"}
					display={() => null}
					className={"pt-0"}
				/>
			</Graph>
		</div>
	);
}

describe("XAxis perf attribution (Graph baseline vs with XAxis)", () => {
	const iterations = 10;

	function time(renderable: JSX.Element): number {
		let total = 0;
		for (let i = 0; i < iterations; i++) {
			const start = performance.now();
			const { unmount } = render(renderable);
			const end = performance.now();
			total += end - start;
			unmount();
		}
		return total / iterations;
	}

	it("measures baseline, +1 XAxis, +2 XAxis", () => {
		// warm-up
		render(<GraphBaseline />).unmount();
		render(<GraphWithOneXAxis />).unmount();
		render(<GraphWithTwoXAxis />).unmount();

		const two = time(<GraphWithTwoXAxis />);

		console.log("Graph + 2 XAxis avg ms:", two.toFixed(4));

		expect(Number.isFinite(two)).toBe(true);
	});
});
