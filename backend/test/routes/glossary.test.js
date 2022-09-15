const authHelper = require("../../src/facilities/keycloak.js");
const serverConfig = require("../../src/facilities/fastify.js");

jest.mock("../../src/facilities/keycloak.js");

// Mock markdown plugin so we can mock the reply.markdown() return value.
jest.mock("fastify-markdown", () => async () => {
  return;
});

// Mock log functions, otherwise tests fail.
jest.mock("../../src/facilities/logging.js", () => () => {
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
  authHelper.getBearerTokenFromRequest.mockReturnValueOnce("tokenString");
  authHelper.verifyToken.mockResolvedValue(true);
  authHelper.getRealmRoles.mockReturnValue([]);
});

describe("Status 200: Access routes successfully", () => {
  it(`${request.method} - ${request.url}`, async () => {
    authHelper.getUserInfo.mockReturnValue({ capabilities: ["admin_form_read_all"] });
    app.decorateReply("markdown", () => {
      return "Success";
    });
    const response = await app.inject(request);
    expect(response.statusCode).toBe(200);
  });
});

describe("Status 401: Access routes with no user (unauthorized)", () => {
  it(`${request.method} - ${request.url}`, async () => {
    authHelper.getUserInfo.mockReturnValue({ capabilities: [] });
    const response = await app.inject(request);
    expect(response.statusCode).toBe(401);
  });
});

describe("Status 500: Plugin errors", () => {
  it(`${request.method} - ${request.url}`, async () => {
    authHelper.getUserInfo.mockReturnValue({ capabilities: ["admin_form_read_all"] });
    app.decorateReply("markdown", () => {
      throw new Error();
    });
    const response = await app.inject(request);
    expect(response.statusCode).toBe(500);
  });
});
