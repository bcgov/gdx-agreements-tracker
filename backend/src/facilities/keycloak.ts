import * as jwksClient from "jwks-client";
import * as jwt from "jsonwebtoken";
import userModel from "../models/users";
import model from "../models/capabilities";

const { findAllByUserId } = model();

const { findAll, findById, findByEmail, addOne, updateOne, removeOne, addRoleToOne } = userModel();

const keycloak = () => {
  /**
   * Parse the request header for the authorization token.
   *
   * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
   * @returns {Promise}
   */
  const getBearerTokenFromRequest = (request: any) => {
    const authHeader = request?.headers?.authorization;
    // Strip out the token string from the request headers.
    if (authHeader && 0 === authHeader.indexOf("Bearer ")) {
      return authHeader.split(" ")[1];
    } else {
      return false;
    }
  };

  /**
   * Verify the token so the user can be authenticated.
   *
   * @param   {string}        token   Token json string from keycloak.
   * @param   {string | null} jwksUri URI to reach keycloak.
   * @returns {Promise}
   */
  const verifyToken = (token: any, jwksUri: any = null) => {
    return new Promise((resolve, reject) => {
      const decodedToken = jwt.decode(token, { complete: true });
      const client = jwksClient({
        strictSsl: true,
        jwksUri: jwksUri,
      });

      /**
       * If a valid JWT header and header key ID were able to be parsed out,
       * proceed with token verification.
       */
      if (decodedToken?.header && decodedToken?.header?.kid) {
        const kid = decodedToken.header.kid;

        // Get the public key from the keycloak server which is used to verify the JWT.
        client.getSigningKey(kid, (err: any, key: any) => {
          if (err) {
            reject(new Error(`Signing key error. ${err}`));
          } else {
            // Verify the auth token given the public key from keycloak.
            jwt.verify(token, key.publicKey, (err: any, decodedToken: any) => {
              if (err) {
                reject(new Error(`Couldn't verify token. ${err}`));
              } else {
                // Successful authentication.
                resolve("Successfully verified jwt.");
              }
            });
          }
        });
      } else {
        reject(new Error("Couldn't parse out valid key ID."));
      }
    });
  };

  /**
   * Verify if the user already has an entry in the database.
   * If not, create one.
   *
   * @param   {string}  token Token json string from keycloak.
   * @returns {Promise}
   */
  const verifyUserExists = (token: any) => {
    return new Promise((resolve, reject) => {
      const decodedToken: any = jwt.decode(token, { complete: true });
      if (decodedToken?.payload && decodedToken?.payload?.email) {
        const userPayload: any = decodedToken?.payload;
        findByEmail(userPayload.email)
          .then((user: any) => {
            if (0 === user.length) {
              addOne(userPayload)
                .then(async (id: any) => {
                  await addRoleToOne("subscriber", id[0]);
                  await addRoleToOne("admin", id[0]);
                  resolve(`New user added to database. ID ${id}`);
                })
                .catch((error: any) => reject(error));
            } else {
              resolve("User already exists in database.");
            }
          })
          .catch((error: any) => reject(error));
      } else {
        reject("Could not parse user JWT payload.");
      }
    });
  };

  /**
   * Gets the User info based off the keycloak bearer token, and eventually the database information.
   *
   * @param   {FastifyRequest} request FastifyRequest is an instance of the standard http or http2 request objects.
   * @todo  Get user info from the database, and merge with return object.
   * @todo  Add tests after logic becomes more stable.
   * @returns {object}                 The User object.
   */
  const getUserInfo = async (request: any) => {
    const token = getBearerTokenFromRequest(request);
    const decodedToken = jwt.decode(token, { complete: true });
    if (decodedToken) {
      const payload: any = decodedToken.payload;
      const user = await findByEmail(payload.email).then((r: any) => r[0]);
      const capabilities = user ? await findAllByUserId(user.id).then() : [];
      return {
        name: payload.name,
        email: payload.email,
        preferred_username: payload.idir_username,
        roles: payload?.client_roles,
        capabilities: capabilities,
      };
    }
    return;
  };

  const getRealmRoles = (request: any) => {
    const token = getBearerTokenFromRequest(request);
    const decodedToken: any = jwt.decode(token, { complete: true });
    return decodedToken?.payload?.client_roles || [];
  };
  return {
    getBearerTokenFromRequest,
    verifyToken,
    verifyUserExists,
    getUserInfo,
    getRealmRoles,
  };
};

export default keycloak;
