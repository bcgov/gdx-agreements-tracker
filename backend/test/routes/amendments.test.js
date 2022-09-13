const model = require("../../src/models/amendments.js");
const { testRoutes, routeTypes } = require("./index.js");

jest.mock("../../src/models/amendments.js");

const capability = ["amendments_read_all"];

testRoutes([
  {
    request: { method: "GET", url: "contracts/1/amendments" },
    modelFunction: model.findAll,
    capabilities: capability,
    type: routeTypes.General,
  },
  {
    request: { method: "GET", url: "contracts/1/amendments/1" },
    modelFunction: model.findById,
    capabilities: capability,
    type: routeTypes.Specific,
  },
  {
    request: {
      method: "PUT",
      url: "amendments/1",
      payload: {
        email: "me@gov.bc.ca",
      },
    },
    modelFunction: model.updateOne,
    capabilities: capability,
    type: routeTypes.Specific,
  },
  {
    request: {
      method: "POST",
      url: "amendments",
      payload: {
        contract_id: 1,
        amendment_number: 2,
        amendment_date: "2011-11-11T11:11:11+00:00",
      },
    },
    modelFunction: model.addOne,
    capabilities: capability,
    type: routeTypes.General,
  },
]);
