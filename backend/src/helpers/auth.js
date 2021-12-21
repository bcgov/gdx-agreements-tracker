const jwksClient = require('jwks-client');
const jwt = require('jsonwebtoken');

/**
 * Parse the request header for the authorization token.
 * 
 * @param {HttpServerRequest} req 
 * @returns {Promise}
 */
const getBearerTokenFromRequest = (req) => {
    const authHeader = req?.headers?.authorization;
    // Strip out the token string from the request headers.
    if (authHeader && authHeader.indexOf('Bearer ') == 0) {
        return authHeader.split(' ')[1];
    } else {
        return false;
    }
}

/**
 * 
 * 
 * @param {String} token 
 * @returns {Promise}
 */
const verifyToken = (token, jwksUri = null) => {
    return new Promise((resolve, reject) => {
        const decodedToken = jwt.decode(token, { complete: true });
        const client = jwksClient({
            strictSsl: true,
            jwksUri: jwksUri
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
                            resolve(true);
                        }
                    });
                }
            });
        } else {
            reject(new Error("Couldn't parse out valid key ID."));
        }
    });
}
    
module.exports = {
    getBearerTokenFromRequest,
    verifyToken
}