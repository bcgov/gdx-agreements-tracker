import React, { FC } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";
import { Loader } from "../components/Loader";
import Unauthorized from "pages/Unauthorized";

interface Props {
  component: FC;
}
const ProtectedRoute: FC<Props> = ({ component: Component }) => {
  const { initialized, keycloak } = useKeycloak();
  const location = useLocation();

  if (initialized) {
    return keycloak?.authenticated ? (
      <Component />
    ) : (
      <Navigate to={`/login?redirect=${location.pathname}`} />
    );
  } else {
    return <Loader />;
  }
};

export const AuthorizedRoute = () => {
  
  const { keycloak } = useKeycloak();
  console.log('keycloak', keycloak)

  if (keycloak.authenticated) {
    if (!keycloak?.tokenParsed?.client_roles) {
      return <Unauthorized />;
    } else {
      return keycloak?.tokenParsed?.client_roles.includes("pmo-sys-admin") ? (
        <Outlet />
      ) : (
        <Navigate to={`/unauthorized`} />
      );
    }
  } else {
    return <Navigate to={`/login?redirect=${location.pathname}`} />;
  }
};

export default ProtectedRoute;
