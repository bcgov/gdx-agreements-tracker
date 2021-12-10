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
  <Route key="admin" path="/admin" element={<ProtectedRoute component={Admin} />} />,
  <Route
    key="adminContacts"
    path="/admin/contacts"
    element={<ProtectedRoute component={Contacts} />}
  />,
  <Route
    key="adminSuppliers"
    path="/admin/suppliers"
    element={<ProtectedRoute component={Suppliers} />}
  />,
  <Route
    key="adminSubcontractors"
    path="/admin/subcontractors"
    element={<ProtectedRoute component={SubContractors} />}
  />,
  <Route
    key="adminResources"
    path="/admin/resources"
    element={<ProtectedRoute component={Resources} />}
  />,
  <Route
    key="adminMinistries"
    path="/admin/ministries"
    element={<ProtectedRoute component={Ministries} />}
  />,
  <Route key="adminUserList" path="/admin/user" element={<ProtectedRoute component={User} />} />,
  <Route
    key="adminUser"
    path="/admin/user/:userId"
    element={<ProtectedRoute component={User} />}
  />,
];

export default routes;
