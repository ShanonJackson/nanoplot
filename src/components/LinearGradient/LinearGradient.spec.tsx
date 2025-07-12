import { describe, expect, it } from "bun:test";
import { render } from "@testing-library/react";
import { LinearGradient } from "./LinearGradient";
import { toRgb } from "../../utils/color/to-rgb";
import { InternalGraphContext, GraphContextProvider } from "../../hooks/use-graph/use-graph";
import { CoordinatesUtils } from "../../utils/coordinates/coordinates";
import { MathUtils, scale } from "../../utils/math/math";
import { GradientUtils } from "../../utils/gradient/gradient";

const MOCK_CONTEXT: InternalGraphContext = {
	id: "a",
	data: [],
	attributes: {},
	gap: { top: 0, right: 0, bottom: 0, left: 0 },
	layout: { columns: "", rows: "" },
	viewbox: { x: 1_000, y: 1_000 },
	zoom: { x: [0, 100], y: [0, 100] },
	datasets: {},
	domain: {
		x: [
			{ coordinate: 0, tick: 0 },
			{ coordinate: 500, tick: 500 },
			{ coordinate: 1_000, tick: 1000 },
		],
		y: [
			{ coordinate: 0, tick: 1_000 },
			{ coordinate: 500, tick: 500 },
			{ coordinate: 1_000, tick: 0 },
		],
	},
	colors: [],
	interactions: { hovered: [], pinned: [] },
};

