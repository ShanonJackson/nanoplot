import { describe, expect, it, beforeEach } from "bun:test";
import { render, screen, fireEvent } from "@testing-library/react";
import { GridLinesControlGroup } from "./GridLinesControlGroup";

import { jest } from "bun:test";
const fn = jest.fn();

describe("GridLinesContrlGroup", () => {
	beforeEach(() => {
		render(<GridLinesControlGroup state={{ border: true, horizontal: false, vertical: false }} onChange={fn} />);
	});
	it("Should call function after click element is click.", () => {
		fireEvent.click(screen.getAllByRole("checkbox")[0]);
		expect(fn.mock.calls).toHaveLength(1);
	});
	it("Should initialize the border control to true when {border: true} is set in state", () => {
		const checkboxValues = screen.getAllByRole("checkbox").map((checkbox) => {
			const inputElement = checkbox as HTMLInputElement;
			return {
				value: inputElement.value,
				checked: inputElement.checked,
			};
		});
		const findControlWithTrueValue = checkboxValues.filter((element) => element.checked === true);
		expect(findControlWithTrueValue.length).toBe(1);
	});
});
