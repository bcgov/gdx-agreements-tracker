import React from "react";
import { PageFooter } from "../../../components/Layout/PageFooter";
import { render } from "@testing-library/react";

describe("Layout Page Footer", () => {
  it("Renders.", () => {
    render(<PageFooter />);
  });

  it("Is present.", () => {
    const { getByRole } = render(<PageFooter />);
    expect(getByRole("page-footer")).toBeInTheDocument();
  });
});
