import React from "react";
import { shallow } from "enzyme";
import { render } from "@testing-library/react";
import { MemoryRouter, Routes } from "react-router-dom";
import adminRoutes from "../../../routes/subRoutes/adminRoutes";
import { Subcontractors } from "../../../pages/Admin/Subcontractors";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient();
//Mock keycloak.
jest.mock("@react-keycloak/web", () => ({
  useKeycloak: () => ({ initialized: true, keycloak: { authenticated: true } }),
}));

describe("<Subcontractors /> routing", () => {
  it("renders Subcontractors page when '/admin/subcontractors' is hit", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={["/admin/subcontractors"]}>
          <Routes key="main">{adminRoutes}</Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );
    const wrapper = shallow(
      <QueryClientProvider client={queryClient}>
        <Subcontractors />
      </QueryClientProvider>
    );
    expect(wrapper.text().includes("Subcontractors")).toBe(true);
  });
});
