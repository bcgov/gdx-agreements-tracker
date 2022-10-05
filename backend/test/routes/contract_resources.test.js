const model = require("../../src/models/contract_resources.js");
const { testRoutes, routeTypes } = require("./index.js");

jest.mock("../../src/models/contract_resources.js");

testRoutes([
  {
    request: { method: "GET", url: "/contracts/1/resources" },
    modelFunction: model.findAll,
    capabilities: ["contracts_read_all"],
    type: routeTypes.General,
  },
  {
    request: { method: "GET", url: "/contracts/resources/1" },
    modelFunction: model.findById,
    capabilities: ["contracts_read_all"],
    type: routeTypes.Specific,
  },
  {
    request: { method: "PUT", url: "/contracts/resources/1", payload: {} },
    modelFunction: model.updateOne,
    capabilities: ["contracts_update_one"],
    type: routeTypes.Specific,
  },
  {
    request: { method: "POST", url: "/contracts/1/resources", payload: {} },
    modelFunction: model.addOne,
    capabilities: ["contracts_add_one"],
    type: routeTypes.General,
  },
]);
