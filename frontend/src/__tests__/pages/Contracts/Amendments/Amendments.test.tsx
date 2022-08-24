import React from "react";

import { render, fireEvent, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Router, Route, MemoryRouterProps } from "react-router-dom";
import { createMemoryHistory } from "history";
import { QueryClient, QueryClientProvider } from "react-query";
import contractRoutes from "routes/subRoutes/contractRoutes";
import { Amendments } from "pages/Contracts/Contract/Amedments";
import { shallow } from "enzyme";
import adminRoutes from "routes/subRoutes/adminRoutes";

// Create a client
const queryClient = new QueryClient();
//Mock keycloak.
jest.mock("@react-keycloak/web", () => ({
  useKeycloak: () => ({ initialized: true, keycloak: { authenticated: true } }),
}));

describe("<Amendments />", () => {
  it("renders Resources page when '/admin/resources/' is hit", async () => {    
    const wrapper = shallow(
      <QueryClientProvider client={queryClient}>
        <Amendments />
      </QueryClientProvider>
    );
    expect(wrapper.text().includes("Amendments")).toBe(true);
  });
});
