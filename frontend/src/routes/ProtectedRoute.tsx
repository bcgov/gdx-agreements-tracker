import { useKeycloak } from "@react-keycloak/web";
import { FC, useEffect } from "react";
interface Props {
  component: FC;
}
export const ProtectedRoute = ({ component }: { component: JSX.Element }) => {
  const { keycloak, initialized } = useKeycloak();

  useEffect(() => {
    if (initialized && !keycloak.authenticated) {
      keycloak.login();
    }
  }, [initialized, keycloak]);

  if (!initialized) {
    return <div>Loading...</div>;
  }

  return component;
};
export default ProtectedRoute;
