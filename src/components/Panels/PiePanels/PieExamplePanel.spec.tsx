import { describe, expect, it } from "bun:test";
import { render, screen } from "@testing-library/react"
import { PieExamplesPanel } from "./PieExamplesPanel"

describe("PieExamplePanel", () => {
    it('Should render PieExamplePanel.', () => {
        render(<PieExamplesPanel/>)

        expect(screen.getByText("EXAMPLES")).toBeInTheDocument()
    });
})