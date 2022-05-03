import React from "react";
import { PageHeader } from "../../../components/Layout/PageHeader";
import { fireEvent, render } from "@testing-library/react";

//Mock keycloak.
jest.mock("@react-keycloak/web", () => ({
  useKeycloak: () => ({ initialized: true, keycloak: { authenticated: true } }),
}));


describe("Layout Page Header", () => {
  it("Renders.", () => {
    const handleClick = jest.fn();
    render(<PageHeader drawerOpen={false} handleDrawerToggle={handleClick} />);
  });

  it("Is present.", () => {
    const handleClick = jest.fn();
    const { getByRole } = render(
      <PageHeader drawerOpen={false} handleDrawerToggle={handleClick} />
    );
    expect(getByRole("page-header")).toBeInTheDocument();
  });

  it("Has a toolbar", () => {
    const handleClick = jest.fn();
    const { getByRole } = render(
      <PageHeader drawerOpen={false} handleDrawerToggle={handleClick} />
    );
    expect(getByRole("page-header-toolbar")).toBeInTheDocument();
  });

  // Ensure the react typescript interface is passing the click handler function correctly.
  it("Test click event", async () => {
    const handleClick = jest.fn();

    const { findByRole } = render(
      <PageHeader drawerOpen={false} handleDrawerToggle={handleClick} />
    );

    fireEvent(
      await findByRole("sidebar-toggle-button"),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
