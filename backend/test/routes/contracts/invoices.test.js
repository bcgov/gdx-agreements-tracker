const model = require("@models/contracts/invoices.js");
const { testRoutes, routeTypes } = require("../index.js");

jest.mock("@models/contracts/invoices.js");

testRoutes([
  {
    request: { method: "GET", url: "/contracts/1/invoices" },
    modelFunction: model.findAllByContractId,
    capabilities: ["contracts_read_all"],
    type: routeTypes.General,
  },
  {
    request: { method: "GET", url: "/invoices/1" },
    modelFunction: model.findById,
    capabilities: ["contracts_read_all"],
    type: routeTypes.Specific,
  },
  {
    request: {
      method: "PUT",
      url: "/invoices/1",
      payload: {},
    },
    modelFunction: model.updateOne,
    capabilities: ["contracts_update_one"],
    type: routeTypes.Specific,
  },
  {
    request: {
      method: "POST",
      url: "/contracts/1/invoices",
      payload: {},
    },
    modelFunction: model.addOne,
    capabilities: ["contracts_add_one"],
    type: routeTypes.General,
  },
]);
