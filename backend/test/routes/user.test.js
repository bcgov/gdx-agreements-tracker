const serverConfig = require('../../src/helpers/config');
const authHelper = require("../../src/helpers/auth");
let app;

// For mocking authentication so we can test routes themselves.
jest.mock("../../src/helpers/auth");

describe("Attempting to access any server route without a bearer token.", () => {
    beforeEach(() => {
        app = serverConfig();
    })
    it("Returns 401 and can't parse token when no authorization header is passed.", async () => {
        const response = await app.inject({
            method: 'GET',
            url: '/api/users',
        });

        expect(response.statusCode).toBe(401);
        expect(JSON.parse(response.body).message).toBe("Error: Couldn't parse bearer token.");
    });
});

describe("Access user routes", () => {
    beforeEach(() => {
        app = serverConfig();
        // Mock authentication functions so we can access routes.
        authHelper.getBearerTokenFromRequest.mockReturnValueOnce('tokenString');
        authHelper.verifyToken.mockResolvedValue(true);
    });

    it("Should get a list of users when you hit /api/users", async () => {
        const response = await app.inject({
            method: 'GET',
            url: '/api/users',
        });
        const responseBody = JSON.parse(response.body);

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(responseBody)).toBe(true);
        responseBody.forEach((userObject) => expect("id" in userObject).toBe(true));
    });

    it("Should get a single user object when you hit /api/users/:id with a valid ID", async () => {
        const response = await app.inject({
            method: 'GET',
            url: '/api/users/1',
        });
        const responseBody = JSON.parse(response.body);

        expect(response.statusCode).toBe(200);
        expect("id" in responseBody).toBe(true);
        expect("name" in responseBody).toBe(true);
    })
});
