const jwksClient = require('jwks-client');
const jwt = require('jsonwebtoken');

/**
 * Validate the bearer token passed with an API request.
 * 
 * @param {*} req 
 * @returns {}
 */
const validateToken = (jwksUri, req) => {
    return new Promise((resolve, reject) => {
        const token = req.headers.authorization;
        if (token && token.indexOf('Bearer ') == 0) {
            const tokenString = token.split(' ')[1];
            console.log(tokenString)
            const kid = jwt.decode(tokenString, { complete: true }).header.kid;
            const client = jwksClient({
                strictSsl: true,
                jwksUri: jwksUri
            });
            
            // Get the public key from the keycloak server which is used to verify the JWT.
            client.getSigningKey(kid, (err, key) => {
                if (err) {
                    reject(new Error(`Signing key error. ${err}`));
                } else {
                    // Verify the auth token given the public key from keycloak.
                    jwt.verify(tokenString, key.publicKey, (err, decodedToken) => {
                        if (err) {
                            reject(new Error(`Couldn't verify token. ${err}`));
                        } else {
                            // Successful authentication.
                            resolve();
                        }
                    });
                }
            });
        } else {
            reject(new Error("Couldn't parse bearer token."));
        }
    });
}
    
module.exports = {
    validateToken
};