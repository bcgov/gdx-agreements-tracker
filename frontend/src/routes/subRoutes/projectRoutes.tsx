import React from "react";
import { Route } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";
import { PageLink } from "../../components/PageLink";
import { Project, Projects } from "../../pages";

const projectRoutes = [
  <Route key="project" path="/project" element={<ProtectedRoute component={Projects} />}>
    <Route path=":projectId" element={<ProtectedRoute component={Project} />} />
    <Route
      path=":projectId/status"
      element={
        <ProtectedRoute
          component={() => {
            return PageLink("Status");
          }}
        />
      }
    />
    <Route
      path=":projectId/change-request"
      element={
        <ProtectedRoute
          component={() => {
            return PageLink("ChangeRequest");
          }}
        />
      }
    />
    <Route
      path=":projectId/billing"
      element={
        <ProtectedRoute
          component={() => {
            return PageLink("Billing");
          }}
        />
      }
    />
    ,
    <Route
      key="projectLessonsLearned"
      path=":projectId/lessons-learned"
      element={
        <ProtectedRoute
          component={() => {
            return PageLink("LessonsLearned");
          }}
        />
      }
    />
    ,
    <Route
      key="projectCloseOut"
      path=":projectId/close-out"
      element={
        <ProtectedRoute
          component={() => {
            return PageLink("CloseOut");
          }}
        />
      }
    />
  </Route>,
];

export default projectRoutes;
