const model = require("../../src/models/project_status.js");
const { testRoutes, routeTypes } = require("./index.js");

jest.mock("../../src/models/project_status.js");

testRoutes([
  {
    request: { method: "GET", url: "/projects/1/status" },
    modelFunction: model.findAll,
    capabilities: ["projects_read_all"],
    type: routeTypes.General,
  },
  {
    request: { method: "GET", url: "/projects/status/1" },
    modelFunction: model.findById,
    capabilities: ["projects_read_all"],
    type: routeTypes.Specific,
  },
]);
