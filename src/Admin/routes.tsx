import React from "react";
import { Route } from "react-router-dom";
import {
  Login,
  Admin,
  Contacts,
  Suppliers,
  SubContractors,
  Resources,
  Ministries,
  User,
} from "./index";

/**
 * Routes for Admin pages.
 */
const routes = [
  <Route key="login" path="login" element={<Login />} />,
  <Route key="admin" path="admin" element={<Admin />}>
    <Route path="contacts" element={<Contacts />} />
    <Route path="suppliers" element={<Suppliers />} />
    <Route path="subcontractors" element={<SubContractors />} />
    <Route path="resources" element={<Resources />} />
    <Route path="ministries" element={<Ministries />} />
    <Route path="user" element={<User />}>
      <Route path=":userId" element={<User />} />
    </Route>
  </Route>,
];

export default routes;
