import React from "react";
import { shallow } from "enzyme";
import ProtectedRoute from "../router/ProtectedRoute";
import { List } from "../pages/Project";

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
    const protectedRoute = shallow(<ProtectedRoute component={List} />);
    expect(protectedRoute.containsMatchingElement(<List />)).toEqual(true);
  });
});
