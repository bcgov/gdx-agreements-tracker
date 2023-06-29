import "@testing-library/jest-dom";
import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import bcgovTheme from "../src/bcgovTheme";

//reference : https://stackoverflow.com/questions/58070996/how-to-fix-the-warning-uselayouteffect-does-nothing-on-the-server
jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useLayoutEffect: jest.requireActual("react").useEffect,
}));
