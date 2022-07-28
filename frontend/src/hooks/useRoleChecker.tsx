import { useKeycloak } from "@react-keycloak/web";
import React from "react";

/**
 * This hook allows you to compare roles that are passed in with the roles of the current user
 *
 * @param {string[]} approvedRoles data from a database table.
 * @example checkRoleExists = true | false
 */


export const useRoleChecker = (approvedRoles: string[]) => {
  const { keycloak }: any = useKeycloak();

  const checkRoleExists = () => {
    return approvedRoles.some((role) => {
      return keycloak?.idTokenParsed?.client_roles.includes(role);
    }); 
  };

  return { checkRoleExists };
};
