import React from "react";
import { Route } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";
import { Admin } from "../../pages/Admin/index";
import { PageLink } from "../../components/PageLink";

import { Users } from "../../pages/Users";

/**
 * Routes for Admin pages.
 */
const routes = [
  <Route key="admin" path="/admin" element={<ProtectedRoute component={Admin} />}>
    <Route
      path="contacts"
      element={
        <ProtectedRoute
          component={() => {
            return PageLink("Contacts");
          }}
        />
      }
    />
    <Route
      path="suppliers"
      element={
        <ProtectedRoute
          component={() => {
            return PageLink("Suppliers");
          }}
        />
      }
    />
    <Route
      path="subcontractors"
      element={
        <ProtectedRoute
          component={() => {
            return PageLink("SubContractors");
          }}
        />
      }
    />
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
      path="ministries"
      element={
        <ProtectedRoute
          component={() => {
            return PageLink("Ministries");
          }}
        />
      }
    />
    <Route
      path="user"
      element={
        <ProtectedRoute
          component={() => {
            return PageLink("Users");
          }}
        />
      }
    />
    <Route
      path="user/:userId"
      element={
        <ProtectedRoute
          component={() => {
            return PageLink("Users");
          }}
        />
      }
    />
  </Route>,
];

export default routes;
