import React from "react";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import AppRouter from "../routes";
import PageNotFound from "../pages/PageNotFound";

describe("<PageNotFound /> routing", () => {
  it("redirects to <PageNotFound /> when an invalid URL is passed", () => {
    const appWrapper = mount(
      <MemoryRouter initialEntries={["/invalid-url"]}>
        <AppRouter />
      </MemoryRouter>
    );
    expect(appWrapper.find(PageNotFound)).toHaveLength(1);
  });
});
