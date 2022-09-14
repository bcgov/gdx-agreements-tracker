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

const AppRouter: FC = () => {
  const { currentUser } = useAuthorization(keycloak);
  console.log("currentUser", currentUser);
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
        </Route>
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AppRouter;
