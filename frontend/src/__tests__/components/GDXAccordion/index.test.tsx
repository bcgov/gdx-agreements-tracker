import React from "react";
import { GDXAccordion } from "../../../components";
import { render, screen, waitFor } from "@testing-library/react";
import  userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { SmartScreenTwoTone } from "@mui/icons-material";

describe("Layout GDXAccordion", () => {
  it("Renders at all.", async () => {
    const { container } = render(
      <GDXAccordion sectionTitle={"testSection"}>
        <div>testChild component</div>
      </GDXAccordion>,
      {
        wrapper: MemoryRouter,
      }
    );
    expect(container).not.toBeEmptyDOMElement();

  });

  it("button click .", () => {
    render(
      <GDXAccordion sectionTitle={"testSection"}>
        <div>testChild component</div>
      </GDXAccordion>,
      {
        wrapper: MemoryRouter,
      }
    );
    expect(screen.getByRole("button", {expanded: true, name: /button/i})).toBeTruthy();
    userEvent.click(screen.getByRole("button"))
    expect(screen.getByRole("button", {expanded: false, name: /button/i})).toBeTruthy();

  });
});
