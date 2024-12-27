import { describe, expect, it } from "bun:test";
import { DomainUtils } from "@/utils/domain/domain";

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
			expect(yDomain.every(({ tick }) => +tick % 1 === 0)).toBe(true); /* all whole numbers */
			expect(yDomain.length).toBeLessThanOrEqual(11);
			expect(Math.max(...yDomain.map(({ tick }) => +tick))).toBe(12);
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
			expect(yDomain.every(({ tick }) => +tick % 1 === 0)).toBe(true); /* all whole numbers */
			expect(yDomain.length).toBeLessThanOrEqual(11);
			expect(max).toBe(12);
			expect(min).toBe(-2);
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
			expect(max).toBe(2);
		});
	});
});
