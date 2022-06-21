/* eslint "no-warning-comments": [1, { "terms": ["todo", "fixme"] }] */
// todo: Fix the commented out tests. Preserving unused vars until tests are fixed.
/* eslint no-unused-vars: "off" */
const serverConfig = require("../../src/facilities/fastify");
const {
  getBearerTokenFromRequest,
  verifyToken,
  verifyUserExists,
  getUserInfo,
} = require("../../src/facilities/keycloak");
const userModel = require("../../src/models/users.js");
let app;
let exampleToken;
let request;

// Mock user DB methods.
jest.mock("../../src/models/users");

describe("Unauthorized routes.", () => {
  beforeEach(() => {
    app = serverConfig();
  });

  it("Returns 401 and can parse token but token is invalid.", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/",
      headers: {
        authorization: "Bearer 234fake23543token",
      },
    });
    expect(response.statusCode).toBe(401);
    expect(JSON.parse(response.body).message).toBe("Couldn't parse out valid key ID.");
  });
});

describe("Parse bearer token from request", () => {
  it("Should return a token string if given a request containing an authorization header.", () => {
    const sampleRequestBody = {
      method: "GET",
      url: "/",
      headers: {
        authorization: "Bearer 2367fake324928347token",
      },
    };
    const result = getBearerTokenFromRequest(sampleRequestBody);

    expect(result).toBe("2367fake324928347token");
  });

  it("Should return false if no authorization header is passed.", () => {
    const sampleRequestBody = {
      method: "GET",
      url: "/",
    };
    const result = getBearerTokenFromRequest(sampleRequestBody);

    expect(result).toBe(false);
  });
});

describe("Verify user exists in DB and if not, add user.", () => {
  beforeEach(() => {
    exampleToken =
      "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJtQTA1NjIyLVowVWlxeTM3YzV6R0pmLUUwRlRCOW5BamNPSnZZR21Zd193In0.eyJleHAiOjE2NDE1ODE0NTYsImlhdCI6MTY0MTU4MTE1NiwiYXV0aF90aW1lIjoxNjQxNTgxMTQ3LCJqdGkiOiI2NDU2YzIyMS04MzVhLTQ4YWUtOTU5MC1mZDNkOWU1MWUzYWYiLCJpc3MiOiJodHRwczovL29pZGMuZ292LmJjLmNhL2F1dGgvcmVhbG1zL2Fhb296aGNwIiwic3ViIjoiMDFjNWRiMjgtMjkwOC00MjI4LWI4NjEtNmMxYTBkMjViZTVmIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiZ2R4LWFncmVlbWVudHMtdHJhY2tlciIsIm5vbmNlIjoiNzNiNzEyYTAtYjQwYS00MDIyLThiOTgtMmEyODYxMTEwMDk0Iiwic2Vzc2lvbl9zdGF0ZSI6ImNhYTRiMzg0LWUzZTgtNDNkYy1iYmJhLWMzYzk3Y2FjODE3NCIsImFjciI6IjAiLCJhbGxvd2VkLW9yaWdpbnMiOlsiKiJdLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJuYW1lIjoiQWxleGFuZGVyIFdpbnRzY2hlbCIsInByZWZlcnJlZF91c2VybmFtZSI6ImF3aW50c2NoQGlkaXIiLCJnaXZlbl9uYW1lIjoiQWxleGFuZGVyIiwiZmFtaWx5X25hbWUiOiJXaW50c2NoZWwiLCJlbWFpbCI6ImFsZXhhbmRlci53aW50c2NoZWxAZ292LmJjLmNhIn0.M1_ZIeGZSO1pdMF6_DmSwB5J6BNWP4SX7vFQhoAjx_rOOaCykNQ5l6KvE01gWm1UeE-cD60fEFtwSxzgQ0jIMfvmuz20s3izYGvu1dz4ysNphuMYfxfTHGhaX9N6b8GfwzYXLx76_Ccl1dFHviEbCEU3He84cSM3GgUj-SDJgqc9uI014QdqjvYJoHQLtehqVO0_uWCKPji5N3g5KECHPfPuWreDdE1p9UvB-v6Am636DkvjnB_uTyByD9O7CfeQAb3A8i7nQAnESlVvn75bhVIb1NH8Xs67MZ0uMIJdbnskOYJuzuu_lvT5hvQ5OiyYoW0CCUB31w105Wksmj3UnQ";
  });

  it("Finds no user, so it adds one to the DB.", async () => {
    const newUserId = 1;
    userModel.findByEmail.mockResolvedValue([]);
    userModel.addOne.mockResolvedValue(newUserId);
    const result = await verifyUserExists(exampleToken);

    expect(result).toBe(`New user added to database. ID ${newUserId}`);
  });

  it("Finds a user in DB, does nothing.", async () => {
    userModel.findByEmail.mockResolvedValue([{ id: 1, name: "Omar Epps" }]);
    const result = await verifyUserExists(exampleToken);

    expect(result).toBe("User already exists in database.");
  });
});
