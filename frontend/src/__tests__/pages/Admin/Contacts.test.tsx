import React from "react";
import { render } from "@testing-library/react";
import adminRoutes from "../../../routes/subRoutes/adminRoutes";
import { MemoryRouter, Routes } from "react-router-dom";
import { Contacts } from "../../../pages/Admin/Contacts";
import { shallow } from "enzyme";

//Mock keycloak.
jest.mock("@react-keycloak/web", () => ({
  useKeycloak: () => ({ initialized: true, keycloak: { authenticated: true } }),
}));

describe("<Contacts /> routing", () => {
  it("renders Contacts page when '/admin/contacts/' is hit", () => {
    render(
      <MemoryRouter initialEntries={["/admin/contacts/"]}>
        <Routes key="main">{adminRoutes}</Routes>
      </MemoryRouter>
    );
    shallow(<Contacts />);
  });
});
