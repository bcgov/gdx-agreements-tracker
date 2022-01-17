const jwksClient = require('jwks-client');
const jwt = require('jsonwebtoken');
const userModel = require('../models/users');
const { getCapability } = require('../helpers/capability');

/**
 * Parse the request header for the authorization token.
 * 
 * @param {HttpServerRequest} req 
 * @returns {Promise}
 */
const getBearerTokenFromRequest = (req) => {
    const authHeader = req?.headers?.authorization;
    // Strip out the token string from the request headers.
    if (authHeader && 0 === authHeader.indexOf('Bearer ')) {
        return authHeader.split(' ')[1];
    } else {
        return false;
    }
}

/**
 * Verify the token so the user can be authenticated.
 * 
 * @param {String} token 
 * @param {String|null} jwksUri
 * @returns {Promise}
 */
const verifyToken = (token, jwksUri = null) => {
    return new Promise((resolve, reject) => {
        const decodedToken = jwt.decode(token, { complete: true });
        const client = jwksClient({
            strictSsl: true,
            jwksUri: jwksUri,
        });
        
        /**
         * If a valid JWT header and header key ID were able to be parsed out,
        * proceed with token verification.
        * */
        if (decodedToken?.header && decodedToken?.header?.kid) {
            const kid = decodedToken.header.kid;
            
            // Get the public key from the keycloak server which is used to verify the JWT.
            client.getSigningKey(kid, (err, key) => {
                if (err) {
                    reject(new Error(`Signing key error. ${err}`));
                } else {
                    // Verify the auth token given the public key from keycloak.
                    jwt.verify(token, key.publicKey, (err, decodedToken) => {
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
}

/**
 * Verify if the user already has an entry in the database.
 * If not, create one.
 * 
 * @param {Object} token 
 * @returns {Promise}
 */
const verifyUserExists = (token) => {
    return new Promise((resolve, reject) => {
        const decodedToken = jwt.decode(token, { complete: true });
        if (decodedToken?.payload && decodedToken?.payload?.email) {
            const userPayload = decodedToken?.payload;
            userModel.findByEmail(userPayload.email)
                .then((user) => {
                    if (0 === user.length) {
                        userModel.addOne(userPayload)
                            .then(id => resolve(`New user added to database. ID ${id}`))
                            .catch(error => reject(error));
                    } else {
                        resolve("User already exists in database.");
                    }
                })
                .catch((error) => reject(error));
        } else {
            reject("Could not parse user JWT payload.");
        }
    });
}

/**
 * Gets the User info based off the keycloak bearer token, and eventually the database information.
 *
 * @var {object}  req  The request object.
 * @todo  Get user info from the database, and merge with return object.
 * @todo  Add tests after logic becomes more stable.
 *
 * @returns {object}  The User object.
 * 
 */
const getUserInfo = req => {
    const token = getBearerTokenFromRequest(req);
    const decodedToken = jwt.decode(token, { complete: true });
    if (decodedToken) {
        const payload = decodedToken.payload;
        // This role will eventually come from the database.
        const role = 'none';
        const realmAccessRoles = payload.realm_access?.roles || [];
        const capability = getCapability(role, realmAccessRoles)
        return {
            name: payload.name,
            email: payload.email,
            preferred_username: payload.preferred_username,
            roles: payload.realm_access?.roles,
            role,
            capability,
        }
    }
    return;
}
    
module.exports = {
    getBearerTokenFromRequest,
    verifyToken,
    verifyUserExists,
    getUserInfo,
}
