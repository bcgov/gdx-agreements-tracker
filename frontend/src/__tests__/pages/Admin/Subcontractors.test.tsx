import React from "react";
import { shallow } from "enzyme";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes } from "react-router-dom";
import adminRoutes from "../../../routes/subRoutes/adminRoutes";
import { Subcontractors } from "../../../pages/Admin/Subcontractors";

//Mock keycloak.
jest.mock("@react-keycloak/web", () => ({
  useKeycloak: () => ({ initialized: true, keycloak: { authenticated: true } }),
}));

describe("<Subcontractors /> routing", () => {
  it("renders Subcontractors page when '/admin/subcontractors' is hit", () => {
    render(
      <MemoryRouter initialEntries={["/admin/subcontractors"]}>
        <Routes key="main">{adminRoutes}</Routes>
      </MemoryRouter>
    );
    const wrapper = shallow(<Subcontractors />);
    expect(wrapper.text().includes('Subcontractors')).toBe(true);
  });
});
