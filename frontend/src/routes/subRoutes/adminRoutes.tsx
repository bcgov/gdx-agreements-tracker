import React from "react";
import { Route } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";
import { Admin } from "../../pages";
import { PageLink } from "../../components/PageLink";
import { Users } from "../../pages/Admin/Users";
import { Contacts } from "../../pages/Admin/Contacts";
import { Subcontractors } from "../../pages/Admin/Subcontractors";
import { Suppliers } from "../../pages/Admin/Suppliers";
import { Ministries } from "../../pages/Admin/Ministries";
import { Resources } from "../../pages/Admin/Resources";

/*
 * Routes for Admin pages.
 */
const routes = [
  <Route key="admin" path="/admin" element={<ProtectedRoute component={Admin} />}>
    <Route key="contacts" path="contacts" element={<ProtectedRoute component={Contacts} />} />
    <Route key="suppliers" path="suppliers" element={<ProtectedRoute component={Suppliers} />} />
    <Route
      key="subcontractors"
      path="subcontractors"
      element={<ProtectedRoute component={Subcontractors} />}
    />
    <Route key="resources" path="resources" element={<ProtectedRoute component={Resources} />} />
    <Route key="ministries" path="ministries" element={<ProtectedRoute component={Ministries} />} />
    <Route key="users" path="users" element={<ProtectedRoute component={Users} />} />
    <Route key="userId" path="users/:userId" element={<ProtectedRoute component={Users} />} />
  </Route>,
];

export default routes;
