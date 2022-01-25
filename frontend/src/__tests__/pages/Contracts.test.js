import { render } from "@testing-library/react";
import { Sidebar, Main } from "../../components";
import contractRoutes from "../../routes/subRoutes/contractRoutes";
import { MemoryRouter, Routes } from "react-router-dom";
import { Contracts } from "../../pages";
import { shallow } from "enzyme";

//Mock keycloak.
jest.mock("@react-keycloak/web", () => ({
  useKeycloak: () => ({ initialized: true, keycloak: { authenticated: true } }),
}));
describe("Contract page testing", () => {
  it("rendered the Sidebar list component ", () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );

    const sideBarSection = getByTestId("sideBarSection");
    expect(sideBarSection).toBeTruthy;
  });

  it("rendered the Main component ", () => {
    const { getByTestId } = render(<Main />);
    const mainBody = getByTestId("mainBody");
    expect(mainBody).toBeTruthy;
  });
});

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
