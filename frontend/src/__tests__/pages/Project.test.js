import React from "react";

import { render } from "@testing-library/react";
import { Sidebar, Main } from "../../components";
import projectRoutes from "../../routes/subRoutes/projectRoutes";
import { MemoryRouter, Routes } from "react-router-dom";
import { Projects } from "../../pages";
import { shallow } from "enzyme";

//Mock keycloak.
jest.mock("@react-keycloak/web", () => ({
  useKeycloak: () => ({ initialized: true, keycloak: { authenticated: true } }),
}));

describe("Project page testing", () => {
  it("rendered the Sidebar list component", () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );

    const sideBarSection = getByTestId("sideBarSection");
    expect(sideBarSection).toBeTruthy();
  });

  it("rendered the Main component", () => {
    const { getByTestId } = render(<Main />);
    const mainBody = getByTestId("mainBody");
    expect(mainBody).toBeTruthy();
  });
});

describe("<Projects /> routing", () => {
  it("renders Projects page when '/admin' is hit", () => {
    render(
      <MemoryRouter initialEntries={["/projects"]}>
        <Routes key="main">{projectRoutes}</Routes>
      </MemoryRouter>
    );
    shallow(<Projects />);
  });
});
