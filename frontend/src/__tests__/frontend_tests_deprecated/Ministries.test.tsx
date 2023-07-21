import { shallow } from "enzyme";
import { render } from "@testing-library/react";
import { MemoryRouter, Routes } from "react-router-dom";
import adminRoutes from "../../routes/subRoutes/adminRoutes";
import { Ministries } from "../../pages/Admin/Ministries";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient();
//Mock keycloak.
jest.mock("@react-keycloak/web", () => ({
  useKeycloak: () => ({ initialized: true, keycloak: { authenticated: true } }),
}));

describe("<Ministries /> routing", () => {
  it("renders Ministries page when '/admin/ministries' is hit", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={["/admin/ministries"]}>
          <Routes key="main">{adminRoutes}</Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );
    const wrapper = shallow(
      <QueryClientProvider client={queryClient}>
        <Ministries />
      </QueryClientProvider>
    );
    expect(wrapper.text().includes("Ministries")).toBe(true);
  });
});
