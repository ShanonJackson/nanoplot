import { describe, expect, it } from "bun:test"
import { render, screen, fireEvent } from "@testing-library/react"
import { EnumControl } from "./EnumControl";
import { jest } from "bun:test";

describe("EnumControl", () => {
    it('Should render discription.', () => {
        const legendDiscription = `legendDiscription`
        render(<EnumControl description={legendDiscription} options={[]} setPosition={() => {}} />)

        const discription = screen.getByText('legendDiscription')
        expect(discription).toBeInTheDocument();
    });
    it("Should render given number of options as lables.", async () => {
        const options = ['top', 'bottom', 'right', 'left'];
        render(<EnumControl options={[...options]}  setPosition={() => {}}/>)

        expect(screen.getAllByRole('listitem')).toHaveLength(4)
        expect(screen.getByText('top')).toBeInTheDocument()
        expect(screen.getByText('bottom')).toBeInTheDocument()
        expect(screen.getByText('right')).toBeInTheDocument()
        expect(screen.getByText('left')).toBeInTheDocument()
    });
    it("Should call function with parameter.", () => {
        const fn = jest.fn()
        const options = ['top', 'bottom', 'right', 'left'];
        render(<EnumControl options={[...options]} setPosition={fn}/>)
        
        fireEvent.click(screen.getByText('top'))

        expect(fn.mock.calls).toHaveLength(1)
        expect(fn.mock.calls[0][0]).toBe('top')
    });
})