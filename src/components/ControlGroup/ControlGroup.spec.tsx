import { describe, expect, it } from "bun:test";
import { render, screen, fireEvent } from "@testing-library/react";
import { ControlGroup } from "./ControlGroup";
import { Control } from "@/components/Docs/Control/Control";
import { BooleanControl } from "@/components/Docs/Control/components/BooleanControl/BooleanControl";

describe("Control Group", () => {
	it("Should show element when close and clicked", async () => {
		const open = false;
		render(
			<ControlGroup title={"Test"} open={open}>
				<div data-testid={"hidden-element"}>
				<Control name={""} type={""}>
					<BooleanControl value={true} onChange={() => {}} description={"Boolean Control"} />
				</Control>
				</div>
			</ControlGroup>,
		);

        const element = await screen.findByTestId("hidden-element");
		expect(element).not.toBeVisible();

		const close = screen.getByRole("button");
		fireEvent.click(close);
        const elementAfterClick = await screen.findByTestId("hidden-element");
        expect(elementAfterClick).toBeVisible()
	});
});
