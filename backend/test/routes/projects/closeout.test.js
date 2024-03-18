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
      method: "GET",
      url: "/projects/1/close-out",
    },
    modelFunction: model.findById,
    type: routeTypes.Specific,
  };

  beforeEach(() => {
    const app = serverConfig();
    // Mock getBearerTokenFromRequest to return a token string
    getBearerTokenFromRequest.mockReturnValueOnce("tokenString");

    // Mock verifyToken to resolve as true
    verifyToken.mockResolvedValue(true);

    // Mock getRealmRoles to return an empty array
    getRealmRoles.mockReturnValue([]);

    testRequester = requester(app);
  });

  describe("Status 200: Access routes successfully", () => {
    it(`${test.request.method} - ${test.request.url}`, async () => {
      const response = await testRequester.run(test.modelFunction, test.request, ["PMO-User-Role"]);
      expect(response.statusCode).toBe(200);
    });
  });

  describe("Status 401: Access routes with no user (unauthorized)", () => {
    it(`${test.request.method} - ${test.request.url}`, async () => {
      // Mock verifyToken to resolve as false (unauthorized)
      verifyToken.mockResolvedValue(false);

      const response = await testRequester.run(test.modelFunction, test.request);
      expect(response.statusCode).toBe(401);
    });
  });
});
