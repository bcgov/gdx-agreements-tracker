import React from "react";
import { Route } from "react-router-dom";
import { Reports, Report } from "../../pages";
const reportRoutes = [
  <Route key="report" path="reports" element={<Reports />} />,
];

export default reportRoutes;
