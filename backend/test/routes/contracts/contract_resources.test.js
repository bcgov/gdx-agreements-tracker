const model = require("@models/contracts/contract_resources");
const { testRoutes, routeTypes } = require("../index.js");

jest.mock("@models/contracts/contract_resources");

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
    request: {
      method: "PUT",
      url: "/contracts/resources/1",
      payload: { resource_id: 1, supplier_rate_id: 1, assignment_rate: "1", fiscal: 1 },
    },
    modelFunction: model.updateOne,
    capabilities: ["contracts_update_one"],
    type: routeTypes.Specific,
  },
  {
    request: {
      method: "POST",
      url: "/contracts/1/resources",
      payload: { resource_id: 1, supplier_rate_id: 1, assignment_rate: "1", fiscal: 1 },
    },
    modelFunction: model.addOne,
    capabilities: ["contracts_add_one"],
    type: routeTypes.General,
  },
]);
