import { getByRole, render, screen, waitFor } from "@testing-library/react";
import { SignoutButton } from "../../components/SignoutButton";
import UserEvent from "@testing-library/user-event";
import { useKeycloak } from "@react-keycloak/web";

jest.mock("@react-keycloak/web");

describe("The signout button:", () => {
  const mockedUseKeycloak = useKeycloak as jest.Mock;

  it("Renders.", () => {
    // Create a new variable and type it as jest.Mock passing the type
    const handleClick = jest.fn();
    mockedUseKeycloak.mockImplementation(() => {
      return {
        keycloak: { authenticated: false, logout: handleClick },
      };
    });
    const { container } = render(<SignoutButton />);
    expect(container).not.toBeEmptyDOMElement();
  });

  it("Logs out when clicked.", async () => {
    const handleClick = jest.fn();
    mockedUseKeycloak.mockImplementation(() => {
      return {
        keycloak: { authenticated: false, logout: handleClick },
      };
    });
    render(<SignoutButton />);
    UserEvent.click(getByRole(screen.getByTestId("signout-select"), "button"));
    await waitFor(() => UserEvent.click(screen.getByText(/signout/i)));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
