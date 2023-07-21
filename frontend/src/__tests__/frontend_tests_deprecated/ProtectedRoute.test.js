import { shallow } from "enzyme";
import ProtectedRoute from "../routes/ProtectedRoute";
import { Home } from "../pages/Home";

// Mock react router.
jest.mock("react-router-dom", () => {
  return {
    useLocation: () => ({ location: { pathname: "test" } }),
  };
});

//Mock keycloak.
jest.mock("@react-keycloak/web", () => ({
  useKeycloak: () => ({ initialized: true, keycloak: { authenticated: true } }),
}));

describe("<ProtectedRoute /> component", () => {
  it("Renders the passed component if keycloak is initialized and authenticated", () => {
    const protectedRoute = shallow(<ProtectedRoute component={Home} />);
    expect(protectedRoute.containsMatchingElement(<Home />)).toEqual(true);
  });
});
