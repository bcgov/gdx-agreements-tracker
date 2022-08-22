import React from "react";
import { render } from "@testing-library/react";
import adminRoutes from "../../../routes/subRoutes/adminRoutes";
import { MemoryRouter, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Subcontractors } from "pages/Admin/Subcontractors";
import { shallow } from "enzyme";
import { Suppliers } from "pages/Admin/Suppliers";
// Create a client
const queryClient = new QueryClient();
//Mock keycloak.
jest.mock("@react-keycloak/web", () => ({
  useKeycloak: () => ({ initialized: true, keycloak: { authenticated: true } }),
}));

describe("<Suppliers /> routing", () => {
  it("renders Suppliers page when '/admin/suppliers/' is hit", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={["/admin/suppliers/"]}>
          <Routes key="main">{adminRoutes}</Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );
    const wrapper = shallow(
      <QueryClientProvider client={queryClient}>
        <Suppliers />
      </QueryClientProvider>
    );
    expect(wrapper.text().includes("Suppliers")).toBe(true);
  });
});
