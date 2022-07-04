import React from "react";
import { Route } from "react-router-dom";
import { Projects, Project } from "../../pages";
import { ChangeRequest } from "../../pages/Projects/Project/ChangeRequest";
import { ProjectDetails } from "../../pages/Projects/Project/ProjectDetails";
const projectRoutes = [
  <Route key="project" path="projects" element={<Projects />} />,
  <Route key="projectprojectId" path="projects/:projectId" element={<Project />}>
    ,
    <Route index key="projectdetails" element={<ProjectDetails />} />,
    <Route key="changeRequest" path="change-request" element={<ChangeRequest />} />,
    <Route key="projectsbilling" path="projects/:projectId/billing" element={<div></div>} />,
    <Route
      key="projectLessonsLearned"
      path="projects/:projectId/lessons-learned"
      element={<div></div>}
    />
    ,
    <Route key="projectCloseOut" path="projects/:projectId/close-out" element={<div></div>} />,
  </Route>,
];

export default projectRoutes;
