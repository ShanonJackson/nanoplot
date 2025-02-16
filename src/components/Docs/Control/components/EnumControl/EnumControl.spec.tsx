import { describe, expect, it, beforeEach } from "bun:test";
import { render, screen, fireEvent } from "@testing-library/react";
import { EnumControl } from "./EnumControl";
import { jest } from "bun:test";

const legendDiscription = `legendDiscription`;
const options = ["top", "bottom", "right", "left"];
const fn = jest.fn();

describe("EnumControl", () => {
	beforeEach(() => {
		render(<EnumControl description={legendDiscription} options={options} value={"top"} onChange={fn} />);
	});
	it("Should render discription.", () => {
		expect(screen.getByText("legendDiscription")).toBeInTheDocument();
	});
	it("Should call function with parameter.", () => {
		fireEvent.click(screen.getByText("top"));
		expect(fn.mock.calls).toHaveLength(1);
		expect(fn.mock.calls[0][0]).toBe("top");
	});
});
