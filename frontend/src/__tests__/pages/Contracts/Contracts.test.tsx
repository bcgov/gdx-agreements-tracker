import React from "react";

import { render, fireEvent, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import contractRoutes from "routes/subRoutes/contractRoutes";
import { Contracts } from "pages";

// Create a client
const queryClient = new QueryClient();
//Mock keycloak.
jest.mock("@react-keycloak/web", () => ({
  useKeycloak: () => ({ initialized: true, keycloak: { authenticated: true } }),
}));

describe("<Contracts /> routing", () => {
  it("renders Contracts page when '/contracts' is hit", () => {
    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={["/contracts"]}>
          <Routes key="main">{contractRoutes}</Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );
    expect(container).not.toBeEmptyDOMElement();
  });

  it("should redirect and update history", () => {
    const history = createMemoryHistory();

    render(
      <QueryClientProvider client={queryClient}>
        <Router location={history.location} navigator={history}>
          <Contracts />
        </Router>
      </QueryClientProvider>
    );

    fireEvent.click(screen.getByText(/New Contract/i));
    expect(history.location.pathname).toEqual("/contracts/new");
  });
});
