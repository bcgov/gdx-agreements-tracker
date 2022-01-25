import React from "react";
import { shallow } from "enzyme";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes } from "react-router-dom";
import adminRoutes from "../../routes/subRoutes/adminRoutes";
import { Admin } from "../../pages/Admin";
import Sidebar from "../../components/Sidebar";
import Main from "../../components/Main";

//Mock keycloak.
jest.mock("@react-keycloak/web", () => ({
  useKeycloak: () => ({ initialized: true, keycloak: { authenticated: true } }),
}));

describe("<Admin /> component", () => {
  const admin = shallow(<Admin />);

  it("Contains a sidebar component", () => {
    expect(admin.find(Sidebar)).toHaveLength(1);
  });

  it("Contains a main component", () => {
    expect(admin.find(Main)).toHaveLength(1);
  });
});

describe("<Admin /> routing", () => {
  it("renders Admin page when '/admin' is hit", () => {
    render(
      <MemoryRouter initialEntries={["/admin"]}>
        <Routes key="main">{adminRoutes}</Routes>
      </MemoryRouter>
    );
    const linkElement = screen.getByText("Admin");
    expect(linkElement).toBeInTheDocument();
  });
});
