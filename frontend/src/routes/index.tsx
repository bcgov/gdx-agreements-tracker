import React, { FC } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthorizedRoute } from "./ProtectedRoute";
import projectRoutes from "./subRoutes/projectRoutes";
import contractRoutes from "./subRoutes/contractRoutes";
import adminRoutes from "./subRoutes/adminRoutes";
import reportRoutes from "./subRoutes/reportRoutes";
import { Home, Login, PageNotFound } from "../pages";
import { Main } from "../components";
import Unauthorized from "pages/Unauthorized";

const AppRouter: FC = () => {
  return (
    <Routes>
      <Route element={<Main />}>
        <Route path="/" element={<AuthorizedRoute />}>
          <Route index element={<Home />} />
          {projectRoutes}
          {contractRoutes}
          {adminRoutes}
          {reportRoutes}
        </Route>
        <Route path="/" element={<AuthorizedRoute />}>
          {/* //TODO Temp removing while we transition to using Keycloak Server for role management. */}
          {/* <Route key="users" path="admin/users" element={<Users />} /> */}
          <Route path="unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Route>
      <Route path="login" element={<Login />} />
    </Routes>
  );
};

export default AppRouter;
