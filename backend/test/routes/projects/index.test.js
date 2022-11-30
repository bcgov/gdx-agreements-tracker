const model = require("@models/projects");
const contractsModel = require("@models/contracts");
const { testRoutes, routeTypes } = require("../index.js");

jest.mock("@facilities/keycloak.js");
jest.mock("@models/contracts");
jest.mock("@models/projects");

testRoutes([
  {
    request: { method: "GET", url: "/projects" },
    modelFunction: model.findAll,
    capabilities: ["projects_read_all"],
    type: routeTypes.General,
  },
  {
    request: { method: "GET", url: "/projects/1" },
    modelFunction: [model.findById, contractsModel.findByProjectId],
    capabilities: ["projects_read_all"],
    type: routeTypes.Specific,
  },
  {
    request: {
      method: "PUT",
      url: "/projects/1",
      payload: {
        email: "me@gov.bc.ca",
      },
    },
    modelFunction: model.updateOne,
    capabilities: ["projects_update_one"],
    type: routeTypes.Specific,
  },
]);
