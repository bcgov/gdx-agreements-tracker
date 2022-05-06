import React from "react";
import { render, screen } from "@testing-library/react";
import adminRoutes from "../../../routes/subRoutes/adminRoutes";
import { MemoryRouter, Routes } from "react-router-dom";

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
    expect(screen.getByText("Contacts", { selector: "h2" })).toBeInTheDocument();
  });
});
