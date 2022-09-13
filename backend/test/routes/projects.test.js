const model = require("../../src/models/projects.js");
const contractsModel = require("../../src/models/contracts.js");
const { testRoutes, routeTypes, requester } = require("./index.js");
const authHelper = require("../../src/facilities/keycloak.js");
const serverConfig = require("../../src/facilities/fastify.js");

jest.mock("../../src/facilities/keycloak.js");
jest.mock("../../src/models/projects.js");
jest.mock("../../src/models/contracts.js");

testRoutes([
  {
    request: { method: "GET", url: "/projects" },
    modelFunction: model.findAll,
    capabilities: ["projects_read_all"],
    type: routeTypes.General,
  },
  {
    request: { method: "GET", url: "/projects/1" },
    modelFunction: [model.findById, contractsModel.findByProjectId],
    capabilities: ["projects_read_all"],
    type: routeTypes.Specific,
  },
  {
    request: {
      method: "PUT",
      url: "/projects/1",
      payload: {
        email: "me@gov.bc.ca",
      },
    },
    modelFunction: model.updateOne,
    capabilities: ["projects_update_one"],
    type: routeTypes.Specific,
  },
  {
    request: { method: "GET", url: "/projects/1/close-out" },
    modelFunction: model.findCloseOutById,
    capabilities: ["projects_read_all"],
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
    modelFunction: model.updateOne,
    capabilities: ["projects_update_one"],
    type: routeTypes.Specific,
  };

  beforeEach(() => {
    const app = serverConfig();
    authHelper.getBearerTokenFromRequest.mockReturnValueOnce("tokenString");
    authHelper.verifyToken.mockResolvedValue(true);
    authHelper.getRealmRoles.mockReturnValue([]);
    testRequester = requester(app, authHelper);
  });

  describe("Status 200: Access routes successfully", () => {
    it(`${test.request.method} - ${test.request.url}`, async () => {
      const response = await testRequester.run(model.updateOne, test.request, [
        "projects_read_all",
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
