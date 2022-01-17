const serverConfig = require('../../src/facilities/fastify');
const authHelper = require("../../src/facilities/keycloak");
const userModel = require("../../src/models/users.js");
let app;

// Mock authentication so we can test routes themselves.
jest.mock("../../src/facilities/keycloak");
// Mock user DB methods.
jest.mock("../../src/models/users");

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

describe("Access user routes with valid user", () => {
    beforeEach(() => {
        app = serverConfig();
        // Mock authentication functions so we can access routes.
        authHelper.getBearerTokenFromRequest.mockReturnValueOnce('tokenString');
        authHelper.verifyToken.mockResolvedValue(true);
        authHelper.getUserInfo.mockReturnValue({
            name: 'test-name',
            email: 'test@example.com',
            preferred_username: 'preferred_test-name',
            roles: [],
            role: 'admin',
            capability: [
                'users_create_all',
                'users_update_all',
                'users_delete_all',
                'users_read_all'
            ]
        });
    });

    it("Should get a list of users when you hit /api/users", async () => {
        userModel.findAll.mockResolvedValue([{ id: 1, name: 'Alex' }]);
        const response = await app.inject({
            method: 'GET',
            url: '/users',
        });
        const responseBody = JSON.parse(response.body);
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(responseBody.data)).toBe(true);
        responseBody.data.forEach((userObject) => expect("id" in userObject).toBe(true));
    });

    it("Should get a single user object when you hit /api/users/:id with a valid ID", async () => {
        userModel.findById.mockResolvedValue([{ id: 1, name: 'Alex' }]);
        const response = await app.inject({
            method: 'GET',
            url: '/users/1',
        });
        const responseBody = JSON.parse(response.body);

        expect(response.statusCode).toBe(200);
        expect("id" in responseBody.data).toBe(true);
        expect("name" in responseBody.data).toBe(true);
    })
});


describe("Access user routes with no user", () => {
    beforeEach(() => {
        app = serverConfig();
        // Mock authentication functions so we can access routes.
        authHelper.getBearerTokenFromRequest.mockReturnValueOnce('tokenString');
        authHelper.verifyToken.mockResolvedValue(true);
        authHelper.getUserInfo.mockReturnValue(null);
    });

    it("Should get a list of users when you hit /api/users", async () => {
        userModel.findAll.mockResolvedValue([{ id: 1, name: 'Alex' }]);
        const response = await app.inject({
            method: 'GET',
            url: '/users',
        });
        expect(response.statusCode).toBe(401);
    });

    it("Should get a single user object when you hit /api/users/:id with a valid ID", async () => {
        userModel.findById.mockResolvedValue([{ id: 1, name: 'Alex' }]);
        const response = await app.inject({
            method: 'GET',
            url: '/users/1',
        });
        expect(response.statusCode).toBe(401);
    })
});
