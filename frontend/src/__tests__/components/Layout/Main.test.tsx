import React from "react";
import { render } from "@testing-library/react";
import { Main } from "../../../components";
import { MemoryRouter } from "react-router-dom";
//Mock keycloak.
jest.mock("@react-keycloak/web", () => ({
  useKeycloak: () => ({ initialized: true, keycloak: { authenticated: true } }),
}));

describe("Main Layout", () => {
  it("Renders.", () => {
    render(<Main />, {
      wrapper: MemoryRouter,
    });
  });

  it("Is present.", () => {
    const { getByRole } = render(<Main />, {
      wrapper: MemoryRouter,
    });

    expect(getByRole("page-footer")).toBeInTheDocument();
    expect(getByRole("page-header")).toBeInTheDocument();
    expect(getByRole("page-sidebar")).toBeInTheDocument();
  });
});
