const model = require("@models/projects/contacts");
const { testRoutes, routeTypes } = require("../index.js");

jest.mock("@facilities/keycloak.js");
jest.mock("@models/projects");
jest.mock("@models/contracts.js");
jest.mock("@models/projects/contacts");

testRoutes([
  {
    request: { method: "GET", url: "/projects/1/contacts" },
    modelFunction: model.findAllById,
    capabilities: ["projects_read_all"],
    type: routeTypes.General,
  },
  {
    request: {
      method: "PUT",
      url: "/projects/1/contacts",
      payload: {},
    },
    modelFunction: model.updateOne,
    capabilities: ["projects_update_one"],
    type: routeTypes.General,
  },
]);