describe("src/components/LinearGradient", () => {
	it.each([
		["rgb(152, 68, 252)", "rgb(200, 68, 252)"],
		["rgba(152, 68, 252, 0.5)", "rgba(200, 68, 252, 0.5)"],
		["#9844fc", "#c844fc"],
		["hsl(270, 76%, 64%)", "hsl(270, 76%, 64%)"],
		["hsla(270, 76%, 64%, 0.5)", "hsla(270, 76%, 64%, 0.5)"],
	])("Should render two stop elements for with color format %s", (colora, colorb) => {
		const { getByTestId } = render(
			<GraphContextProvider value={MOCK_CONTEXT}>
				<LinearGradient id={""} gradient={`linear-gradient(${colora} 0%, ${colorb} 100%)`} data-testid={"a"} />
			</GraphContextProvider>,
		);
		const gradient = getByTestId("a");
		// linear gradient is an svg linearGradient element check it's <stop's match
		expect(gradient).toBeInTheDocument();
		const stops = gradient.querySelectorAll("stop");
		expect(stops).toHaveLength(2);
		expect(stops[0].getAttribute("stop-color")).toBe(toRgb(colora));
		expect(stops[0].getAttribute("stop-opacity")).toBe(null);
		expect(stops[0].getAttribute("offset")).toBe("0%");
		expect(stops[1].getAttribute("stop-color")).toBe(toRgb(colorb));
		expect(stops[1].getAttribute("stop-opacity")).toBe(null);
		expect(stops[1].getAttribute("offset")).toBe("100%");
	});
	/*
		This is a internal feature for linear-gradients that makes it easier to create opacity gradients without
		parsing an unknown color into rgba i.e if i want a linear-gradient of a user-supplied color at 0.5 opacity
	 */
	it("Should support opacity:0.5 in linear-gradient strings", () => {
		const { getByTestId } = render(
			<GraphContextProvider value={MOCK_CONTEXT}>
				<LinearGradient
					id={""}
					gradient={"linear-gradient(rgb(0, 0,0) opacity:0.5, rgb(155, 25, 35)  opacity:0.8)"}
					data-testid={"a"}
				/>
			</GraphContextProvider>,
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

	it("Should support mask:linear-gradient(...) with VALUE stops not coordinate stops.", () => {
		const { getByTestId } = render(
			<GraphContextProvider value={MOCK_CONTEXT}>
				<LinearGradient
					id={""}
					gradient={"mask:linear-gradient(to right, rgb(255, 0, 0) 400, rgb(0, 0, 255) 400.1, rgb(0, 0, 255) 1000)"}
					data-testid={"a"}
				/>
			</GraphContextProvider>,
		);
		const xForValue = CoordinatesUtils.xCoordinateFor({ domain: MOCK_CONTEXT.domain, viewbox: MOCK_CONTEXT.viewbox });
		const gradient = getByTestId("a");
		expect(gradient).toBeInTheDocument();
		const stops = gradient.querySelectorAll("stop");
		expect(stops).toHaveLength(4);
		expect(stops[0].getAttribute("stop-color")).toBe("rgb(255, 0, 0)");
		expect(stops[0].getAttribute("stop-opacity")).toBe(null);
		expect(stops[0].getAttribute("offset")).toBe("0%");
		expect(stops[1].getAttribute("stop-color")).toBe("rgb(255, 0, 0)");
		expect(stops[1].getAttribute("stop-opacity")).toBe(null);
		expect(stops[1].getAttribute("offset")).toBe(scale(xForValue(400), MOCK_CONTEXT.viewbox.x, 100).toString() + "%");
		expect(stops[2].getAttribute("stop-color")).toBe("rgb(0, 0, 255)");
		expect(stops[2].getAttribute("stop-opacity")).toBe(null);
		expect(stops[2].getAttribute("offset")).toBe(scale(xForValue(400.1), MOCK_CONTEXT.viewbox.x, 100).toString() + "%");
		expect(stops[3].getAttribute("stop-color")).toBe("rgb(0, 0, 255)");
		expect(stops[3].getAttribute("stop-opacity")).toBe(null);
		expect(stops[3].getAttribute("offset")).toBe(scale(xForValue(1000), MOCK_CONTEXT.viewbox.x, 100).toString() + "%");
	});

	it("Should anchor to 100% offset when mask:linear-gradient(...) with value stops is above largest x", () => {
		const { getByTestId } = render(
			<GraphContextProvider value={MOCK_CONTEXT}>
				<LinearGradient
					id={""}
					gradient={"mask:linear-gradient(to right, rgb(255, 0, 0) 400, rgb(0, 0, 255) 400.1, rgb(0, 0, 255) 1500)"}
					data-testid={"a"}
				/>
			</GraphContextProvider>,
		);
		const xForValue = CoordinatesUtils.xCoordinateFor({ domain: MOCK_CONTEXT.domain, viewbox: MOCK_CONTEXT.viewbox });
		const gradient = getByTestId("a");
		expect(gradient).toBeInTheDocument();
		const stops = gradient.querySelectorAll("stop");
		expect(stops).toHaveLength(4);
		expect(stops[0].getAttribute("stop-color")).toBe("rgb(255, 0, 0)");
		expect(stops[0].getAttribute("stop-opacity")).toBe(null);
		expect(stops[0].getAttribute("offset")).toBe("0%");
		expect(stops[1].getAttribute("stop-color")).toBe("rgb(255, 0, 0)");
		expect(stops[1].getAttribute("stop-opacity")).toBe(null);
		expect(stops[1].getAttribute("offset")).toBe(scale(xForValue(400), MOCK_CONTEXT.viewbox.x, 100).toString() + "%");
		expect(stops[2].getAttribute("stop-color")).toBe("rgb(0, 0, 255)");
		expect(stops[2].getAttribute("stop-opacity")).toBe(null);
		expect(stops[2].getAttribute("offset")).toBe(scale(xForValue(400.1), MOCK_CONTEXT.viewbox.x, 100).toString() + "%");
		expect(stops[3].getAttribute("stop-color")).toBe("rgb(0, 0, 255)");
		expect(stops[3].getAttribute("stop-opacity")).toBe(null);
		expect(stops[3].getAttribute("offset")).toBe(scale(xForValue(1500), MOCK_CONTEXT.viewbox.x, 100).toString() + "%");
	});
});
