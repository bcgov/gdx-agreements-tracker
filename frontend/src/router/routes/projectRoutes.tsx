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
  <Route key="project" path="/project" element={<ProtectedRoute component={List} />}>
    <Route path=":projectId" element={<ProtectedRoute component={Details} />} />
    <Route path=":projectId/status" element={<ProtectedRoute component={Status} />} />
    <Route
      path=":projectId/change-request"
      element={<ProtectedRoute component={ChangeRequest} />}
    />
    <Route path=":projectId/billing" element={<ProtectedRoute component={Billing} />} />,
    <Route
      key="projectLessonsLearned"
      path=":projectId/lessons-learned"
      element={<ProtectedRoute component={LessonsLearned} />}
    />
    ,
    <Route
      key="projectCloseOut"
      path=":projectId/close-out"
      element={<ProtectedRoute component={CloseOut} />}
    />
  </Route>,
];

export default projectRoutes;
