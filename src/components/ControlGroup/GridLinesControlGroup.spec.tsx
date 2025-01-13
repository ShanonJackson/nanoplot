import { useState, ComponentProps, ReactNode, FC } from "react";
import { GridLines } from "@/export";
import { describe, expect, it } from "bun:test";
import { render, screen, fireEvent } from "@testing-library/react";
import { GridLinesControlGroup } from "./GridLinesControlGroup";
//import { jest } from "bun:test";

const PsedoExtraStateForTestComponent:FC = () => {
	const [gridline, setGridline] = useState<ComponentProps<typeof GridLines>>({});
	const setGridPartial = (partial: Partial<ComponentProps<typeof GridLines>>) => setGridline((prev) => ({ ...prev, ...partial }));
	return <>
	<GridLinesControlGroup state={gridline} onChange={setGridPartial} />
	</>
}
//const fn = jest.fn();
describe("GridLinesContrlGroup", () => {
	it("Should render control groups", () => {
		render(
			<>
			<PsedoExtraStateForTestComponent/>
			</>
		);
		const elements = screen.getAllByRole("checkbox")
		const checkboxValues = elements.map(checkbox => {
			const inputElement = checkbox as HTMLInputElement; // Cast to HTMLInputElement
			return {
			  value: inputElement.value,
			  checked: inputElement.checked,
			};
		  });
		console.log("checkboxValues", checkboxValues)
		// expect(element).not.toBeChecked()
		// fireEvent.click(element)
		// expect(element).toBeChecked()
		// expect(screen.getByText("GridLines")).toBeInTheDocument();
		// expect(screen.getByText("border")).toBeInTheDocument();
		// expect(screen.getByText("horizontal")).toBeInTheDocument();
		// expect(screen.getByText("vertical")).toBeInTheDocument();
	});
});
