import React from "react";
import { Sidebar } from "../../components";
import { shallow } from "enzyme";

//Mock keycloak.
jest.mock("@react-keycloak/web", () => ({
  useKeycloak: () => ({ initialized: true, keycloak: { authenticated: true } }),
}));
describe("<Sidebar/> testing", () => {
  it("rendered the SideBar component", () => {
    const wrapper = shallow(<Sidebar />);
    expect(wrapper.text()).toMatch("Administration Forms");
  });
});
