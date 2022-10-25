import "@testing-library/jest-dom";
import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { ThemeProvider } from "@mui/material/styles";
import bcgovTheme from "../src/bcgovTheme";

Enzyme.configure({ adapter: new Adapter() });

export const mountWithTheme = (child) => {
  return mount(child, {
    wrappingComponent: ({ children }) => (
      <ThemeProvider theme={bcgovTheme}>{children}</ThemeProvider>
    ),
  });
};

export const shallowWithTheme = (child) => {
  return shallow(child, {
    wrappingComponent: ({ children }) => (
      <ThemeProvider theme={bcgovTheme}>{children}</ThemeProvider>
    ),
  });
};


//reference : https://stackoverflow.com/questions/58070996/how-to-fix-the-warning-uselayouteffect-does-nothing-on-the-server
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useLayoutEffect: jest.requireActual('react').useEffect,
}));