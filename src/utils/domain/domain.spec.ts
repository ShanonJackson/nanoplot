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
});
