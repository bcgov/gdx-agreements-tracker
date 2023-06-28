const serverConfig = require("../src/facilities/fastify");
const authHelper = require("../src/facilities/keycloak");
let app;

jest.mock("../src/facilities/keycloak");

beforeEach(() => {
  app = serverConfig();
  authHelper.getBearerTokenFromRequest.mockReturnValueOnce("tokenString");
  authHelper.verifyToken.mockResolvedValue(true);
  authHelper.getRealmRoles.mockReturnValue([]);
});

describe("Access user routes with valid capabilities", () => {
  it("Should be status code 200 for (getAll) GET /api/users", async () => {
    authHelper.getUserInfo.mockReturnValue({ capabilities: ["users_read_all"] });
    userModel.findAll.mockResolvedValue([{ id: 1, name: "Alex" }]);
    const response = await app.inject({
      method: "GET",
      url: "/users",
    });
    expect(response.statusCode).toBe(200);
  });

  it("Should be status code 200 for (getOne) GET /api/users/:id", async () => {
    authHelper.getUserInfo.mockReturnValue({ capabilities: ["users_read_all"] });
    userModel.findById.mockResolvedValue([{ id: 1, name: "Alex" }]);
    const response = await app.inject({
      method: "GET",
      url: "/users/2",
    });
    expect(response.statusCode).toBe(200);
  });

  it("Should be status code 200 for (updateOne) PUT /api/users/:id", async () => {
    authHelper.getUserInfo.mockReturnValue({ capabilities: ["users_create_all"] });
    userModel.updateOne.mockResolvedValue([{ id: 1, name: "Alex" }]);
    const response = await app.inject({
      method: "PUT",
      url: "/users/1",
      payload: {
        email: "me@gov.bc.ca",
      },
    });
    expect(response.statusCode).toBe(200);
  });

  it("Should be status code 200 for (addOne) POST /api/users/:id", async () => {
    authHelper.getUserInfo.mockReturnValue({ capabilities: ["users_create_all"] });
    userModel.addOne.mockResolvedValue([{ id: 1, name: "Alex" }]);
    const response = await app.inject({
      method: "POST",
      url: "/users",
      payload: {
        email: "me@gov.bc.ca",
        name: "Shawn Turple",
        role_id: 2,
      },
    });
    expect(response.statusCode).toBe(200);
  });

  it("Should be status code 200 for (deleteOne) DELETE /api/users/:id", async () => {
    authHelper.getUserInfo.mockReturnValue({ capabilities: ["users_delete_all"] });
    userModel.removeOne.mockResolvedValue([{ id: 1, name: "Alex" }]);
    const response = await app.inject({
      method: "DELETE",
      url: "/users/2",
    });
    expect(response.statusCode).toBe(200);
  });
});

describe("Access user routes with no user", () => {
  beforeEach(() => {
    authHelper.getUserInfo.mockReturnValue({});
  });
  it("Should get a list of users when you hit /api/users", async () => {
    userModel.findAll.mockResolvedValue([{ id: 1, name: "Alex" }]);
    const response = await app.inject({
      method: "GET",
      url: "/users",
    });
    expect(response.statusCode).toBe(401);
  });

  it("Should get a single user object when you hit /api/users/:id with a valid ID", async () => {
    userModel.findById.mockResolvedValue([{ id: 1, name: "Alex" }]);
    const response = await app.inject({
      method: "GET",
      url: "/users/1",
    });
    expect(response.statusCode).toBe(401);
  });
});
