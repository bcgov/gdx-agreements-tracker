import { render, fireEvent, screen } from "@testing-library/react";
import projectRoutes from "../../routes/subRoutes/projectRoutes";
import { MemoryRouter, Routes, Router } from "react-router-dom";
import { Projects } from "../../pages";
import { createMemoryHistory } from "history";
import { QueryClient, QueryClientProvider } from "react-query";

// Create a client
const queryClient = new QueryClient();
//Mock keycloak.
jest.mock("@react-keycloak/web", () => ({
  useKeycloak: () => ({ initialized: true, keycloak: { authenticated: true } }),
}));

describe("<Projects /> routing", () => {
  it("renders Projects page when '/projects' is hit", () => {
    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={["/projects"]}>
          <Routes key="main">{projectRoutes}</Routes>
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
          <Projects />
        </Router>
      </QueryClientProvider>
    );

    fireEvent.click(screen.getByText(/New Project/i));
    expect(history.location.pathname).toEqual("/projects/new");
  });
});
