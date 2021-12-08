import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes } from "react-router-dom";
import AdminRoutes from '../pages/Admin/routes';

test("renders Admin page", () => {
  render(
    <MemoryRouter initialEntries={["/admin"]}>
      <Routes key="main">{AdminRoutes}</Routes>
    </MemoryRouter>
  );
  const linkElement = screen.getByText(/Admin/i);
  expect(linkElement).toBeInTheDocument();
});
