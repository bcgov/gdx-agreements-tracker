import React, { FC } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthorizedRoute } from "./ProtectedRoute";
import projectRoutes from "./subRoutes/projectRoutes";
import contractRoutes from "./subRoutes/contractRoutes";
import adminRoutes from "./subRoutes/adminRoutes";
import reportRoutes from "./subRoutes/reportRoutes";
import { Home, Login, PageNotFound, Users } from "../pages";
import { Main } from "../components";
import useAuthorization from "hooks/useAuthorization";
import keycloak from "keycloak";
import { ICurrentUser } from "types";
import Unauthorized from "pages/Unauthorized";

const AppRouter: FC = () => {
  const { currentUser } = useAuthorization(keycloak);
  return (
    <Routes>
      <Route element={<Main />}>
        <Route
          path="/"
          element={
            <AuthorizedRoute
              currentUserRole={(currentUser as ICurrentUser)?.role_id?.label}
              allowedRoles={["Administrator"]}
            />
          }
        >
          <Route index element={<Home />} />
          {projectRoutes}
          {contractRoutes}
          {adminRoutes}
          {reportRoutes}
        </Route>
        <Route
          path="/"
          element={
            <AuthorizedRoute
              currentUserRole={(currentUser as ICurrentUser)?.role_id?.label}
              allowedRoles={["Administrator"]}
              isPMOSysAdmin={(
                keycloak as Keycloak.KeycloakInstance
              )?.tokenParsed?.client_roles?.includes("pmo-sys-admin")}
            />
          }
        >
          <Route key="users" path="admin/users" element={<Users />} />
          <Route path="unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Route>
      <Route path="login" element={<Login />} />
    </Routes>
  );
};

export default AppRouter;
