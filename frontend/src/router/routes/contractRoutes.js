import React from "react";
import { Route } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";
import { PageLink } from "../../components/PageLink";
import { Details, List } from "../../pages/Contract";

const contractRoutes = [
  <Route key="contract" path="/contract" element={<ProtectedRoute component={List} />}>
    <Route
      path=":contractId"
      element={
        <ProtectedRoute
          component={() => {
            return PageLink(Details);
          }}
        />
      }
    >
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
    </Route>
  </Route>,
];

export default contractRoutes;
