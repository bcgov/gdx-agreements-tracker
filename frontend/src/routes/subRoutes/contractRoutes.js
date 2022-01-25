import React from "react";
import { Route } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";
import { PageLink } from "../../components/PageLink";
import { Contract, Contracts } from "../../pages";
const contractRoutes = [
  <Route key="contracts" path="/contracts" element={<ProtectedRoute component={Contracts} />}>
    <Route path=":contractId" element={<ProtectedRoute component={Contract} />} />
    <Route
      path="resources"
      element={
        <ProtectedRoute
          component={() => {
            return PageLink("Resources");
          }}
        />
      }
    />
    <Route
      path="deliverables"
      element={
        <ProtectedRoute
          component={() => {
            return PageLink("Deliverables");
          }}
        />
      }
    />
    <Route
      path="internal-coding"
      element={
        <ProtectedRoute
          component={() => {
            return PageLink("InternalCoding");
          }}
        />
      }
    />
    <Route
      path="amendments"
      element={
        <ProtectedRoute
          component={() => {
            return PageLink("Amendments");
          }}
        />
      }
    />
  </Route>,
];

export default contractRoutes;
