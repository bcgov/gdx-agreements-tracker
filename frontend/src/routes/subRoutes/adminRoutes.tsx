import React from "react";
import { Route } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";
import { Admin } from "../../pages";
import { PageLink } from "../../components/PageLink";
import { Users } from "../../pages/Admin/Users";
import { Contacts } from "../../pages/Admin/Contacts";
import { Subcontractors } from "../../pages/Admin/Subcontractors";
/**
 * Routes for Admin pages.
 */
const routes = [
  <Route key="admin" path="/admin" element={<ProtectedRoute component={Admin} />}>
    <Route path="contacts" element={<ProtectedRoute component={Contacts} />} />
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
    <Route path="subcontractors" element={<ProtectedRoute component={Subcontractors} />} />
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
    <Route path="users" element={<ProtectedRoute component={Users} />} />
    <Route path="users/:userId" element={<ProtectedRoute component={Users} />} />
  </Route>,
];

export default routes;
