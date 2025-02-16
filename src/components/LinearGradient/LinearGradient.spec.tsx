import { describe, expect, it } from "bun:test";
import { render } from "@testing-library/react";
import { LinearGradient } from "./LinearGradient";
import { toRgb } from "../../utils/color/to-rgb";

describe("src/components/LinearGradient", () => {
	it.each([
		["rgb(152, 68, 252)", "rgb(200, 68, 252)"],
		["rgba(152, 68, 252, 0.5)", "rgba(200, 68, 252, 0.5)"],
		["#9844fc", "#c844fc"],
		["hsl(270, 76%, 64%)", "hsl(270, 76%, 64%)"],
		["hsla(270, 76%, 64%, 0.5)", "hsla(270, 76%, 64%, 0.5)"],
	])("Should render two stop elements for with color format %s", (colora, colorb) => {
		const { getByTestId } = render(
			<LinearGradient id={""} gradient={`linear-gradient(${colora} 5%, ${colorb} 95%)`} data-testid={"a"} />,
		);
		const gradient = getByTestId("a");
		// linear gradient is an svg linearGradient element check it's <stop's match
		expect(gradient).toBeInTheDocument();
		const stops = gradient.querySelectorAll("stop");
		expect(stops).toHaveLength(2);
		expect(stops[0].getAttribute("stop-color")).toBe(toRgb(colora));
		expect(stops[0].getAttribute("stop-opacity")).toBe(null);
		expect(stops[0].getAttribute("offset")).toBe("5%");
		expect(stops[1].getAttribute("stop-color")).toBe(toRgb(colorb));
		expect(stops[1].getAttribute("stop-opacity")).toBe(null);
		expect(stops[1].getAttribute("offset")).toBe("95%");
	});
	/*
		This is a internal feature for linear-gradients that makes it easier to create opacity gradients without
		parsing an unknown color into rgba i.e if i want a linear-gradient of a user-supplied color at 0.5 opacity
	 */
	it("Should support opacity:0.5 in linear-gradient strings", () => {
		const { getByTestId } = render(
			<LinearGradient
				id={""}
				gradient={"linear-gradient(rgb(0, 0,0) opacity:0.5, rgb(155, 25, 35)  opacity:0.8)"}
				data-testid={"a"}
			/>,
		);
		const gradient = getByTestId("a");
		expect(gradient).toBeInTheDocument();
		const stops = gradient.querySelectorAll("stop");
		expect(stops).toHaveLength(2);
		expect(stops[0].getAttribute("stop-color")).toBe("rgb(0, 0,0)");
		expect(stops[0].getAttribute("stop-opacity")).toBe("0.5");
		expect(stops[1].getAttribute("stop-color")).toBe("rgb(155, 25, 35)");
		expect(stops[1].getAttribute("stop-opacity")).toBe("0.8");
	});
});
