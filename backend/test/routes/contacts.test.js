const serverConfig = require('../../src/facilities/fastify');
const authHelper = require("../../src/facilities/keycloak");
const contactsModel = require("../../src/models/contacts.js");
const contacts = require("../../src/database/seeds/04_contacts")

let app;

// Mock authentication so we can test routes themselves.
jest.mock("../../src/facilities/keycloak");
// Mock contacts DB methods.
jest.mock("../../src/models/contacts");

describe("Attempting to access any server route without a bearer token.", () => {
    beforeEach(() => {
        app = serverConfig();
    })
    it("Returns 401 and can't parse token when no authorization header is passed.", async () => {
        const response = await app.inject({
            method: 'GET',
            url: '/contacts',
        });

        expect(response.statusCode).toBe(401);
        expect(JSON.parse(response.body).message).toBe("Error: Couldn't parse bearer token.");
    });
});

describe("Access contacts routes with valid contacts", () => {
    beforeEach(() => {
        app = serverConfig();
        // Mock authentication functions so we can access routes.
        authHelper.getBearerTokenFromRequest.mockReturnValueOnce('tokenString');
        authHelper.verifyToken.mockResolvedValue(true);
        authHelper.getUserInfo.mockReturnValue({
            name: 'test-name',
            email: 'test@example.com',
            preferred_contactsname: 'preferred_test-name',
            roles: [],
            role: 'admin',
            capabilities: [                
                'contacts_read_all'
            ]
        });
    });

    it("Should get a list of contacts when you hit /contacts", async () => {
        contactsModel.findAll.mockResolvedValue(contacts);
        const response = await app.inject({
            method: 'GET',
            url: '/contacts',
        });
        const responseBody = JSON.parse(response.body);
        expect(response.statusCode).toBe(200);
        expect(responseBody.data.contacts).toBeInstanceOf(Array)
        responseBody.data.contacts.forEach((contactsObject) => expect("id" in contactsObject).toBe(true));
    });
});


describe("Access contacts routes with no contacts", () => {
    beforeEach(() => {
        app = serverConfig();
        // Mock authentication functions so we can access routes.
        authHelper.getBearerTokenFromRequest.mockReturnValueOnce('tokenString');
        authHelper.verifyToken.mockResolvedValue(true);
        authHelper.getUserInfo.mockReturnValue(null);
    });

    it("Should get a 401 response when hitting /contacts without authentication", async () => {
        contactsModel.findAll.mockResolvedValue([{ id: 2, name: 'Alex' }]);
        const response = await app.inject({
            method: 'GET',
            url: '/contacts',
        });
        expect(response.statusCode).toBe(401);
    });
});
