const model = require("@models/contracts");
const subcontractorModel = require("@models/admin/subcontractors");
const { testRoutes, routeTypes } = require("../index.js");

jest.mock("@models/contracts");
jest.mock("@models/admin/subcontractors");

const capability = ["contracts_read_all"];

testRoutes([
  {
    request: { method: "GET", url: "/contracts" },
    modelFunction: model.findAll,
    capabilities: capability,
    type: routeTypes.General,
  },
  {
    request: { method: "GET", url: "/contracts/1" },
    modelFunction: [model.findById, subcontractorModel.findByContractId],
    capabilities: capability,
    type: routeTypes.Specific,
  },
]);
