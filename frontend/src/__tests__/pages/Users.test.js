import React from "react";
//import { shallow } from "enzyme";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes } from "react-router-dom";
import adminRoutes from "../../routes/subRoutes/adminRoutes";
//import { Users } from "../../pages/";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

//Mock keycloak.
jest.mock("@react-keycloak/web", () => ({
  useKeycloak: () => ({ initialized: true, keycloak: { authenticated: true } }),
}));

describe("<Users /> routing", () => {
  // Create a client
  const queryClient = new QueryClient();

  it("renders Users page when '/admin/users/' is hit", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={["/admin/users/"]}>
          <Routes key="main">{adminRoutes}</Routes>
        </MemoryRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    );
    //const wrapper = shallow(<Users />);
    //expect(wrapper.exists()).toBe(true);
    expect(screen.getByText("Users", { selector: "h2" })).toBeInTheDocument();
  });
});
