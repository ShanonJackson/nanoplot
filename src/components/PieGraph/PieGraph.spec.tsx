import { afterEach, expect, it } from "bun:test";
import { render, screen } from "@testing-library/react";
import { PieGraph } from "./PieGraph";
import { cleanup } from '@testing-library/react';

afterEach(cleanup);

it("Should render without throwing error", () => {
    render(<PieGraph loading={false} donut={false} data={[{name: 'male', value: 50}, {name: 'female', value: 50}]} />);
})

it("Should show a loading state when loading is true", () => {
    render(<PieGraph loading={true} donut={false} data={[{name: 'male', value: 50}, {name: 'female', value: 50}]} />);
    expect(screen.getByRole('status')).toBeDefined();
});

it("Should have the same number of slices as the data", () => {
    const data = [{name: 'male', value: 50}, {name: 'female', value: 50}];
    render(<PieGraph loading={false} donut={false} data={data} />);
    expect(document.querySelectorAll('[data-degrees]').length).toBe(data.length);
});
