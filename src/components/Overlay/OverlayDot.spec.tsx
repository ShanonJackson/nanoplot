import { describe, expect, it } from "bun:test";
import { render, screen } from "@testing-library/react";
import { OverlayDot } from "./OverlayDot";
import { MathUtils } from "@/utils/math/math";

const x = 10;
const y = 20;
const left = MathUtils.scale(x, 3000, 100);
const top = MathUtils.scale(y, 3000, 100);

describe("OverlayDot", () => {
	it("Should render circle.", () => {
		render(<div data-testid="overlaydot"><OverlayDot x={x} y={y} /></div>);

		expect(screen.getByTestId("overlaydot").firstChild).toHaveClass("[grid-area:graph]");
		expect(screen.getByTestId("overlaydot").firstChild).toHaveStyle("borderRadius: 50%; height: 25px;width: 25px;");
	});
	it("Should calculate position of circle.", () => {
		render(<div data-testid="overlaydot"><OverlayDot x={x} y={y} /></div>);
		expect(screen.getByTestId("overlaydot").firstChild).toHaveStyle(`left: ${left}%; top: ${top}%`);
	});
});
