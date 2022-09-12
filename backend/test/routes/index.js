const authHelper = require("../../src/facilities/keycloak.js");
const serverConfig = require("../../src/facilities/fastify.js");

jest.mock("../../src/facilities/keycloak.js");

// Mock log functions, otherwise tests fail.
jest.mock("../../src/facilities/logging.js", () => () => {
  return {
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
  };
});

let testRequester;

/**
 * Sets up a test and provides functions for making mock requests.
 *
 * @param   {*} app        Fastify app
 * @param   {*} authHelper Keycloak authorization
 * @returns {*}
 */
const requester = (app, authHelper) => {
  return {
    /**
     * Performs a mock request.
     *
     * @param   {*} modelFunction The models' function(s) to mock.
     * @param   {*} request       The request to be performed.
     * @param   {*} capabilities  The user capabilities to be used.
     * @param   {*} returnData    The result to be returned from above mock.
     * @returns {*}
     */
    run: async (modelFunction, request, capabilities = [], returnData = []) => {
      if (modelFunction.constructor !== Array) {
        modelFunction = [modelFunction];
      }
      for (let i = 0; i < modelFunction.length; i++) {
        modelFunction[i].mockResolvedValue(returnData);
      }
      authHelper.getUserInfo.mockReturnValue({ capabilities: capabilities });
      return await app.inject(request);
    },
    /**
     * Performs a mock request that simulates a model error.
     *
     * @param   {*} modelFunction The model(s)' function to mock.
     * @param   {*} request       The request to be performed.
     * @param   {*} capabilities  The user capabilities to be used.
     * @returns {*}
     */
    fail: async (modelFunction, request, capabilities = []) => {
      if (modelFunction.constructor !== Array) {
        modelFunction = [modelFunction];
      }
      for (let i = 0; i < modelFunction.length; i++) {
        modelFunction[i].mockImplementation(() => {
          throw new Error();
        });
      }
      authHelper.getUserInfo.mockReturnValue({ capabilities: capabilities });
      return await app.inject(request);
    },
  };
};

/**
 * Enum for types of routes: Specific uses a specific id in the route (eg. /users/1), General does not (eg. /users/).
 */
const routeTypes = { Specific: "Specific", General: "General" };

/**
 * Performs common route tests for HTTP statuses 200, 400, 401, 404, and 500.
 *
 * @param {*} args Array of arguments used for building route tests.
 */
const testRoutes = (args) => {
  beforeEach(() => {
    const app = serverConfig();
    authHelper.getBearerTokenFromRequest.mockReturnValueOnce("tokenString");
    authHelper.verifyToken.mockResolvedValue(true);
    authHelper.getRealmRoles.mockReturnValue([]);
    testRequester = requester(app, authHelper);
  });

  describe.each(args)("Status 200: Access routes successfully", (test) => {
    it(`${test.request.method} - ${test.request.url}`, async () => {
      const response = await testRequester.run(test.modelFunction, test.request, test.capabilities);
      expect(response.statusCode).toBe(200);
    });
  });

  // Some tests should only performed on specific type routes (see routeTypes).
  const specificArgs = args.filter((arg) => {
    return arg.type === routeTypes.Specific;
  });

  if (specificArgs.length > 0) {
    describe.each(specificArgs)("Status 400: Access routes with incorrect parameters", (test) => {
      const url = test.request.url.substring(0, test.request.url.lastIndexOf("/")) + "/undefined";
      it(`${test.request.method} - ${url}`, async () => {
        const response = await testRequester.run(
          test.modelFunction,
          {
            ...test.request,
            url: url,
          },
          test.capabilities
        );
        expect(response.statusCode).toBe(400);
      });
    });

    describe.each(specificArgs)("Status 404: Access routes with no data found", (test) => {
      it(`${test.request.method} - ${test.request.url}`, async () => {
        const response = await testRequester.run(
          test.modelFunction,
          test.request,
          test.capabilities,
          null
        );
        expect(response.statusCode).toBe(404);
      });
    });
  }

  describe.each(args)("Status 401: Access routes with no user (unauthorized)", (test) => {
    it(`${test.request.method} - ${test.request.url}`, async () => {
      const response = await testRequester.run(test.modelFunction, test.request);
      expect(response.statusCode).toBe(401);
    });
  });

  describe.each(args)("Status 500: Database/model errors", (test) => {
    it(`${test.request.method} - ${test.request.url}`, async () => {
      const response = await testRequester.fail(
        test.modelFunction,
        test.request,
        test.capabilities
      );
      expect(response.statusCode).toBe(500);
    });
  });
};

// eslint-disable-next-line jest/no-export
module.exports = {
  testRoutes,
  routeTypes,
  requester,
};
