import React from "react";
import { Route } from "react-router-dom";
import { Projects, Project } from "pages";
import { ChangeRequest } from "pages/Projects/Project/ChangeRequest";
import { ProjectDetails } from "pages/Projects/Project/ProjectDetails";
import { CloseOut } from "pages/Projects/Project/CloseOut";
import { Billing } from "pages/Projects/Project/Billing";
import { LessonsLearned } from "pages/Projects/Project/LessonsLearned";
import { Status } from "pages/Projects/Project/Status";
import ProtectedRoute from "routes/ProtectedRoute";
const projectRoutes = [
  <Route key="projects" path="/projects" element={<ProtectedRoute><Projects /></ProtectedRoute>}/>,
  <Route key="projectId" path="projects/:projectId" element={<ProtectedRoute><Project /></ProtectedRoute>}>,
    <Route index key="projectdetails" element={<ProjectDetails />} />
    <Route key="projectStatus" path="status" element={<Status />} />
    <Route key="changeRequest" path="change-request" element={<ChangeRequest />} />
    <Route key="projectBilling" path="billing" element={<Billing />} />
    <Route key="projectLessonsLearned" path="lessons-learned" element={<LessonsLearned />} />
    <Route key="projectCloseOut" path="close-out" element={<CloseOut />} />
  </Route>
];

export default projectRoutes;






