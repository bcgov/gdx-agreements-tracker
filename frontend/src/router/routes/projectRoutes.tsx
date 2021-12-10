import React from "react";
import { Route } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";
import {
  List,
  Details,
  Status,
  ChangeRequest,
  Billing,
  LessonsLearned,
  CloseOut,
} from "../../pages/Project";

const projectRoutes = [
  <Route key="projectList" path="/project" element={<ProtectedRoute component={List} />} />,
  <Route
    key="projectDetails"
    path="/project/:projectId"
    element={<ProtectedRoute component={Details} />}
  />,
  <Route
    key="projectStatus"
    path="/project/:projectId/status"
    element={<ProtectedRoute component={Status} />}
  />,
  <Route
    key="projectChangeRequest"
    path="/project/:projectId/change-request"
    element={<ProtectedRoute component={ChangeRequest} />}
  />,
  <Route
    key="projectBilling"
    path="/project/:projectId/billing"
    element={<ProtectedRoute component={Billing} />}
  />,
  <Route
    key="projectLessonsLearned"
    path="/project/:projectId/lessons-learned"
    element={<ProtectedRoute component={LessonsLearned} />}
  />,
  <Route
    key="projectCloseOut"
    path="/project/:projectId/close-out"
    element={<ProtectedRoute component={CloseOut} />}
  />,
];

export default projectRoutes;
