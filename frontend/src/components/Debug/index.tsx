import React, { FC } from "react";
import "./debug.scss";
import keycloak from "../../keycloak";

/**
 * This is a debug component that return keycloak information, and bearer token.
 * This is not to be used in production.
 *
 * @returns {React.ReactNode}
 */
export const Debug: FC = () => {
  /**
   * Parses the object of keycloak.idTokenParsed, to give a list of all tokens.
   *
   * @param   {object}          tokenParsed The keycloak.idTokenParsed object.
   * @returns {React.ReactNode}
   */
  /* eslint "no-warning-comments": [1, { "terms": ["todo", "fixme"] }] */
  // todo: Define a good type. "Any" type temporarily permitted.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getTokenParsed = (tokenParsed: any) => {
    /* eslint "no-warning-comments": [1, { "terms": ["todo", "fixme"] }] */
    // todo: Define a good type. "Any" type temporarily permitted.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
   * @param   {Array}           roles The roles for this user from keycloak.realmAccess.roles.
   * @returns {React.ReactNode}
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
              /* eslint "no-warning-comments": [1, { "terms": ["todo", "fixme"] }] */
              // todo: Define a good type. "Any" type temporarily permitted.
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
