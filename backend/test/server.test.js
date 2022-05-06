const serverConfig = require("../src/facilities/fastify");
let app;

describe("Attempting to access any server route without a bearer token.", () => {
  beforeAll(() => {
    app = serverConfig();
  });

  it("Returns 401 and can't parse token when no authorization header is passed.", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/",
    });

    expect(response.statusCode).toBe(401);
    expect(JSON.parse(response.body).message).toBe("Error: Couldn't parse bearer token.");
  });
});
