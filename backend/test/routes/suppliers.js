const serverConfig = require("../../src/facilities/fastify");
const authHelper = require("../../src/facilities/keycloak");
const suppliersModel = require("../../src/models/suppliers.js");
const suppliers = require("../controllers/suppliers.test");

let app;

// Mock authentication so we can test routes themselves.
jest.mock("../../src/facilities/keycloak");
// Mock suppliers DB methods.
jest.mock("../../src/models/suppliers");

describe("Attempting to access any server route without a bearer token.", () => {
  beforeEach(() => {
    app = serverConfig();
  });
  it("Returns 401 and can't parse token when no authorization header is passed.", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/suppliers",
    });

    expect(response.statusCode).toBe(401);
    expect(JSON.parse(response.body).message).toBe("Error: Couldn't parse bearer token.");
  });
});

describe("Access suppliers routes with valid suppliers", () => {
  beforeEach(() => {
    app = serverConfig();
    // Mock authentication functions so we can access routes.
    authHelper.getBearerTokenFromRequest.mockReturnValueOnce("tokenString");
    authHelper.verifyToken.mockResolvedValue(true);
    authHelper.getUserInfo.mockReturnValue({
      name: "test-name",
      email: "test@example.com",
      preferred_suppliersname: "preferred_test-name",
      roles: [],
      role: "admin",
      capabilities: ["suppliers_read_all"],
    });
  });

  it("Should get a list of suppliers when you hit /suppliers", async () => {
    suppliersModel.findAll.mockResolvedValue(suppliers.suppliers);
    const response = await app.inject({
      method: "GET",
      url: "/suppliers",
    });
    const responseBody = JSON.parse(response.body);
    expect(response.statusCode).toBe(200);
    expect(responseBody.data).toBeInstanceOf(Array);
    responseBody.data.forEach((suppliersObject) => expect("id" in suppliersObject).toBe(true));
  });
});

describe("Access suppliers routes with no suppliers", () => {
  beforeEach(() => {
    app = serverConfig();
    // Mock authentication functions so we can access routes.
    authHelper.getBearerTokenFromRequest.mockReturnValueOnce("tokenString");
    authHelper.verifyToken.mockResolvedValue(true);
    authHelper.getUserInfo.mockReturnValue(null);
  });

  it("Should get a 401 response when hitting /suppliers without authentication", async () => {
    suppliersModel.findAll.mockResolvedValue([{ id: 2, name: "Alex" }]);
    const response = await app.inject({
      method: "GET",
      url: "/suppliers",
    });
    expect(response.statusCode).toBe(401);
  });
});
