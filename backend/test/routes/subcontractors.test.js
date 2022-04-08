const serverConfig = require('../../src/facilities/fastify');
const authHelper = require("../../src/facilities/keycloak");
const subcontractorsModel = require("../../src/models/subcontractors.js");
const subcontractors = require("../../src/database/seeds/06_subcontractors")

let app;

// Mock authentication so we can test routes themselves.
jest.mock("../../src/facilities/keycloak");
// Mock subcontractors DB methods.
jest.mock("../../src/models/subcontractors");

describe("Attempting to access any server route without a bearer token.", () => {
    beforeEach(() => {
        app = serverConfig();
    })
    it("Returns 401 and can't parse token when no authorization header is passed.", async () => {
        const response = await app.inject({
            method: 'GET',
            url: '/subcontractors',
        });

        expect(response.statusCode).toBe(401);
        expect(JSON.parse(response.body).message).toBe("Error: Couldn't parse bearer token.");
    });
});

describe("Access subcontractors routes with valid subcontractors", () => {
    beforeEach(() => {
        app = serverConfig();
        // Mock authentication functions so we can access routes.
        authHelper.getBearerTokenFromRequest.mockReturnValueOnce('tokenString');
        authHelper.verifyToken.mockResolvedValue(true);
        authHelper.getUserInfo.mockReturnValue({
            name: 'test-name',
            email: 'test@example.com',
            preferred_subcontractorsname: 'preferred_test-name',
            roles: [],
            role: 'admin',
            capabilities: [                
                'subcontractors_read_all'
            ]
        });
    });

    it("Should get a list of subcontractors when you hit /subcontractors", async () => {
        subcontractorsModel.findAll.mockResolvedValue(subcontractors);
        const response = await app.inject({
            method: 'GET',
            url: '/subcontractors',
        });
        const responseBody = JSON.parse(response.body);
        expect(response.statusCode).toBe(200);
        expect(responseBody.data.subcontractors).toBeInstanceOf(Array)
        responseBody.data.subcontractors.forEach((subcontractorsObject) => expect("id" in subcontractorsObject).toBe(true));
    });
});


describe("Access subcontractors routes with no subcontractors", () => {
    beforeEach(() => {
        app = serverConfig();
        // Mock authentication functions so we can access routes.
        authHelper.getBearerTokenFromRequest.mockReturnValueOnce('tokenString');
        authHelper.verifyToken.mockResolvedValue(true);
        authHelper.getUserInfo.mockReturnValue(null);
    });

    it("Should get a 401 response when hitting /subcontractors without authentication", async () => {
        subcontractorsModel.findAll.mockResolvedValue([{ id: 2, name: 'Alex' }]);
        const response = await app.inject({
            method: 'GET',
            url: '/subcontractors',
        });
        expect(response.statusCode).toBe(401);
    });
});
