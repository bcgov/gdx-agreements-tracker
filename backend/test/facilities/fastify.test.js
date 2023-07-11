const serverConfig = require("@facilities/fastify");
const { getBearerTokenFromRequest, verifyToken, getRealmRoles } = require("@facilities/keycloak");
jest.mock("@facilities/keycloak.js");
let app, requestObject;

describe("Unauthorized routes because of JWT token", () => {
  beforeEach(() => {
    app = serverConfig();
    requestObject = {
      method: "GET",
      url: "/health",
      headers: {
        authorization: "Bearer 234fake23543token",
      },
    };
  });
  it("Returns 401 can't parse token", async () => {
    getBearerTokenFromRequest.mockReturnValueOnce("");
    verifyToken.mockRejectedValue(new Error("error message"));
    const response = await app.inject(requestObject);

    expect(response.statusCode).toBe(401);
    expect(JSON.parse(response.body).data.message).toBe("Couldn't parse or find bearer token.");
  });

  it("Returns 401 and can parse token but token is invalid.", async () => {
    getBearerTokenFromRequest.mockReturnValueOnce("234fake23543token");
    verifyToken.mockRejectedValue(new Error("error message"));
    const response = await app.inject(requestObject);

    expect(response.statusCode).toBe(401);
    expect(JSON.parse(response.body).data.message).toBe("Couldn't parse or find bearer token.");
    expect(JSON.parse(response.body).data.error).toBeDefined();
  });
});

describe("Unauthorized routes because of incorrect role", () => {
  beforeEach(() => {
    app = serverConfig();
  });
  it("Returns 401 due to incorrect role", async () => {
    getBearerTokenFromRequest.mockReturnValueOnce("Bearer 234fake23543token");
    verifyToken.mockResolvedValue("");
    getRealmRoles.mockReturnValueOnce(["my-role"]);
    const response = await app.inject(requestObject);

    expect(response.statusCode).toBe(401);
    expect(JSON.parse(response.body).data.message).toBe(
      "User doesn't have required role PMO-Manager-Edit-Capability"
    );
  });
});

describe("Authorized route", () => {
  beforeEach(() => {
    app = serverConfig();
  });
  it("Returns 200", async () => {
    getBearerTokenFromRequest.mockReturnValueOnce("Bearer 234fake23543token");
    verifyToken.mockResolvedValue("");
    getRealmRoles.mockReturnValueOnce(["PMO-Manager-Edit-Capability"]);
    const response = await app.inject(requestObject);
    expect(response.statusCode).toBe(200);
  });
});
