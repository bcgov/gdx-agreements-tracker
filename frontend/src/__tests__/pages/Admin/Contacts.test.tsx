import React from "react";
import { render, screen } from "@testing-library/react";
import adminRoutes from "../../../routes/subRoutes/adminRoutes";
import { MemoryRouter, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

//Mock keycloak.
jest.mock("@react-keycloak/web", () => ({
  useKeycloak: () => ({ initialized: true, keycloak: { authenticated: true } }),
}));

describe("<Contacts /> routing", () => {
  // Create a client
  const queryClient = new QueryClient();

  it("renders Contacts page when '/admin/contacts/' is hit", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={["/admin/contacts/"]}>
          <Routes key="main">{adminRoutes}</Routes>
        </MemoryRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    );
    expect(screen.getByText("Contacts", { selector: "h2" })).toBeInTheDocument();
  });
});
