const model = require("@models/projects/closeout.js");
const { testRoutes, routeTypes, requester } = require("../index.js");
const {
  getRealmRoles,
  verifyToken,
  getBearerTokenFromRequest,
} = require("@facilities/keycloak.js");
const serverConfig = require("@facilities/fastify.js");

jest.mock("@facilities/keycloak.js");
jest.mock("@models/projects/closeout.js");

testRoutes([
  {
    request: { method: "GET", url: "/projects/1/close-out" },
    modelFunction: model.findById,
    type: routeTypes.General,
  },
]);

// Extra tests for notify function as it does not fit common route functionality.
describe("Close out notify function", () => {
  let testRequester;
  const test = {
    request: {
      method: "POST",
      url: "/projects/1/close-out/notify",
    },
    modelFunction: model.findById,
    type: routeTypes.Specific,
  };

  beforeEach(() => {
    const app = serverConfig();
    getBearerTokenFromRequest.mockReturnValueOnce("tokenString");
    verifyToken.mockResolvedValue(true);
    getRealmRoles.mockReturnValue([]);
    testRequester = requester(app);
  });

  describe("Status 200: Access routes successfully", () => {
    it(`${test.request.method} - ${test.request.url}`, async () => {
      const response = await testRequester.run(test.modelFunction, test.request, [
        "PMO-Manager-Edit-Capability",
      ]);
      expect(response.statusCode).toBe(200);
    });
  });

  describe("Status 401: Access routes with no user (unauthorized)", () => {
    it(`${test.request.method} - ${test.request.url}`, async () => {
      const response = await testRequester.run(test.modelFunction, test.request);
      expect(response.statusCode).toBe(401);
    });
  });
});
