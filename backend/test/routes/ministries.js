const serverConfig = require("../../src/facilities/fastify");
const authHelper = require("../../src/facilities/keycloak");
const ministriesModel = require("../../src/models/ministry.js");
let app;

// Mock authentication so we can test routes themselves.
jest.mock("../../src/facilities/keycloak");
// Mock ministries DB methods.
jest.mock("../../src/models/ministry");

describe("Attempting to access any server route without a bearer token.", () => {
  beforeEach(() => {
    app = serverConfig();
  });
  it("Returns 401 and can't parse token when no authorization header is passed.", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/ministries",
    });

    expect(response.statusCode).toBe(401);
    expect(JSON.parse(response.body).message).toBe("Error: Couldn't parse bearer token.");
  });
});

describe("Access ministries routes with valid ministries", () => {
  beforeEach(() => {
    app = serverConfig();
    // Mock authentication functions so we can access routes.
    authHelper.getBearerTokenFromRequest.mockReturnValueOnce("tokenString");
    authHelper.verifyToken.mockResolvedValue(true);
    authHelper.getUserInfo.mockReturnValue({
      name: "test-name",
      email: "test@example.com",
      preferred_username: "preferred_test-name",
      roles: [],
      role: "admin",
      capabilities: [
        "ministries_read_all",
        "ministries_read_mine",
        "ministries_update_one",
        "ministries_add_one",
      ],
    });
  });

  it("Should get a list of ministries when you hit /ministries", async () => {
    ministriesModel.findAll.mockResolvedValue([
      {
        id: 1,
        ministry_name: "Ministry of Truth",
        ministry_short_name: "Minitrue",
        is_active: false,
      },
    ]);
    const response = await app.inject({
      method: "GET",
      url: "/ministries",
    });
    const responseBody = JSON.parse(response.body);
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(responseBody.data)).toBe(true);
    responseBody.data.forEach((ministriesObject) => expect("id" in ministriesObject).toBe(true));
  });

  it("Should get a single user object when you hit /api/users/:id with a valid ID", async () => {
    ministriesModel.findById.mockResolvedValue([
      {
        id: 1,
        ministry_name: "Ministry of Truth",
        ministry_short_name: "Minitrue",
        is_active: false,
      },
    ]);
    const response = await app.inject({
      method: "GET",
      url: "/ministries/1",
    });
    const responseBody = JSON.parse(response.body);
    expect(response.statusCode).toBe(200);
    expect("id" in responseBody.data).toBe(true);
    expect("ministry_name" in responseBody.data).toBe(true);
    expect("ministry_short_name" in responseBody.data).toBe(true);
    expect("is_active" in responseBody.data).toBe(true);
  });
});

describe("Access ministries routes with no user", () => {
  beforeEach(() => {
    app = serverConfig();
    // Mock authentication functions so we can access routes.
    authHelper.getBearerTokenFromRequest.mockReturnValueOnce("tokenString");
    authHelper.verifyToken.mockResolvedValue(true);
    authHelper.getUserInfo.mockReturnValue(null);
  });

  it("Should get a 401 response when hitting /ministries without authentication", async () => {
    ministriesModel.findAll.mockResolvedValue([
      {
        id: 1,
        ministry_name: "Ministry of Truth",
        ministry_short_name: "Minitrue",
        is_active: false,
      },
    ]);
    const response = await app.inject({
      method: "GET",
      url: "/ministries",
    });
    expect(response.statusCode).toBe(401);
  });

  it("Should return 401 when you hit /ministries/:id", async () => {
    ministriesModel.findById.mockResolvedValue([{ id: 1, subcontractor_name: "First choice" }]);
    const response = await app.inject({
      method: "GET",
      url: "/ministries/1",
    });
    expect(response.statusCode).toBe(401);
  });
});
