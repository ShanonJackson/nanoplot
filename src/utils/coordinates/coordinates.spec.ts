import { describe, expect, it } from "bun:test";
import { CoordinatesUtils } from "./coordinates";
import spec from "./data.spec.json";
import { InternalGraphContext } from "../../hooks/use-graph/use-graph";

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
describe("Coordinates Utils", () => {});
