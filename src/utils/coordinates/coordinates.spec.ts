import { describe, expect, it } from "bun:test";
import { CoordinatesUtils } from "./coordinates";
import spec from "./data.spec.json";
import { InternalGraphContext } from "../../hooks/use-graph/use-graph";
import { DomainUtils } from "../domain/domain";

const MOCK_CONTEXT: InternalGraphContext = {
	id: ":Rcpuult7:",
	zoom: {
		x: [0, 100],
		y: [0, 100],
	},
	layout: {
		rows: "max-content [graph]auto min-content",
		columns: "min-content [graph]auto",
	},
	viewbox: {
		x: 3000,
		y: 3000,
	},
	data: [
		{
			id: "Male",
			stroke: "linear-gradient(to bottom, #e93157 0%, #fbad26 100%)",
			fill: "linear-gradient(to bottom, #e93157 0%, #fbad26 100%)",
			name: "Male",
			group: "gender",
			data: [
				{
					x: 5000,
					y: "2024-12-31T11:00:00.000Z",
				},
				{
					x: 20000,
					y: "2025-01-31T11:00:00.000Z",
				},
				{
					x: 45000,
					y: "2025-02-28T11:00:00.000Z",
				},
				{
					x: 20000,
					y: "2025-03-31T11:00:00.000Z",
				},
			].map(({ x, y }) => ({ x, y: new Date(y) })),
		},
		{
			id: "Female",
			stroke: "linear-gradient(to bottom, #1c8cdc 0%, #4cc7b0 100%)",
			fill: "linear-gradient(to bottom, #1c8cdc 0%, #4cc7b0 100%)",
			name: "Female",
			group: "gender",
			data: [
				{
					x: 45000,
					y: "2024-12-31T11:00:00.000Z",
				},
				{
					x: 10000,
					y: "2025-01-31T11:00:00.000Z",
				},
				{
					x: 15000,
					y: "2025-02-28T11:00:00.000Z",
				},
				{
					x: 30000,
					y: "2025-03-31T11:00:00.000Z",
				},
			].map(({ x, y }) => ({ x, y: new Date(y) })),
		},
		{
			id: "abcdefg",
			stroke: "red",
			fill: "red",
			name: "abcdefg",
			data: [
				{
					x: 30000,
					y: "2025-06-30T12:00:00.000Z",
				},
				{
					x: 30000,
					y: "2024-12-31T11:00:00.000Z",
				},
				{
					x: 30000,
					y: "2025-01-31T11:00:00.000Z",
				},
			].map(({ x, y }) => ({ x, y: new Date(y) })),
		},
	],
	gap: {
		top: 20,
		left: 15,
		right: 36,
		bottom: 15,
	},
	attributes: {
		className: "@container/graph relative grid h-full w-full isolate",
	},
	domain: {
		x: [
			{
				tick: 0,
				coordinate: 0,
			},
			{
				tick: 10000,
				coordinate: 500,
			},
			{
				tick: 20000,
				coordinate: 1000,
			},
			{
				tick: 30000,
				coordinate: 1500,
			},
			{
				tick: 40000,
				coordinate: 2000,
			},
			{
				tick: 50000,
				coordinate: 2500,
			},
			{
				tick: 60000,
				coordinate: 3000,
			},
		],
		y: [
			{
				tick: "2024-11-30T11:00:00.000Z",
				coordinate: 2833.3333333333335,
			},
			{
				tick: "2024-12-31T11:00:00.000Z",
				coordinate: 2500,
			},
			{
				tick: "2025-01-31T11:00:00.000Z",
				coordinate: 2166.666666666667,
			},
			{
				tick: "2025-02-28T11:00:00.000Z",
				coordinate: 1833.3333333333335,
			},
			{
				tick: "2025-03-31T11:00:00.000Z",
				coordinate: 1500,
			},
			{
				tick: "2025-04-30T12:00:00.000Z",
				coordinate: 1166.6666666666667,
			},
			{
				tick: "2025-05-31T12:00:00.000Z",
				coordinate: 833.3333333333335,
			},
			{
				tick: "2025-06-30T12:00:00.000Z",
				coordinate: 500,
			},
			{
				tick: "2025-07-31T12:00:00.000Z",
				coordinate: 166.66666666666697,
			},
		].map((tk) => ({ tick: new Date(tk.tick), coordinate: tk.coordinate })),
	},
	colors: ["#9844fc", "#d63cdd", "#ff5069", "#f86c44", "#fd9825", "#e7cd33", "#80e148", "#00d599", "#14ada4", "#00a7f1", "#696aff"],
	interactions: {
		hovered: [],
		pinned: [],
	},
	datasets: {},
};
describe("Coordinates Utils", () => {
	it("xyCoordinatesForDataset returns independent arrays across calls (no mutation)", () => {
		const viewbox = { x: 300, y: 300 } as const;
		const domain = {
			x: [
				{ tick: 0, coordinate: 0 },
				{ tick: 10, coordinate: 300 },
			],
			y: [
				{ tick: new Date("2025-01-01T00:00:00Z"), coordinate: 300 },
				{ tick: new Date("2025-02-01T00:00:00Z"), coordinate: 0 },
			],
		} as any;

		const toXY = CoordinatesUtils.xyCoordinatesForDataset({ domain, viewbox });

		const data1 = [
			{ x: 5, y: new Date("2025-01-16T00:00:00Z") },
			{ x: 7.5, y: new Date("2025-01-20T00:00:00Z") },
		];
		const data2 = [
			{ x: 0, y: new Date("2025-01-01T00:00:00Z") },
			{ x: 10, y: new Date("2025-02-01T00:00:00Z") },
			{ x: 2.5, y: new Date("2025-01-05T00:00:00Z") },
		];

		const a1 = toXY(data1);
		expect(a1 instanceof Float32Array).toBe(true);
		const a1Copy = new Float32Array(a1);

		const a2 = toXY(data2);
		expect(a2 instanceof Float32Array).toBe(true);
		expect(a2).not.toBe(a1);
		expect(Array.from(a1)).toEqual(Array.from(a1Copy));
	});
	it("xyCoordinatesForDataset benchmark over 400 iterations (data.spec.json)", () => {
		// Prepare dataset: convert x to Date to use time-domain
		const dataset = (spec as any).data.map((line: any) => ({
			...line,
			data: line.data.map((d: any) => ({ x: new Date(d.x), y: d.y })),
		}));

		const viewbox = { x: 3000, y: 3000 };
		const domain = {
			x: DomainUtils.x.ticks({ data: dataset, viewbox }),
			y: DomainUtils.y.ticks({ data: dataset, viewbox }),
		};
		const toXY = CoordinatesUtils.xyCoordinatesForDataset({ domain, viewbox });
		// quick type/length smoke check for interleaved Float32
		const sample = toXY(dataset[0].data);
		expect(sample instanceof Float32Array).toBe(true);
		expect(sample.length).toBe(dataset[0].data.length * 2);

		const times = Array.from({ length: 400 }, () => {
			const start = performance.now();
			for (const line of dataset) {
				toXY(line.data);
			}
			const end = performance.now();
			return end - start;
		});
		const average = times.reduce((a, b) => a + b, 0) / times.length;
		const max = Math.max(...times);
		const min = Math.min(...times);
		console.log({ min, max, average });

		// Smoke assertion to ensure benchmark executed
		expect(times.length).toBe(400);
	});
});
