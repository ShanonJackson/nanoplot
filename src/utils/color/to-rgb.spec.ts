import { describe, expect, it, jest } from "bun:test";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { toRgb } from "./to-rgb";

describe("src/utils/color/to-rgb", () => {
	it("Should convert partial hex colors correctly", () => {
		expect(toRgb("#fff")).toBe("rgb(255, 255, 255)");
	});
	it("Should convert partial hex '#000' correctly", () => {
		expect(toRgb("#000")).toBe("rgb(0, 0, 0)");
	});
});
