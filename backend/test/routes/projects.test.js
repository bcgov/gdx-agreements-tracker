const serverConfig = require("../../src/facilities/fastify");
const authHelper = require("../../src/facilities/keycloak");
const projectsModel = require("../../src/models/projects.js");
let app;

// Mock authentication so we can test routes themselves.
jest.mock("../../src/facilities/keycloak");
// Mock user DB methods.
jest.mock("../../src/models/projects");
jest.mock("../../src/models/contracts");

describe("Attempting to access any server route without a bearer token.", () => {
  beforeEach(() => {
    app = serverConfig();
  });
  it("Returns 401 and can't parse token when no authorization header is passed.", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/api/projects",
    });

    expect(response.statusCode).toBe(401);
    expect(JSON.parse(response.body).message).toBe("Error: Couldn't parse bearer token.");
  });
});

describe("Access projects routes with valid user", () => {
  beforeEach(() => {
    app = serverConfig();
    // Mock authentication functions so we can access routes.
    authHelper.getBearerTokenFromRequest.mockReturnValueOnce("tokenString");
    authHelper.verifyToken.mockResolvedValue(true);
    authHelper.getRealmRoles.mockReturnValue([]);
    authHelper.getUserInfo.mockReturnValue({
      name: "test-name",
      email: "test@example.com",
      preferred_username: "preferred_test-name",
      roles: [],
      role: "admin",
      capabilities: [
        "projects_create_all",
        "projects_update_all",
        "projects_delete_all",
        "projects_read_all",
      ],
    });
  });

  it("Should get a list of projects when you hit /api/projects", async () => {
    projectsModel.findAll.mockResolvedValue([{ id: 1 }, { id: 2 }]);
    const response = await app.inject({
      method: "GET",
      url: "/projects",
    });
    const responseBody = JSON.parse(response.body);
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(responseBody.data)).toBe(true);
    responseBody.data.forEach((projectsObject) => expect("id" in projectsObject).toBe(true));
  });

  it("Should get a single project object when you hit /api/project/:id with a valid ID", async () => {
    projectsModel.findById.mockResolvedValue({ id: 1 });
    const response = await app.inject({
      method: "GET",
      url: "/projects/1",
    });

    const responseBody = JSON.parse(response.body);
    expect(response.statusCode).toBe(200);
    expect("id" in responseBody.data).toBe(true);
  });

  it("Should get a single project close out object when you hit /api/project/:id/close-out with a valid ID", async () => {
    projectsModel.findCloseOutById.mockResolvedValue({ id: 1 });
    const response = await app.inject({
      method: "GET",
      url: "/projects/1/close-out",
    });

    const responseBody = JSON.parse(response.body);
    expect(response.statusCode).toBe(200);
    expect("id" in responseBody.data).toBe(true);
  });
});

describe("Access projects routes with no user", () => {
  beforeEach(() => {
    app = serverConfig();
    // Mock authentication functions so we can access routes.
    authHelper.getBearerTokenFromRequest.mockReturnValueOnce("tokenString");
    authHelper.verifyToken.mockResolvedValue(true);
    authHelper.getUserInfo.mockReturnValue(null);
  });

  it("Should get a 401 response when you hit /api/projects", async () => {
    projectsModel.findAll.mockResolvedValue([{ id: 1 }]);
    const response = await app.inject({
      method: "GET",
      url: "/projects",
    });
    expect(response.statusCode).toBe(401);
  });

  it("Should get a 401 response when you hit /api/projects/:id", async () => {
    projectsModel.findById.mockResolvedValue([{ id: 1 }]);
    const response = await app.inject({
      method: "GET",
      url: "/projects/1",
    });
    expect(response.statusCode).toBe(401);
  });

  it("Should get a 401 response when you hit /api/projects/:id/close-out", async () => {
    projectsModel.findById.mockResolvedValue([{ id: 1 }]);
    const response = await app.inject({
      method: "GET",
      url: "/projects/1/close-out",
    });
    expect(response.statusCode).toBe(401);
  });
});
