import React from "react";
import { Sidebar } from "../../components";
import { act, fireEvent, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

describe("Layout Sidebar", () => {
  it("Renders at all.", () => {
    const handleClick = jest.fn();
    render(<Sidebar drawerOpen={false} handleDrawerToggle={handleClick} />, {
      wrapper: MemoryRouter,
    });
  });

  it("Renders the SideBar logo.", () => {
    const handleClick = jest.fn();
    const { getByRole } = render(<Sidebar drawerOpen={false} handleDrawerToggle={handleClick} />, {
      wrapper: MemoryRouter,
    });
    expect(getByRole("sidebar-logo")).toBeInTheDocument();
  });
});
