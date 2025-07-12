import { describe, expect, it } from "bun:test";
import { DomainUtils } from "./domain";

const context = {
	data: [
		{ hours_studied: 1, test_score: 1 },
		{ hours_studied: 2, test_score: 2 },
		{ hours_studied: 3, test_score: 3 },
		{ hours_studied: 4, test_score: 4 },
	].map((d, i) => ({ name: i + " name", data: [{ x: d.hours_studied, y: d.test_score }] })),
	viewbox: { x: 3000, y: 3000 },
};

describe("src/utils/domain/domain", () => {
	describe("DomainUtils.x.ticks", () => {
		it("Should return erognomic ticks for (min: 2, max: 10)", () => {
			const xDomain = DomainUtils.x.ticks(
				{
					...context,
					data: [
						{
							name: "",
							data: [
								{ x: 2, y: 0 },
								{ x: 92, y: 0 },
							],
						},
					],
				},
				{ from: "auto", to: "auto", jumps: "auto" },
			);
		});
	});
	describe("DomainUtils.x.ticks - 'from' parameter", () => {
		it("Should work when 'from' is + percentage", () => {
			const xDomain = DomainUtils.x.ticks(context, { from: "min + 10%", to: 100, jumps: 10 });
			expect(xDomain[0].tick).toBe(1.1);
			expect(xDomain.length).toBe(10);
			expect(xDomain[9].tick).toBe(100);
		});
		it("Should work when 'from' is + value", () => {
			const xDomain = DomainUtils.x.ticks(context, { from: "min + 10", to: 100, jumps: 10 });
			expect(xDomain[0].tick).toBe(11);
			expect(xDomain.length).toBe(10);
			expect(xDomain[9].tick).toBe(100);
		});
		it("Should work when 'from' is - percentage", () => {
			const xDomain = DomainUtils.x.ticks(context, { from: "min - 10%", to: 100, jumps: 15 });
			expect(xDomain[0].tick).toBe(0.9);
			expect(xDomain.length).toBe(15);
			expect(xDomain[14].tick).toBe(100);
		});
	});
	describe("DomainUtils.x.ticks - 'to' parameter", () => {
		it("Should work when 'to' is + percentage", () => {
			const xDomain = DomainUtils.x.ticks(context, { from: 0, to: "max + 10%", jumps: 10 });
			expect(xDomain[0].tick).toBe(0);
			expect(xDomain.length).toBe(10);
			expect(xDomain[9].tick).toBe(4.4);
		});
		it("Should work when 'to' is + value", () => {
			const xDomain = DomainUtils.x.ticks(context, { from: 0, to: "max + 10", jumps: 10 });
			expect(xDomain[0].tick).toBe(0);
			expect(xDomain.length).toBe(10);
			expect(xDomain[9].tick).toBe(14);
		});
		it("Should work when 'to' is - percentage", () => {
			const xDomain = DomainUtils.x.ticks(context, { from: 0, to: "max - 10%", jumps: 15 });
			expect(xDomain[0].tick).toBe(0);
			expect(xDomain.length).toBe(15);
			expect(xDomain[14].tick).toBe(3.6);
		});
	});
	describe("DomainUtils.y.ticks", () => {
		it("Should follow min/max/jumps", () => {
			const yDomain = DomainUtils.y.ticks(context, { from: 0, to: 10, jumps: 10 });
			expect(yDomain[0].tick).toBe(0);
			expect(yDomain.length).toBe(10);
			expect(yDomain[9].tick).toBe(10);
		});
		it("Should return ergonomic ticks is 'auto' (for data min: 1, max: 10)", () => {
			/* data max 10 min 1 -> should be auto -> min 0 max 12 each tick  whole numbers */
			const yDomain = DomainUtils.y.ticks(
				{
					...context,
					data: [
						{
							name: "t",
							data: [
								{ x: 1, y: 10 },
								{ x: 1, y: 1 },
							],
						},
					],
				},
				{ from: "auto", to: "auto", jumps: "auto" },
			);
			expect(yDomain.length).toBeLessThanOrEqual(11);
			expect(Math.max(...yDomain.map(({ tick }) => +tick))).toBe(10);
			expect(Math.min(...yDomain.map(({ tick }) => +tick))).toBe(0);
		});
		it("Should return ergonomic ticks is 'auto' (for data min: -1, max: 10)", () => {
			/* data max 10 min -1 -> should be auto -> min -2 max 12 each tick  whole numbers */
			const yDomain = DomainUtils.y.ticks(
				{
					...context,
					data: [
						{
							name: "t",
							data: [
								{ x: 1, y: -1 },
								{ x: 1, y: 10 },
							],
						},
					],
				},
				{ from: "auto", to: "auto", jumps: "auto" },
			);

			const min = Math.min(...yDomain.map(({ tick }) => +tick));
			const max = Math.max(...yDomain.map(({ tick }) => +tick));
			expect(yDomain.length).toBeLessThanOrEqual(11);
			expect(max).toBe(10);
			expect(min).toBe(-2.5);
		});
		it("Should not start at zero when the distance between min/max is a small number", () => {
			const yDomain = DomainUtils.y.ticks(
				{
					...context,
					data: [
						{
							name: "t",
							data: [
								{ x: 1, y: 1 },
								{ x: 1, y: 1.1 },
							],
						},
					],
				},
				{ from: "auto", to: "auto", jumps: "auto" },
			);
			const min = Math.min(...yDomain.map(({ tick }) => +tick));
			const max = Math.max(...yDomain.map(({ tick }) => +tick));
			expect(min).toBe(0);
			expect(max).toBe(1.1);
		});
	});

	describe("DomainUtils.y.ticks", () => {
		it("Should round to nearest 'quart' when max of dataset is 1_550_000 (1_750_000)", () => {
			const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
			const data = [
				{
					name: "Revenue",
					fill: "#f43f5e",
					group: "financials",
					data: [
						{ x: new Date(2025, 0, 1), y: -100_000 },
						{ x: new Date(2025, 1, 1), y: -120_000 },
						{ x: new Date(2025, 2, 1), y: -110_000 },
						{ x: new Date(2025, 3, 1), y: -130_000 },
						{ x: new Date(2025, 4, 1), y: -90_000 },
						{ x: new Date(2025, 5, 1), y: -140_000 },
						{ x: new Date(2025, 6, 1), y: -80_000 },
						{ x: new Date(2025, 7, 1), y: -110_000 },
						{ x: new Date(2025, 8, 1), y: -150_000 },
						{ x: new Date(2025, 9, 1), y: -120_000 },
						{ x: new Date(2025, 10, 1), y: -100_000 },
						{ x: new Date(2025, 11, 1), y: -110_000 },
					].map(({ x, y }) => ({ x: months[x.getMonth()], y })),
				},
				{
					name: "Churn",
					fill: "#8249f0",
					group: "financials",
					data: [
						{ x: new Date(2025, 0, 1), y: 1_200_000 },
						{ x: new Date(2025, 1, 1), y: 1_300_000 },
						{ x: new Date(2025, 2, 1), y: 1_350_000 },
						{ x: new Date(2025, 3, 1), y: 1_250_000 },
						{ x: new Date(2025, 4, 1), y: 1_450_000 },
						{ x: new Date(2025, 5, 1), y: 1_500_000 },
						{ x: new Date(2025, 6, 1), y: 1_150_000 },
						{ x: new Date(2025, 7, 1), y: 1_400_000 },
						{ x: new Date(2025, 8, 1), y: 1_550_000 },
						{ x: new Date(2025, 9, 1), y: 1_480_000 },
						{ x: new Date(2025, 10, 1), y: 1_380_000 },
						{ x: new Date(2025, 11, 1), y: 1_280_000 },
					].map(({ x, y }) => ({ x: months[x.getMonth()], y })),
				},
			];
			const yDomain = DomainUtils.y.ticks(
				{
					...context,
					data,
				},
				{ from: "auto", to: "auto", jumps: "auto" },
			);
			expect(Math.min(...yDomain.map(({ tick }) => +tick))).toBe(-250_000);
			expect(Math.max(...yDomain.map(({ tick }) => +tick))).toBe(1_750_000);
		});
	});
});
