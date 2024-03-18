const model = require("@models/projects/contacts");
const { testRoutes, routeTypes } = require("../index.js");

jest.mock("@facilities/keycloak.js");
jest.mock("@models/projects");
jest.mock("@models/contracts/index");
jest.mock("@models/projects/contacts");

testRoutes([
  {
    request: { method: "GET", url: "/projects/1/contacts" },
    modelFunction: model.findAllById,
    capabilities: ["PMO-User-Role"],
    type: routeTypes.General,
  },
  {
    request: {
      method: "PUT",
      url: "/projects/contacts/1",
      payload: {},
    },
    modelFunction: model.updateOne,
    capabilities: ["PMO-User-Role"],
    type: routeTypes.General,
  },
]);
