const { getBearerTokenFromRequest } = require("@facilities/keycloak");

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
