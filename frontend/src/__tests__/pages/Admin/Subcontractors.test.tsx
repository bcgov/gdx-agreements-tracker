import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes } from "react-router-dom";
import adminRoutes from "../../../routes/subRoutes/adminRoutes";
//import { Subcontractors } from "../../../pages/Admin/Subcontractors";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

//Mock keycloak.
jest.mock("@react-keycloak/web", () => ({
  useKeycloak: () => ({ initialized: true, keycloak: { authenticated: true } }),
}));

describe("<Subcontractors /> routing", () => {
  // Create a client
  const queryClient = new QueryClient();

  it("renders Subcontractors page when '/admin/subcontractors' is hit", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={["/admin/subcontractors"]}>
          <Routes key="main">{adminRoutes}</Routes>
        </MemoryRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    );
    //const wrapper = shallow(<Subcontractors />);
    //expect(wrapper.text().includes("Subcontractors")).toBe(true);
    expect(screen.getByText("Subcontractors", { selector: "h2" })).toBeInTheDocument();
  });
});
