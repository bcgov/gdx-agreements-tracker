const model = require("@models/client_coding/index");
const { testRoutes, routeTypes } = require("../index.js");

jest.mock("@models/client_coding/index");

testRoutes([
  {
    request: { method: "GET", url: "/projects/1/client-coding" },
    modelFunction: model.findAllByProjectId,
    capabilities: ["projects_read_all"],
    type: routeTypes.General,
  },
  {
    request: { method: "GET", url: "/projects/client-coding/1" },
    modelFunction: model.findById,
    capabilities: ["projects_read_all"],
    type: routeTypes.Specific,
  },
  {
    request: { method: "PUT", url: "/projects/client-coding/1", payload: {} },
    modelFunction: model.updateOne,
    capabilities: ["projects_update_one"],
    type: routeTypes.Specific,
  },
  {
    request: { method: "POST", url: "/projects/1/client-coding", payload: {} },
    modelFunction: model.addOneWithProjectId,
    capabilities: ["projects_add_one"],
    type: routeTypes.General,
  },
  {
    request: { method: "DELETE", url: "/projects/client-coding/1", payload: {} },
    modelFunction: model.removeOne,
    capabilities: ["projects_delete_one"],
    type: routeTypes.Specific,
  },
]);
