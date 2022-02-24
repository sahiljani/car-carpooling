import Enzyme, { shallow } from "enzyme";
import React from "react";
import Adapter from 'enzyme-adapter-react-16';
import Cookies from 'js-cookie';
import Navbar from "../Navbar";

Enzyme.configure({ adapter: new Adapter() });

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useLocation: () => ({
        pathname: "localhost:3000/example/path"
    })
}));

describe("navbar", () => {

    let wrapper;

    beforeEach(() => {
        Cookies.get = jest.fn().mockImplementation(() => 'token');
        wrapper = shallow(<Navbar />);
    });

    it("TODO1", () => {

    });

    afterEach(() => {
        jest.clearAllMocks();
    });
})
