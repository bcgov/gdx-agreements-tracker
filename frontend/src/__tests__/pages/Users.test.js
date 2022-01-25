import React from "react";
import { shallow } from "enzyme";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes } from "react-router-dom";
import adminRoutes from "../../routes/subRoutes/adminRoutes";
import { Users } from "../../pages/";

//Mock keycloak.
jest.mock("@react-keycloak/web", () => ({
  useKeycloak: () => ({ initialized: true, keycloak: { authenticated: true } }),
}));

describe("<Admin /> routing", () => {
  it("renders Admin page when '/admin' is hit", () => {
    const component = render(
      <MemoryRouter initialEntries={["/admin/users"]}>
        <Routes key="main">{adminRoutes}</Routes>
      </MemoryRouter>
    );
    shallow(<Users />);
  });
});
