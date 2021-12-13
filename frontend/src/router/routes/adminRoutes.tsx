import React from "react";
import { Route } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";
import {
  Admin,
  Contacts,
  Suppliers,
  SubContractors,
  Resources,
  Ministries,
  User,
} from "../../pages/Admin/index";

/**
 * Routes for Admin pages.
 */
const routes = [
  <Route key="admin" path="/admin" element={<ProtectedRoute component={Admin} />}>
    <Route path="contacts" element={<ProtectedRoute component={Contacts} />} />
    <Route path="suppliers" element={<ProtectedRoute component={Suppliers} />} />
    <Route path="subcontractors" element={<ProtectedRoute component={SubContractors} />} />
    <Route path="resources" element={<ProtectedRoute component={Resources} />} />
    <Route path="ministries" element={<ProtectedRoute component={Ministries} />} />
    <Route path="user" element={<ProtectedRoute component={User} />} />
    <Route path="user/:userId" element={<ProtectedRoute component={User} />} />
  </Route>,
];

export default routes;
