import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Amendments } from "pages/Contracts/Contract/Amendments";
import { shallow } from "enzyme";

// Create a client
const queryClient = new QueryClient();
//Mock keycloak.
jest.mock("@react-keycloak/web", () => ({
  useKeycloak: () => ({ initialized: true, keycloak: { authenticated: true } }),
}));

describe("<Amendments />", () => {
  it("renders Resources page when '/admin/resources/' is hit", async () => {
    const wrapper = shallow(
      <QueryClientProvider client={queryClient}>
        <Amendments />
      </QueryClientProvider>
    );
    expect(wrapper.text().includes("Amendments")).toBe(true);
  });
});
