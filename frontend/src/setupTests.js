import "@testing-library/jest-dom";
import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { ThemeProvider } from "@mui/material/styles";
import bcgovTheme from "../src/bcgovTheme";

Enzyme.configure({ adapter: new Adapter() });

export function mountWithTheme(child) {
  return mount(child, {
    wrappingComponent: ({ children }) => (
      <ThemeProvider theme={bcgovTheme}>{children}</ThemeProvider>
    ),
  });
}

export function shallowWithTheme(child) {
  return shallow(child, {
    wrappingComponent: ({ children }) => (
      <ThemeProvider theme={bcgovTheme}>{children}</ThemeProvider>
    ),
  });
}
