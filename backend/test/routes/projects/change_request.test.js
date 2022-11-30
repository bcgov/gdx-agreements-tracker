const model = require("@models/projects/change_request");
const { testRoutes, routeTypes } = require("../index.js");

jest.mock("@models/projects/change_request");

testRoutes([
  {
    request: { method: "GET", url: "projects/1/change_request" },
    modelFunction: model.findAll,
    capabilities: ["projects_read_all"],
    type: routeTypes.General,
  },
  {
    request: { method: "GET", url: "projects/1/change_request/1" },
    modelFunction: model.findById,
    capabilities: ["projects_read_all"],
    type: routeTypes.Specific,
  },
  {
    request: {
      method: "PUT",
      url: "/change_request/1",
      payload: {
        email: "me@gov.bc.ca",
      },
    },
    modelFunction: model.updateOne,
    capabilities: ["projects_update_one"],
    type: routeTypes.Specific,
  },
  {
    request: {
      method: "POST",
      url: "/change_request",
      payload: {
        subcontractor_name: "Test subcontractor",
      },
    },
    modelFunction: model.addOne,
    capabilities: ["projects_add_one"],
    type: routeTypes.General,
  },
]);
