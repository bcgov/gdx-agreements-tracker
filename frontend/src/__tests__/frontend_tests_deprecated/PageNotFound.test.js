import PageNotFound from "../../pages/PageNotFound";
import { QueryClient, QueryClientProvider } from "react-query";
import { shallow } from "enzyme";

// Create a client
const queryClient = new QueryClient();
//Mock keycloak.
jest.mock("@react-keycloak/web", () => ({
  useKeycloak: () => ({ initialized: true, keycloak: { authenticated: true } }),
}));

describe("<PageNotFound /> routing", () => {
  it("renders page not found", async () => {
    const wrapper = shallow(
      <QueryClientProvider client={queryClient}>
        <PageNotFound />
      </QueryClientProvider>
    );
    expect(wrapper.text().includes("PageNotFound")).toBe(true);
  });
});
