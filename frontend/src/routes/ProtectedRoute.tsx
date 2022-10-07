import React, { FC } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";
import { Loader } from "../components/Loader";

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

export const AuthorizedRoute = ({
  currentUserRole,
  allowedRoles,
  isPMOSysAdmin = false,
}: {
  currentUserRole: string;
  allowedRoles: string[];
  isPMOSysAdmin?: boolean;
}) => {
  const { initialized, keycloak } = useKeycloak();
  const location = useLocation();

  if (initialized) {
    return keycloak?.authenticated && currentUserRole ? (
      allowedRoles.includes(currentUserRole) || isPMOSysAdmin ? (
        <Outlet />
      ) : (
        <Navigate to={`/unauthorized`} />
      )
    ) : (
      <Navigate to={`/login?redirect=${location.pathname}`} />
    );
  } else {
    return <Loader />;
  }
};

export default ProtectedRoute;
