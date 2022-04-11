import React from "react";
import { render } from "@testing-library/react";
import adminRoutes from "../../../routes/subRoutes/adminRoutes";
import { MemoryRouter, Routes } from "react-router-dom";
import { Subcontractors } from "../../../pages/Admin/Subcontractors";
import { shallow } from "enzyme";

//Mock keycloak.
jest.mock("@react-keycloak/web", () => ({
  useKeycloak: () => ({ initialized: true, keycloak: { authenticated: true } }),
}));

describe("<Subcontractors /> routing", () => {
  it("renders Subcontractors page when '/admin/contacts/' is hit", () => {
    render(
      <MemoryRouter initialEntries={["/admin/contacts/"]}>
        <Routes key="main">{adminRoutes}</Routes>
      </MemoryRouter>
    );
    shallow(<Subcontractors />);
  });
});
