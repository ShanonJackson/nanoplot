import { describe, expect, it, beforeEach } from "bun:test";
import { render, screen, fireEvent } from "@testing-library/react";
import { XAxisControlGroup } from "./XAxisControlGroup"
import { jest } from "bun:test";

const fn = jest.fn();

describe("XAxisControlGroup", () => {
	beforeEach(() => {
		render(<XAxisControlGroup state={{ title: "", description: "" }} onChange={fn} />);
	});
	it("Should call function after type.", () => {
		const HTMLControlTextArea = screen.getAllByPlaceholderText("I.E <div>HELLO WORLD</div>");
		fireEvent.change(HTMLControlTextArea[0], { target: { value: "s" } });
		expect(fn.mock.calls).toHaveLength(1);
	});
});
