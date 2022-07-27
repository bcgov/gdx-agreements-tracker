import { useKeycloak } from "@react-keycloak/web";
import React from "react";

export const useRoleChecker = (approvedRoles: string[]) => {
  const { keycloak }: any = useKeycloak();

  const checkRoleExists = () => {
    return approvedRoles.some((role) => {
      return keycloak?.idTokenParsed?.client_roles.includes(role);
    }); 
  };

  return { checkRoleExists };
};
