import React from "react";
import { GDXAccordion } from "../../../components";
import {
  fireEvent,
  getByLabelText,
  getByRole,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UserEvent from "@testing-library/user-event";
import { useKeycloak } from "@react-keycloak/web";

describe("Layout GDXAccordion", () => {
  it("Renders at all.", () => {
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

  it("Expands Accordion when clicked ", async () => {
     render(
      <GDXAccordion sectionTitle={"testSection"}>
        <div>testChild component</div>
      </GDXAccordion>
    );

    await waitFor(() => UserEvent.click(screen.getByRole("button")));

    expect(
      screen.getByRole("button", {
        expanded: true,
      })
    ).toBeTruthy();
  });
});
