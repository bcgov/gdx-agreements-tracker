import React from "react";

import { render } from "@testing-library/react";
import projectRoutes from "../../routes/subRoutes/projectRoutes";
import { MemoryRouter, Routes } from "react-router-dom";
import { Projects } from "../../pages";
import { shallow } from "enzyme";

//Mock keycloak.
jest.mock("@react-keycloak/web", () => ({
  useKeycloak: () => ({ initialized: true, keycloak: { authenticated: true } }),
}));

describe("<Projects /> routing", () => {
  it("renders Projects page when '/projects' is hit", () => {
    render(
      <MemoryRouter initialEntries={["/projects"]}>
        <Routes key="main">{projectRoutes}</Routes>
      </MemoryRouter>
    );
    const wrapper = shallow(<Projects />);
    expect(wrapper.exists()).toBe(true);
  });
});
