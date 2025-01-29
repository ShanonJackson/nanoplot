import { describe, expect, it } from "bun:test";
import { render, screen } from "@testing-library/react";
import { ExamplesPanel } from "./ExamplesPanel";

describe("Examples Panel", () => {
	it("Should render example with text 'EXAMPLE'", () => {
		const { container } = render(
			<ExamplesPanel examples={[{ name: "EXAMPLE", code: "", component: () => <div /> }]} onClick={Object} active={undefined} />,
		);
		expect(screen.getByText("EXAMPLE")).toBeInTheDocument();
	});
});
