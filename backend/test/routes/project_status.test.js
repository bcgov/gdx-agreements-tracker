const model = require("../../src/models/project_status.js");
const { testRoutes, routeTypes } = require("./index.js");

jest.mock("../../src/models/project_status.js");

const capability = ["project_status_update_all"];

testRoutes([
  {
    request: { method: "GET", url: "/project_status" },
    modelFunction: model.findAll,
    capabilities: capability,
    type: routeTypes.General,
  },
  {
    request: { method: "GET", url: "/project_status/1" },
    modelFunction: model.findById,
    capabilities: capability,
    type: routeTypes.Specific,
  },
]);
