import { useKeycloak } from "@react-keycloak/web";
import { FC, ReactChild, useEffect } from "react";
interface Props {
  component: FC;
}
export const ProtectedRoute = ({ children }: any) => {
  const { keycloak, initialized } = useKeycloak();

  useEffect(() => {
    if (initialized && !keycloak.authenticated) {
      keycloak.login();
    }
  }, [initialized, keycloak]);

  if (!initialized) {
    return <div>Loading...</div>;
  }

  return children;
};
export default ProtectedRoute;

