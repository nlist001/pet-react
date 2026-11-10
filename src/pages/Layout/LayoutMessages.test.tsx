import { render, screen } from "@testing-library/react";

import  {LayoutMessages}  from "./LayoutMessages";

describe('LayoutMessages test',()=>{
    it("render",()=>{
        render(<LayoutMessages />)
        expect(screen.getByText(/Test text/i)).toBeInTheDocument();
    })
})
