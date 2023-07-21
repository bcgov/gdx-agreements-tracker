import { PageFooter } from "../../../components/Layout/PageFooter";
import { render } from "@testing-library/react";

//Mock keycloak.
jest.mock("@react-keycloak/web", () => ({
  useKeycloak: () => ({ initialized: true, keycloak: { authenticated: true } }),
}));

describe("Layout Page Footer", () => {
  it("Renders.", () => {
    const { container } = render(<PageFooter />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("Is present.", () => {
    const { getByRole } = render(<PageFooter />);
    expect(getByRole("page-footer")).toBeInTheDocument();
  });
});
