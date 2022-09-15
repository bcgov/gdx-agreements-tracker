import React from "react";
import { Route } from "react-router-dom";
import { Projects, Project } from "../../pages";
import { ChangeRequest } from "../../pages/Projects/Project/ChangeRequest";
import { ProjectDetails } from "../../pages/Projects/Project/ProjectDetails";
import { CloseOut } from "pages/Projects/Project/CloseOut";
import { Billing } from "pages/Projects/Project/Billing";

const projectRoutes = [
  <Route key="project" path="projects" element={<Projects />} />,
  <Route key="projectprojectId" path="projects/:projectId" element={<Project />}>
    ,
    <Route index key="projectdetails" element={<ProjectDetails />} />,
    <Route key="changeRequest" path="change-request" element={<ChangeRequest />} />,
    <Route key="projectBilling" path="billing" element={<Billing />} />,
    <Route
      key="projectLessonsLearned"
      path="projects/:projectId/lessons-learned"
      element={<div></div>}
    />
    ,
    <Route key="projectCloseOut" path="close-out" element={<CloseOut />} />,
  </Route>,
];

export default projectRoutes;
