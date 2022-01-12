import React from "react";
import { Route } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";
import { PageLink } from "../../pages/reusable/PageLink";
import {
  Details,
  List,
  Resources,
  Deliverables,
  InternalCoding,
  Amendments,
} from "../../pages/Contract";

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
      
      <Route path="resources" element={<ProtectedRoute component={Resources} />} />
      <Route path="deliverables" element={<ProtectedRoute component={Deliverables} />} />
      <Route path="internal-coding" element={<ProtectedRoute component={InternalCoding} />} />
      <Route path="amendments" element={<ProtectedRoute component={Amendments} />} />
    </Route>
  </Route>,
];

export default contractRoutes;
