import React from "react";
import { shallow } from "enzyme";
import { render } from "@testing-library/react";
import { MemoryRouter, Routes } from "react-router-dom";
import adminRoutes from "../../routes/subRoutes/adminRoutes";
import { Contacts } from "../../pages/Admin/Contacts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient();
//Mock keycloak.
jest.mock("@react-keycloak/web", () => ({
  useKeycloak: () => ({ initialized: true, keycloak: { authenticated: true } }),
}));

describe("<Contacts /> routing", () => {
  it("renders Contacts page when '/admin/contacts' is hit", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={["/admin/contacts"]}>
          <Routes key="main">{adminRoutes}</Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );
    const wrapper = shallow(
      <QueryClientProvider client={queryClient}>
        <Contacts />
      </QueryClientProvider>
    );
    expect(wrapper.text().includes("Contacts")).toBe(true);
  });
});
