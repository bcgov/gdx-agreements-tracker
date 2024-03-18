const {
  getRealmRoles,
  verifyToken,
  getBearerTokenFromRequest,
} = require("@facilities/keycloak.js");

const serverConfig = require("@facilities/fastify.js");

jest.mock("@facilities/keycloak.js");

// Mock log functions, otherwise tests fail.
jest.mock("@facilities/logging.js", () => () => {
  return {
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
  };
});

const request = { method: "GET", url: "/glossary" };
let app;

beforeEach(() => {
  app = serverConfig();
  getBearerTokenFromRequest.mockReturnValueOnce("tokenString");
  verifyToken.mockResolvedValue(true);
  getRealmRoles.mockReturnValue([]);
});

describe("Status 200: Access routes successfully", () => {
  it(`${request.method} - ${request.url}`, async () => {
    getRealmRoles.mockReturnValue(["PMO-User-Role"]);
    app.decorateReply("markdown", () => {
      return "Success";
    });
    const response = await app.inject(request);
    expect(response.statusCode).toBe(200);
  });
});

describe("Status 401: Access routes with no user (unauthorized)", () => {
  it(`${request.method} - ${request.url}`, async () => {
    getRealmRoles.mockReturnValue([]);
    const response = await app.inject(request);
    expect(response.statusCode).toBe(401);
  });
});
