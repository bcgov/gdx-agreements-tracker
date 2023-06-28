/* eslint "no-warning-comments": [1, { "terms": ["todo", "fixme"] }] */
// todo: Fix the commented out tests. Preserving unused vars until tests are fixed.
/* eslint no-unused-vars: "off" */
const serverConfig = require("@facilities/fastify");
const {
  getBearerTokenFromRequest,
  verifyToken,
  getUserInfo,
} = require("@facilities/keycloak");
let app;
let exampleToken;
let request;

/* commented out temporarily until a way to handle a 401 redirect is built on the frontend.  * see:  https://apps.itsm.gov.bc.ca/jira/browse/DESCW-1021
describe("Unauthorized routes.", () => {
  beforeEach(() => {
    app = serverConfig();
  });

  it("Returns 401 and can parse token but token is invalid.", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/",
      headers: {
        authorization: "Bearer 234fake23543token",
      },
    });
    expect(response.statusCode).toBe(401);
    expect(JSON.parse(response.body).message).toBe("Couldn't parse out valid key ID.");
  });
});
*/

describe("Parse bearer token from request", () => {
  it("Should return a token string if given a request containing an authorization header.", () => {
    const sampleRequestBody = {
      method: "GET",
      url: "/",
      headers: {
        authorization: "Bearer 2367fake324928347token",
      },
    };
    const result = getBearerTokenFromRequest(sampleRequestBody);

    expect(result).toBe("2367fake324928347token");
  });

  it("Should return false if no authorization header is passed.", () => {
    const sampleRequestBody = {
      method: "GET",
      url: "/",
    };
    const result = getBearerTokenFromRequest(sampleRequestBody);

    expect(result).toBe(false);
  });
});
