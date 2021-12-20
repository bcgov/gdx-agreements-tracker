import React, { FC } from "react";
import type { KeycloakInstance } from "keycloak-js";
import "./index.scss";

interface Props {
  keycloak?: KeycloakInstance;
}

/**
 * This is a debug component that return keycloak information, and bearer token.
 * This is not to be used in production.
 *
 * @param keycloak  The keycloak instance.
 * @returns {JSXNode}
 */
const Debug: FC<Props> = ({ keycloak }) => {
  /**
   * Parses the object of keycloak.idTokenParsed, to give a list of all tokens.
   *
   * @param {Object} tokenParsed The keycloak.idTokenParsed object.
   * @returns {JSXNode}
   */
  const getTokenParsed = (tokenParsed: any) => {
    return Object.entries(tokenParsed).map((token: Array<any>) => {
      return (
        <tr key={token[0]}>
          <td>{token[0]}</td>
          <td>{token[1]}</td>
        </tr>
      );
    });
  };

  /**
   * Gets the Roles associated with user.
   *
   * @param {Array} roles The roles for this user from keycloak.realmAccess.roles.
   * @returns {JSXNode}
   */
  const getRoles = (roles: Array<string>) => {
    return (
      <tr>
        <td>Roles</td>
        <td>
          {roles.map((role: string, index: number) => {
            return <div key={index}>{role}</div>;
          })}
        </td>
      </tr>
    );
  };

  return (
    <>
      {keycloak && (
        <div className="debug">
          <strong>Keycloak</strong>
          <table>
            <thead>
              <tr>
                <th>key</th>
                <th>value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>client id</td>
                <td>{keycloak.clientId}</td>
              </tr>
              {keycloak.idTokenParsed && getTokenParsed(keycloak.idTokenParsed)}
              {keycloak.realmAccess && getRoles(keycloak.realmAccess.roles)}
            </tbody>
          </table>
          <div className="keycloak-token">
            <button
              onClick={(event: any) => {
                navigator.clipboard.writeText(keycloak.token ?? "");
                event.target.style.backgroundColor = "#000";
                event.target.style.color = "#fff";
              }}
            >
              Token to Clipboard
            </button>
            <div className="token-string">{keycloak.token}</div>
          </div>

          {!!keycloak.authenticated && (
            <button type="button" onClick={() => keycloak.logout()}>
              Logout
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default Debug;
