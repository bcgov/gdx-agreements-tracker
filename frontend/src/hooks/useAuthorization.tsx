import keycloak from "keycloak";
import { useEffect, useState } from "react";

export const useAuthorization = (requiredRole: string) => {
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const userRoles = keycloak.tokenParsed.client_roles || [];
    setIsAuthorized(userRoles.includes(requiredRole));
  }, [requiredRole]);

  return isAuthorized;
};
