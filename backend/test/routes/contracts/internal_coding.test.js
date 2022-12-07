const model = require("@models/contracts/internal_coding");
const { testRoutes, routeTypes } = require("../index.js");

jest.mock("@models/contracts/internal_coding");

testRoutes([
  {
    request: { method: "GET", url: "/contracts/1/internal-coding" },
    modelFunction: model.findAllById,
    capabilities: ["contracts_read_all"],
    type: routeTypes.General,
  },
  {
    request: { method: "GET", url: "/contracts/internal-coding/1" },
    modelFunction: model.findById,
    capabilities: ["contracts_read_all"],
    type: routeTypes.Specific,
  },
  {
    request: { method: "PUT", url: "/contracts/internal-coding/1", payload: {} },
    modelFunction: model.updateOne,
    capabilities: ["contracts_update_one"],
    type: routeTypes.Specific,
  },
  {
    request: { method: "POST", url: "/contracts/1/internal-coding", payload: {} },
    modelFunction: model.addOne,
    capabilities: ["contracts_add_one"],
    type: routeTypes.General,
  },
]);
