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
  allowedRoles: [string];
  isPMOSysAdmin?: boolean;
}) => {
  console.log('currentUserRole', currentUserRole)
  const { initialized, keycloak } = useKeycloak();
  const location = useLocation();

  if (initialized) {
    return keycloak?.authenticated ? (
      allowedRoles.includes(currentUserRole) || isPMOSysAdmin ? (
        <Outlet />
      ) : (
        <div>unauthorized</div>
      )
    ) : (
      <Navigate to={`/login?redirect=${location.pathname}`} />
    );
  } else {
    return <Loader />;
  }
};

export default ProtectedRoute;
