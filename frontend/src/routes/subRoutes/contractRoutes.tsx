import React from "react";
import { Route } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";
import { PageLink } from "../../components/PageLink";
import { Contract, Contracts } from "../../pages";
import { Amendments } from "pages/Contracts/Contract/Amedments";
const contractRoutes = [
  <Route key="contracts" path="/contracts" element={<ProtectedRoute component={Contracts} />} />,
  <Route
    key="contractId"
    path="/contracts/:contractId"
    element={<ProtectedRoute component={Contract} />}
  >
    <Route
      key="Resources"
      path="contracts/resources"
      element={
        <ProtectedRoute
          component={() => {
            return PageLink("Resources");
          }}
        />
      }
    />
    ,
    <Route
      key="deliverables"
      path="contracts/deliverables"
      element={
        <ProtectedRoute
          component={() => {
            return PageLink("Deliverables");
          }}
        />
      }
    />
    ,
    <Route
      key="internal-coding"
      path="contracts/internal-coding"
      element={
        <ProtectedRoute
          component={() => {
            return PageLink("InternalCoding");
          }}
        />
      }
    />
    ,
    <Route key="amendments" path="amendments" element={<Amendments />} />,
  </Route>,
];

export default contractRoutes;
