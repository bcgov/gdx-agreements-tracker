import React from "react";
import { GDXAccordion } from "../../../components";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

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
});
