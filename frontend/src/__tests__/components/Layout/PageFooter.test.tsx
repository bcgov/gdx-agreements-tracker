import React from "react";
import { PageFooter } from "../../../components/Layout/PageFooter";
import { render } from "@testing-library/react";

//Mock keycloak.
jest.mock("@react-keycloak/web", () => ({
  useKeycloak: () => ({ initialized: true, keycloak: { authenticated: true } }),
}));

describe("Layout Page Footer", () => {
  it("Renders.", () => {
    render(<PageFooter />);
  });

  it("Is present.", () => {
    const { getByRole } = render(<PageFooter />);
    expect(getByRole("page-footer")).toBeInTheDocument();
  });
});
