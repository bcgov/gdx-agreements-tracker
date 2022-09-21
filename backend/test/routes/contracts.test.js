const model = require("../../src/models/contracts.js");
const subcontractorModel = require("../../src/models/subcontractors");
const { testRoutes, routeTypes } = require("./index.js");

jest.mock("../../src/models/contracts.js");
jest.mock("../../src/models/subcontractors.js");

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
  }
]);
