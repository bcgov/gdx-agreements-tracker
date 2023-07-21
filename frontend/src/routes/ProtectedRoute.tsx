import { useKeycloak } from "@react-keycloak/web";
import { ReactNode, useEffect } from "react";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { keycloak, initialized } = useKeycloak();

  useEffect(() => {
    if (initialized && !keycloak.authenticated) {
      keycloak.login();
    }
  }, [initialized, keycloak]);

  if (!initialized) {
    return <div>Loading...</div>;
  }

  return <>{children}</>; // Wrapping children with empty fragment to avoid wrapper div warnings
};

export default ProtectedRoute;
