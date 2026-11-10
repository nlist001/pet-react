import { render, screen } from "@testing-library/react";
import  SettingDialog  from "./SettingDialog";
import { reduxStore } from '../../reduxstore';
import { Provider } from "react-redux";

describe('SettingDialog test',()=>{
    let portalRoot;

      beforeAll(() => {
        // Create a div element to serve as the portal root
        portalRoot = document.createElement('div');
        portalRoot.id = 'modal'; // Assign an ID matching what your component expects
        document.body.appendChild(portalRoot); // Append it to the document body
      });

      afterAll(() => {
        // Clean up the portal root after tests are done
        document.body.removeChild(portalRoot);
      });

    it("render",()=>{
       render(<Provider store={reduxStore}><SettingDialog /></Provider>)
       // expect(screen.getByText(/Test text/i)).toBeInTheDocument();
    })
})
