import React from "react";
import App from "../App";
import { render } from "@testing-library/react";

//Mock keycloak.
jest.mock("@react-keycloak/web", () => ({
  useKeycloak: () => ({ initialized: true, keycloak: { authenticated: true } }),
}));

it("renders without crashing", () => {
  const { container } = render(<App />);
  expect(container).not.toBeEmptyDOMElement();
});
