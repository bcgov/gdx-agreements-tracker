const serverConfig = require('../../src/helpers/config');
const { getBearerTokenFromRequest, verifyToken } = require("../../src/helpers/auth");
let app;

describe("Unauthorized routes.", () => {
    beforeEach(() => {
        app = serverConfig();
    });

    it("Returns 401 and can parse token but token is invalid.", async () => {
        const response = await app.inject({
            method: 'GET',
            url: '/',
            headers: {
                authorization: 'Bearer 234fake23543token'
            }
        });

        expect(response.statusCode).toBe(401);
        expect(JSON.parse(response.body).message).toBe("Couldn't parse out valid key ID.");
    });
});

describe("Parse bearer token from request", () => {
    it("Should return a token string if given a request containing an authorization header.", () => {
        const sampleRequestBody = {
            method: 'GET',
            url: '/',
            headers: {
                authorization: 'Bearer 2367fake324928347token'
            }
        }
        const result = getBearerTokenFromRequest(sampleRequestBody);

        expect(result).toBe('2367fake324928347token');
    })

    it("Should return false if no authorization header is passed.", () => {
        const sampleRequestBody = {
            method: 'GET',
            url: '/',
        };
        const result = getBearerTokenFromRequest(sampleRequestBody);

        expect(result).toBe(false);
    })
})

/**
 * Still need to test verifyToken function.
 */
// describe("Authorized routes", () => {
//     const jwks = createJWKSMock.default("https://oidc.gov.bc.ca/auth/realms/aaoozhcp/protocol/openid-connect/certs");

//     beforeEach(() => {
//       jwks.start();
//     });

//     it("should verify the token", async () => {
//         const token = jwks.token({});
      
//         const data = await verifyToken(token, "https://oidc.gov.bc.ca/auth/realms/aaoozhcp/protocol/openid-connect/certs");
      
//         expect(data).toEqual({});
//     });

  
//     afterEach(() => {
//       jwks.stop();
//     });
// })