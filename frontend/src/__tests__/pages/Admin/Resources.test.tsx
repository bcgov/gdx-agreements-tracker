import React from "react";
import { render } from "@testing-library/react";
import adminRoutes from "../../../routes/subRoutes/adminRoutes";
import { MemoryRouter, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { shallow } from "enzyme";
import { Resources } from "pages/Admin/Resources";
// Create a client
const queryClient = new QueryClient();
//Mock keycloak.
jest.mock("@react-keycloak/web", () => ({
  useKeycloak: () => ({ initialized: true, keycloak: { authenticated: true } }),
}));

describe("<Resources /> routing", () => {
  it("renders Resources page when '/admin/resources/' is hit", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={["/admin/resources/"]}>
          <Routes key="main">{adminRoutes}</Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );
    const wrapper = shallow(
      <QueryClientProvider client={queryClient}>
        <Resources />
      </QueryClientProvider>
    );
    expect(wrapper.text().includes("Resources")).toBe(true);
  });
});
