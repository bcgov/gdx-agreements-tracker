import React from "react";
import { mountWithTheme } from "../../setupTests";
import { MemoryRouter } from "react-router-dom";
import AppRouter from "../../routes";
import PageNotFound from "../../pages/PageNotFound";

describe("<PageNotFound /> routing", () => {
  it("redirects to <PageNotFound /> when an invalid URL is passed", () => {
    const appWrapper = mountWithTheme(
      <MemoryRouter initialEntries={["/invalid-url"]}>
        <AppRouter />
      </MemoryRouter>
    );
    expect(appWrapper.find(PageNotFound)).toHaveLength(1);
  });
});
