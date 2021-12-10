import React from "react";
import { Route } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";
import {
  Details,
  List,
  Resources,
  Deliverables,
  InternalCoding,
  Amendments,
} from "../../pages/Contract";

const contractRoutes = [
  <Route key="contract" path="/contract" element={<ProtectedRoute component={List} />} />,
  <Route
    key="contractDetails"
    path="/contract/:contractId"
    element={<ProtectedRoute component={Details} />}
  />,
  <Route
    key="conractResources"
    path="/contract/:contractId/resources"
    element={<ProtectedRoute component={Resources} />}
  />,
  <Route
    key="contractDeliverables"
    path="/contract/:contractId/deliverables"
    element={<ProtectedRoute component={Deliverables} />}
  />,
  <Route
    key="conractInternalCoding"
    path="/contract/:contractId/internal-coding"
    element={<ProtectedRoute component={InternalCoding} />}
  />,
  <Route
    key="contractAmendments"
    path="/contract/:contractId/amendments"
    element={<ProtectedRoute component={Amendments} />}
  />,
];

export default contractRoutes;
