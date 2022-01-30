import React from "react";
import { render } from "@testing-library/react";
import contractRoutes from "../../routes/subRoutes/contractRoutes";
import { MemoryRouter, Routes } from "react-router-dom";
import { Contracts } from "../../pages";
import { shallow } from "enzyme";

//Mock keycloak.
jest.mock("@react-keycloak/web", () => ({
  useKeycloak: () => ({ initialized: true, keycloak: { authenticated: true } }),
}));

describe("<Contracts /> routing", () => {
  it("renders Contracts page when '/admin' is hit", () => {
    render(
      <MemoryRouter initialEntries={["/contracts"]}>
        <Routes key="main">{contractRoutes}</Routes>
      </MemoryRouter>
    );
    shallow(<Contracts />);
  });
});
