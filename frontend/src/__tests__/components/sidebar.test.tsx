import { Sidebar } from "../../components";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

//Mock keycloak.
jest.mock("@react-keycloak/web", () => ({
  useKeycloak: () => ({ initialized: true, keycloak: { authenticated: true } }),
}));

describe("Layout Sidebar", () => {
  it("Renders at all.", () => {
    const handleClick = jest.fn();
    const { container } = render(<Sidebar drawerOpen={false} handleDrawerToggle={handleClick} />, {
      wrapper: MemoryRouter,
    });
    expect(container).not.toBeEmptyDOMElement();
  });

  it("Renders the SideBar logo.", () => {
    const handleClick = jest.fn();
    const { getByRole } = render(<Sidebar drawerOpen={false} handleDrawerToggle={handleClick} />, {
      wrapper: MemoryRouter,
    });
    expect(getByRole("sidebar-logo")).toBeInTheDocument();
  });
});
