import { expect, it } from "bun:test";
import { render } from "@testing-library/react";
import { PieGraph } from "./PieGraph";

it("Should render without throwing error", () => {
    render(<PieGraph loading={false} donut={false} data={[{name: 'male', value: 50}, {name: 'female', value: 50}]} />);
})