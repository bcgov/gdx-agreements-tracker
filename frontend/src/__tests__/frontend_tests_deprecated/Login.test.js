import React from "react";
import { shallow } from "enzyme";
import Login from "../../pages/Login";

//TODO this test and folder can be removed once we fix the all the other tests. This is just in place so the tests pass.
// Mock react router.
jest.mock("react-router-dom", () => {
  return {
    useLocation: () => ({ location: { pathname: null } }),
    useSearchParams: () => [null],
    useNavigate: () => null,
  };
});

//Mock keycloak.
jest.mock("@react-keycloak/web", () => ({
  useKeycloak: () => ({ initialized: true, keycloak: { authenticated: false } }),
}));

describe("<Login /> component", () => {
  const login = shallow(<Login />);

  it("Contains a login button", () => {
    expect(login.find("button")).toHaveLength(1);
  });
});
